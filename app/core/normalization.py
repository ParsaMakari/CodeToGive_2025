import re
from typing import Tuple

WHITESPACE_RE = re.compile(r"\s+")


def normalize_text(text: str, max_length: int) -> Tuple[str, bool]:
    if text is None:
        return "", False
    cleaned = text.replace("\r\n", "\n").replace("\r", "\n").strip()
    cleaned = WHITESPACE_RE.sub(" ", cleaned)
    truncated = False
    if len(cleaned) > max_length:
        cleaned = cleaned[:max_length]
        truncated = True
    return cleaned, truncated


def is_empty(text: str) -> bool:
    return text is None or text.strip() == ""
