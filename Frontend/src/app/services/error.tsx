'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServicesErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ServicesError({ error, reset }: ServicesErrorProps) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-grey-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-grey-900 mb-4">
          {t.errors.servicesError}
        </h1>
        
        <p className="text-grey-600 mb-6">
          {t.errors.servicesErrorDescription}
        </p>

        {error && (
          <div className="bg-grey-100 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-grey-700 font-mono">
              {error.message || t.errors.dataLoadingError}
            </p>
            {error.digest && (
              <p className="text-xs text-grey-500 mt-2">
                {t.common.errorId}: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 bg-[#1F6B5E] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2A8B7A] transition-colors duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            {t.common.retry}
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border-2 border-[#1F6B5E] text-[#1F6B5E] py-3 px-6 rounded-lg font-medium hover:bg-[#1F6B5E] hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.common.backToHome}
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-grey-200">
          <p className="text-sm text-grey-500">
            {t.common.ifProblemPersists}
          </p>
          <Link
            href="/#contact"
            className="text-[#1F6B5E] hover:underline text-sm font-medium"
          >
            {t.common.contactSupport}
          </Link>
        </div>
      </div>
    </div>
  );
}
