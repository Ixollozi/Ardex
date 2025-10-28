from __future__ import annotations

from django.db import models
from django.utils.text import slugify
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
# from ckeditor_uploader.fields import RichTextUploadingField


class Case(models.Model):
    title_ru = models.CharField(max_length=255, verbose_name=_("Название (Русский)"))
    title_uz = models.CharField(max_length=255, verbose_name=_("Название (Узбекский)"))
    description_ru = models.TextField(blank=True, verbose_name=_("Описание (Русский)"))
    description_uz = models.TextField(blank=True, verbose_name=_("Описание (Узбекский)"))
    image = models.ImageField(upload_to="cases/", blank=True, null=True, verbose_name=_("Изображение"))
    slug = models.SlugField(max_length=255, unique=True, blank=True, verbose_name=_("URL"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Дата создания"))

    class Meta:
        ordering = ["-created_at"]
        verbose_name = _("Кейс")
        verbose_name_plural = _("Кейсы")

    def __str__(self) -> str:
        return self.title_ru

    def save(self, *args, **kwargs):
        if not self.slug and self.title_ru:
            base = slugify(self.title_ru)
            slug = base
            idx = 1
            while Case.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                idx += 1
                slug = f"{base}-{idx}"
            self.slug = slug
        super().save(*args, **kwargs)



