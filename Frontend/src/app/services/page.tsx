'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Settings, Zap, Code, GraduationCap, FileSearch, ArrowLeft } from 'lucide-react';
import { apiClient, Service } from '@/lib/api';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const icons = [MessageSquare, Settings, Zap, Code, GraduationCap, FileSearch];

export default function ServicesPage() {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
          {/* Hero Section */}
          <section className="pt-20 pb-16 bg-gradient-to-br from-[#1F6B5E] to-[#2A8B7A] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <Link 
                  href="/" 
                  className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-8"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад на главную
                </Link>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  Наши услуги
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Полный спектр IT-решений для вашего бизнеса. От разработки до поддержки.
                </p>
              </div>
            </div>
          </section>

          {/* Services Content */}
          <section className="py-20 bg-grey-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Menu */}
                <div className="lg:w-1/4">
                  <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                    <h3 className="text-xl font-bold text-grey-900 mb-6">Услуги</h3>
                    <nav className="space-y-2">
                      {services.map((service, index) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                          className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                            selectedService === service.id
                              ? 'bg-[#1F6B5E] text-white'
                              : 'text-grey-700 hover:bg-grey-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              selectedService === service.id ? 'bg-white' : 'bg-[#1F6B5E]'
                            }`} />
                            <span className="font-medium">{service.title}</span>
                          </div>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:w-3/4">
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1F6B5E]"></div>
                      <p className="mt-4 text-grey-600">Загрузка услуг...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-red-600" />
                      </div>
                      <p className="text-red-600 font-medium mb-4">{error}</p>
                      <button
                        onClick={() => window.location.reload()}
                        className="bg-[#1F6B5E] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#2A8B7A] transition-colors duration-300"
                      >
                        Попробовать снова
                      </button>
                    </div>
                  ) : services.length > 0 ? (
                    <>
                      {selectedService ? (
                        // Показать выбранную услугу
                        (() => {
                          const service = services.find(s => s.id === selectedService);
                          if (!service) return null;
                          const index = services.findIndex(s => s.id === selectedService);
                          const Icon = icons[index % icons.length];
                          
                          return (
                            <div className="bg-white rounded-xl shadow-md p-8">
                              <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-[#E6F2F0] rounded-xl flex items-center justify-center">
                                  <Icon className="text-[#1F6B5E]" size={32} />
                                </div>
                                <div>
                                  <h2 className="text-3xl font-bold text-grey-900">{service.title}</h2>
                                  <p className="text-grey-600">Подробная информация об услуге</p>
                                </div>
                              </div>
                              
                              {service.image && (
                                <div className="mb-6">
                                  <img 
                                    src={service.image} 
                                    alt={service.title}
                                    className="w-full h-64 object-cover rounded-lg"
                                  />
                                </div>
                              )}
                              
                              <div className="prose max-w-none">
                                <p className="text-lg text-grey-700 leading-relaxed mb-6">
                                  {service.description}
                                </p>
                                
                                <div className="bg-grey-50 rounded-lg p-6 mb-6">
                                  <h3 className="text-xl font-bold text-grey-900 mb-4">Что включает услуга:</h3>
                                  <ul className="space-y-2 text-grey-700">
                                    <li className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-[#1F6B5E] rounded-full"></div>
                                      Консультация и анализ потребностей
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-[#1F6B5E] rounded-full"></div>
                                      Разработка индивидуального решения
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-[#1F6B5E] rounded-full"></div>
                                      Внедрение и настройка
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-[#1F6B5E] rounded-full"></div>
                                      Обучение персонала
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-[#1F6B5E] rounded-full"></div>
                                      Техническая поддержка
                                    </li>
                                  </ul>
                                </div>
                                
                                <div className="flex gap-4">
                                  <button className="bg-[#1F6B5E] text-white py-3 px-8 rounded-lg font-medium hover:bg-[#2A8B7A] transition-colors duration-300">
                                    Заказать услугу
                                  </button>
                                  <button 
                                    onClick={() => setSelectedService(null)}
                                    className="border-2 border-[#1F6B5E] text-[#1F6B5E] py-3 px-8 rounded-lg font-medium hover:bg-[#1F6B5E] hover:text-white transition-colors duration-300"
                                  >
                                    Все услуги
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        // Показать все услуги
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {services.map((service, index) => {
                            const Icon = icons[index % icons.length];
                            
                            return (
                              <div
                                key={service.id}
                                className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                onClick={() => setSelectedService(service.id)}
                              >
                                <div className="w-16 h-16 bg-[#E6F2F0] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1F6B5E] transition-colors duration-300">
                                  <Icon className="text-[#1F6B5E] group-hover:text-white transition-colors duration-300" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-grey-900 mb-4">
                                  {service.title}
                                </h3>
                                <p className="text-grey-600 leading-relaxed font-light mb-6">
                                  {service.description}
                                </p>
                                {service.image && (
                                  <div className="mb-4">
                                    <img 
                                      src={service.image} 
                                      alt={service.title}
                                      className="w-full h-48 object-cover rounded-lg"
                                    />
                                  </div>
                                )}
                                <button className="w-full bg-[#1F6B5E] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2A8B7A] transition-colors duration-300">
                                  Подробнее
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-grey-500 italic text-lg">
                        На данный момент услуги не добавлены
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-[#1F6B5E] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Готовы начать проект?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Свяжитесь с нами для обсуждения ваших потребностей и получения персонального предложения.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/#contact"
                  className="bg-white text-[#1F6B5E] py-3 px-8 rounded-lg font-medium hover:bg-grey-100 transition-colors duration-300"
                >
                  Связаться с нами
                </Link>
                <Link 
                  href="/#pricing"
                  className="border-2 border-white text-white py-3 px-8 rounded-lg font-medium hover:bg-white hover:text-[#1F6B5E] transition-colors duration-300"
                >
                  Посмотреть цены
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
  );
}
