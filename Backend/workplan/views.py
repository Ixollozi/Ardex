from __future__ import annotations

from rest_framework import generics

from .models import WorkStep
from .serializers import WorkStepSerializer


class WorkStepListAPIView(generics.ListAPIView):
    queryset = WorkStep.objects.filter(is_active=True)
    serializer_class = WorkStepSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


