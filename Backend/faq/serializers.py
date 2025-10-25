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
        return obj.question_ru
    
    def get_answer(self, obj):
        return obj.answer_ru



