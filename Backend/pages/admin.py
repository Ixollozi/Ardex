from __future__ import annotations

from django.contrib import admin

from .models import Page


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("slug", "title")
    search_fields = ("slug", "title", "description", "seo_title", "meta_description")
    prepopulated_fields = {"slug": ("title",)}



