from __future__ import annotations

from django.db import models
from django.utils.translation import gettext_lazy as _


class Page(models.Model):
    PAGE_TYPES = [
        ('home', _('Главная страница')),
        ('services', _('Услуги')),
        ('cases', _('Кейсы')),
    ]
    
    page_type = models.CharField(
        max_length=20,
        choices=PAGE_TYPES,
        default='custom',
        verbose_name=_("Тип страницы"),
        help_text=_("Выберите тип страницы для автоматического заполнения")
    )
    slug = models.SlugField(max_length=120, unique=True, verbose_name=_("URL"))
    title_ru = models.CharField(max_length=255, verbose_name=_("Заголовок (Русский)"))
    title_uz = models.CharField(max_length=255, verbose_name=_("Заголовок (Узбекский)"))
    description_ru = models.TextField(blank=True, verbose_name=_("Описание (Русский)"))
    description_uz = models.TextField(blank=True, verbose_name=_("Описание (Узбекский)"))
    seo_title_ru = models.CharField(max_length=255, blank=True, verbose_name=_("SEO заголовок (Русский)"))
    seo_title_uz = models.CharField(max_length=255, blank=True, verbose_name=_("SEO заголовок (Узбекский)"))
    meta_description_ru = models.CharField(max_length=300, blank=True, verbose_name=_("Meta описание (Русский)"))
    meta_description_uz = models.CharField(max_length=300, blank=True, verbose_name=_("Meta описание (Узбекский)"))
    
    # Social Media Links
    telegram_url = models.URLField(blank=True, verbose_name=_("Telegram URL"))
    linkedin_url = models.URLField(blank=True, verbose_name=_("LinkedIn URL"))
    facebook_url = models.URLField(blank=True, verbose_name=_("Facebook URL"))
    instagram_url = models.URLField(blank=True, verbose_name=_("Instagram URL"))
    
    is_active = models.BooleanField(default=True, verbose_name=_("Активна"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Дата создания"), null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Дата обновления"), null=True, blank=True)

    class Meta:
        verbose_name = _("Страница")
        verbose_name_plural = _("Страницы")
        ordering = ['page_type', 'slug']

    def __str__(self) -> str:
        return f"{self.get_page_type_display()} - {self.slug}"
    
    def save(self, *args, **kwargs):
        # Автоматически заполняем slug на основе типа страницы
        if not self.slug:
            if self.page_type == 'home':
                self.slug = 'home'
            elif self.page_type == 'services':
                self.slug = 'services'
            elif self.page_type == 'cases':
                self.slug = 'cases'
            elif self.page_type == 'pricing':
                self.slug = 'pricing'
            elif self.page_type == 'contact':
                self.slug = 'contact'
            elif self.page_type == 'about':
                self.slug = 'about'
        super().save(*args, **kwargs)



