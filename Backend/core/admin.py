from django.contrib import admin
from django.contrib.admin import AdminSite
from django.utils.html import format_html
from django.urls import path
from django.shortcuts import render
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

from contacts.models import Order
from services.models import Service
from faq.models import FAQ
from pages.models import Page


class CustomAdminSite(AdminSite):
    site_header = "Ardex Админ Панель"
    site_title = "Ardex Админ"
    index_title = "Добро пожаловать в админ панель Ardex"
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('dashboard/', self.admin_view(self.dashboard_view), name='dashboard'),
        ]
        return custom_urls + urls
    
    def dashboard_view(self, request):
        # Статистика за последние 30 дней
        thirty_days_ago = timezone.now() - timedelta(days=30)
        
        # Количество новых заказов за последние 30 дней
        recent_orders = Order.objects.filter(created_at__gte=thirty_days_ago).count()
        
        # Общее количество записей
        total_services = Service.objects.count()
        total_faq = FAQ.objects.count()
        total_orders = Order.objects.count()
        total_whyus = WhyUsItem.objects.count()
        
        # Последние заказы
        latest_orders = Order.objects.select_related().order_by('-created_at')[:5]
        
        context = {
            'title': 'Панель управления',
            'recent_orders': recent_orders,
            'total_services': total_services,
            'total_faq': total_faq,
            'total_orders': total_orders,
            'total_whyus': total_whyus,
            'latest_orders': latest_orders,
        }
        
        return render(request, 'admin/dashboard.html', context)
    
    def index(self, request, extra_context=None):
        # Получаем стандартный контекст
        extra_context = extra_context or {}
        
        # Добавляем статистику
        thirty_days_ago = timezone.now() - timedelta(days=30)
        recent_orders = Order.objects.filter(created_at__gte=thirty_days_ago).count()
        
        extra_context.update({
            'recent_orders': recent_orders,
            'total_services': Service.objects.count(),
            'total_orders': Order.objects.count(),
            'total_whyus': WhyUsItem.objects.count(),
        })
        
        return super().index(request, extra_context)


# Создаем кастомный админ сайт
admin_site = CustomAdminSite(name='ardex_admin')

# Регистрируем модели в кастомном админ сайте
from contacts.models import CompanyContact, Order
from services.models import Service, ServiceSubcategory
from faq.models import FAQ
from pages.models import Page
from whyus.models import WhyUsItem
from workplan.models import WorkStep

# Импортируем админ классы
from contacts.admin import CompanyContactAdmin, OrderAdmin
from services.admin import ServiceAdmin, ServiceSubcategoryAdmin
from faq.admin import FAQAdmin
from pages.admin import PageAdmin
from whyus.admin import WhyUsItemAdmin
from workplan.admin import WorkStepAdmin

# Регистрируем модели
admin_site.register(CompanyContact, CompanyContactAdmin)
admin_site.register(Order, OrderAdmin)
admin_site.register(Service, ServiceAdmin)
admin_site.register(ServiceSubcategory, ServiceSubcategoryAdmin)
admin_site.register(FAQ, FAQAdmin)
admin_site.register(Page, PageAdmin)
admin_site.register(WhyUsItem, WhyUsItemAdmin)
admin_site.register(WorkStep, WorkStepAdmin)
