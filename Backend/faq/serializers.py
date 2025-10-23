from __future__ import annotations

from rest_framework import serializers

from .models import FAQ


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "order", "seo_title", "meta_description"]



