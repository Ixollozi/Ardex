'use client';

import { useEffect } from 'react';

export default function AdminRedirect() {
  useEffect(() => {
    // Редирект на бэкенд админку
    window.location.href = 'http://localhost:8000/admin';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Перенаправление на админ-панель...</p>
    </div>
  );
}

