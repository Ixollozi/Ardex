'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Briefcase } from 'lucide-react';
import { apiClient, Case } from '@/lib/api';
import { Fallback, SkeletonGrid } from '@/components/ui/fallback';
import Link from 'next/link';

export default function CaseStudies() {
  const { t } = useLanguage();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setError(null);
        const data = await apiClient.getCases();
        setCases(data);
      } catch (error) {
        console.error('Failed to fetch cases:', error);
        setError('Не удалось загрузить кейсы');
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  // Показываем только данные с бэкенда
  const displayCases = cases;

  return (
    <section id="cases" className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 md:mb-3">
            {t.cases.title}
          </h2>
        </div>

        {loading ? (
          <SkeletonGrid columns={3} />
        ) : error ? (
          <Fallback
            type="error"
            title="Ошибка загрузки кейсов"
            description={error}
            showRetry={true}
            onRetry={() => window.location.reload()}
          />
        ) : displayCases.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {displayCases.map((caseStudy) => {
                const imageUrl = caseStudy.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop';
                
                return (
                  <div
                    key={caseStudy.id}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border border-gray-100"
                  >
                    <div className="relative h-52 md:h-72 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 md:top-4 left-3 md:left-4 z-10">
                        <span className="px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-accentGreen to-accentGreen-dark text-white text-sm md:text-base font-bold rounded-lg shadow-lg">
                          Кейс
                        </span>
                      </div>
                    </div>
                    <div className="p-5 md:p-6 flex flex-col h-full bg-white">
                      <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3 md:mb-4">
                        {caseStudy.title}
                      </h3>
                      {caseStudy.description && (
                        <div 
                          className="text-gray-700 text-sm md:text-base mb-3 line-clamp-3 formatted-content leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: caseStudy.description }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <Fallback
            type="empty"
            title="Кейсы недоступны"
            description="На данный момент кейсы не добавлены"
          />
        )}
      </div>
    </section>
  );
}