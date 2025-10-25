from __future__ import annotations

from django.contrib import admin

from .models import FAQ


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question_ru", "question_uz", "order")
    list_display_links = ("question_ru",)
    list_editable = ("order",)
    search_fields = ("question_ru", "question_uz", "answer_ru", "answer_uz")
    list_filter = ("order",)
    fieldsets = (
        ("Русский контент", {
            "fields": ("question_ru", "answer_ru")
        }),
        ("Узбекский контент", {
            "fields": ("question_uz", "answer_uz")
        }),
        ("Настройки", {
            "fields": ("order",)
        }),
    )
    list_per_page = 20



