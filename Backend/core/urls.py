from __future__ import annotations

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from django.http import HttpResponse
import requests

from pages.sitemaps import StaticPagesSitemap
from core.api_docs import APIDocumentationView
from core.api_html_view import APIHTMLView

router = DefaultRouter()

urlpatterns = [
    path("admin", admin.site.urls),
    path("api-docs/", APIHTMLView.as_view(), name="api-docs-html"),
    path("api/", APIDocumentationView.as_view(), name="api-docs"),
    path("api/", include("services.urls")),
    path("api/", include("cases.urls")),
    path("api/", include("pricing.urls")),
    path("api/", include("faq.urls")),
    path("api/", include("contacts.urls")),
    path("api/", include("pages.urls")),
    re_path(r"^sitemap\.xml$", sitemap, {"sitemaps": {"pages": StaticPagesSitemap}}, name="sitemap"),
    path("robots.txt", TemplateView.as_view(template_name="robots.txt", content_type="text/plain")),
]

# Proxy frontend in development
if settings.DEBUG:
    def proxy_frontend(request, path=""):
        """Proxy requests to Next.js dev server"""
        try:
            frontend_url = f"{settings.FRONTEND_DEV_SERVER}/{path}"
            if request.GET:
                frontend_url += "?" + request.GET.urlencode()
            
            response = requests.get(
                frontend_url,
                headers={
                    "User-Agent": request.META.get("HTTP_USER_AGENT", ""),
                    "Accept": request.META.get("HTTP_ACCEPT", "*/*"),
                },
                timeout=10
            )
            
            django_response = HttpResponse(
                response.content,
                status=response.status_code,
                content_type=response.headers.get("content-type", "text/html")
            )
            
            # Copy important headers
            for header in ["Cache-Control", "Content-Type", "Content-Encoding"]:
                if header in response.headers:
                    django_response[header] = response.headers[header]
            
            return django_response
        except requests.RequestException:
            return HttpResponse(
                "Frontend development server is not running. Please start it with 'npm run dev'",
                status=503
            )
    
    def proxy_nextjs_static(request, path=""):
        """Proxy Next.js static files"""
        try:
            frontend_url = f"{settings.FRONTEND_DEV_SERVER}/_next/{path}"
            if request.GET:
                frontend_url += "?" + request.GET.urlencode()
            
            response = requests.get(
                frontend_url,
                headers={
                    "User-Agent": request.META.get("HTTP_USER_AGENT", ""),
                    "Accept": request.META.get("HTTP_ACCEPT", "*/*"),
                },
                timeout=10
            )
            
            django_response = HttpResponse(
                response.content,
                status=response.status_code,
                content_type=response.headers.get("content-type", "application/octet-stream")
            )
            
            # Copy important headers for static files
            for header in ["Cache-Control", "Content-Type", "Content-Encoding", "ETag"]:
                if header in response.headers:
                    django_response[header] = response.headers[header]
            
            return django_response
        except requests.RequestException:
            return HttpResponse("Static file not found", status=404)
    
    # Next.js static files
    urlpatterns += [
        re_path(r"^_next/(?P<path>.*)$", proxy_nextjs_static),
    ]
    
    # Catch-all for frontend routes (must be last)
    urlpatterns += [
        re_path(r"^(?!api/|admin/|sitemap\.xml|robots\.txt|static/|media/|_next/).*$", proxy_frontend),
    ]
    
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


