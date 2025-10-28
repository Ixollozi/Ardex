from __future__ import annotations

from django.urls import path
from . import views

urlpatterns = [
    path("pages/<slug:slug>/", views.PageSeoRetrieveAPIView.as_view(), name="page-seo"),
]




