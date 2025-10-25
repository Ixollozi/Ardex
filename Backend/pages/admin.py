from __future__ import annotations

from django.contrib import admin

from .models import Page


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("title_ru", "title_uz", "slug")
    list_display_links = ("title_ru",)
    search_fields = ("slug", "title_ru", "title_uz", "description_ru", "description_uz", "seo_title_ru", "seo_title_uz")
    prepopulated_fields = {"slug": ("title_ru",)}
    fieldsets = (
        ("Русский контент", {
            "fields": ("title_ru", "description_ru", "seo_title_ru", "meta_description_ru")
        }),
        ("Узбекский контент", {
            "fields": ("title_uz", "description_uz", "seo_title_uz", "meta_description_uz")
        }),
        ("Общие настройки", {
            "fields": ("slug",)
        }),
    )
    list_per_page = 20



