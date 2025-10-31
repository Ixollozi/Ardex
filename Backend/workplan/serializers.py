from __future__ import annotations

from rest_framework import serializers
from django.utils.safestring import mark_safe

from .models import WorkStep


class WorkStepSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = WorkStep
        fields = [
            "id",
            "title",
            "description",
            "image",
            "order",
            "is_active",
        ]

    def get_title(self, obj: WorkStep):
        request = self.context.get("request")
        language = "ru"
        if request:
            accept_language = request.META.get("HTTP_ACCEPT_LANGUAGE", "")
            if "uz" in accept_language.lower():
                language = "uz"
            lang_param = request.query_params.get("lang", "")
            if lang_param in ["ru", "uz"]:
                language = lang_param
        return obj.title_uz if language == "uz" else obj.title_ru

    def get_description(self, obj: WorkStep):
        request = self.context.get("request")
        language = "ru"
        if request:
            accept_language = request.META.get("HTTP_ACCEPT_LANGUAGE", "")
            if "uz" in accept_language.lower():
                language = "uz"
            lang_param = request.query_params.get("lang", "")
            if lang_param in ["ru", "uz"]:
                language = lang_param
        content = obj.description_uz if language == "uz" else obj.description_ru
        return mark_safe(content)

    def get_image(self, obj: WorkStep):
        if obj.image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


