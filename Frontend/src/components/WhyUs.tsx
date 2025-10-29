'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Users, Shield, Lightbulb, Target, Eye } from 'lucide-react';
import { Fallback, SkeletonGrid } from '@/components/ui/fallback';
import { apiClient, WhyUsItem } from '@/lib/api';

const icons = [Award, Users, Shield, Lightbulb, Target, Eye];

export default function WhyUs() {
  const { t, language } = useLanguage();
  const [whyUsItems, setWhyUsItems] = useState<WhyUsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWhyUsItems = async () => {
      try {
        setError(null);
        console.log('Fetching WhyUs items for language:', language);
        const data = await apiClient.getWhyUsItems(language);
        console.log('WhyUs data received:', data);
        setWhyUsItems(data);
      } catch (err) {
        console.error('Error fetching WhyUs items:', err);
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
            title={language === 'ru' ? 'Ошибка загрузки преимуществ' : 'Afzalliklarni yuklashda xatolik'}
            description={error}
            showRetry={true}
            onRetry={() => window.location.reload()}
          />
        ) : whyUsItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {whyUsItems.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <div
                  key={item.id}
                  className="group bg-white p-6 md:p-7 rounded-xl border-2 border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-accentGreen/15 to-accentGreen/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accentGreen transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="text-accentGreen group-hover:text-white transition-colors duration-300" size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-2 md:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-normal text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <Fallback
            type="empty"
            title={language === 'ru' ? 'Преимущества недоступны' : 'Afzalliklar mavjud emas'}
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