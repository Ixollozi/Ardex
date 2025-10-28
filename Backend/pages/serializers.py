from __future__ import annotations

from rest_framework import serializers

from .models import Page


class PageSeoSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    seo_title = serializers.SerializerMethodField()
    meta_description = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = [
            "slug",
            "title",
            "description",
            "seo_title",
            "meta_description",
            "telegram_url",
            "linkedin_url",
            "facebook_url",
            "instagram_url",
        ]

    def _get_lang(self) -> str:
        request = self.context.get("request")
        language = "ru"
        if request:
            accept_language = request.META.get("HTTP_ACCEPT_LANGUAGE", "")
            if "uz" in accept_language.lower():
                language = "uz"
            lang_param = request.query_params.get("lang", "")
            if lang_param in ["ru", "uz"]:
                language = lang_param
        return language

    def get_title(self, obj: Page) -> str:
        language = self._get_lang()
        return obj.title_uz if language == "uz" else obj.title_ru

    def get_description(self, obj: Page) -> str:
        language = self._get_lang()
        return obj.description_uz if language == "uz" else obj.description_ru

    def get_seo_title(self, obj: Page) -> str:
        language = self._get_lang()
        return obj.seo_title_uz if language == "uz" else obj.seo_title_ru

    def get_meta_description(self, obj: Page) -> str:
        language = self._get_lang()
        return obj.meta_description_uz if language == "uz" else obj.meta_description_ru



