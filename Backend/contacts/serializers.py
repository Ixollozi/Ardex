from __future__ import annotations

from rest_framework import serializers

from .models import CompanyContact, Feedback


class CompanyContactSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    
    class Meta:
        model = CompanyContact
        fields = [
            "id",
            "company_name",
            "email",
            "phone",
            "address",
            "telegram",
        ]
    
    def _get_language(self):
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
    
    def get_company_name(self, obj):
        language = self._get_language()
        return obj.company_name_uz if language == "uz" else obj.company_name_ru
    
    def get_address(self, obj):
        language = self._get_language()
        return obj.address_uz if language == "uz" else obj.address_ru


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ["name", "email", "phone", "message"]



