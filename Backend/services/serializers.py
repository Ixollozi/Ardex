from __future__ import annotations

from rest_framework import serializers

from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    
    class Meta:
        model = Service
        fields = [
            "id",
            "title",
            "description",
            "icon",
            "slug",
            "order",
        ]
    
    def get_title(self, obj):
        # Возвращаем русский заголовок по умолчанию
        return obj.title_ru
    
    def get_description(self, obj):
        # Возвращаем русское описание по умолчанию
        return obj.description_ru



