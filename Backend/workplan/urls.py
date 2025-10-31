from __future__ import annotations

from django.urls import path

from .views import WorkStepListAPIView


urlpatterns = [
    path("workplan/", WorkStepListAPIView.as_view(), name="workplan-list"),
]


