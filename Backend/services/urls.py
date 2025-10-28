from __future__ import annotations

from django.urls import path
from . import views

urlpatterns = [
    path("services/", views.ServiceListAPIView.as_view(), name="service-list"),
    path("services/<slug:slug>/", views.ServiceRetrieveAPIView.as_view(), name="service-detail"),
]




