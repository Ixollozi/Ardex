# Запуск проекта Ardex

## Быстрый старт

### 1. Запуск Django (Backend)
```bash
cd Backend
python manage.py runserver 0.0.0.0:8000
```

### 2. Запуск Next.js (Frontend) - в отдельном терминале
```bash
cd Frontend
npm install
npm run dev
```

## Доступ к сайту

После запуска обоих серверов:

- **Главная страница**: http://localhost:8000 (Django проксирует на Next.js)
- **Админка Django**: http://localhost:8000/admin
- **API**: 
  - http://localhost:8000/api/services/
  - http://localhost:8000/api/cases/
  - http://localhost:8000/api/pricing/
  - http://localhost:8000/api/faq/
  - http://localhost:8000/api/contacts/
  - POST http://localhost:8000/api/contacts/send/
  - http://localhost:8000/api/pages/<slug>/

## Создание администратора

```bash
cd Backend
python manage.py createsuperuser
```

Введите логин, email и пароль.

## Как это работает

1. Django работает на порту 8000
2. Next.js работает на порту 3000
3. Django автоматически проксирует все запросы (кроме /api/, /admin/, /static/, /media/) на Next.js
4. Это позволяет работать с единым портом 8000

## Если Next.js не запускается

Убедитесь что Node.js и npm установлены:
```bash
node --version
npm --version
```

Если не установлены, скачайте с https://nodejs.org/

## Важно

- Виртуальное окружение Python должно быть активировано: `.venv\Scripts\Activate.ps1`
- Файл `.env` должен существовать в папке Backend с настройками
- SQLite используется для разработки (файл `db.sqlite3`)
- Для продакшена используйте PostgreSQL через Docker


