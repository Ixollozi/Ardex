from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import WhyUsItem
from .serializers import WhyUsItemSerializer


class WhyUsListAPIView(generics.ListAPIView):
    """
    API для получения списка преимуществ
    """
    queryset = WhyUsItem.objects.filter(is_active=True).order_by('order', 'created_at')
    serializer_class = WhyUsItemSerializer
    permission_classes = [AllowAny]
    pagination_class = None  # Отключаем пагинацию, чтобы вернуть все элементы
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context