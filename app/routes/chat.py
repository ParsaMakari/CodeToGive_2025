import logging
import re

from fastapi import APIRouter, Request

from app.config import settings
from app.models import ChatRequest, ChatResponse
from app.core.language import detect_language, resolve_language, translate
from app.core.normalization import normalize_text, is_empty
from app.core.profanity import contains_profanity, mask_profanity
from app.core.safety import detect_crisis, detect_emotional
from app.core.intents import (
    INTENT_AMOUNT_GUIDANCE,
    INTENT_DONATION_HELP,
    INTENT_EMOTIONAL_DISTRESS,
    INTENT_GENERAL_INFO,
    INTENT_PATHWAY_EXPLANATION,
    INTENT_TRANSPARENCY_INQUIRY,
    INTENT_UNCLEAR,
    INTENT_VICTIM_SUPPORT,
    intent_detector,
)
from app.core.rag import rag_service
from app.core.responses import response_builder
from app.core.sessions import session_manager
from app.core.metrics import metrics
from app.core.support_requests import support_queue

logger = logging.getLogger(__name__)

router = APIRouter(tags=["chat"])


CONTACT_EMAIL_RE = re.compile(
    r"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}", re.IGNORECASE
)
PHONE_LIKE_RE = re.compile(r"(?:\+?\d[\s\-().]*){7,}")

CONTACT_KEYWORDS = [
    "call me",
    "text me",
    "phone me",
    "email me",
    "contact me",
    "reach me",
    "safe to call",
    "safe number",
    "appel",
    "appelle-moi",
    "texte-moi",
    "courriel",
    "whatsapp",
    "signal",
    "telegram",
    "sms",
]

SUPPORT_EXIT_KEYWORDS = [
    "donate",
    "donation",
    "donations",
    "make a donation",
    "i need to donate",
    "i want to donate",
    "how do i donate",
    "how can i donate",
    "give money",
    "support financially",
    "mission",
    "general info",
    "tell me about",
    "what do you do",
]


def _looks_like_contact_message(text: str) -> bool:
    if CONTACT_EMAIL_RE.search(text):
        return True
    if PHONE_LIKE_RE.search(text):
        return True
    digits = sum(ch.isdigit() for ch in text)
    if digits >= 7:
        return True
    lowered = text.lower()
    return any(keyword in lowered for keyword in CONTACT_KEYWORDS)


def _should_exit_support_flow(text: str) -> bool:
    lowered = text.lower()
    return any(keyword in lowered for keyword in SUPPORT_EXIT_KEYWORDS)


@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(payload: ChatRequest, request: Request):
    raw_message = payload.message or ""
    existing_session = (
        session_manager.get(payload.session_id) if payload.session_id else None
    )
    normalized, truncated = normalize_text(raw_message, settings.MAX_MESSAGE_LENGTH)

    detected_lang = detect_language(normalized) if normalized else settings.DEFAULT_LANGUAGE
    language = resolve_language(payload.language, detected_lang)

    if is_empty(normalized):
        text = translate(language, "errors.empty_input")
        suggestions = translate(language, "meta.default_suggestions", default=[])
        sid = payload.session_id or session_manager.create_session(language)
        metrics.record_chat(
            intent=INTENT_UNCLEAR,
            confidence=0.0,
            is_crisis=False,
            extra_debug={"reason": "empty_input", "language": language},
        )
        return ChatResponse(
            response=text,
            suggestions=suggestions or [],
            intent=INTENT_UNCLEAR,
            confidence=0.0,
            session_id=sid,
            language=language,
        )

    awaiting_support_contact = bool(
        existing_session and existing_session.get("awaiting_support_contact")
    )

    if awaiting_support_contact:
        sid = payload.session_id or session_manager.create_session(language)
        session_manager.touch(sid, language=language)
        session = session_manager.get(sid)
        lowered = normalized.lower()
        not_safe_phrases = [
            "not safe",
            "unsafe",
            "pas secur",
            "pas en secur",
            "pas en sécurité",
        ]
        if any(phrase in lowered for phrase in not_safe_phrases):
            if session:
                session["awaiting_support_contact"] = False
            text = translate(
                language,
                "victim_support_flow.not_safe",
                default="Understood. I’ll keep this space focused on information you can read safely. You can still reach our hotline whenever it’s secure to do so.",
            )
            try:
                text = text.format(
                    hotline=settings.CRISIS_HOTLINE,
                    support_email=settings.SUPPORT_EMAIL,
                )
            except Exception:
                pass
            suggestions = translate(
                language,
                "intents.victim_support.suggestions",
                default=translate(language, "meta.default_suggestions", default=[]),
            )
            metrics.record_chat(
                intent="victim_support_followup",
                confidence=1.0,
                is_crisis=False,
                extra_debug={"support_request": "declined", "language": language},
            )
            return ChatResponse(
                response=text,
                suggestions=suggestions or [],
                intent="victim_support_followup",
                confidence=1.0,
                session_id=sid,
                language=language,
            )

        if _should_exit_support_flow(lowered):
            if session:
                session["awaiting_support_contact"] = False
            awaiting_support_contact = False
        elif _looks_like_contact_message(normalized):
            if session:
                session["awaiting_support_contact"] = False
            support_request = support_queue.enqueue(
                session_id=sid,
                language=language,
                contact=normalized,
                original_message=raw_message,
                metadata={"source": "chatbot"},
            )
            logger.info("Queued victim support request id=%s session=%s", support_request.id, sid)
            confirm_text = translate(
                language,
                "victim_support_flow.confirm_contact",
                default="Thank you. I’ve sent your request to our on-call support team.",
            )
            try:
                confirm_text = confirm_text.format(
                    hotline=settings.CRISIS_HOTLINE,
                    support_email=settings.SUPPORT_EMAIL,
                )
            except Exception:
                pass
            suggestions = translate(
                language,
                "victim_support_flow.confirm_suggestions",
                default=translate(language, "intents.victim_support.suggestions", default=[]),
            )
            metrics.record_chat(
                intent="victim_support_followup",
                confidence=1.0,
                is_crisis=False,
                extra_debug={"support_request": "queued", "language": language},
            )
            return ChatResponse(
                response=confirm_text,
                suggestions=suggestions or [],
                intent="victim_support_followup",
                confidence=1.0,
                session_id=sid,
                language=language,
            )
        else:
            reminder = translate(
                language,
                "victim_support_flow.ask_contact",
                default="You can reply with a safe phone number, email, or good time to connect. Say “not safe” if you’d rather keep it to written info.",
            )
            suggestions = translate(
                language,
                "intents.victim_support.suggestions",
                default=translate(language, "meta.default_suggestions", default=[]),
            )
            metrics.record_chat(
                intent="victim_support_followup",
                confidence=0.8,
                is_crisis=False,
                extra_debug={"support_request": "awaiting_contact", "language": language},
            )
            return ChatResponse(
                response=reminder,
                suggestions=suggestions or [],
                intent="victim_support_followup",
                confidence=0.8,
                session_id=sid,
                language=language,
            )

    # Safety: crisis detection takes absolute priority
    is_crisis, crisis_reason = detect_crisis(normalized)
    if is_crisis:
        crisis_template = translate(language, "safety.crisis_text")
        if crisis_template:
            text = crisis_template.format(
                hotline=settings.CRISIS_HOTLINE,
                support_email=settings.SUPPORT_EMAIL,
            )
        else:
            text = (
                "I'm really glad you reached out. It sounds like you might be going through a very difficult moment. "
                "I’m not able to provide the help you deserve in a crisis. Please contact your local emergency "
                "services or a trusted crisis hotline right away."
            )
        sid = payload.session_id or session_manager.create_session(language)
        # Do NOT log sensitive message content
        logger.warning("Crisis message detected (reason=%s)", crisis_reason)
        metrics.record_chat(
            intent="crisis_override",
            confidence=1.0,
            is_crisis=True,
            extra_debug={"reason": crisis_reason, "language": language},
        )
        return ChatResponse(
            response=text,
            suggestions=[],
            intent="crisis_override",
            confidence=1.0,
            session_id=sid,
            language=language,
        )

    has_profanity = contains_profanity(normalized)
    cleaned_message = mask_profanity(normalized) if has_profanity else normalized

    emotional_hint = detect_emotional(cleaned_message)

    intent, confidence, debug_info = intent_detector.predict(
        cleaned_message, language=language, emotional_hint=emotional_hint
    )

    rag_intents = {
        INTENT_DONATION_HELP,
        INTENT_AMOUNT_GUIDANCE,
        INTENT_PATHWAY_EXPLANATION,
        INTENT_TRANSPARENCY_INQUIRY,
        INTENT_GENERAL_INFO,
        INTENT_VICTIM_SUPPORT,
        INTENT_UNCLEAR,
    }
    rag_tag_overrides = {
        INTENT_VICTIM_SUPPORT: [INTENT_VICTIM_SUPPORT, INTENT_EMOTIONAL_DISTRESS],
        INTENT_UNCLEAR: [
            INTENT_GENERAL_INFO,
            INTENT_DONATION_HELP,
            INTENT_VICTIM_SUPPORT,
        ],
    }
    rag_results = []
    if intent in rag_intents:
        allowed_tags = rag_tag_overrides.get(intent, [intent])
        rag_results = rag_service.query(cleaned_message, top_k=3, allowed_tags=allowed_tags)

    body_dict = response_builder.build(
        intent=intent,
        language=language,
        confidence=confidence,
        rag_results=rag_results,
        truncated=truncated,
        has_profanity=has_profanity,
    )

    sid = payload.session_id or session_manager.create_session(language)
    sid = session_manager.touch(sid, language=language)
    session = session_manager.get(sid)
    if session is not None:
        session["awaiting_support_contact"] = intent == INTENT_VICTIM_SUPPORT

    metrics.record_chat(
        intent=intent,
        confidence=confidence,
        is_crisis=False,
        extra_debug={
            **debug_info,
            "language": language,
            "has_profanity": has_profanity,
            "emotional_hint": emotional_hint,
            "truncated": truncated,
        },
    )

    logger.info(
        "Chat handled: intent=%s confidence=%.3f language=%s profanity=%s",
        intent,
        confidence,
        language,
        has_profanity,
    )

    return ChatResponse(
        session_id=sid,
        language=language,
        **body_dict,
    )
