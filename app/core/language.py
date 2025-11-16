import json
import logging
import os
from functools import lru_cache
from typing import Any, Dict, Optional

from langdetect import LangDetectException, detect

from app.config import settings

logger = logging.getLogger(__name__)

I18N_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "i18n")


def detect_language(text: str) -> str:
    try:
        code = detect(text)
        code = code.split("-")[0]
        if code in settings.ALLOWED_LANGUAGES:
            return code
    except LangDetectException:
        logger.debug("Language detection failed, defaulting to %s", settings.DEFAULT_LANGUAGE)
    return settings.DEFAULT_LANGUAGE


def resolve_language(
    explicit: Optional[str],
    detected: str,
    user_profile_lang: Optional[str] = None,
) -> str:
    for candidate in (explicit, user_profile_lang, detected, settings.DEFAULT_LANGUAGE):
        if candidate and candidate in settings.ALLOWED_LANGUAGES:
            return candidate
    return settings.DEFAULT_LANGUAGE


@lru_cache(maxsize=8)
def load_language_pack(lang: str) -> Dict[str, Any]:
    path = os.path.join(I18N_DIR, f"{lang}.json")
    if not os.path.exists(path):
        if lang != settings.DEFAULT_LANGUAGE:
            logger.warning(
                "Language pack %s not found, falling back to %s",
                lang,
                settings.DEFAULT_LANGUAGE,
            )
            return load_language_pack(settings.DEFAULT_LANGUAGE)
        raise FileNotFoundError(f"Language pack {lang} missing at {path}")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _get_from_dict(data: Dict[str, Any], key: str) -> Any:
    parts = key.split(".")
    cur: Any = data
    for p in parts:
        if isinstance(cur, dict) and p in cur:
            cur = cur[p]
        else:
            raise KeyError(key)
    return cur


def translate(lang: str, key: str, default: Optional[Any] = None) -> Any:
    try:
        pack = load_language_pack(lang)
        return _get_from_dict(pack, key)
    except Exception:
        if lang != settings.DEFAULT_LANGUAGE:
            try:
                pack = load_language_pack(settings.DEFAULT_LANGUAGE)
                return _get_from_dict(pack, key)
            except Exception:
                pass
    return default if default is not None else key
