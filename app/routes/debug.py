from fastapi import APIRouter

from app.core.metrics import metrics
from app.models import DebugResponse

router = APIRouter(tags=["debug"])


@router.get("/debug", response_model=DebugResponse)
async def debug_info() -> DebugResponse:
    return DebugResponse(
        last_intent_analysis=metrics.last_debug,
        metrics=metrics.snapshot(),
    )
