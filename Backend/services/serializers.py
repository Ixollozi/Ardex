from __future__ import annotations

from rest_framework import serializers
from django.utils.safestring import mark_safe

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
        # Получаем язык из контекста запроса
        request = self.context.get('request')
        language = 'ru'  # По умолчанию русский
        
        if request:
            # Проверяем заголовок Accept-Language
            accept_language = request.META.get('HTTP_ACCEPT_LANGUAGE', '')
            if 'uz' in accept_language.lower():
                language = 'uz'
            # Также проверяем параметр в URL
            lang_param = request.query_params.get('lang', '')
            if lang_param in ['ru', 'uz']:
                language = lang_param
        
        if language == 'uz':
            return obj.title_uz
        return obj.title_ru
    
    def get_description(self, obj):
        # Получаем язык из контекста запроса
        request = self.context.get('request')
        language = 'ru'  # По умолчанию русский
        
        if request:
            # Проверяем заголовок Accept-Language
            accept_language = request.META.get('HTTP_ACCEPT_LANGUAGE', '')
            if 'uz' in accept_language.lower():
                language = 'uz'
            # Также проверяем параметр в URL
            lang_param = request.query_params.get('lang', '')
            if lang_param in ['ru', 'uz']:
                language = lang_param
        
        description = obj.description_uz if language == 'uz' else obj.description_ru
        
        # Возвращаем HTML как безопасную строку для отображения на фронтенде
        return mark_safe(description)


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
        # Получаем язык из контекста запроса
        request = self.context.get('request')
        language = 'ru'  # По умолчанию русский
        
        if request:
            # Проверяем заголовок Accept-Language
            accept_language = request.META.get('HTTP_ACCEPT_LANGUAGE', '')
            if 'uz' in accept_language.lower():
                language = 'uz'
            # Также проверяем параметр в URL
            lang_param = request.query_params.get('lang', '')
            if lang_param in ['ru', 'uz']:
                language = lang_param
        
        if language == 'uz':
            return obj.title_uz
        return obj.title_ru
    
    def get_description(self, obj):
        # Получаем язык из контекста запроса
        request = self.context.get('request')
        language = 'ru'  # По умолчанию русский
        
        if request:
            # Проверяем заголовок Accept-Language
            accept_language = request.META.get('HTTP_ACCEPT_LANGUAGE', '')
            if 'uz' in accept_language.lower():
                language = 'uz'
            # Также проверяем параметр в URL
            lang_param = request.query_params.get('lang', '')
            if lang_param in ['ru', 'uz']:
                language = lang_param
        
        description = obj.description_uz if language == 'uz' else obj.description_ru
        
        # Возвращаем HTML как безопасную строку для отображения на фронтенде
        return mark_safe(description)



