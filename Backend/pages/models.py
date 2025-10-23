from __future__ import annotations

from django.db import models


class Page(models.Model):
    slug = models.SlugField(max_length=120, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    seo_title = models.CharField(max_length=255, blank=True)
    meta_description = models.CharField(max_length=300, blank=True)

    class Meta:
        verbose_name = "Page"
        verbose_name_plural = "Pages"

    def __str__(self) -> str:  # pragma: no cover
        return self.slug



