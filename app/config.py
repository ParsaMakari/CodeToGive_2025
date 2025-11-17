import os
from dataclasses import dataclass
from typing import List


@dataclass
class Settings:
    APP_NAME: str = "Athena Donor Chatbot"
    DEBUG: bool = bool(int(os.getenv("DEBUG", "1")))
    VERSION: str = "1.0.0"
    EMBEDDING_MODEL_NAME: str = os.getenv(
        "EMBEDDING_MODEL_NAME",
        "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2",
    )
    MAX_MESSAGE_LENGTH: int = int(os.getenv("MAX_MESSAGE_LENGTH", "1000"))
    DEFAULT_LANGUAGE: str = os.getenv("DEFAULT_LANGUAGE", "en")
    ALLOWED_LANGS_ENV: str = os.getenv("ALLOWED_LANGUAGES", "en,fr")
    ALLOWED_LANGUAGES: List[str] = None
    CRISIS_HOTLINE: str = os.getenv(
        "CRISIS_HOTLINE",
        "your local emergency services or a trusted crisis hotline",
    )
    SUPPORT_EMAIL: str = os.getenv("SUPPORT_EMAIL", "support@example.org")

    def __post_init__(self) -> None:
        if self.ALLOWED_LANGUAGES is None:
            self.ALLOWED_LANGUAGES = [
                lang.strip()
                for lang in self.ALLOWED_LANGS_ENV.split(",")
                if lang.strip()
            ]


settings = Settings()
