from __future__ import annotations

from django.contrib import admin
from django.db import models
from django import forms
from django.contrib.admin import AdminSite
from django.utils.translation import gettext_lazy as _

from .models import Service, ServiceSubcategory

# Optional CKEditor widget (fallback to default Textarea if not installed)
try:
    from ckeditor.widgets import CKEditorWidget  # pyright: ignore[reportMissingImports]
    CKEDITOR_AVAILABLE = True
except ImportError:
    CKEditorWidget = None
    CKEDITOR_AVAILABLE = False


class ServiceSubcategoryAdmin(admin.ModelAdmin):
    list_display = ("title_ru", "title_uz", "slug", "order", "is_active")
    list_display_links = ("title_ru",)
    list_editable = ("order", "is_active")
    search_fields = ("title_ru", "title_uz", "description_ru", "description_uz", "slug")
    list_filter = ("order", "is_active")
    prepopulated_fields = {"slug": ("title_ru",)}
    fieldsets = (
        ("Русский контент", {
            "fields": ("title_ru", "description_ru")
        }),
        ("Узбекский контент", {
            "fields": ("title_uz", "description_uz")
        }),
        ("Общие настройки", {
            "fields": ("slug", "order", "is_active")
        }),
    )
    list_per_page = 20
    
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        
        # Use CKEditor if available
        if CKEDITOR_AVAILABLE and CKEditorWidget:
            for field_name in ['description_ru', 'description_uz']:
                if field_name in form.base_fields:
                    form.base_fields[field_name].widget = CKEditorWidget()
        
        return form


class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title_ru", "title_uz", "subcategory", "slug", "order")
    list_display_links = ("title_ru",)
    list_editable = ("order",)
    search_fields = ("title_ru", "title_uz", "description_ru", "description_uz", "slug")
    list_filter = ("order", "subcategory")
    prepopulated_fields = {"slug": ("title_ru",)}
    fieldsets = (
        ("Русский контент", {
            "fields": ("title_ru", "description_ru")
        }),
        ("Узбекский контент", {
            "fields": ("title_uz", "description_uz")
        }),
        ("Общие настройки", {
            "fields": ("subcategory", "slug", "image", "order")
        }),
    )
    list_per_page = 20
    
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        
        # Use CKEditor if available
        if CKEDITOR_AVAILABLE and CKEditorWidget:
            for field_name in ['description_ru', 'description_uz']:
                if field_name in form.base_fields:
                    form.base_fields[field_name].widget = CKEditorWidget()
        
        return form


# Модели регистрируются в core/admin.py в кастомном админ-сайте