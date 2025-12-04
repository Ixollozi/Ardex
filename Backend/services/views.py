from __future__ import annotations

from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Service
from .serializers import ServiceSerializer


class ConditionalPagination(PageNumberPagination):
    """Пагинация, которая включается только при наличии параметра page"""
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 100


class ServiceListAPIView(generics.ListAPIView):
    queryset = Service.objects.all().order_by('order', 'id')
    serializer_class = ServiceSerializer
    pagination_class = ConditionalPagination
    
    def list(self, request, *args, **kwargs):
        # Если есть параметр page, используем пагинацию
        if 'page' in request.query_params:
            return super().list(request, *args, **kwargs)
        # Иначе возвращаем все элементы без пагинации
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class ServiceRetrieveAPIView(generics.RetrieveAPIView):
    lookup_field = "slug"
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context



