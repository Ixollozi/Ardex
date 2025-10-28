from __future__ import annotations

from django.urls import path
from . import views

urlpatterns = [
    path("faq/", views.FAQListAPIView.as_view(), name="faq-list"),
]




