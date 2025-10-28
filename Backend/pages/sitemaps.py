from __future__ import annotations

from django.contrib.sitemaps import Sitemap
from django.urls import reverse


class StaticPagesSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.6

    def items(self):  # noqa: D401 - simple list
        return ["admin:index"]

    def location(self, item):
        return reverse(item)




