from __future__ import annotations

from modeltranslation.translator import TranslationOptions, register

from .models import Case


@register(Case)
class CaseTR(TranslationOptions):
    fields = ("title", "description")



