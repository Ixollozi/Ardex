from __future__ import annotations

from django.shortcuts import render
from django.http import JsonResponse
from django.views import View


class APIHTMLView(View):
    """HTML страница с документацией API"""
    
    def get(self, request):
        """Отобразить HTML страницу с API документацией"""
        return render(request, 'api_docs.html')
