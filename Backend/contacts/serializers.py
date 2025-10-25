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
    
    def get_company_name(self, obj):
        return obj.company_name_ru
    
    def get_address(self, obj):
        return obj.address_ru


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ["name", "email", "phone", "message"]



