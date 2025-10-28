'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Settings, Zap, Code, GraduationCap, FileSearch, ArrowLeft, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { apiClient, Service, ServiceSubcategory, PageSeo } from '@/lib/api';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const icons = [MessageSquare, Settings, Zap, Code, GraduationCap, FileSearch];

export default function ServicesPage() {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSeo, setPageSeo] = useState<PageSeo | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<ServiceSubcategory | null>(null);
  const [expandedServices, setExpandedServices] = useState<Set<number>>(new Set());
  const [expandedServiceSubcategories, setExpandedServiceSubcategories] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 6;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setError(null);
        const data = await apiClient.getServicesPaged(page);
        setServices(data.results);
        setTotalCount(data.count || data.results.length);
        // SEO data for services page
        const seo = await apiClient.getPageSeo('services');
        setPageSeo(seo);
        
        // Проверяем URL hash для автоматического открытия услуги
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          const service = data.results.find(s => s.slug === hash);
          if (service) {
            setSelectedService(service.id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setError('Не удалось загрузить услуги');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [page]);

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
          <section className="pt-24 pb-16 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  {pageSeo?.title || 'Наши услуги'}
                </h1>
                {pageSeo?.description && (
                  <p className="text-xl text-white/90 max-w-3xl mx-auto">
                    {pageSeo.description}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Services Content */}
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Sidebar Menu */}
                <div className="lg:w-80 flex-shrink-0 lg:-ml-[calc(50vw-50%)]">
                  <div className="bg-white rounded-xl shadow-md p-4 md:p-6 sticky top-20 md:top-24 min-h-[400px] md:min-h-[600px] max-h-[calc(100vh-6rem)] md:max-h-[calc(100vh-8rem)] overflow-y-auto">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Услуги</h3>
                    <nav className="space-y-2">
                      {services.map((service, index) => (
                        <div key={service.id}>
                           <button
                             onClick={() => handleServiceClick(service)}
                             onDoubleClick={() => handleServiceDoubleClick(service)}
                             className={`w-full text-left p-2 md:p-3 rounded-lg transition-colors duration-200 ${
                               selectedService === service.id
                                 ? 'bg-gray-800 text-white'
                                 : 'text-gray-700 hover:bg-gray-100'
                             }`}
                           >
                             <div className="flex items-center gap-2 md:gap-3">
                               <div className={`w-2 h-2 rounded-full ${
                                 selectedService === service.id ? 'bg-white' : 'bg-accentGreen'
                               }`} />
                               <span className="font-medium flex-1 text-sm md:text-base">{service.title}</span>
                               <div className="flex items-center gap-1 md:gap-2">
                                 {service.subcategory && (
                                   <div
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       setSelectedService(service.id);
                                       setSelectedSubcategory(null);
                                     }}
                                     className="p-1 rounded hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                                     title="Открыть услугу"
                                   >
                                 <ExternalLink className="w-4 h-4 text-gray-600" />
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
                             <div className="ml-3 md:ml-4 mt-2">
                               <button
                                 onClick={() => handleSubcategoryClick(service.subcategory!)}
                                 className={`w-full text-left p-2 md:p-3 rounded-lg transition-colors duration-200 ${
                                   selectedSubcategory?.id === service.subcategory?.id
                                     ? 'bg-gray-800 text-white'
                                     : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                 }`}
                               >
                                 <div className="flex items-center gap-2">
                                   <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                     selectedSubcategory?.id === service.subcategory?.id ? 'bg-white' : 'bg-accentGreen'
                                   }`} />
                                   <span className="font-medium truncate text-sm md:text-base">{service.subcategory.title}</span>
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
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accentGreen"></div>
                      <p className="mt-4 text-gray-600">Загрузка услуг...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-red-600" />
                      </div>
                      <p className="text-red-600 font-medium mb-4">{error}</p>
                      <button
                        onClick={() => window.location.reload()}
                        className="bg-accentGreen text-white py-2 px-6 rounded-lg font-medium hover:bg-accentGreen-dark transition-colors duration-300"
                      >
                        Попробовать снова
                      </button>
                    </div>
                  ) : services.length > 0 ? (
                    <>
                      {selectedSubcategory ? (
                        // Показать выбранную сабкатегорию
                        <div className="bg-white rounded-xl shadow-md p-4 md:p-8">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Settings className="text-gray-600" size={24} />
                            </div>
                            <div>
                              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{selectedSubcategory.title}</h2>
                              <p className="text-gray-600 text-sm md:text-base">Подробная информация о подкатегории</p>
                            </div>
                          </div>
                          
                          <div className="prose max-w-none">
                            <div 
                              className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 formatted-content"
                              dangerouslySetInnerHTML={{ __html: selectedSubcategory.description }}
                            />
                            
                            
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                              <button className="bg-accentGreen text-black py-3 px-6 md:px-8 rounded-lg font-medium hover:bg-accentGreen-dark transition-colors duration-300 text-sm md:text-base">
                                Заказать услугу
                              </button>
                              <button 
                                onClick={() => setSelectedSubcategory(null)}
                                className="border-2 border-accentGreen text-accentGreen py-3 px-6 md:px-8 rounded-lg font-medium hover:bg-accentGreen hover:text-black transition-colors duration-300 text-sm md:text-base"
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
                            <div className="bg-white rounded-xl shadow-md p-4 md:p-8">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                  <Icon className="text-gray-600" size={24} />
                                </div>
                                <div>
                                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{service.title}</h2>
                                  <p className="text-gray-600 mt-2 text-sm md:text-base">Подробная информация об услуге</p>
                                </div>
                              </div>
                              
                              {service.image && (
                                <div className="mb-6">
                                  <img 
                                    src={service.image} 
                                    alt={service.title}
                                    className="w-full h-48 md:h-64 object-cover rounded-lg"
                                  />
                                </div>
                              )}
                              
                              <div className="prose max-w-none">
                                <div 
                                  className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 formatted-content"
                                  dangerouslySetInnerHTML={{ __html: service.description }}
                                />
                                
                                {/* Сабкатегории внутри услуги */}
                                {service.subcategory && (
                                  <div className="mb-6">
                                    <button
                                      onClick={() => handleServiceSubcategoryToggle(service.id)}
                                      className="flex items-center gap-2 text-accentGreen hover:text-accentGreen-dark transition-colors duration-200 mb-4"
                                    >
                                      <span className="font-medium">Подкатегории</span>
                                      {expandedServiceSubcategories.has(service.id) ? (
                                        <ChevronDown className="w-4 h-4" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4" />
                                      )}
                                    </button>
                                    
                                    {expandedServiceSubcategories.has(service.id) && (
                                      <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                          <div className="w-2 h-2 bg-accentGreen rounded-full" />
                                          <span className="font-medium text-gray-900">{service.subcategory.title}</span>
                                        </div>
                                        <button
                                          onClick={() => handleSubcategoryClick(service.subcategory!)}
                                          className="text-accentGreen hover:text-accentGreen-dark text-sm font-medium transition-colors duration-200"
                                        >
                                          Подробнее о подкатегории →
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                  <button className="bg-accentGreen text-black py-3 px-6 md:px-8 rounded-lg font-medium hover:bg-accentGreen-dark transition-colors duration-300 text-sm md:text-base">
                                    Заказать услугу
                                  </button>
                                  <button 
                                    onClick={() => setSelectedService(null)}
                                    className="border-2 border-accentGreen text-accentGreen py-3 px-6 md:px-8 rounded-lg font-medium hover:bg-accentGreen hover:text-black transition-colors duration-300 text-sm md:text-base"
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
                        <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                          {services.map((service, index) => {
                            const Icon = icons[index % icons.length];
                            
                            return (
                              <div
                                key={service.id}
                                data-service-slug={service.slug}
                                className="group bg-white p-4 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                                onClick={() => handleServiceClick(service)}
                              >
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gray-800 transition-colors duration-300">
                                  <Icon className="text-gray-600 group-hover:text-white transition-colors duration-300" size={24} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                                  {service.title}
                                </h3>
                                <div 
                                  className="text-gray-600 leading-relaxed font-light mb-4 md:mb-6 formatted-content text-sm md:text-base"
                                  dangerouslySetInnerHTML={{ __html: service.description }}
                                />
                                {service.image && (
                                  <div className="mb-4">
                                    <img 
                                      src={service.image} 
                                      alt={service.title}
                                      className="w-full h-40 md:h-48 object-cover rounded-lg"
                                    />
                                  </div>
                                )}
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedService(service.id);
                                    setSelectedSubcategory(null);
                                  }}
                                  className="mt-auto w-full bg-accentGreen text-black py-3 px-6 rounded-lg font-medium hover:bg-accentGreen-dark transition-colors duration-300 text-sm md:text-base"
                                >
                                  Подробнее
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        {/* Pagination */}
                        <div className="mt-8 md:mt-10 flex items-center justify-center gap-1 md:gap-2">
                          {Array.from({ length: Math.max(1, Math.ceil(totalCount / pageSize)) }, (_, i) => i + 1).map((p) => (
                            <button
                              key={p}
                              onClick={() => setPage(p)}
                              className={`h-8 md:h-9 min-w-8 md:min-w-9 px-2 md:px-3 rounded-md border text-xs md:text-sm font-medium transition-colors ${
                                p === page ? 'bg-accentGreen text-black border-accentGreen' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 italic text-lg">
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
          <section className="py-12 md:py-20 bg-accentGreen text-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Готовы начать проект?
              </h2>
              <p className="text-lg md:text-xl text-black/80 mb-6 md:mb-8 max-w-2xl mx-auto">
                Свяжитесь с нами для обсуждения ваших потребностей и получения персонального предложения.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link 
                  href="/#contact"
                  className="bg-white text-accentGreen py-3 px-6 md:px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 text-sm md:text-base"
                >
                  Связаться с нами
                </Link>
                <Link 
                  href="/#pricing"
                  className="bg-white text-accentGreen py-3 px-6 md:px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 text-sm md:text-base"
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
