from __future__ import annotations

from rest_framework import generics, status
from rest_framework.response import Response

from .models import Page
from .serializers import PageSeoSerializer


class PageSeoRetrieveAPIView(generics.RetrieveAPIView):
    lookup_field = "slug"
    queryset = Page.objects.filter(is_active=True)
    serializer_class = PageSeoSerializer
    
    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Exception:
            # Если страница не найдена, возвращаем пустой ответ вместо 404
            return Response(None, status=status.HTTP_200_OK)



