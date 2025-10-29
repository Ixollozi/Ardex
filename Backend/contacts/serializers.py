from __future__ import annotations

from rest_framework import serializers

from .models import CompanyContact, Order


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


class OrderSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=False, allow_blank=True, max_length=254)
    phone = serializers.CharField(required=True, allow_blank=False, max_length=50)
    
    class Meta:
        model = Order
        fields = ["name", "email", "phone", "message"]
    
    def validate(self, attrs):
        """Очистка и обязательность телефона."""
        # Стриппинг
        if 'name' in attrs and isinstance(attrs['name'], str):
            attrs['name'] = attrs['name'].strip()
        if 'email' in attrs and isinstance(attrs['email'], str):
            attrs['email'] = attrs['email'].strip()
        if 'phone' in attrs and isinstance(attrs['phone'], str):
            attrs['phone'] = attrs['phone'].strip()
        if 'message' in attrs and isinstance(attrs['message'], str):
            attrs['message'] = attrs['message'].strip()
        
        # Телефон обязателен
        phone = attrs.get('phone')
        if not phone:
            raise serializers.ValidationError({"phone": "Телефон обязателен"})
        return attrs



