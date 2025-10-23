from __future__ import annotations

from modeltranslation.translator import TranslationOptions, register

from .models import Service


@register(Service)
class ServiceTR(TranslationOptions):
    fields = ("title", "description")



