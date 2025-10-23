from __future__ import annotations

from rest_framework import serializers

from .models import Case


class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = [
            "id",
            "title",
            "description",
            "image",
            "slug",
            "created_at",
        ]



