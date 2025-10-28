from __future__ import annotations

from django.contrib import admin
from django.db import models
from django import forms

from .models import Case

# Optional CKEditor widget (fallback to default Textarea if not installed)
try:
    from ckeditor.widgets import CKEditorWidget
except Exception:  # pragma: no cover
    CKEditorWidget = None


@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    list_display = ("title_ru", "title_uz", "slug", "created_at")
    list_display_links = ("title_ru",)
    search_fields = ("title_ru", "title_uz", "description_ru", "description_uz")
    prepopulated_fields = {"slug": ("title_ru",)}
    readonly_fields = ("created_at",)
    list_filter = ("created_at",)
    date_hierarchy = "created_at"
    if CKEditorWidget:
        formfield_overrides = {
            models.TextField: {"widget": CKEditorWidget()},
        }
    fieldsets = (
        ("Русский контент", {
            "fields": ("title_ru", "description_ru")
        }),
        ("Узбекский контент", {
            "fields": ("title_uz", "description_uz")
        }),
        ("Общие настройки", {
            "fields": ("slug", "image")
        }),
        ("Системная информация", {
            "fields": ("created_at",),
            "classes": ("collapse",)
        }),
    )
    list_per_page = 20



