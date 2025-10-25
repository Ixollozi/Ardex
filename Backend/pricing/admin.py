from __future__ import annotations

from django.contrib import admin

from .models import PricingPlan


@admin.register(PricingPlan)
class PricingPlanAdmin(admin.ModelAdmin):
    list_display = ("title_ru", "title_uz", "price", "order")
    list_display_links = ("title_ru",)
    list_editable = ("order",)
    search_fields = ("title_ru", "title_uz", "features_ru", "features_uz")
    list_filter = ("order",)
    fieldsets = (
        ("Русский контент", {
            "fields": ("title_ru", "features_ru")
        }),
        ("Узбекский контент", {
            "fields": ("title_uz", "features_uz")
        }),
        ("Общие настройки", {
            "fields": ("price", "order")
        }),
    )
    list_per_page = 20



