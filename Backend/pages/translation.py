from __future__ import annotations

from modeltranslation.translator import TranslationOptions, register

from .models import Page


@register(Page)
class PageTR(TranslationOptions):
    fields = ("title", "description", "seo_title", "meta_description")



