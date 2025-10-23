from __future__ import annotations

import json
import logging
from typing import Callable

from django.http import HttpRequest, HttpResponse


api_logger = logging.getLogger("api")


class APILoggingMiddleware:
    def __init__(self, get_response: Callable[[HttpRequest], HttpResponse]):
        self.get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:
        response = self.get_response(request)
        try:
            if request.path.startswith("/api/"):
                api_logger.info(
                    json.dumps(
                        {
                            "method": request.method,
                            "path": request.path,
                            "status": response.status_code,
                            "ip": request.META.get("REMOTE_ADDR"),
                        }
                    )
                )
        except Exception:  # best-effort logging only
            pass
        return response



