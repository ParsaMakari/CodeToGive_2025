import time
import uuid
from dataclasses import dataclass
from typing import Any, Dict, List


@dataclass
class SupportRequest:
    id: str
    session_id: str
    language: str
    contact: str
    original_message: str
    created_at: float
    metadata: Dict[str, Any]


class SupportRequestQueue:
    def __init__(self) -> None:
        self._queue: List[SupportRequest] = []

    def enqueue(
        self,
        session_id: str,
        language: str,
        contact: str,
        original_message: str,
        metadata: Dict[str, Any],
    ) -> SupportRequest:
        request = SupportRequest(
            id=uuid.uuid4().hex,
            session_id=session_id,
            language=language,
            contact=contact.strip(),
            original_message=original_message.strip(),
            created_at=time.time(),
            metadata=metadata or {},
        )
        self._queue.append(request)
        return request

    def latest(self, limit: int = 25) -> List[SupportRequest]:
        if limit <= 0:
            limit = 1
        return list(self._queue[-limit:])

    def __len__(self) -> int:
        return len(self._queue)


support_queue = SupportRequestQueue()
