from __future__ import annotations

from rest_framework import serializers

from .models import CompanyContact, Feedback


class CompanyContactSerializer(serializers.ModelSerializer):
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


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ["name", "email", "phone", "message"]



