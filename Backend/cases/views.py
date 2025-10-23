from __future__ import annotations

from rest_framework import generics

from .models import Case
from .serializers import CaseSerializer


class CaseListAPIView(generics.ListAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer


class CaseRetrieveAPIView(generics.RetrieveAPIView):
    lookup_field = "slug"
    queryset = Case.objects.all()
    serializer_class = CaseSerializer



