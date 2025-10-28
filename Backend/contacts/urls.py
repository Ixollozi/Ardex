from __future__ import annotations

from django.urls import path
from . import views

urlpatterns = [
    path("contacts/", views.CompanyContactRetrieveAPIView.as_view(), name="contacts"),
    path("contacts/send/", views.FeedbackSendAPIView.as_view(), name="contacts-send"),
]




