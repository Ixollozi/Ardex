@echo off
echo Starting Ardex Development Environment...

echo.
echo Starting Backend (Django)...
cd Backend
start "Django Backend" cmd /k "python manage.py runserver 8000"

echo.
echo Starting Frontend (Next.js)...
cd ..\Frontend
start "Next.js Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo Services page: http://localhost:3000/services
echo Admin: http://localhost:8000/admin/
echo.
echo Press any key to exit...
pause