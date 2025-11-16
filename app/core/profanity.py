import re

PROFANITY_WORDS = {
    "fuck",
    "shit",
    "damn",
    "merde",
    "putain",
}

WORD_RE = re.compile(r"\b\w+\b", re.IGNORECASE)


def contains_profanity(text: str) -> bool:
    if not text:
        return False
    lower = text.lower()
    for bad in PROFANITY_WORDS:
        if re.search(rf"\\b{re.escape(bad)}\\b", lower):
            return True
    return False


def mask_profanity(text: str) -> str:
    if not text:
        return text

    def repl(match):
        word = match.group(0)
        lower = word.lower()
        if lower in PROFANITY_WORDS and len(word) > 1:
            return word[0] + "*" * (len(word) - 1)
        return word

    return WORD_RE.sub(repl, text)
