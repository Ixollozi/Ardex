from __future__ import annotations

from rest_framework import serializers

from .models import FAQ


class FAQSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField()
    answer = serializers.SerializerMethodField()
    
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "order"]
    
    def get_question(self, obj):
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
        
        return obj.question_uz if language == 'uz' else obj.question_ru
    
    def get_answer(self, obj):
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
        
        return obj.answer_uz if language == 'uz' else obj.answer_ru



