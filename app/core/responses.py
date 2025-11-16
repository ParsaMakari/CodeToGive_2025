from typing import Any, Dict, List, Tuple

from app.core.language import translate
from app.core.intents import (
    INTENT_AMOUNT_GUIDANCE,
    INTENT_DONATION_HELP,
    INTENT_EMOTIONAL_DISTRESS,
    INTENT_GENERAL_INFO,
    INTENT_PATHWAY_EXPLANATION,
    INTENT_TRANSPARENCY_INQUIRY,
    INTENT_UNCLEAR,
    INTENT_VICTIM_SUPPORT,
)
from app.core.rag import KnowledgeDoc


class ResponseBuilder:
    def build(
        self,
        intent: str,
        language: str,
        confidence: float,
        rag_results: List[Tuple[KnowledgeDoc, float]],
        truncated: bool,
        has_profanity: bool,
    ) -> Dict[str, Any]:
        suggestions = translate(
            language,
            f"intents.{intent}.suggestions",
            default=translate(language, "meta.default_suggestions", default=[]),
        )

        # Base text for the intent
        base_text = translate(language, f"intents.{intent}.base_text", default="")

        parts: List[str] = []

        if has_profanity:
            notice = translate(language, "profanity.notice", default="")
            if notice:
                parts.append(notice)

        # Additional emotional supportive text
        if intent == INTENT_EMOTIONAL_DISTRESS:
            emotional_text = translate(language, "safety.emotional_text", default="")
            if emotional_text:
                parts.append(emotional_text)

        if base_text:
            parts.append(base_text)

        if intent == INTENT_VICTIM_SUPPORT:
            follow_up = translate(
                language, "victim_support_flow.ask_contact", default=""
            )
            if follow_up:
                parts.append(follow_up)

        # Attach RAG context where relevant
        if rag_results and intent in {
            INTENT_DONATION_HELP,
            INTENT_AMOUNT_GUIDANCE,
            INTENT_PATHWAY_EXPLANATION,
            INTENT_TRANSPARENCY_INQUIRY,
            INTENT_GENERAL_INFO,
            INTENT_VICTIM_SUPPORT,
            INTENT_UNCLEAR,
        }:
            rag_intro = translate(language, "rag.intro", default="")
            lines: List[str] = []
            for doc, score in rag_results:
                if language == "fr" and doc.content_fr:
                    content = doc.content_fr
                else:
                    content = doc.content_en or doc.content_fr
                snippet = (content or "")[:320]
                lines.append(f"- {doc.title}: {snippet}")
            if lines:
                context_block = "\n".join(lines)
                if rag_intro:
                    parts.append(rag_intro + "\n" + context_block)
                else:
                    parts.append(context_block)

        if intent == INTENT_TRANSPARENCY_INQUIRY:
            snapshot_title = translate(
                language,
                "intents.transparency_inquiry.snapshot_title",
                default="",
            )
            snapshot_lines = translate(
                language,
                "intents.transparency_inquiry.snapshot_lines",
                default=[],
            )
            snapshot_cta = translate(
                language,
                "intents.transparency_inquiry.snapshot_cta",
                default="",
            )
            snapshot_block_lines: List[str] = []
            if isinstance(snapshot_lines, list):
                snapshot_block_lines = [f"- {line}" for line in snapshot_lines if line]
            elif snapshot_lines:
                snapshot_block_lines = [f"- {snapshot_lines}"]
            if snapshot_block_lines:
                block = "\n".join(snapshot_block_lines)
                if snapshot_title:
                    parts.append(f"{snapshot_title}\n{block}")
                else:
                    parts.append(block)
            if snapshot_cta:
                parts.append(snapshot_cta)

        # Truncation notice if message was too long
        if truncated:
            tl_msg = translate(language, "errors.too_long", default="")
            if tl_msg:
                parts.append(tl_msg)

        # Clarification prompt for unclear intent
        if intent == INTENT_UNCLEAR:
            clarify = translate(language, "intents.unclear.clarify", default="")
            if clarify:
                parts.append(clarify)

        full_text = "\n\n".join([p for p in parts if p])

        return {
            "response": full_text.strip(),
            "suggestions": suggestions or [],
            "intent": intent,
            "confidence": confidence,
        }


response_builder = ResponseBuilder()
