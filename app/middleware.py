import logging
import time
from uuid import uuid4

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.cors import CORSMiddleware

logger = logging.getLogger(__name__)


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start = time.time()
        response = None
        try:
            response = await call_next(request)
            return response
        finally:
            process_time = (time.time() - start) * 1000.0
            status_code = response.status_code if response else 500
            logger.info(
                "HTTP %s %s -> %s (%.2f ms)",
                request.method,
                request.url.path,
                status_code,
                process_time,
            )


def register_middleware(app: FastAPI) -> None:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(RequestLoggingMiddleware)

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        error_id = str(uuid4())
        logger.warning("Validation error %s: %s", error_id, exc)
        return JSONResponse(
            status_code=422,
            content={"detail": "Invalid request payload.", "error_id": error_id},
        )

    @app.exception_handler(Exception)
    async def general_exception_handler(request: Request, exc: Exception):
        error_id = str(uuid4())
        logger.exception("Unhandled error %s", error_id, exc_info=exc)
        return JSONResponse(
            status_code=500,
            content={"detail": "Unexpected server error.", "error_id": error_id},
        )
