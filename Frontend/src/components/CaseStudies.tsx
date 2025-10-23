'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { apiClient, Case } from '@/lib/api';

const fallbackCases = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop',
    titleRu: 'Автоматизация производства',
    titleUz: 'Ishlab chiqarishni avtomatlashtirish',
    categoryRu: 'Промышленность',
    categoryUz: 'Sanoat',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop',
    titleRu: 'Цифровая трансформация',
    titleUz: 'Raqamli transformatsiya',
    categoryRu: 'IT-решения',
    categoryUz: 'IT-yechimlar',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop',
    titleRu: 'Консалтинг для стартапов',
    titleUz: 'Startaplar uchun konsalting',
    categoryRu: 'Консалтинг',
    categoryUz: 'Konsalting',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&auto=format&fit=crop',
    titleRu: 'Энергоэффективность',
    titleUz: 'Energiya samaradorligi',
    categoryRu: 'Энергетика',
    categoryUz: 'Energetika',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&auto=format&fit=crop',
    titleRu: 'Обучение персонала',
    titleUz: 'Xodimlarni o\'qitish',
    categoryRu: 'Образование',
    categoryUz: 'Ta\'lim',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&auto=format&fit=crop',
    titleRu: 'Бизнес-аудит',
    titleUz: 'Biznes-audit',
    categoryRu: 'Аудит',
    categoryUz: 'Audit',
  },
];

export default function CaseStudies() {
  const { language, t } = useLanguage();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const data = await apiClient.getCases();
        setCases(data);
      } catch (error) {
        console.error('Failed to fetch cases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  // Показываем только данные с бэкенда
  const displayCases = cases;

  return (
    <section id="cases" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grey-900 mb-6">
            {t.cases.title}
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1F6B5E]"></div>
            <p className="mt-4 text-grey-600">Загрузка кейсов...</p>
          </div>
        ) : displayCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCases.map((caseStudy) => {
              const imageUrl = caseStudy.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop';
              
              return (
                <div
                  key={caseStudy.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-[#1F6B5E] text-white text-sm font-medium rounded-lg">
                        Кейс
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-grey-900 mb-4">
                      {caseStudy.title}
                    </h3>
                    {caseStudy.description && (
                      <p className="text-grey-600 text-sm mb-4 line-clamp-2">
                        {caseStudy.description}
                      </p>
                    )}
                    <Button
                      variant="ghost"
                      className="text-[#1F6B5E] hover:text-[#165048] p-0 h-auto font-medium group"
                    >
                      {t.cases.viewDetails}
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                  </div>
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