from __future__ import annotations

from rest_framework import serializers

from .models import PricingPlan


class PricingPlanSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    features = serializers.SerializerMethodField()
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

    def get_title(self, obj):
        return obj.title_ru
    
    def get_features(self, obj):
        return obj.features_ru

    def get_features_list(self, obj: PricingPlan):
        return [f.strip() for f in obj.features_ru.splitlines() if f.strip()]



