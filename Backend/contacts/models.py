from __future__ import annotations

from django.db import models
from django.utils.translation import gettext_lazy as _


class CompanyContact(models.Model):
    company_name_ru = models.CharField(max_length=255, blank=True, verbose_name=_("Название компании (Русский)"))
    company_name_uz = models.CharField(max_length=255, blank=True, verbose_name=_("Название компании (Узбекский)"))
    email = models.EmailField(blank=True, verbose_name=_("Email"))
    phone = models.CharField(max_length=50, blank=True, verbose_name=_("Телефон"))
    address_ru = models.CharField(max_length=255, blank=True, verbose_name=_("Адрес (Русский)"))
    address_uz = models.CharField(max_length=255, blank=True, verbose_name=_("Адрес (Узбекский)"))
    telegram = models.CharField(max_length=100, blank=True, verbose_name=_("Telegram"))

    class Meta:
        verbose_name = _("Контакт компании")
        verbose_name_plural = _("Контакты компании")

    def __str__(self) -> str:
        return self.company_name_ru or "Contacts"


class Order(models.Model):
    name = models.CharField(max_length=120, verbose_name=_("Имя"))
    email = models.CharField(max_length=254, blank=True, verbose_name=_("Email"))
    phone = models.CharField(max_length=50, blank=True, verbose_name=_("Телефон"))
    message = models.TextField(verbose_name=_("Сообщение"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Дата создания"))

    class Meta:
        ordering = ["-created_at"]
        verbose_name = _("Заказ")
        verbose_name_plural = _("Заказы")

    def __str__(self) -> str:
        return f"Order from {self.name}"



