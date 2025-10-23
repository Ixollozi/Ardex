from __future__ import annotations

from rest_framework import generics

from .models import Page
from .serializers import PageSeoSerializer


class PageSeoRetrieveAPIView(generics.RetrieveAPIView):
    lookup_field = "slug"
    queryset = Page.objects.all()
    serializer_class = PageSeoSerializer



