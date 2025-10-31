'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiClient, Service } from '@/lib/api';
import { Fallback, SkeletonGrid } from '@/components/ui/fallback';
import Link from 'next/link';
import Image from 'next/image';

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
    <section id="services" className="py-10 md:py-14 lg:py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 md:mb-3">
            {t.services.title}
          </h2>
        </div>

        {loading ? (
          <SkeletonGrid columns={5} />
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
              {displayServices.map((service) => {
                return (
                  <div
                    key={service.id}
                    className="group bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
                  >
                    {service.image ? (
                      <div className="w-full h-40 md:h-48 mb-3 md:mb-4 relative rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-40 md:h-48 mb-3 md:mb-4 rounded-lg bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Нет изображения</span>
                      </div>
                    )}
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
                      {service.title}
                    </h3>
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