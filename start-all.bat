@echo off
chcp 65001 >nul
echo Starting Ardex project...
echo.

echo Starting Django server...
start "Django Server" cmd /k "cd Backend && python manage.py runserver 0.0.0.0:8000"

echo Waiting for Django to start...
timeout /t 3 /nobreak > nul

echo Starting Next.js server...
start "Next.js Server" cmd /k "cd Frontend && npm run dev"

echo.
echo Project started successfully!
echo Django: http://localhost:8000
echo Next.js: http://localhost:3000
echo API: http://localhost:8000/api/
echo Admin: http://localhost:8000/admin/
echo.
pause
