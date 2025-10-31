from __future__ import annotations

from django.http import JsonResponse
from django.views import View


class APIDocumentationView(View):
    """API Documentation endpoint that lists all available API URLs"""
    
    def get(self, request):
        """Return JSON with all API endpoints"""
        
        # Manual API endpoints (since we know them)
        manual_endpoints = [
            {
                "url": f"{request.scheme}://{request.get_host()}/api/services/",
                "method": "GET",
                "description": "Получить список всех услуг",
                "example_response": "[]"
            },
            {
                "url": f"{request.scheme}://{request.get_host()}/api/services/<slug>/",
                "method": "GET", 
                "description": "Получить детали услуги по slug",
                "example_response": '{"title": "Услуга", "description": "Описание"}'
            },
            {
                "url": f"{request.scheme}://{request.get_host()}/api/faq/",
                "method": "GET",
                "description": "Получить список часто задаваемых вопросов",
                "example_response": "[]"
            },
            {
                "url": f"{request.scheme}://{request.get_host()}/api/workplan/",
                "method": "GET",
                "description": "Получить список этапов работы",
                "example_response": "[]"
            },
            {
                "url": f"{request.scheme}://{request.get_host()}/api/contacts/",
                "method": "GET",
                "description": "Получить контактную информацию компании",
                "example_response": '{"company_name": "Компания", "email": "email@example.com"}'
            },
            {
                "url": f"{request.scheme}://{request.get_host()}/api/contacts/send/",
                "method": "POST",
                "description": "Отправить форму обратной связи",
                "example_response": '{"ok": true, "sent": true}',
                "required_fields": ["name", "message"]
            },
            {
                "url": f"{request.scheme}://{request.get_host()}/api/pages/<slug>/",
                "method": "GET",
                "description": "Получить SEO данные страницы",
                "example_response": '{"title": "Заголовок", "meta_description": "Описание"}'
            }
        ]
        
        # Additional endpoints
        additional_endpoints = [
            {
                "url": f"{request.scheme}://{request.get_host()}/sitemap.xml",
                "method": "GET",
                "description": "XML карта сайта для поисковых систем"
            },
            {
                "url": f"{request.scheme}://{request.get_host()}/robots.txt", 
                "method": "GET",
                "description": "Файл robots.txt для поисковых роботов"
            },
            {
                "url": f"{request.scheme}://{request.get_host()}/admin/",
                "method": "GET",
                "description": "Админ панель Django"
            }
        ]
        
        response_data = {
            "title": "Ardex API Documentation",
            "version": "1.0.0",
            "base_url": f"{request.scheme}://{request.get_host()}",
            "description": "API для корпоративного сайта Ardex",
            "html_docs_url": f"{request.scheme}://{request.get_host()}/api-docs/",
            "endpoints": manual_endpoints,
            "additional_endpoints": additional_endpoints,
            "usage_examples": {
                "get_services": f"curl {request.scheme}://{request.get_host()}/api/services/",
                "get_contact_info": f"curl {request.scheme}://{request.get_host()}/api/contacts/",
                "send_feedback": f"curl -X POST {request.scheme}://{request.get_host()}/api/contacts/send/ -H 'Content-Type: application/json' -d '{{\"name\": \"Имя\", \"message\": \"Сообщение\"}}'"
            },
            "status": "active",
            "last_updated": "2024-01-01"
        }
        
        response = JsonResponse(response_data, json_dumps_params={'indent': 2, 'ensure_ascii': False})
        
        # Добавляем HTTP заголовок с ссылкой на HTML документацию
        response['X-API-Docs-URL'] = f"{request.scheme}://{request.get_host()}/api-docs/"
        response['X-API-Docs-Format'] = "html"
        
        return response
