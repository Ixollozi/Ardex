from __future__ import annotations

from django.urls import path
from . import views

urlpatterns = [
    path("pricing/", views.PricingListAPIView.as_view(), name="pricing-list"),
]



