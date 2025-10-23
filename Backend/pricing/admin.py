from __future__ import annotations

from django.contrib import admin

from .models import PricingPlan


@admin.register(PricingPlan)
class PricingPlanAdmin(admin.ModelAdmin):
    list_display = ("title", "price", "order")
    list_editable = ("order",)
    search_fields = ("title", "features")



