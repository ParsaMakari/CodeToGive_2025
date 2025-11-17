# app/core/intents.py
"""
Intent detection module for the Athena Donor Chatbot.

This module combines three sources of evidence:
  1) Rule-based scores  (keywords + regex patterns)
  2) Embedding scores   (semantic similarity to example phrases)
  3) ML classifier      (TF-IDF + Logistic Regression on small synthetic data)

Public interface:
    best_intent, confidence, debug = intent_detector.predict(text, language, emotional_hint=False)

Where:
    - best_intent: str, one of the INTENT_* constants
    - confidence: float in [0, 1]
    - debug: dict with detailed scores for debugging (/debug endpoint)
"""

import logging
import re
from dataclasses import dataclass, field
from typing import Dict, List, Tuple

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

from app.core.embeddings import embedding_service

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Intent labels
# ---------------------------------------------------------------------------

INTENT_DONATION_HELP = "donation_help"  # generic "I want to donate / help financially"
INTENT_AMOUNT_GUIDANCE = "amount_guidance"  # "how much should I give?"
INTENT_PATHWAY_EXPLANATION = "pathway_explanation"  # "how / where do I donate?"
INTENT_TRANSPARENCY_INQUIRY = "transparency_inquiry"  # "where does my money go?"
INTENT_GENERAL_INFO = "general_info"  # "tell me about your mission / organization"
INTENT_VICTIM_SUPPORT = "victim_support"  # seeking help as a victim/survivor
INTENT_UNCLEAR = "unclear"  # vague or ambiguous
INTENT_EMOTIONAL_DISTRESS = "emotional_distress"  # emotional but non-crisis

ALL_INTENTS = [
    INTENT_DONATION_HELP,
    INTENT_AMOUNT_GUIDANCE,
    INTENT_PATHWAY_EXPLANATION,
    INTENT_TRANSPARENCY_INQUIRY,
    INTENT_GENERAL_INFO,
    INTENT_VICTIM_SUPPORT,
    INTENT_UNCLEAR,
    INTENT_EMOTIONAL_DISTRESS,
]


# ---------------------------------------------------------------------------
# Configuration structures
# ---------------------------------------------------------------------------

@dataclass
class IntentConfig:
    """Configuration for a single intent."""
    name: str
    keywords: List[str] = field(default_factory=list)   # simple substring matches
    patterns: List[str] = field(default_factory=list)   # regex patterns
    examples: List[str] = field(default_factory=list)   # example sentences


# Intent configs in EN + FR, tuned for donor flows
INTENT_CONFIGS: Dict[str, IntentConfig] = {
    INTENT_DONATION_HELP: IntentConfig(
        name=INTENT_DONATION_HELP,
        keywords=[
            # English
            "donate",
            "donation",
            "donations",
            "give money",
            "give a donation",
            "make a donation",
            "support financially",
            "financially support",
            # French
            "donner",
            "don",
            "dons",
            "faire un don",
            "soutenir financièrement",
        ],
        patterns=[
            r"how can i donate",
            r"how do i donate",
            r"where can i donate",
            r"comment faire un don",
            r"comment je peux faire un don",
        ],
        examples=[
            "I want to donate",
            "Help me donate online",
            "Comment puis-je faire un don ?",
            "Je veux soutenir financièrement",
            "I would like to support you with a donation",
        ],
    ),
    INTENT_AMOUNT_GUIDANCE: IntentConfig(
        name=INTENT_AMOUNT_GUIDANCE,
        keywords=[
            # English
            "how much",
            "amount",
            "minimum amount",
            "suggested amount",
            "recommended amount",
            # French
            "combien",
            "montant",
            "montants",
            "quel montant",
        ],
        patterns=[
            r"how much should i (donate|give)",
            r"how much can i (donate|give)",
            r"combien devrais[- ]je donner",
            r"combien je devrais donner",
        ],
        examples=[
            "I don't know how much to give",
            "What donation amount makes sense?",
            "Quel montant recommandez-vous pour un don ?",
            "How much do people usually donate?",
        ],
    ),
    INTENT_PATHWAY_EXPLANATION: IntentConfig(
        name=INTENT_PATHWAY_EXPLANATION,
        keywords=[
            # English
            "online donation",
            "donate online",
            "donation page",
            "payment methods",
            "credit card",
            "debit card",
            "bank transfer",
            "wire transfer",
            "paypal",
            # French
            "don en ligne",
            "page de don",
            "modes de paiement",
            "carte de crédit",
            "carte de credit",
            "virement",
            "virement bancaire",
            "par chèque",
            "par cheque",
            "comment ça marche",
            "comment ca marche",
        ],
        patterns=[
            r"(steps?|process) to donate",
            r"how does the donation process work",
            r"comment (ça|ca) marche pour (les )?dons",
            r"explique.*don(en)? en ligne",
        ],
        examples=[
            "Can you explain the steps to donate?",
            "How does the donation process work?",
            "Explique-moi comment faire un don par carte de crédit.",
            "What are the different ways to donate?",
        ],
    ),
    INTENT_TRANSPARENCY_INQUIRY: IntentConfig(
        name=INTENT_TRANSPARENCY_INQUIRY,
        keywords=[
            # English
            "impact",
            "where does my money go",
            "how is my donation used",
            "what do you do with the money",
            "financial report",
            "annual report",
            "transparency",
            "results of my donation",
            "use of funds",
            # French
            "à quoi sert mon don",
            "a quoi sert mon don",
            "où va mon argent",
            "ou va mon argent",
            "comment est utilisé mon don",
            "rapport annuel",
            "états financiers",
            "etats financiers",
            "impact de mon don",
        ],
        patterns=[
            r"where (does|will) my money go",
            r"how (is|will be) my donation used",
            r"(use|usage) of (my )?donation",
            r"à quoi sert mon don",
        ],
        examples=[
            "How will my donation be used?",
            "Where does the money go?",
            "Puis-je voir vos états financiers ?",
            "What impact does my donation have?",
        ],
    ),
    INTENT_GENERAL_INFO: IntentConfig(
        name=INTENT_GENERAL_INFO,
        keywords=[
            # English
            "about you",
            "about your organization",
            "about your organisation",
            "about the organization",
            "about the organisation",
            "tell me about your organization",
            "tell me about the organization",
            "mission",
            "your mission",
            "know more about the organization",
            "learn more about the organization",
            "what do you do",
            "who do you help",
            "who are you",
            "hello",
            "hi ",
            "hi!",
            "hey",
            # French
            "qui êtes-vous",
            "qui etes-vous",
            "parlez-moi de votre mission",
            "mission de votre organisme",
            "services offerts",
            "organisation",
            "organisme",
            "bonjour",
            "salut",
            "en savoir plus sur votre organisation",
        ],
        patterns=[
            r"tell me about (the )?(organization|organisation|ngo|charity)",
            r"what do you do",
            r"who are you",
            r"parlez[- ]moi de (votre )?mission",
            r"quelle est votre mission",
        ],
        examples=[
            "What does your organization do?",
            "Tell me more about your mission.",
            "Quelle est la mission de votre organisme ?",
            "I want to know more about the organization",
            "Je veux en savoir plus sur votre organisation",
        ],
    ),
    INTENT_VICTIM_SUPPORT: IntentConfig(
        name=INTENT_VICTIM_SUPPORT,
        keywords=[
            "victim support",
            "im a victim",
            "i'm a victim",
            "i am a victim",
            "i am victim",
            "im a survivor",
            "i'm a survivor",
            "i am a survivor",
            "need help now",
            "need help right away",
            "need to leave",
            "i need help with violence",
            "domestic violence",
            "someone hurt me",
            "abuse support",
            "safe place",
            "safe shelter",
            "support for victims",
            "sexual assault",
            "help my friend escape",
            "help me stay safe",
            # French
            "je suis victime",
            "je viens de vivre de la violence",
            "violence conjugale",
            "violence domestique",
            "violence familiale",
            "j'ai besoin d'aide maintenant",
            "refuge d'urgence",
            "maison d'hébergement",
            "aide pour quitter",
            "protection immédiate",
        ],
        patterns=[
            r"\bhelp (me|us) (leave|stay safe)\b",
            r"\bi (am|feel) (unsafe|in danger)\b",
            r"\bneed (a )?(safe|secure) (place|space)\b",
            r"\bje suis en danger\b",
            r"\bj'ai besoin d'aide de toute urgence\b",
        ],
        examples=[
            "I need help right now, I'm not safe at home.",
            "Is there a shelter or someone who can help me escape abuse?",
            "Je suis victime de violence conjugale, pouvez-vous m'aider?",
            "Je ne me sens pas en sécurité et j'ai besoin d'un endroit où aller.",
            "Can you support a friend who is being abused?",
        ],
    ),
    INTENT_UNCLEAR: IntentConfig(
        name=INTENT_UNCLEAR,
        keywords=[
            "help",
            "aide",
            "i don't know",
            "i dont know",
            "not sure",
            "je ne sais pas",
            "je ne sais plus",
            "idk",
        ],
        patterns=[],
        examples=[
            "help",
            "I need help",
            "Je ne sais pas trop, aidez-moi.",
            "I'm not sure, can you guide me?",
        ],
    ),
    INTENT_EMOTIONAL_DISTRESS: IntentConfig(
        name=INTENT_EMOTIONAL_DISTRESS,
        keywords=[
            "overwhelmed",
            "i feel bad",
            "i feel really bad",
            "i feel weird",
            "lost",
            "hopeless",
            "anxious",
            "scared",
            "burned out",
            "tired of everything",
            # French
            "je me sens mal",
            "je ne vais pas bien",
            "je me sens dépassé",
            "je me sens depasse",
            "je me sens perdu",
            "je me sens bizarre",
        ],
        patterns=[],
        examples=[
            "I don't know what to do anymore.",
            "Je me sens dépassé.",
            "I feel really bad.",
            "Je ne vais pas bien.",
        ],
    ),
}


# Pre-compiled regex patterns for performance
PATTERN_RES: Dict[str, List[re.Pattern]] = {
    name: [re.compile(pat, re.IGNORECASE) for pat in cfg.patterns]
    for name, cfg in INTENT_CONFIGS.items()
}


# ---------------------------------------------------------------------------
# Embedding-based similarity setup
# ---------------------------------------------------------------------------

_intent_example_embeddings: Dict[str, np.ndarray] = {}


def _build_intent_embeddings() -> None:
    """
    Precompute embeddings for all example sentences, grouped by intent.

    _intent_example_embeddings[intent] -> np.ndarray of shape (n_examples, dim)
    """
    global _intent_example_embeddings

    texts: List[str] = []
    owners: List[str] = []

    for name, cfg in INTENT_CONFIGS.items():
        if not cfg.examples:
            continue
        texts.extend(cfg.examples)
        owners.extend([name] * len(cfg.examples))

    if not texts:
        _intent_example_embeddings = {
            name: np.zeros((0, 1), dtype="float32") for name in ALL_INTENTS
        }
        return

    emb = embedding_service.encode(texts)
    mapping: Dict[str, List[np.ndarray]] = {}

    for vec, owner in zip(emb, owners):
        mapping.setdefault(owner, []).append(vec.astype("float32"))

    stored: Dict[str, np.ndarray] = {}
    for name, vecs in mapping.items():
        stored[name] = np.stack(vecs, axis=0) if vecs else np.zeros((0, emb.shape[1]), dtype="float32")

    # Ensure every intent has an entry
    for name in ALL_INTENTS:
        if name not in stored:
            stored[name] = np.zeros((0, emb.shape[1]), dtype="float32")

    _intent_example_embeddings = stored
    logger.info("Built intent example embeddings for %d intents", len(_intent_example_embeddings))


_build_intent_embeddings()


# ---------------------------------------------------------------------------
# Lightweight ML classifier (TF-IDF + Logistic Regression)
# ---------------------------------------------------------------------------

TRAINING_SAMPLES: List[Tuple[str, str]] = [
    # DONATION_HELP
    ("I want to donate", INTENT_DONATION_HELP),
    ("Help me donate online", INTENT_DONATION_HELP),
    ("Comment faire un don", INTENT_DONATION_HELP),
    ("Je veux soutenir financièrement", INTENT_DONATION_HELP),
    ("I would like to support you with a donation", INTENT_DONATION_HELP),
    # AMOUNT_GUIDANCE
    ("How much should I give?", INTENT_AMOUNT_GUIDANCE),
    ("I don't know how much to donate", INTENT_AMOUNT_GUIDANCE),
    ("Quel montant devrais-je donner ?", INTENT_AMOUNT_GUIDANCE),
    ("Explique-moi les montants de dons", INTENT_AMOUNT_GUIDANCE),
    # PATHWAY_EXPLANATION
    ("What are the steps to donate?", INTENT_PATHWAY_EXPLANATION),
    ("How does the donation process work?", INTENT_PATHWAY_EXPLANATION),
    ("Comment ça marche pour faire un don en ligne ?", INTENT_PATHWAY_EXPLANATION),
    ("Explain the online donation process", INTENT_PATHWAY_EXPLANATION),
    # TRANSPARENCY_INQUIRY
    ("Where does my money go?", INTENT_TRANSPARENCY_INQUIRY),
    ("How is my donation used?", INTENT_TRANSPARENCY_INQUIRY),
    ("Puis-je voir vos états financiers ?", INTENT_TRANSPARENCY_INQUIRY),
    ("Quel est l'impact de mon don ?", INTENT_TRANSPARENCY_INQUIRY),
    # GENERAL_INFO
    ("Tell me about your organization", INTENT_GENERAL_INFO),
    ("What do you do?", INTENT_GENERAL_INFO),
    ("Quelle est votre mission ?", INTENT_GENERAL_INFO),
    ("Parlez-moi de vos services", INTENT_GENERAL_INFO),
    ("I want to know more about the organization", INTENT_GENERAL_INFO),
    # VICTIM_SUPPORT
    ("I need help right now because of violence", INTENT_VICTIM_SUPPORT),
    ("Is there a safe shelter for me?", INTENT_VICTIM_SUPPORT),
    ("Je suis victime de violence conjugale, aidez-moi", INTENT_VICTIM_SUPPORT),
    ("My friend needs help escaping abuse", INTENT_VICTIM_SUPPORT),
    ("Je ne suis pas en sécurité chez moi", INTENT_VICTIM_SUPPORT),
    # UNCLEAR
    ("help", INTENT_UNCLEAR),
    ("I need some help", INTENT_UNCLEAR),
    ("aide", INTENT_UNCLEAR),
    ("Je ne sais pas trop, pouvez-vous m'aider ?", INTENT_UNCLEAR),
    # EMOTIONAL_DISTRESS
    ("I don't know what to do anymore", INTENT_EMOTIONAL_DISTRESS),
    ("Je me sens très mal", INTENT_EMOTIONAL_DISTRESS),
    ("I'm feeling really overwhelmed", INTENT_EMOTIONAL_DISTRESS),
    ("Je ne vais pas bien", INTENT_EMOTIONAL_DISTRESS),
]

_vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=1)
_clf = LogisticRegression(max_iter=200)


def _train_classifier() -> None:
    texts = [t for t, _ in TRAINING_SAMPLES]
    labels = [l for _, l in TRAINING_SAMPLES]
    X = _vectorizer.fit_transform(texts)
    _clf.fit(X, labels)
    logger.info("Intent classifier trained on %d samples (%d classes)", len(texts), len(set(labels)))


_train_classifier()


# ---------------------------------------------------------------------------
# Scoring helpers
# ---------------------------------------------------------------------------

def _rule_based_scores(text: str) -> Dict[str, float]:
    """
    Rule-based evidence using keywords and regex patterns.
    Returns scores in [0, 1] per intent.
    """
    scores = {name: 0.0 for name in ALL_INTENTS}
    if not text:
        return scores

    lower = text.lower()

    for name, cfg in INTENT_CONFIGS.items():
        # Keyword hits
        for kw in cfg.keywords:
            if kw.lower() in lower:
                scores[name] += 1.0

        # Regex pattern hits
        for pattern in PATTERN_RES.get(name, []):
            if pattern.search(text):
                scores[name] += 1.5

    # Rough normalization: map typical max (~3+) into 1.0
    for name in scores:
        if scores[name] > 0.0:
            scores[name] = min(1.0, scores[name] / 3.0)

    return scores


def _embedding_scores(text: str) -> Dict[str, float]:
    """
    Semantic similarity evidence via sentence embeddings.
    Returns cosine similarity mapped to [0, 1] per intent.
    """
    scores = {name: 0.0 for name in ALL_INTENTS}
    if not text:
        return scores

    query_emb = embedding_service.encode([text])[0].astype("float32")
    q_norm = float(np.linalg.norm(query_emb)) + 1e-8

    for name, emb_matrix in _intent_example_embeddings.items():
        if emb_matrix.ndim != 2 or emb_matrix.shape[0] == 0:
            continue

        # Cosine similarity for each example of this intent
        denom = np.linalg.norm(emb_matrix, axis=1) * q_norm + 1e-8
        sims = np.dot(emb_matrix, query_emb) / denom  # in [-1,1]
        max_sim = float(np.max(sims))

        # Map [-1,1] -> [0,1]
        scores[name] = max(0.0, min(1.0, (max_sim + 1.0) / 2.0))

    return scores


def _classifier_scores(text: str) -> Dict[str, float]:
    """
    ML classifier probabilities using TF-IDF + Logistic Regression.
    Returns scores in [0,1] per intent.
    """
    scores = {name: 0.0 for name in ALL_INTENTS}
    if not text:
        return scores

    X = _vectorizer.transform([text])
    proba = _clf.predict_proba(X)[0]
    classes = list(_clf.classes_)

    for cls, p in zip(classes, proba):
        scores[cls] = float(p)

    return scores


# ---------------------------------------------------------------------------
# Public detector
# ---------------------------------------------------------------------------

class IntentDetector:
    """
    Combines rule-based, embedding-based and ML-based scores
    into a single intent prediction.
    """

    def predict(
        self,
        text: str,
        language: str,
        emotional_hint: bool = False,
    ) -> Tuple[str, float, Dict]:
        """
        Predict intent for given text and language.

        Args:
            text: raw user message
            language: language code ("en", "fr", ...)
            emotional_hint: if upstream modules detected emotional tone

        Returns:
            (best_intent, confidence, debug_dict)
        """
        # 1) Individual evidence sources
        rule_scores = _rule_based_scores(text)
        emb_scores = _embedding_scores(text)
        clf_scores = _classifier_scores(text)

        # 2) Weighted combination (all scores in [0,1])
        combined: Dict[str, float] = {}
        for name in ALL_INTENTS:
            r = rule_scores.get(name, 0.0)
            e = emb_scores.get(name, 0.0)
            c = clf_scores.get(name, 0.0)

            # Rules are dominant (deterministic behaviour),
            # embeddings and ML act as tie-breakers / soft boosts.
            score = 0.6 * r + 0.25 * e + 0.15 * c
            combined[name] = float(score)

        # 3) If other parts of the system detected emotional language,
        #    bias towards emotional_distress.
        if emotional_hint:
            combined[INTENT_EMOTIONAL_DISTRESS] = max(
                combined.get(INTENT_EMOTIONAL_DISTRESS, 0.0),
                0.7,
            )

        # 4) Choose best intent
        best_intent = max(combined, key=combined.get)
        confidence = combined[best_intent]

        # 5) Fallback to UNCLEAR for low confidence (except emotional_distress)
        LOW_CONF_THRESHOLD = 0.40
        if confidence < LOW_CONF_THRESHOLD and best_intent != INTENT_EMOTIONAL_DISTRESS:
            best_intent = INTENT_UNCLEAR
            confidence = 0.5  # fixed "medium low" confidence

        debug_info = {
            "rule_scores": rule_scores,
            "embedding_scores": emb_scores,
            "classifier_scores": clf_scores,
            "combined_scores": combined,
            "chosen_intent": best_intent,
            "confidence": confidence,
            "language": language,
        }

        return best_intent, confidence, debug_info


# Singleton used by the rest of the app
intent_detector = IntentDetector()
