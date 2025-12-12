'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiClient, WorkStep } from '@/lib/api';
import Image from 'next/image';
import { Fallback, SkeletonGrid } from '@/components/ui/fallback';
import { ChevronDown } from 'lucide-react';

export default function WorkPlan() {
  const { t, language } = useLanguage();
  const [steps, setSteps] = useState<WorkStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        setError(null);
        const data = await apiClient.getWorkPlan(language);
        // сортируем по order на всякий случай
        const sortedData = [...data].sort((a, b) => a.order - b.order);
        setSteps(sortedData);
      } catch (e) {
        setError(language === 'ru' ? 'Не удалось загрузить этапы работы' : 'Ish bosqichlarini yuklab bo\'lmadi');
      } finally {
        setLoading(false);
      }
    };
    fetchSteps();
  }, [language]);

  // Функция для переключения раскрытия карточки
  const toggleExpand = (itemId: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Функция для проверки, нужно ли показывать кнопку раскрытия
  // Проверяем длину текста без HTML тегов
  const shouldShowExpand = (description: string) => {
    if (!description) return false;
    const textWithoutHtml = description.replace(/<[^>]*>/g, '');
    return textWithoutHtml.length > 150;
  };

  return (
    <section id="workplan" className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 md:mb-3">
            {t.workplan.title}
          </h2>
        </div>

        {loading ? (
          <SkeletonGrid columns={3} />
        ) : error ? (
          <Fallback type="error" title={t.fallback.errorOccurred} description={error} />
        ) : steps.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t.workplan.willBeAdded}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {steps.map((step, idx) => {
              const isExpanded = expandedItems.has(step.id);
              const showExpandButton = shouldShowExpand(step.description || '');
              
              return (
                <div key={step.id} className="flex flex-col gap-4 md:gap-5">
                  {/* Основная карточка - фиксированный размер */}
                  <div
                    className="relative overflow-hidden group shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
                    style={{
                      // Стрелка, у которой правый край фаской (как на макете)
                      clipPath: 'polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%, 0 0)',
                      borderRadius: 16,
                      willChange: 'transform, box-shadow',
                      height: '320px',
                    }}
                    onClick={() => toggleExpand(step.id)}
                  >
                    {step.image ? (
                      <div className="absolute inset-0">
                        <Image 
                          src={step.image} 
                          alt={step.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-300" 
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                    )}
                    <div className="relative p-5 md:p-6 h-full flex flex-col justify-between">
                      {/* Номер этапа - крупный, полупрозрачный серый в верхнем левом углу */}
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 text-gray-200/90 bg-gray-900/30 backdrop-blur-sm w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-lg select-none z-20">
                        {idx + 1}
                      </div>
                      {/* Текст в нижней части */}
                      <div className="relative z-10 flex-1 flex flex-col justify-end">
                        <h3 className="text-white text-base md:text-lg lg:text-xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
                          {step.title}
                        </h3>
                        {step.description && !isExpanded && (
                          <div className="flex flex-col">
                            <div 
                              className="text-white/90 text-sm md:text-base leading-relaxed formatted-content line-clamp-4"
                              dangerouslySetInnerHTML={{ __html: step.description }} 
                            />
                            {showExpandButton && (
                              <div className="mt-3 flex items-center text-white/90 font-medium text-sm transition-colors duration-200 self-start pointer-events-none">
                                {t.workplan.more}
                                <ChevronDown className="ml-1 transition-transform duration-200" size={16} />
                              </div>
                            )}
                          </div>
                        )}
                        {isExpanded && showExpandButton && (
                          <div className="mt-3 flex items-center text-white/90 font-medium text-sm transition-colors duration-200 self-start pointer-events-none">
                            {t.workplan.collapse}
                            <ChevronDown className="ml-1 rotate-180 transition-transform duration-200" size={16} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Отдельный квадратный блок с полной информацией при раскрытии */}
                  {isExpanded && showExpandButton && (
                    <div 
                      className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-gray-200 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-top-4"
                      style={{
                        aspectRatio: '1 / 1',
                        minHeight: '320px',
                        maxHeight: '400px',
                      }}
                    >
                      <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl md:text-2xl font-extrabold text-gray-900">
                            {step.title}
                          </h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(step.id);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label={t.workplan.collapse}
                          >
                            <ChevronDown className="rotate-180 transition-transform" size={20} />
                          </button>
                        </div>
                        <div 
                          className="flex-1 overflow-y-auto text-gray-700 leading-relaxed formatted-content text-base md:text-lg"
                          dangerouslySetInnerHTML={{ __html: step.description || '' }} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}


