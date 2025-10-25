from __future__ import annotations

from django.db import models
from django.utils.translation import gettext_lazy as _


class PricingPlan(models.Model):
    title_ru = models.CharField(max_length=255, verbose_name=_("Название (Русский)"))
    title_uz = models.CharField(max_length=255, verbose_name=_("Название (Узбекский)"))
    price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name=_("Цена"))
    features_ru = models.TextField(help_text=_("Одна функция на строку (Русский)"), verbose_name=_("Функции (Русский)"))
    features_uz = models.TextField(help_text=_("Одна функция на строку (Узбекский)"), verbose_name=_("Функции (Узбекский)"))
    order = models.PositiveIntegerField(default=0, verbose_name=_("Порядок"))

    class Meta:
        ordering = ["order", "id"]
        verbose_name = _("Тарифный план")
        verbose_name_plural = _("Тарифные планы")

    def __str__(self) -> str:
        return self.title_ru



