from __future__ import annotations

from rest_framework import serializers

from .models import Case


class CaseSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    
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
    
    def get_title(self, obj):
        return obj.title_ru
    
    def get_description(self, obj):
        return obj.description_ru



