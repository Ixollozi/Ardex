from __future__ import annotations

from rest_framework import serializers

from .models import Service, ServiceSubcategory


class ServiceSubcategorySerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    
    class Meta:
        model = ServiceSubcategory
        fields = [
            "id",
            "title",
            "description",
            "slug",
            "order",
        ]
    
    def get_title(self, obj):
        return obj.title_ru
    
    def get_description(self, obj):
        return obj.description_ru


class ServiceSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    subcategory = ServiceSubcategorySerializer(read_only=True)
    
    class Meta:
        model = Service
        fields = [
            "id",
            "title",
            "description",
            "icon",
            "slug",
            "order",
            "subcategory",
        ]
    
    def get_title(self, obj):
        # Возвращаем русский заголовок по умолчанию
        return obj.title_ru
    
    def get_description(self, obj):
        # Возвращаем русское описание по умолчанию
        return obj.description_ru



