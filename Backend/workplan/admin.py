from __future__ import annotations

from django.contrib import admin
from django.db import models
from django import forms
from django.utils.translation import gettext_lazy as _

from .models import WorkStep


class WorkStepAdmin(admin.ModelAdmin):
    list_display = ("title_ru", "title_uz", "order", "is_active")
    list_display_links = ("title_ru",)
    list_editable = ("order", "is_active")
    search_fields = ("title_ru", "title_uz", "description_ru", "description_uz")
    list_filter = ("order", "is_active")
    fieldsets = (
        ("Русский контент", {
            "fields": ("title_ru", "description_ru")
        }),
        ("Узбекский контент", {
            "fields": ("title_uz", "description_uz")
        }),
        ("Общие настройки", {
            "fields": ("image", "order", "is_active")
        }),
    )
    list_per_page = 20


# Модель регистрируется в core/admin.py в кастомном админ-сайте

