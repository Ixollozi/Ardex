from __future__ import annotations

from django.db import models


class CompanyContact(models.Model):
    company_name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=255, blank=True)
    telegram = models.CharField(max_length=100, blank=True)

    class Meta:
        verbose_name = "Company Contact"
        verbose_name_plural = "Company Contacts"

    def __str__(self) -> str:  # pragma: no cover
        return self.company_name or "Contacts"


class Feedback(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:  # pragma: no cover
        return f"Feedback from {self.name}"



