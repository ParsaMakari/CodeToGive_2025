import logging
import re
from typing import Tuple

logger = logging.getLogger(__name__)

CRISIS_PATTERNS = [
    r"\bsuicid(e|al)\b",
    r"\bkill myself\b",
    r"\bwant to die\b",
    r"\bj'en peux plus\b",
    r"\bje veux mourir\b",
    r"\bse faire du mal\b",
    r"\bhurt myself\b",
]

EMOTIONAL_PATTERNS = [
    r"\bi don't know what to do anymore\b",
    r"\bi feel weird\b",
    r"\bi feel overwhelmed\b",
    r"\bi feel lost\b",
    r"\bje me sens mal\b",
    r"\bje ne sais plus quoi faire\b",
]

CRISIS_RE = re.compile("|".join(CRISIS_PATTERNS), re.IGNORECASE)
EMOTIONAL_RE = re.compile("|".join(EMOTIONAL_PATTERNS), re.IGNORECASE)


def detect_crisis(text: str) -> Tuple[bool, str]:
    if not text:
        return False, ""
    if CRISIS_RE.search(text):
        return True, "pattern_match"
    return False, ""


def detect_emotional(text: str) -> bool:
    if not text:
        return False
    return bool(EMOTIONAL_RE.search(text))
