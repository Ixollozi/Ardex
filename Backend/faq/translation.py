from __future__ import annotations

from modeltranslation.translator import TranslationOptions, register

from .models import FAQ


@register(FAQ)
class FAQTR(TranslationOptions):
    fields = ("question", "answer", "seo_title", "meta_description")



