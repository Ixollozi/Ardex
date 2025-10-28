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
    <section id="cases" className="py-16 md:py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayCases.map((caseStudy) => {
                const imageUrl = caseStudy.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop';
                
                return (
                  <div
                    key={caseStudy.id}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                  >
                    <div className="relative h-48 md:h-64 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop';
                        }}
                      />
                      <div className="absolute top-3 md:top-4 left-3 md:left-4">
                        <span className="px-3 md:px-4 py-1 md:py-2 bg-accentGreen text-white text-xs md:text-sm font-medium rounded-lg">
                          Кейс
                        </span>
                      </div>
                    </div>
                    <div className="p-4 md:p-6 flex flex-col h-full">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                        {caseStudy.title}
                      </h3>
                      {caseStudy.description && (
                        <div 
                          className="text-gray-600 text-xs md:text-sm mb-4 line-clamp-2 formatted-content"
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