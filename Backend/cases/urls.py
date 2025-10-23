from __future__ import annotations

from django.urls import path
from . import views

urlpatterns = [
    path("cases/", views.CaseListAPIView.as_view(), name="case-list"),
    path("cases/<slug:slug>/", views.CaseRetrieveAPIView.as_view(), name="case-detail"),
]



