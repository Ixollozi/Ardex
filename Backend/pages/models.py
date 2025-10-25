from __future__ import annotations

from django.db import models
from django.utils.translation import gettext_lazy as _


class Page(models.Model):
    slug = models.SlugField(max_length=120, unique=True, verbose_name=_("URL"))
    title_ru = models.CharField(max_length=255, verbose_name=_("Заголовок (Русский)"))
    title_uz = models.CharField(max_length=255, verbose_name=_("Заголовок (Узбекский)"))
    description_ru = models.TextField(blank=True, verbose_name=_("Описание (Русский)"))
    description_uz = models.TextField(blank=True, verbose_name=_("Описание (Узбекский)"))
    seo_title_ru = models.CharField(max_length=255, blank=True, verbose_name=_("SEO заголовок (Русский)"))
    seo_title_uz = models.CharField(max_length=255, blank=True, verbose_name=_("SEO заголовок (Узбекский)"))
    meta_description_ru = models.CharField(max_length=300, blank=True, verbose_name=_("Meta описание (Русский)"))
    meta_description_uz = models.CharField(max_length=300, blank=True, verbose_name=_("Meta описание (Узбекский)"))

    class Meta:
        verbose_name = _("Страница")
        verbose_name_plural = _("Страницы")

    def __str__(self) -> str:
        return self.slug



