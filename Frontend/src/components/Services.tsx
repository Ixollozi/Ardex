'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Settings, Zap, Code, GraduationCap, FileSearch } from 'lucide-react';
import { apiClient, Service } from '@/lib/api';

const icons = [MessageSquare, Settings, Zap, Code, GraduationCap, FileSearch];

export default function Services() {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiClient.getServices();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Показываем только данные с бэкенда
  const displayServices = services;

  return (
    <section id="services" className="py-20 md:py-32 bg-grey-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grey-900 mb-6">
            {t.services.title}
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1F6B5E]"></div>
            <p className="mt-4 text-grey-600">Загрузка услуг...</p>
          </div>
        ) : displayServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service, index) => {
              const Icon = icons[index % icons.length];
              
              return (
                <div
                  key={service.id}
                  className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-[#E6F2F0] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1F6B5E] transition-colors duration-300">
                    <Icon className="text-[#1F6B5E] group-hover:text-white transition-colors duration-300" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-grey-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-grey-600 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-grey-500 italic text-lg">
              На данный момент информация отсутствует
            </p>
          </div>
        )}
      </div>
    </section>
  );
}