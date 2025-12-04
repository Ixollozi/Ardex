from __future__ import annotations

from rest_framework import generics

from .models import FAQ
from .serializers import FAQSerializer


class FAQListAPIView(generics.ListAPIView):
    queryset = FAQ.objects.all().order_by('order', 'id')
    serializer_class = FAQSerializer
    pagination_class = None  # Отключаем пагинацию для FAQ
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context



