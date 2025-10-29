'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Settings, Zap, Code, GraduationCap, FileSearch } from 'lucide-react';
import { apiClient, Service } from '@/lib/api';
import { Fallback, SkeletonGrid } from '@/components/ui/fallback';
import Link from 'next/link';

const icons = [MessageSquare, Settings, Zap, Code, GraduationCap, FileSearch];

export default function Services() {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setError(null);
        const data = await apiClient.getServices();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setError('Не удалось загрузить услуги');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Показываем только данные с бэкенда
  const displayServices = services;

  return (
    <section id="services" className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 md:mb-3">
            {t.services.title}
          </h2>
        </div>

        {loading ? (
          <SkeletonGrid columns={3} />
        ) : error ? (
          <Fallback
            type="error"
            title="Ошибка загрузки услуг"
            description={error}
            showRetry={true}
            onRetry={() => window.location.reload()}
          />
        ) : displayServices.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {displayServices.map((service, index) => {
                const Icon = icons[index % icons.length];
                
                return (
                  <div
                    key={service.id}
                    className="group bg-white p-6 md:p-7 rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-gray-300 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-accentGreen/10 to-accentGreen/5 rounded-xl flex items-center justify-center mb-4 md:mb-5 group-hover:bg-accentGreen transition-all duration-300 transform group-hover:scale-110">
                      <Icon className="text-accentGreen group-hover:text-white transition-colors duration-300" size={28} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3 md:mb-4">
                      {service.title}
                    </h3>
                  <div 
                    className="text-gray-700 leading-relaxed font-normal formatted-content text-base md:text-lg"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-6 md:mt-8">
              <Link 
                href="/services"
                className="inline-flex items-center bg-gradient-to-r from-gray-800 to-black text-white py-4 px-8 md:px-10 rounded-xl font-bold hover:shadow-xl transition-all duration-300 text-base md:text-lg transform hover:scale-105"
              >
                Посмотреть все услуги
              </Link>
            </div>
          </>
        ) : (
          <Fallback
            type="empty"
            title="Услуги недоступны"
            description="На данный момент услуги не добавлены"
          />
        )}
      </div>
    </section>
  );
}