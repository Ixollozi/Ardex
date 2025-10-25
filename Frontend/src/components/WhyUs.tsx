'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Users, Shield, Lightbulb, Target, Eye } from 'lucide-react';
import { Fallback, SkeletonGrid } from '@/components/ui/fallback';

const icons = [Award, Users, Shield, Lightbulb, Target, Eye];

interface WhyUsItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
  is_active: boolean;
}

export default function WhyUs() {
  const { t, language } = useLanguage();
  const [whyUsItems, setWhyUsItems] = useState<WhyUsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWhyUsItems = async () => {
      try {
        setError(null);
        const response = await fetch('http://localhost:8000/api/whyus/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch WhyUs items');
        }
        
        const data = await response.json();
        setWhyUsItems(data);
      } catch (err) {
        console.error('Error fetching WhyUs items:', err);
        setError('Failed to load advantages');
      } finally {
        setLoading(false);
      }
    };

    fetchWhyUsItems();
  }, []);

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
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grey-900 mb-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUsItems.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <div
                  key={item.id}
                  className="group bg-white p-8 rounded-xl border border-grey-200 hover:border-[#1F6B5E] hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-[#E6F2F0] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#1F6B5E] transition-colors duration-300">
                    <Icon className="text-[#1F6B5E] group-hover:text-white transition-colors duration-300" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-grey-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-grey-600 leading-relaxed font-light">
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