from __future__ import annotations

from django.db import models
from django.utils.translation import gettext_lazy as _


class WorkStep(models.Model):
    """Этап работы (шаг плана работ)."""

    title_ru = models.CharField(max_length=255, verbose_name=_("Название (Русский)"))
    title_uz = models.CharField(max_length=255, verbose_name=_("Название (Узбекский)"))
    description_ru = models.TextField(blank=True, verbose_name=_("Описание (Русский)"))
    description_uz = models.TextField(blank=True, verbose_name=_("Описание (Узбекский)"))
    image = models.ImageField(upload_to="workplan/", blank=True, null=True, verbose_name=_("Изображение"))
    order = models.PositiveIntegerField(default=0, verbose_name=_("Порядок"))
    is_active = models.BooleanField(default=True, verbose_name=_("Активен"))

    class Meta:
        ordering = ["order", "id"]
        verbose_name = _("Этап работы")
        verbose_name_plural = _("Этапы работы")
        app_label = "workplan"

    def __str__(self) -> str:
        return self.title_ru


