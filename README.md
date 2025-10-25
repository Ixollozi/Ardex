# Ardex - Корпоративный веб-сайт

Современный корпоративный веб-сайт с Django Backend и Next.js Frontend.

## Структура проекта

- `Backend/` - Django REST API
- `Frontend/` - Next.js React приложение

## Быстрый старт

### 1. Установка зависимостей

**Backend:**
```bash
cd Backend
pip install -r requirements.txt
```

**Frontend:**
```bash
cd Frontend
npm install
```

### 2. Настройка базы данных

```bash
cd Backend
python reset_and_setup.py
```

### 3. Запуск проекта

**Вариант 1: Автоматический запуск**
```bash
start-dev.bat
```

**Вариант 2: Ручной запуск**

Backend (терминал 1):
```bash
cd Backend
python manage.py runserver
```

Frontend (терминал 2):
```bash
cd Frontend
npm run dev
```

## Доступные URL

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Admin панель**: http://localhost:8000/admin/
- **API документация**: http://localhost:8000/api-docs/

## Данные для входа в админку

- **Логин**: admin
- **Пароль**: admin123

## API Endpoints

- `GET /api/services/` - Список услуг
- `GET /api/cases/` - Список кейсов
- `GET /api/pricing/` - Тарифные планы
- `GET /api/faq/` - Часто задаваемые вопросы
- `GET /api/contacts/` - Контактная информация
- `POST /api/contacts/send/` - Отправка формы обратной связи

## Технологии

**Backend:**
- Django 5.0.7
- Django REST Framework
- SQLite
- Pillow (для изображений)

**Frontend:**
- Next.js 15.3.5
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI