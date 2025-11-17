import json
import logging
import os
from dataclasses import dataclass
from typing import List, Optional, Tuple

import faiss
import numpy as np

from app.core.embeddings import embedding_service

logger = logging.getLogger(__name__)

KB_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "knowledge_base",
    "knowledge_base.json",
)


@dataclass
class KnowledgeDoc:
    id: str
    title: str
    content_en: str
    content_fr: str
    tags: List[str]


class RAGService:
    def __init__(self) -> None:
        self.docs: List[KnowledgeDoc] = []
        self.index: Optional[faiss.Index] = None
        self._load()

    def _load(self) -> None:
        if not os.path.exists(KB_PATH):
            logger.warning("Knowledge base not found at %s", KB_PATH)
            self.docs = []
            self.index = None
            return
        with open(KB_PATH, "r", encoding="utf-8") as f:
            raw_docs = json.load(f)
        self.docs = [
            KnowledgeDoc(
                id=d["id"],
                title=d["title"],
                content_en=d.get("content_en", ""),
                content_fr=d.get("content_fr", ""),
                tags=d.get("tags", []),
            )
            for d in raw_docs
        ]
        if not self.docs:
            logger.warning("Knowledge base is empty")
            self.index = None
            return
        corpus_texts = [
            f"{doc.title}\n{doc.content_en}\n{doc.content_fr}" for doc in self.docs
        ]
        embeddings = embedding_service.encode(corpus_texts)
        dim = embeddings.shape[1]
        self.index = faiss.IndexFlatIP(dim)
        self.index.add(embeddings.astype("float32"))
        logger.info("RAG index built with %d documents", len(self.docs))

    def query(
        self,
        text: str,
        top_k: int = 3,
        allowed_tags: Optional[List[str]] = None,
    ) -> List[Tuple[KnowledgeDoc, float]]:
        if not text or self.index is None or not self.docs:
            return []
        query_vec = embedding_service.encode([text]).astype("float32")
        scores, indices = self.index.search(query_vec, top_k)
        idxs = indices[0]
        scs = scores[0]
        results: List[Tuple[KnowledgeDoc, float]] = []
        for idx, score in zip(idxs, scs):
            if idx < 0 or idx >= len(self.docs):
                continue
            if score < 0.3:
                continue
            doc = self.docs[idx]
            if allowed_tags:
                if not any(tag in doc.tags for tag in allowed_tags):
                    continue
            results.append((doc, float(score)))
        if not results and allowed_tags:
            # Fallback to curated snippets for the requested domains so we still return helpful context.
            fallback_docs = [
                doc for doc in self.docs if any(tag in doc.tags for tag in allowed_tags)
            ]
            if not fallback_docs:
                fallback_docs = [
                    doc for doc in self.docs if "general_info" in doc.tags
                ]
            for doc in fallback_docs[:top_k]:
                results.append((doc, 0.0))
        return results


rag_service = RAGService()
