import logging
import socket
from typing import Iterable, List, Sequence

import numpy as np
from sentence_transformers import SentenceTransformer

from app.config import settings

logger = logging.getLogger(__name__)


class _SimpleEmbeddingModel:
    """
    Lightweight bag-of-words style embedding used when the real model
    cannot be loaded (e.g., offline test environments).
    """

    def __init__(self, dim: int = 256) -> None:
        self.dim = dim

    def encode(
        self,
        texts: Iterable[str],
        convert_to_numpy: bool = True,
        normalize_embeddings: bool = True,
    ):
        vectors: List[np.ndarray] = []
        for text in texts:
            vec = np.zeros(self.dim, dtype="float32")
            if text:
                for token in text.lower().split():
                    idx = hash(token) % self.dim
                    vec[idx] += 1.0
            if normalize_embeddings:
                norm = np.linalg.norm(vec)
                if norm:
                    vec /= norm
            vectors.append(vec)
        return np.stack(vectors, axis=0) if convert_to_numpy else vectors


def _has_network_access(host: str = "huggingface.co", port: int = 443, timeout: float = 1.0) -> bool:
    try:
        with socket.create_connection((host, port), timeout=timeout):
            return True
    except OSError:
        return False


class EmbeddingService:
    def __init__(self, model_name: str) -> None:
        self.model_name = model_name
        self._backend = self._load_model(model_name)

    def _load_model(self, model_name: str):
        logger.info("Loading embedding model: %s", model_name)
        if not _has_network_access():
            logger.warning(
                "Network appears unavailable; using lightweight embeddings for now."
            )
            return _SimpleEmbeddingModel()
        try:
            return SentenceTransformer(model_name)
        except Exception as exc:
            logger.warning(
                "Falling back to simple embeddings because '%s' could not be loaded: %s",
                model_name,
                exc,
            )
            return _SimpleEmbeddingModel()

    def encode(self, texts: Sequence[str]) -> np.ndarray:
        if isinstance(texts, str):
            texts = [texts]
        embeddings = self._backend.encode(
            texts,
            convert_to_numpy=True,
            normalize_embeddings=True,
        )
        return embeddings


embedding_service = EmbeddingService(settings.EMBEDDING_MODEL_NAME)
