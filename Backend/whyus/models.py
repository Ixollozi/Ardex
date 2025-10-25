from django.db import models
from django.utils.translation import gettext_lazy as _


class WhyUsItem(models.Model):
    """
    Модель для элементов секции "Почему выбирают нас"
    """
    title_ru = models.CharField(
        max_length=200,
        verbose_name=_('Заголовок (русский)'),
        help_text=_('Заголовок преимущества на русском языке')
    )
    title_uz = models.CharField(
        max_length=200,
        verbose_name=_('Заголовок (узбекский)'),
        help_text=_('Заголовок преимущества на узбекском языке')
    )
    description_ru = models.TextField(
        verbose_name=_('Описание (русский)'),
        help_text=_('Подробное описание преимущества на русском языке')
    )
    description_uz = models.TextField(
        verbose_name=_('Описание (узбекский)'),
        help_text=_('Подробное описание преимущества на узбекском языке')
    )
    icon = models.CharField(
        max_length=50,
        verbose_name=_('Иконка'),
        help_text=_('Название иконки из Lucide React (например: Award, Users, Shield)'),
        default='Award'
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name=_('Порядок сортировки'),
        help_text=_('Порядок отображения элемента (меньше число = выше в списке)')
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=_('Активен'),
        help_text=_('Отображать ли этот элемент на сайте')
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Дата создания')
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_('Дата обновления')
    )

    class Meta:
        verbose_name = _('Преимущество')
        verbose_name_plural = _('Преимущества')
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"{self.title_ru} (порядок: {self.order})"

    def get_title(self, language='ru'):
        """Получить заголовок на указанном языке"""
        if language == 'uz':
            return self.title_uz
        return self.title_ru

    def get_description(self, language='ru'):
        """Получить описание на указанном языке"""
        if language == 'uz':
            return self.description_uz
        return self.description_ru