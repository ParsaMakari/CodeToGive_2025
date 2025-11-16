import time
from collections import Counter
from typing import Any, Dict


class Metrics:
    def __init__(self) -> None:
        self.started_at = time.time()
        self.total_requests: int = 0
        self.intent_counts: Counter = Counter()
        self.crisis_count: int = 0
        self._last_debug: Dict[str, Any] = {}

    def record_chat(
        self,
        intent: str,
        confidence: float,
        is_crisis: bool,
        extra_debug: Dict[str, Any],
    ) -> None:
        self.total_requests += 1
        if is_crisis:
            self.crisis_count += 1
        else:
            if intent:
                self.intent_counts[intent] += 1
        self._last_debug = extra_debug or {}

    @property
    def last_debug(self) -> Dict[str, Any]:
        return self._last_debug

    def snapshot(self) -> Dict[str, Any]:
        return {
            "started_at": self.started_at,
            "total_requests": self.total_requests,
            "intent_counts": dict(self.intent_counts),
            "crisis_count": self.crisis_count,
        }


metrics = Metrics()
