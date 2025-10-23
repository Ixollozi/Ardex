from __future__ import annotations

from rest_framework import serializers

from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            "id",
            "title",
            "description",
            "icon",
            "image",
            "slug",
            "order",
            "seo_title",
            "meta_description",
        ]



