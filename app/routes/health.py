import time

from fastapi import APIRouter

from app.config import settings
from app.core.metrics import metrics
from app.models import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    uptime = time.time() - metrics.started_at
    return HealthResponse(status="ok", version=settings.VERSION, uptime_seconds=uptime)
