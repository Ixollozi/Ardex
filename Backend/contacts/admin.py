from __future__ import annotations

from django.contrib import admin

from .models import CompanyContact, Feedback


@admin.register(CompanyContact)
class CompanyContactAdmin(admin.ModelAdmin):
    list_display = ("company_name", "email", "phone")
    search_fields = ("company_name", "email", "phone", "address")


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "created_at")
    readonly_fields = ("name", "email", "phone", "message", "created_at")
    search_fields = ("name", "email", "phone", "message")



