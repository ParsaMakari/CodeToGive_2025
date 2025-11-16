from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field("", description="User message")
    language: Optional[str] = Field(
        None, description="Preferred language code, e.g. 'en' or 'fr'"
    )
    session_id: Optional[str] = Field(
        None, description="Optional session identifier for conversation context"
    )


class ChatResponse(BaseModel):
    response: str
    suggestions: List[str]
    intent: str
    confidence: float
    session_id: str
    language: str


class HealthResponse(BaseModel):
    status: str
    version: str
    uptime_seconds: float


class DebugResponse(BaseModel):
    last_intent_analysis: Dict[str, Any] = Field(default_factory=dict)
    metrics: Dict[str, Any] = Field(default_factory=dict)
