from __future__ import annotations

from rest_framework import generics

from .models import FAQ
from .serializers import FAQSerializer


class FAQListAPIView(generics.ListAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer



