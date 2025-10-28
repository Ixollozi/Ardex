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
    <section id="services" className="py-16 md:py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayServices.map((service, index) => {
                const Icon = icons[index % icons.length];
                
                return (
                  <div
                    key={service.id}
                    className="group bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gray-800 transition-colors duration-300">
                      <Icon className="text-gray-600 group-hover:text-white transition-colors duration-300" size={24} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                      {service.title}
                    </h3>
                  <div 
                    className="text-gray-600 leading-relaxed font-light formatted-content text-sm md:text-base"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-8 md:mt-12">
              <Link 
                href="/services"
                className="inline-flex items-center bg-accentGreen text-white py-3 px-6 md:px-8 rounded-lg font-medium hover:bg-accentGreen-dark transition-colors duration-300 text-sm md:text-base"
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