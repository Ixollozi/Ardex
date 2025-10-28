from __future__ import annotations

from django.contrib import admin

from .models import Page


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("page_type", "title_ru", "title_uz", "slug", "is_active")
    list_display_links = ("title_ru",)
    list_filter = ("page_type", "is_active", "created_at")
    search_fields = ("slug", "title_ru", "title_uz", "description_ru", "description_uz", "seo_title_ru", "seo_title_uz")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Тип страницы", {
            "fields": ("page_type", "slug", "is_active"),
            "description": "Выберите тип страницы. Slug заполнится автоматически."
        }),
        ("Русский контент", {
            "fields": ("title_ru", "description_ru", "seo_title_ru", "meta_description_ru")
        }),
        ("Узбекский контент", {
            "fields": ("title_uz", "description_uz", "seo_title_uz", "meta_description_uz")
        }),
        ("Социальные сети", {
            "fields": ("telegram_url", "linkedin_url", "facebook_url", "instagram_url"),
            "description": "Ссылки на социальные сети для отображения в футере"
        }),
        ("Системная информация", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )
    list_per_page = 20
    
    def get_queryset(self, request):
        return super().get_queryset(request).order_by('page_type', 'slug')



