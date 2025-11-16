#!/bin/bash
set -e

echo "Waiting for database to be ready..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
  if python manage.py shell -c "from django.db import connection; connection.ensure_connection()" 2>/dev/null; then
    echo "Database is ready!"
    break
  fi
  attempt=$((attempt + 1))
  echo "Database is unavailable - sleeping (attempt $attempt/$max_attempts)"
  sleep 2
done

if [ $attempt -eq $max_attempts ]; then
  echo "Warning: Could not connect to database after $max_attempts attempts. Continuing anyway..."
fi

echo "Running migrations..."
python manage.py migrate --noinput || echo "Migration failed, but continuing..."

echo "Collecting static files..."
python manage.py collectstatic --noinput || echo "Static files collection failed, but continuing..."

echo "Starting application..."
exec "$@"

