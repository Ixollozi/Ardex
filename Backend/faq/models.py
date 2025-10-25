from __future__ import annotations

from django.db import models
from django.utils.translation import gettext_lazy as _


class FAQ(models.Model):
    question_ru = models.CharField(max_length=255, verbose_name=_("Вопрос (Русский)"))
    question_uz = models.CharField(max_length=255, verbose_name=_("Вопрос (Узбекский)"))
    answer_ru = models.TextField(verbose_name=_("Ответ (Русский)"))
    answer_uz = models.TextField(verbose_name=_("Ответ (Узбекский)"))
    order = models.PositiveIntegerField(default=0, verbose_name=_("Порядок"))

    class Meta:
        ordering = ["order", "id"]
        verbose_name = _("Часто задаваемый вопрос")
        verbose_name_plural = _("Часто задаваемые вопросы")

    def __str__(self) -> str:
        return self.question_ru



