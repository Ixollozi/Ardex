from __future__ import annotations

import logging
import requests

from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response

from .models import CompanyContact, Order
from .serializers import CompanyContactSerializer, OrderSerializer


order_logger = logging.getLogger("order")


class CompanyContactRetrieveAPIView(generics.ListAPIView):
    queryset = CompanyContact.objects.all()
    serializer_class = CompanyContactSerializer


class OrderSendAPIView(generics.CreateAPIView):
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            order_logger.error(f"Validation errors: {serializer.errors}, Data: {request.data}")
            return Response(
                {"ok": False, "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            order = Order.objects.create(**serializer.validated_data)
            order_logger.info(f"Order created successfully: {order.id}")
        except Exception as e:
            order_logger.error(f"Error creating order: {e}")
            return Response(
                {"ok": False, "error": "Failed to save order"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Send to Telegram if configured
        sent = False
        token = settings.TELEGRAM_BOT_TOKEN
        chat_id = settings.TELEGRAM_CHAT_ID
        if token and chat_id:
            text = (
                f"Новый заказ:\n"
                f"Имя: {order.name}\n"
                f"Email: {order.email}\n"
                f"Телефон: {order.phone}\n"
                f"Сообщение: {order.message}"
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

        order_logger.info(
            {
                "name": order.name,
                "email": order.email,
                "phone": order.phone,
                "sent_to_telegram": sent,
            }
        )
        return Response({"ok": True, "sent": sent}, status=status.HTTP_201_CREATED)



