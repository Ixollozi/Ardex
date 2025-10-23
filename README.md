# 🚀 Ardex - Корпоративный сайт

Django + Next.js проект для B2B/B2C клиентов в Узбекистане с поддержкой русского и узбекского языков.

## ⚡ Быстрый запуск

### Вариант 1: Автоматические скрипты (рекомендуется)

**Windows (BAT файл):**

```bash
# Двойной клик на файл:
start-all.bat
```

### Вариант 2: Ручной запуск

```bash
# Терминал 1 - Django
cd Backend
python manage.py runserver 0.0.0.0:8000

# Терминал 2 - Next.js  
cd Frontend
npm install
npm run dev
```

## 🌐 Доступ к сайту

- **Главная страница**
- **Админка Django**
- **API**

## 🔧 Создание администратора

```bash
cd Backend
python manage.py createsuperuser
```

## 📁 Структура проекта

```
├── Backend/          # Django API
│   ├── services/     # Услуги
│   ├── cases/        # Кейсы
│   ├── pricing/      # Цены
│   ├── faq/          # FAQ
│   ├── contacts/     # Контакты
│   └── pages/        # SEO страницы
├── Frontend/         # Next.js сайт
└── start-all.bat     # Скрипт запуска
```

## 🌍 Многоязычность

- **Русский** (по умолчанию)
- **Узбекский** (через django-modeltranslation)

## 📡 API Endpoints

- `GET /api/services/` - Список услуг
- `GET /api/cases/` - Портфолио
- `GET /api/pricing/` - Тарифы
- `GET /api/faq/` - FAQ
- `GET /api/contacts/` - Контакты
- `POST /api/contacts/send/` - Отправка формы
- `GET /api/pages/<slug>/` - SEO данные

## 🐳 Docker (для продакшена)

```bash
cd Backend
docker compose up --build
```

## ⚠️ Требования

- Python 3.12+
- Node.js 18+
- npm

## 🎯 Особенности

- ✅ Единый порт для фронтенда и API
- ✅ Автоматический прокси Django → Next.js
- ✅ Многоязычность (RU/UZ)
- ✅ SEO-готовность
- ✅ Telegram интеграция для форм
- ✅ Docker готовность
