from __future__ import annotations

from rest_framework import generics

from .models import Service
from .serializers import ServiceSerializer


class ServiceListAPIView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    
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



