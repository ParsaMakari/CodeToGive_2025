import logging

from fastapi import FastAPI

from app.config import settings
from app.logging_conf import setup_logging
from app.middleware import register_middleware
from app.routes import chat, debug, health

setup_logging()
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="Multilingual, safety‑first donor chatbot backend.",
)

register_middleware(app)

app.include_router(health.router)
app.include_router(chat.router)
app.include_router(debug.router)
