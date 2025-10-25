'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorReporterProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

export default function ErrorReporter({ error, reset }: ErrorReporterProps) {
  return (
    <div className="min-h-screen bg-grey-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-grey-900 mb-4">
          Что-то пошло не так
        </h1>
        
        <p className="text-grey-600 mb-6">
          Произошла непредвиденная ошибка. Мы уже работаем над её устранением.
        </p>

        {error && (
          <div className="bg-grey-100 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-grey-700 font-mono">
              {error.message || 'Неизвестная ошибка'}
            </p>
            {error.digest && (
              <p className="text-xs text-grey-500 mt-2">
                ID ошибки: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          {reset && (
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 bg-[#1F6B5E] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2A8B7A] transition-colors duration-300"
            >
              <RefreshCw className="w-4 h-4" />
              Попробовать снова
            </button>
          )}
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border-2 border-[#1F6B5E] text-[#1F6B5E] py-3 px-6 rounded-lg font-medium hover:bg-[#1F6B5E] hover:text-white transition-colors duration-300"
          >
            <Home className="w-4 h-4" />
            На главную
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-grey-200">
          <p className="text-sm text-grey-500">
            Если проблема повторяется, свяжитесь с нами
          </p>
          <Link
            href="/#contact"
            className="text-[#1F6B5E] hover:underline text-sm font-medium"
          >
            Связаться с поддержкой
          </Link>
        </div>
      </div>
    </div>
  );
}
