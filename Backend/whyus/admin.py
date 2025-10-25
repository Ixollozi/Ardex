from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.utils.html import format_html
from .models import WhyUsItem


class WhyUsItemAdmin(admin.ModelAdmin):
    list_display = ("title_ru", "title_uz", "icon", "order", "is_active")
    list_display_links = ("title_ru",)
    list_editable = ("order", "is_active")
    search_fields = ("title_ru", "title_uz", "description_ru", "description_uz", "icon")
    list_filter = ("order", "is_active", "created_at")
    ordering = ["order", "created_at"]
    list_per_page = 20
    
    fieldsets = (
        ("Русский контент", {
            "fields": ("title_ru", "description_ru")
        }),
        ("Узбекский контент", {
            "fields": ("title_uz", "description_uz")
        }),
        ("Общие настройки", {
            "fields": ("icon", "order", "is_active")
        }),
    )
    
    readonly_fields = ["created_at", "updated_at"]
    
    def get_queryset(self, request):
        return super().get_queryset(request).order_by("order", "created_at")
    
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        
        # Добавляем help_text для поля icon с категоризированным списком иконок
        if 'icon' in form.base_fields:
            icon_categories = [
                "Инструменты: Settings, Cog, Wrench, Tool",
                "Достижения: Award, Star, Trophy, Medal",
                "Пользователи: Users, User, UserCheck",
                "Безопасность: Shield, Lock, Unlock",
                "Энергия: Lightbulb, Zap, Bolt",
                "Цели: Target, Crosshair, Focus",
                "Устройства: Monitor, Smartphone, Laptop",
                "Технологии: Database, Server, Cpu",
                "Связь: Wifi, Bluetooth, Power",
                "Статусы: CheckCircle, Check, Plus, Minus",
                "Аналитика: TrendingUp, BarChart, PieChart",
                "Коммуникация: Phone, Mail, MessageCircle",
                "Файлы: Download, Upload, File, Folder",
                "Время: Calendar, Clock, Timer",
                "Медиа: Camera, Video, Image, Play",
                "Местоположение: Home, Building, MapPin, Globe",
                "Транспорт: Rocket, Plane, Car, Truck",
                "Эмоции: Heart, Smile, ThumbsUp, ThumbsDown"
            ]
            
            icons_list = '<br>'.join(icon_categories)
            form.base_fields['icon'].help_text = f'Доступные иконки по категориям:\n{icons_list}'
        
        return form