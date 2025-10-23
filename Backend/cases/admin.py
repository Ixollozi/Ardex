from __future__ import annotations

from django.contrib import admin

from .models import Case


@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    list_display = ("title", "client", "year", "slug")
    search_fields = ("title", "client", "description")
    prepopulated_fields = {"slug": ("title",)}



