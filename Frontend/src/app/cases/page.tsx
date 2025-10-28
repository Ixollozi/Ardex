'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Briefcase, Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import { apiClient, Case, PageSeo } from '@/lib/api';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CasesPage() {
  const { t } = useLanguage();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 6;
  const [pageSeo, setPageSeo] = useState<PageSeo | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setError(null);
        const data = await apiClient.getCasesPaged(page);
        setCases(data.results);
        setTotalCount(data.count || data.results.length);
        const seo = await apiClient.getPageSeo('cases');
        setPageSeo(seo);
      } catch (error) {
        console.error('Failed to fetch cases:', error);
        setError('Не удалось загрузить кейсы');
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [page]);

  const handleCaseClick = (caseItem: Case) => {
    setSelectedCase(selectedCase === caseItem.id ? null : caseItem.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
                {pageSeo?.title || 'Наши кейсы'}
              </h1>
              {pageSeo?.description && (
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  {pageSeo.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Cases Content */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Menu */}
              <div className="lg:w-80 flex-shrink-0 lg:-ml-[calc(50vw-50%)]">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 min-h-[600px] max-h-[calc(100vh-8rem)] overflow-y-auto">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Кейсы</h3>
                  <nav className="space-y-2">
                    {cases.map((caseItem) => (
                      <div key={caseItem.id}>
                        <button
                          onClick={() => handleCaseClick(caseItem)}
                          className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                            selectedCase === caseItem.id
                              ? 'bg-[#1F6B5E] text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              selectedCase === caseItem.id ? 'bg-white' : 'bg-[#1F6B5E]'
                            }`} />
                            <span className="font-medium flex-1">{caseItem.title}</span>
                            <div className="flex items-center gap-2">
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCase(caseItem.id);
                                }}
                                className="p-1 rounded hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                                title="Открыть кейс"
                              >
                                <ExternalLink className="w-4 h-4 text-gray-600" />
                              </div>
                            </div>
                          </div>
                        </button>
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
                      <p className="mt-4 text-gray-600">Загрузка кейсов...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-red-600" />
                      </div>
                      <p className="text-red-600 font-medium mb-4">{error}</p>
                      <button
                        onClick={() => window.location.reload()}
                        className="bg-[#1F6B5E] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#2A8B7A] transition-colors duration-300"
                      >
                        Попробовать снова
                      </button>
                    </div>
                  ) : cases.length > 0 ? (
                    <>
                      {selectedCase ? (
                        // Показать выбранный кейс
                        (() => {
                          const caseItem = cases.find(c => c.id === selectedCase);
                          if (!caseItem) return null;
                          
                          return (
                            <div className="bg-white rounded-xl shadow-md p-8">
                              <div className="mb-6">
                                <img 
                                  src={caseItem.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop'} 
                                  alt={caseItem.title}
                                  className="w-full h-64 object-cover rounded-lg"
                                  onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop';
                                  }}
                                />
                              </div>
                              
                              <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-[#E6F2F0] rounded-xl flex items-center justify-center">
                                  <Briefcase className="text-[#1F6B5E]" size={32} />
                                </div>
                                <div>
                                  <h2 className="text-3xl font-bold text-gray-900">{caseItem.title}</h2>
                                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(caseItem.created_at)}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="prose max-w-none">
                                <div 
                                  className="text-lg text-gray-700 leading-relaxed mb-6 formatted-content"
                                  dangerouslySetInnerHTML={{ __html: caseItem.description }}
                                />
                                
                                <div className="flex gap-4">
                                  <button className="bg-[#1F6B5E] text-white py-3 px-8 rounded-lg font-medium hover:bg-[#2A8B7A] transition-colors duration-300">
                                    Обсудить проект
                                  </button>
                                  <button 
                                    onClick={() => setSelectedCase(null)}
                                    className="border-2 border-[#1F6B5E] text-[#1F6B5E] py-3 px-8 rounded-lg font-medium hover:bg-[#1F6B5E] hover:text-white transition-colors duration-300"
                                  >
                                    Все кейсы
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        // Показать все кейсы
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {cases.map((caseItem) => (
                              <div
                                key={caseItem.id}
                                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col h-full"
                                onClick={() => handleCaseClick(caseItem)}
                              >
                                <div className="relative">
                                  <img 
                                    src={caseItem.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop'} 
                                    alt={caseItem.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                      e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop';
                                    }}
                                  />
                                  <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-[#1F6B5E] text-white text-sm font-medium rounded-lg">
                                      Кейс
                                    </span>
                                  </div>
                                </div>
                                <div className="p-6 flex flex-col h-full">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-[#E6F2F0] rounded-lg flex items-center justify-center group-hover:bg-[#1F6B5E] transition-colors duration-300">
                                      <Briefcase className="text-[#1F6B5E] group-hover:text-white transition-colors duration-300" size={20} />
                                    </div>
                                    <div>
                                      <h3 className="text-xl font-bold text-gray-900">
                                        {caseItem.title}
                                      </h3>
                                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <Calendar className="w-3 h-3" />
                                        <span>{formatDate(caseItem.created_at)}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div 
                                    className="text-gray-600 leading-relaxed font-light mb-4 formatted-content line-clamp-3"
                                    dangerouslySetInnerHTML={{ __html: caseItem.description }}
                                  />
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCase(caseItem.id);
                                    }}
                                    className="mt-auto w-full bg-[#1F6B5E] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2A8B7A] transition-colors duration-300"
                                  >
                                    Подробнее
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Pagination */}
                          <div className="mt-10 flex items-center justify-center gap-2">
                            {Array.from({ length: Math.max(1, Math.ceil(totalCount / pageSize)) }, (_, i) => i + 1).map((p) => (
                              <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`h-9 min-w-9 px-3 rounded-md border text-sm font-medium transition-colors ${
                                  p === page ? 'bg-[#1F6B5E] text-white border-[#1F6B5E]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
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
                        На данный момент кейсы не добавлены
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
              Хотите стать следующим успешным кейсом?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения вашего проекта и получения персонального предложения.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contact"
                className="bg-white text-[#1F6B5E] py-3 px-8 rounded-lg font-medium hover:bg-grey-100 transition-colors duration-300"
              >
                Связаться с нами
              </Link>
              <Link 
                href="/services"
                className="border-2 border-white text-white py-3 px-8 rounded-lg font-medium hover:bg-white hover:text-[#1F6B5E] transition-colors duration-300"
              >
                Наши услуги
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}