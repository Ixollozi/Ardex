from __future__ import annotations

from rest_framework import serializers

from .models import Page


class PageSeoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ["slug", "title", "description", "seo_title", "meta_description"]



