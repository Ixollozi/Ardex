# ARDEX - Корпоративный веб-сайт

Современный корпоративный веб-сайт с Django Backend и Next.js Frontend для консалтинговой и инжиниринговой компании.

## 🚀 Особенности проекта

- **Двуязычность**: Поддержка русского и узбекского языков
- **Современный стек**: Django 5.0.7 + Next.js 15.3.5 + TypeScript
- **Адаптивный дизайн**: Мобильная оптимизация с Tailwind CSS
- **SEO оптимизация**: Мета-теги, sitemap.xml, robots.txt
- **Админ панель**: Удобное управление контентом
- **API документация**: Автоматическая генерация документации
- **Docker поддержка**: Готовность к развертыванию
- **Proxy режим**: Разработка через единый порт

## 📁 Структура проекта

```
Ardex/
├── Backend/                 # Django REST API
│   ├── core/               # Основные настройки Django
│   ├── services/           # Модели и API услуг
│   ├── cases/              # Кейсы проектов
│   ├── pricing/            # Тарифные планы
│   ├── faq/                # Часто задаваемые вопросы
│   ├── contacts/           # Контактная информация
│   ├── pages/               # SEO страницы
│   ├── whyus/              # Преимущества компании
│   ├── templates/          # HTML шаблоны
│   ├── static/             # Статические файлы
│   ├── media/              # Загруженные файлы
│   ├── locale/             # Переводы
│   └── deploy/             # Конфигурация развертывания
├── Frontend/               # Next.js React приложение
│   ├── src/
│   │   ├── app/            # App Router страницы
│   │   ├── components/     # React компоненты
│   │   ├── contexts/       # React контексты
│   │   ├── hooks/          # Пользовательские хуки
│   │   ├── lib/            # Утилиты и API клиент
│   │   └── types/          # TypeScript типы
│   └── public/             # Публичные файлы
└── start-dev.bat          # Скрипт запуска для Windows
```

## 🛠 Технологии

### Backend
- **Django 5.0.7** - Веб-фреймворк
- **Django REST Framework 3.15.2** - API
- **SQLite** - База данных (разработка)
- **PostgreSQL** - База данных (продакшн)
- **Pillow** - Обработка изображений
- **django-cors-headers** - CORS поддержка
- **python-dotenv** - Переменные окружения

### Frontend
- **Next.js 15.3.5** - React фреймворк
- **React 19** - UI библиотека
- **TypeScript 5** - Типизация
- **Tailwind CSS 4** - Стилизация
- **Framer Motion** - Анимации
- **Radix UI** - UI компоненты
- **Lucide React** - Иконки

### DevOps
- **Docker** - Контейнеризация
- **Docker Compose** - Оркестрация
- **Nginx** - Веб-сервер
- **Gunicorn** - WSGI сервер

## 🚀 Быстрый старт

### Предварительные требования
- Python 3.12+
- Node.js 18+
- npm или yarn

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd Ardex
```

### 2. Установка зависимостей

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

### 3. Настройка базы данных
```bash
cd Backend
python manage.py migrate
python manage.py createsuperuser
python manage.py create_test_data
```

### 4. Запуск проекта

**Вариант 1: Автоматический запуск (Windows)**
```bash
start-dev.bat
```

**Вариант 2: Автоматический запуск (Python скрипт)**
```bash
cd Backend
python start_dev.py
```

**Вариант 3: Ручной запуск**

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

## 🌐 Доступные URL

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Admin панель**: http://localhost:8000/admin/
- **API документация**: http://localhost:8000/api-docs/
- **Sitemap**: http://localhost:8000/sitemap.xml
- **Robots.txt**: http://localhost:8000/robots.txt

## 🔐 Данные для входа в админку

- **Логин**: admin
- **Пароль**: admin123

## 📡 API Endpoints

### Основные эндпоинты
- `GET /api/services/` - Список услуг
- `GET /api/services/{slug}/` - Детали услуги
- `GET /api/cases/` - Список кейсов
- `GET /api/cases/{slug}/` - Детали кейса
- `GET /api/pricing/` - Тарифные планы
- `GET /api/faq/` - Часто задаваемые вопросы
- `GET /api/contacts/` - Контактная информация
- `POST /api/contacts/send/` - Отправка формы обратной связи
- `GET /api/whyus/` - Преимущества компании
- `GET /api/pages/{slug}/` - SEO данные страниц

### Параметры запросов
- `?lang=ru` - Русский язык (по умолчанию)
- `?lang=uz` - Узбекский язык
- `?page=1` - Пагинация

## 🗄 Модели данных

### Services (Услуги)
- Поддержка подкатегорий
- Многоязычность (ru/uz)
- Иконки из Lucide React
- Сортировка и активность

### Cases (Кейсы)
- Изображения проектов
- Многоязычные описания
- Автоматические slug'и
- Хронологическая сортировка

### Pricing (Тарифы)
- Гибкая структура функций
- Многоязычность
- Сортировка по порядку

### FAQ (Вопросы)
- Многоязычные Q&A
- Сортировка по важности

### Contacts (Контакты)
- Корпоративная информация
- Форма обратной связи
- Telegram интеграция

### Pages (Страницы)
- SEO оптимизация
- Социальные сети
- Мета-теги

### WhyUs (Преимущества)
- Иконки и описания
- Сортировка и активность
- Многоязычность

## 🌍 Интернационализация

Проект поддерживает два языка:
- **Русский (ru)** - основной язык
- **Узбекский (uz)** - дополнительный язык

### Переводы
- Frontend: `Frontend/src/lib/i18n.ts`
- Backend: `Backend/locale/` (Django i18n)
- Все модели поддерживают `_ru` и `_uz` поля

## 🎨 UI/UX особенности

- **Адаптивный дизайн** - мобильная оптимизация
- **Темная/светлая тема** - переключение тем
- **Плавные анимации** - Framer Motion
- **Современные компоненты** - Radix UI
- **Иконки** - Lucide React
- **Типографика** - оптимизированные шрифты

## 🔧 Разработка

### Структура компонентов
```
Frontend/src/components/
├── ui/                    # Базовые UI компоненты
├── Header.tsx            # Навигация
├── Hero.tsx              # Главный баннер
├── Services.tsx          # Услуги
├── CaseStudies.tsx       # Кейсы
├── Pricing.tsx           # Тарифы
├── FAQ.tsx               # Вопросы
├── Contact.tsx            # Контакты
├── Footer.tsx            # Подвал
└── WhyUs.tsx             # Преимущества
```

### API клиент
- Типизированные интерфейсы
- Обработка ошибок
- Кэширование запросов
- Поддержка пагинации

### Контексты
- `LanguageContext` - управление языками
- `ClientWrapper` - гидратация

## 🐳 Docker развертывание

### Разработка
```bash
cd Backend
docker-compose up --build
```

### Продакшн
```bash
# Настройте .env файл
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 SEO и производительность

- **Мета-теги** - динамические для каждой страницы
- **Sitemap** - автоматическая генерация
- **Robots.txt** - настройка индексации
- **Lazy loading** - оптимизация загрузки
- **Image optimization** - оптимизация изображений
- **Code splitting** - разделение кода

## 🧪 Тестирование

### Создание тестовых данных
```bash
cd Backend
python manage.py create_test_data
```

### Очистка и пересоздание данных
```bash
python manage.py create_test_data --clear
```

## 📝 Управление контентом

### Админ панель
- Удобный интерфейс для всех моделей
- Многоязычное редактирование
- Загрузка изображений
- Сортировка элементов

### API для контента
- RESTful интерфейс
- Фильтрация и поиск
- Пагинация
- Многоязычность

## 🔒 Безопасность

- **CORS** - настройка разрешенных доменов
- **CSRF** - защита от атак
- **XSS** - защита от скриптов
- **SQL Injection** - защита через ORM
- **Environment variables** - секретные данные

## 📈 Мониторинг и логирование

- **API логи** - все запросы логируются
- **Feedback логи** - отправка форм
- **Error tracking** - отслеживание ошибок
- **Performance monitoring** - мониторинг производительности

## 🚀 Развертывание

### Переменные окружения
```bash
# Backend/.env
SECRET_KEY=your-secret-key
DEBUG=false
ALLOWED_HOSTS=yourdomain.com
DATABASE_URL=postgresql://user:pass@host:port/db
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

### Frontend переменные
```bash
# Frontend/.env.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для фичи (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License.

## 📞 Поддержка

- **Email**: info@ardex.uz
- **Telegram**: @ardex_uz
- **Адрес**: г. Ташкент, ул. Навои, 15, Узбекистан

---

**ARDEX** - Консалтинг и инжиниринг мирового уровня 🚀