from __future__ import annotations

from django.contrib import admin

from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "order")
    list_editable = ("order",)
    search_fields = ("title", "description", "slug")
    list_filter = ()
    prepopulated_fields = {"slug": ("title",)}



