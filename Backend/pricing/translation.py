from __future__ import annotations

from modeltranslation.translator import TranslationOptions, register

from .models import PricingPlan


@register(PricingPlan)
class PricingPlanTR(TranslationOptions):
    fields = ("title", "features")



