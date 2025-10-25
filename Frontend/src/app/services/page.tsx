'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Settings, Zap, Code, GraduationCap, FileSearch, ArrowLeft, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { apiClient, Service, ServiceSubcategory } from '@/lib/api';
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
  const [selectedSubcategory, setSelectedSubcategory] = useState<ServiceSubcategory | null>(null);
  const [expandedServices, setExpandedServices] = useState<Set<number>>(new Set());
  const [expandedServiceSubcategories, setExpandedServiceSubcategories] = useState<Set<number>>(new Set());

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

  const handleServiceClick = (service: Service) => {
    if (service.subcategory) {
      // Если у услуги есть сабкатегория, переключаем её раскрытие
      const newExpanded = new Set(expandedServices);
      if (newExpanded.has(service.id)) {
        newExpanded.delete(service.id);
      } else {
        newExpanded.add(service.id);
      }
      setExpandedServices(newExpanded);
    } else {
      // Если сабкатегории нет, выбираем услугу
      setSelectedService(selectedService === service.id ? null : service.id);
      setSelectedSubcategory(null);
    }
  };

  const handleServiceDoubleClick = (service: Service) => {
    if (service.subcategory) {
      // Двойной клик на услугу с сабкатегорией - выбираем услугу
      setSelectedService(service.id);
      setSelectedSubcategory(null);
    }
  };

  const handleSubcategoryClick = (subcategory: ServiceSubcategory) => {
    setSelectedSubcategory(selectedSubcategory?.id === subcategory.id ? null : subcategory);
    setSelectedService(null);
  };

  const handleServiceSubcategoryToggle = (serviceId: number) => {
    const newExpanded = new Set(expandedServiceSubcategories);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServiceSubcategories(newExpanded);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
          {/* Hero Section */}
          <section className="pt-20 pb-16 bg-gradient-to-br from-[#1F6B5E] to-[#2A8B7A] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
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
                <div className="lg:w-80 flex-shrink-0 lg:-ml-[calc(50vw-50%)]">
                  <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 min-h-[600px] max-h-[calc(100vh-8rem)] overflow-y-auto">
                    <h3 className="text-xl font-bold text-grey-900 mb-6">Услуги</h3>
                    <nav className="space-y-2">
                      {services.map((service, index) => (
                        <div key={service.id}>
                           <button
                             onClick={() => handleServiceClick(service)}
                             onDoubleClick={() => handleServiceDoubleClick(service)}
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
                               <span className="font-medium flex-1">{service.title}</span>
                               <div className="flex items-center gap-2">
                                 {service.subcategory && (
                                   <div
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       setSelectedService(service.id);
                                       setSelectedSubcategory(null);
                                     }}
                                     className="p-1 rounded hover:bg-grey-200 transition-colors duration-200 cursor-pointer"
                                     title="Открыть услугу"
                                   >
                                     <ExternalLink className="w-4 h-4 text-grey-600" />
                                   </div>
                                 )}
                                 {service.subcategory && (
                                   expandedServices.has(service.id) ? (
                                     <ChevronDown className="w-4 h-4" />
                                   ) : (
                                     <ChevronRight className="w-4 h-4" />
                                   )
                                 )}
                               </div>
                             </div>
                           </button>
                           
                           {/* Показываем сабкатегорию если услуга раскрыта */}
                           {service.subcategory && expandedServices.has(service.id) && (
                             <div className="ml-4 mt-2">
                               <button
                                 onClick={() => handleSubcategoryClick(service.subcategory!)}
                                 className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                                   selectedSubcategory?.id === service.subcategory?.id
                                     ? 'bg-[#1F6B5E] text-white'
                                     : 'bg-grey-50 text-grey-700 hover:bg-grey-100'
                                 }`}
                               >
                                 <div className="flex items-center gap-2">
                                   <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                     selectedSubcategory?.id === service.subcategory?.id ? 'bg-white' : 'bg-[#1F6B5E]'
                                   }`} />
                                   <span className="font-medium truncate">{service.subcategory.title}</span>
                                 </div>
                               </button>
                             </div>
                           )}
                         </div>
                       ))}
                     </nav>
                   </div>
                 </div>

                 {/* Main Content */}
                 <div className="flex-1">
                   <div className="w-full">
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
                      {selectedSubcategory ? (
                        // Показать выбранную сабкатегорию
                        <div className="bg-white rounded-xl shadow-md p-8">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-[#E6F2F0] rounded-xl flex items-center justify-center">
                              <Settings className="text-[#1F6B5E]" size={32} />
                            </div>
                            <div>
                              <h2 className="text-3xl font-bold text-grey-900">{selectedSubcategory.title}</h2>
                              <p className="text-grey-600">Подробная информация о подкатегории</p>
                            </div>
                          </div>
                          
                          <div className="prose max-w-none">
                            <p className="text-lg text-grey-700 leading-relaxed mb-6">
                              {selectedSubcategory.description}
                            </p>
                            
                            
                            <div className="flex gap-4">
                              <button className="bg-[#1F6B5E] text-white py-3 px-8 rounded-lg font-medium hover:bg-[#2A8B7A] transition-colors duration-300">
                                Заказать услугу
                              </button>
                              <button 
                                onClick={() => setSelectedSubcategory(null)}
                                className="border-2 border-[#1F6B5E] text-[#1F6B5E] py-3 px-8 rounded-lg font-medium hover:bg-[#1F6B5E] hover:text-white transition-colors duration-300"
                              >
                                Все услуги
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : selectedService ? (
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
                                  <p className="text-grey-600 mt-2">Подробная информация об услуге</p>
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
                                
                                {/* Сабкатегории внутри услуги */}
                                {service.subcategory && (
                                  <div className="mb-6">
                                    <button
                                      onClick={() => handleServiceSubcategoryToggle(service.id)}
                                      className="flex items-center gap-2 text-[#1F6B5E] hover:text-[#2A8B7A] transition-colors duration-200 mb-4"
                                    >
                                      <span className="font-medium">Подкатегории</span>
                                      {expandedServiceSubcategories.has(service.id) ? (
                                        <ChevronDown className="w-4 h-4" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4" />
                                      )}
                                    </button>
                                    
                                    {expandedServiceSubcategories.has(service.id) && (
                                      <div className="bg-grey-50 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                          <div className="w-2 h-2 bg-[#1F6B5E] rounded-full" />
                                          <span className="font-medium text-grey-900">{service.subcategory.title}</span>
                                        </div>
                                        <button
                                          onClick={() => handleSubcategoryClick(service.subcategory!)}
                                          className="text-[#1F6B5E] hover:text-[#2A8B7A] text-sm font-medium transition-colors duration-200"
                                        >
                                          Подробнее о подкатегории →
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
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
                                onClick={() => handleServiceClick(service)}
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
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedService(service.id);
                                    setSelectedSubcategory(null);
                                  }}
                                  className="w-full bg-[#1F6B5E] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2A8B7A] transition-colors duration-300"
                                >
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
