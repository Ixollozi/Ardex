from __future__ import annotations

from django.db import models
from django.utils.text import slugify


class Service(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to="services/", blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    seo_title = models.CharField(max_length=255, blank=True)
    meta_description = models.CharField(max_length=300, blank=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:  # pragma: no cover - admin/debug aid only
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug and self.title:
            base = slugify(self.title)
            slug = base
            idx = 1
            while Service.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                idx += 1
                slug = f"{base}-{idx}"
            self.slug = slug
        super().save(*args, **kwargs)



