from __future__ import annotations

from rest_framework import serializers

from .models import PricingPlan


class PricingPlanSerializer(serializers.ModelSerializer):
    features_list = serializers.SerializerMethodField()

    class Meta:
        model = PricingPlan
        fields = [
            "id",
            "title",
            "price",
            "features",
            "features_list",
            "order",
        ]

    def get_features_list(self, obj: PricingPlan):
        return [f.strip() for f in obj.features.splitlines() if f.strip()]



