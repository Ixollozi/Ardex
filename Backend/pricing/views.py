from __future__ import annotations

from rest_framework import generics

from .models import PricingPlan
from .serializers import PricingPlanSerializer


class PricingListAPIView(generics.ListAPIView):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer



