from __future__ import annotations

from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class ServiceSubcategory(models.Model):
    """Подкатегория для услуг"""
    title_ru = models.CharField(max_length=255, verbose_name=_("Название (Русский)"))
    title_uz = models.CharField(max_length=255, verbose_name=_("Название (Узбекский)"))
    description_ru = models.TextField(blank=True, verbose_name=_("Описание (Русский)"))
    description_uz = models.TextField(blank=True, verbose_name=_("Описание (Узбекский)"))
    slug = models.SlugField(max_length=255, unique=True, blank=True, verbose_name=_("URL"))
    order = models.PositiveIntegerField(default=0, verbose_name=_("Порядок"))
    is_active = models.BooleanField(default=True, verbose_name=_("Активна"))

    class Meta:
        ordering = ["order", "id"]
        verbose_name = _("Подкатегория услуги")
        verbose_name_plural = _("Подкатегории услуг")
        app_label = "services"

    def __str__(self) -> str:
        return self.title_ru

    def save(self, *args, **kwargs):
        if not self.slug and self.title_ru:
            base = slugify(self.title_ru)
            slug = base
            idx = 1
            while ServiceSubcategory.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                idx += 1
                slug = f"{base}-{idx}"
            self.slug = slug
        super().save(*args, **kwargs)


class Service(models.Model):
    title_ru = models.CharField(max_length=255, verbose_name=_("Название (Русский)"))
    title_uz = models.CharField(max_length=255, verbose_name=_("Название (Узбекский)"))
    description_ru = models.TextField(blank=True, verbose_name=_("Описание (Русский)"))
    description_uz = models.TextField(blank=True, verbose_name=_("Описание (Узбекский)"))
    icon = models.CharField(max_length=50, verbose_name=_("Иконка"), help_text=_("Название иконки из Lucide React"), default="Settings")
    subcategory = models.ForeignKey(
        ServiceSubcategory, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        verbose_name=_("Подкатегория")
    )
    slug = models.SlugField(max_length=255, unique=True, blank=True, verbose_name=_("URL"))
    order = models.PositiveIntegerField(default=0, verbose_name=_("Порядок"))

    class Meta:
        ordering = ["order", "id"]
        verbose_name = _("Услуга")
        verbose_name_plural = _("Услуги")

    def __str__(self) -> str:
        return self.title_ru

    def save(self, *args, **kwargs):
        if not self.slug and self.title_ru:
            base = slugify(self.title_ru)
            slug = base
            idx = 1
            while Service.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                idx += 1
                slug = f"{base}-{idx}"
            self.slug = slug
        super().save(*args, **kwargs)



