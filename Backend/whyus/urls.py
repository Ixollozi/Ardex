from django.urls import path
from .views import WhyUsListAPIView

app_name = 'whyus'

urlpatterns = [
    path('', WhyUsListAPIView.as_view(), name='whyus-list'),
]
