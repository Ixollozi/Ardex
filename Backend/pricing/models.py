from __future__ import annotations

from django.db import models


class PricingPlan(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    features = models.TextField(help_text="One feature per line")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Pricing Plan"
        verbose_name_plural = "Pricing Plans"

    def __str__(self) -> str:  # pragma: no cover
        return self.title



