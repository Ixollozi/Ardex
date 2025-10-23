from __future__ import annotations

import logging
import requests

from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response

from .models import CompanyContact, Feedback
from .serializers import CompanyContactSerializer, FeedbackSerializer


feedback_logger = logging.getLogger("feedback")


class CompanyContactRetrieveAPIView(generics.ListAPIView):
    queryset = CompanyContact.objects.all()
    serializer_class = CompanyContactSerializer


class FeedbackSendAPIView(generics.CreateAPIView):
    serializer_class = FeedbackSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        feedback = Feedback.objects.create(**serializer.validated_data)

        # Send to Telegram if configured
        sent = False
        token = settings.TELEGRAM_BOT_TOKEN
        chat_id = settings.TELEGRAM_CHAT_ID
        if token and chat_id:
            text = (
                f"New feedback:\n"
                f"Name: {feedback.name}\n"
                f"Email: {feedback.email}\n"
                f"Phone: {feedback.phone}\n"
                f"Message: {feedback.message}"
            )
            try:
                resp = requests.post(
                    f"https://api.telegram.org/bot{token}/sendMessage",
                    json={"chat_id": chat_id, "text": text},
                    timeout=10,
                )
                sent = resp.ok
            except Exception:
                sent = False

        feedback_logger.info(
            {
                "name": feedback.name,
                "email": feedback.email,
                "phone": feedback.phone,
                "sent_to_telegram": sent,
            }
        )
        return Response({"ok": True, "sent": sent}, status=status.HTTP_201_CREATED)



