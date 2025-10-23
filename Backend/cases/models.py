from __future__ import annotations

from django.db import models
from django.utils.text import slugify


class Case(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="cases/", blank=True, null=True)
    client = models.CharField(max_length=255, blank=True)
    year = models.PositiveIntegerField(blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    seo_title = models.CharField(max_length=255, blank=True)
    meta_description = models.CharField(max_length=300, blank=True)

    class Meta:
        ordering = ["-year", "id"]

    def __str__(self) -> str:  # pragma: no cover
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug and self.title:
            base = slugify(self.title)
            slug = base
            idx = 1
            while Case.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                idx += 1
                slug = f"{base}-{idx}"
            self.slug = slug
        super().save(*args, **kwargs)



