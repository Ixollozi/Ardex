from __future__ import annotations

from django.contrib import admin

from .models import CompanyContact, Order


@admin.register(CompanyContact)
class CompanyContactAdmin(admin.ModelAdmin):
    list_display = ("company_name_ru", "company_name_uz", "email", "phone", "telegram")
    list_display_links = ("company_name_ru",)
    search_fields = ("company_name_ru", "company_name_uz", "email", "phone", "address_ru", "address_uz", "telegram")
    fieldsets = (
        ("Русский контент", {
            "fields": ("company_name_ru", "address_ru")
        }),
        ("Узбекский контент", {
            "fields": ("company_name_uz", "address_uz")
        }),
        ("Контактная информация", {
            "fields": ("email", "phone", "telegram")
        }),
    )
    list_per_page = 20


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "created_at")
    list_display_links = ("name",)
    readonly_fields = ("name", "email", "phone", "message", "created_at")
    search_fields = ("name", "email", "phone", "message")
    list_filter = ("created_at",)
    date_hierarchy = "created_at"
    fieldsets = (
        ("Информация о клиенте", {
            "fields": ("name", "email", "phone")
        }),
        ("Сообщение", {
            "fields": ("message",)
        }),
        ("Системная информация", {
            "fields": ("created_at",),
            "classes": ("collapse",)
        }),
    )
    list_per_page = 20



