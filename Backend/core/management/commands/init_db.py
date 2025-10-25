from django.core.management.base import BaseCommand
from django.db import connection
from django.core.management import call_command
import os

class Command(BaseCommand):
    help = 'Initialize database with fresh data'

    def handle(self, *args, **options):
        # Удаляем старую базу данных
        db_path = 'ardex_new.db'
        if os.path.exists(db_path):
            os.remove(db_path)
            self.stdout.write('Removed old database')

        # Создаем миграции
        self.stdout.write('Creating migrations...')
        call_command('makemigrations')
        
        # Применяем миграции
        self.stdout.write('Applying migrations...')
        call_command('migrate')
        
        # Создаем суперпользователя
        self.stdout.write('Creating superuser...')
        call_command('createsuperuser', 
                    username='admin', 
                    email='admin@ardex.uz', 
                    interactive=False)
        
        # Создаем тестовые данные
        self.stdout.write('Creating test data...')
        call_command('create_test_data')
        
        self.stdout.write(
            self.style.SUCCESS('Database initialized successfully!')
        )
