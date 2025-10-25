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
        # Возвращаем русский заголовок по умолчанию
        return obj.title_ru

    def get_description(self, obj):
        # Возвращаем русское описание по умолчанию
        return obj.description_ru
