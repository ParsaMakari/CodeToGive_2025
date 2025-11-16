import time
import uuid
from typing import Dict, Optional


class SessionManager:
    def __init__(self):
        self.sessions: Dict[str, Dict] = {}

    def create_session(self, language: str) -> str:
        sid = uuid.uuid4().hex
        self.sessions[sid] = {
            "created_at": time.time(),
            "language": language,
            "turns": 0,
            "awaiting_support_contact": False,
        }
        return sid

    def touch(self, sid: str, language: Optional[str] = None) -> str:
        if sid not in self.sessions:
            return self.create_session(language or "en")
        sess = self.sessions[sid]
        sess["last_seen"] = time.time()
        sess["turns"] = sess.get("turns", 0) + 1
        if language:
            sess["language"] = language
        return sid

    def get(self, sid: str) -> Optional[Dict]:
        return self.sessions.get(sid)


session_manager = SessionManager()
