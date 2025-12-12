'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Users, Shield, Lightbulb, Target, Eye, ChevronDown } from 'lucide-react';
import { Fallback, SkeletonGrid } from '@/components/ui/fallback';
import { apiClient, WhyUsItem } from '@/lib/api';

const icons = [Award, Users, Shield, Lightbulb, Target, Eye];

export default function WhyUs() {
  const { t, language } = useLanguage();
  const [whyUsItems, setWhyUsItems] = useState<WhyUsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchWhyUsItems = async () => {
      try {
        setError(null);
        const data = await apiClient.getWhyUsItems(language);
        setWhyUsItems(data);
      } catch (err) {
        setError('Failed to load advantages');
      } finally {
        setLoading(false);
      }
    };

    fetchWhyUsItems();
  }, [language]);

  // Функция для получения иконки по имени
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'Award': Award,
      'Users': Users,
      'Shield': Shield,
      'Lightbulb': Lightbulb,
      'Target': Target,
      'Eye': Eye,
    };
    return iconMap[iconName] || Award;
  };

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

  // Функция для получения краткого описания
  const getShortDescription = (description: string, maxLength: number = 100) => {
    if (!description) return '';
    // Удаляем HTML теги для подсчета длины
    const textWithoutHtml = description.replace(/<[^>]*>/g, '');
    if (textWithoutHtml.length <= maxLength) return description;
    
    // Находим позицию, где нужно обрезать
    let length = 0;
    let inTag = false;
    let result = '';
    
    for (let i = 0; i < description.length; i++) {
      const char = description[i];
      
      if (char === '<') {
        inTag = true;
        result += char;
      } else if (char === '>') {
        inTag = false;
        result += char;
      } else if (inTag) {
        result += char;
      } else {
        if (length >= maxLength) {
          break;
        }
        result += char;
        length++;
      }
    }
    
    return result.trim() + '...';
  };


  return (
    <section className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 md:mb-3">
            {t.whyUs.title}
          </h2>
        </div>

        {loading ? (
          <SkeletonGrid columns={4} />
        ) : error ? (
          <Fallback
            type="error"
            title={t.fallback.errorOccurred}
            description={error}
            showRetry={true}
            onRetry={() => window.location.reload()}
          />
        ) : whyUsItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {whyUsItems.slice(0, 8).map((item) => {
              const Icon = getIcon(item.icon);
              const isExpanded = expandedItems.has(item.id);
              const shortDescription = getShortDescription(item.description);
              const showExpandButton = item.description.length > 100;
              
              return (
                <div
                  key={item.id}
                  className="bg-white p-6 md:p-7 rounded-xl border-2 border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 flex flex-col min-h-[280px] md:min-h-[300px] cursor-pointer"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-accentGreen/15 to-accentGreen/5 rounded-xl flex items-center justify-center mb-4 hover:bg-accentGreen transition-all duration-300 transform hover:scale-110 hover:rotate-3">
                    <Icon className="text-accentGreen hover:text-white transition-colors duration-300" size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-2 md:mb-3">
                    {item.title}
                  </h3>
                  <div className="flex-1 flex flex-col justify-between">
                    <div 
                      className={`text-gray-700 leading-relaxed font-normal text-sm md:text-base transition-all duration-300 formatted-content ${
                        isExpanded ? '' : 'line-clamp-3'
                      }`}
                      dangerouslySetInnerHTML={{ 
                        __html: isExpanded 
                          ? item.description 
                          : (showExpandButton ? shortDescription : item.description) 
                      }}
                    />
                    {showExpandButton && (
                      <div className="mt-3 flex items-center text-accentGreen font-medium text-sm transition-colors duration-200 self-start pointer-events-none">
                        {isExpanded ? (
                          <>
                            {language === 'ru' ? 'Свернуть' : 'Yig\'ish'}
                            <ChevronDown className="ml-1 rotate-180 transition-transform duration-200" size={16} />
                          </>
                        ) : (
                          <>
                            {language === 'ru' ? 'Подробнее' : 'Batafsil'}
                            <ChevronDown className="ml-1 transition-transform duration-200" size={16} />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Fallback
            type="empty"
            title={t.fallback.noData}
            description={language === 'ru' 
              ? 'На данный момент преимущества не добавлены'
              : 'Hozircha afzalliklar qo\'shilmagan'
            }
          />
        )}
      </div>
    </section>
  );
}