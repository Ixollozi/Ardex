from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import WhyUsItem
from .serializers import WhyUsItemSerializer


class WhyUsListAPIView(generics.ListAPIView):
    """
    API для получения списка преимуществ
    """
    queryset = WhyUsItem.objects.filter(is_active=True)
    serializer_class = WhyUsItemSerializer
    permission_classes = [AllowAny]