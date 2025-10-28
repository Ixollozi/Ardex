from rest_framework import serializers
from .models import WhyUsItem


class WhyUsItemSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = WhyUsItem
        fields = [
            'id',
            'title',
            'description',
            'icon',
            'order',
            'is_active',
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
        
        return obj.get_title(language)

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
        
        return obj.get_description(language)
