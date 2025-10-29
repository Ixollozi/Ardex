'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { apiClient, PricingPlan } from '@/lib/api';

const fallbackPricingPlans = [
  {
    nameRu: 'Стартовый',
    nameUz: 'Boshlang\'ich',
    price: '2,500,000',
    featuresRu: [
      'Первичная консультация (2 часа)',
      'Анализ текущих процессов',
      'Базовые рекомендации',
      'Email поддержка (5 дней)',
      'Простая документация',
      '1 месяц сопровождения',
    ],
    featuresUz: [
      'Dastlabki konsultatsiya (2 soat)',
      'Joriy jarayonlarni tahlil qilish',
      'Asosiy tavsiyalar',
      'Email yordam (5 kun)',
      'Oddiy hujjatlar',
      '1 oy qo\'llab-quvvatlash',
    ],
    popular: false,
  },
  {
    nameRu: 'Бизнес',
    nameUz: 'Biznes',
    price: '7,500,000',
    featuresRu: [
      'Все из стартового плана',
      'Разработка детальной стратегии',
      'Внедрение решений (3 месяца)',
      'Приоритетная поддержка',
      'Обучение команды (16 часов)',
      'Ежемесячные отчеты',
      'Техническая поддержка',
      'Гарантия 6 месяцев',
    ],
    featuresUz: [
      'Boshlang\'ich rejadagi hammasi',
      'Batafsil strategiya ishlab chiqish',
      'Yechimlarni joriy etish (3 oy)',
      'Ustuvor qo\'llab-quvvatlash',
      'Jamoa o\'qitish (16 soat)',
      'Oylik hisobotlar',
      'Texnik yordam',
      '6 oy kafolat',
    ],
    popular: true,
  },
  {
    nameRu: 'Корпоративный',
    nameUz: 'Korporativ',
    price: '15,000,000',
    featuresRu: [
      'Все из бизнес плана',
      'Полное сопровождение проекта',
      'Персональный менеджер',
      'Круглосуточная поддержка',
      'Расширенная аналитика и BI',
      'Индивидуальные решения',
      'Обучение до 50 сотрудников',
      'Гарантия результата 12 месяцев',
      'Постпроектная поддержка',
    ],
    featuresUz: [
      'Biznes rejadagi hammasi',
      'Loyihani to\'liq qo\'llab-quvvatlash',
      'Shaxsiy menejer',
      'Kunlik qo\'llab-quvvatlash',
      'Kengaytirilgan tahlil va BI',
      'Individual yechimlar',
      '50 tagacha xodimni o\'qitish',
      '12 oy natija kafolati',
      'Loyihadan keyingi yordam',
    ],
    popular: false,
  },
];

export default function Pricing() {
  const { language, t } = useLanguage();
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const data = await apiClient.getPricing();
        setPricingPlans(data);
      } catch (error) {
        console.error('Failed to fetch pricing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  // Показываем только данные с бэкенда
  const displayPlans = pricingPlans;

  return (
    <section id="pricing" className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 md:mb-3">
            {t.pricing.title}
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accentGreen"></div>
            <p className="mt-4 text-gray-600">Загрузка тарифов...</p>
          </div>
        ) : displayPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {displayPlans.map((plan, index) => {
              const planName = plan.title;
              // Форматируем цену: убираем десятичные, добавляем запятые для тысяч
              const priceNum = typeof plan.price === 'number' ? plan.price : parseFloat(plan.price.toString());
              const formattedPrice = Math.floor(priceNum).toLocaleString('ru-RU');
              const planFeatures = plan.features.split('\n').filter(f => f.trim());
              const isPopular = index === 1;
              
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl p-6 md:p-7 flex flex-col ${
                    isPopular
                      ? 'border-2 border-accentGreen/50 shadow-2xl scale-105 bg-gradient-to-br from-accentGreen/5 to-white ring-4 ring-accentGreen/10'
                      : 'bg-white border-2 border-gray-200 shadow-lg hover:border-accentGreen/30'
                  } transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2">
                      <span className="px-4 md:px-5 py-2 bg-gradient-to-r from-accentGreen to-accentGreen-dark text-white text-sm md:text-base font-bold rounded-full shadow-xl">
                        {language === 'ru' ? 'Популярный' : 'Mashhur'}
                      </span>
                    </div>
                  )}

                  <div className="mb-5 md:mb-6">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 md:mb-5">
                      {planName}
                    </h3>
                    <div className="flex flex-col">
                      <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-accentGreen to-accentGreen-dark bg-clip-text text-transparent leading-none mb-1">
                        {formattedPrice}
                      </span>
                      <span className="text-gray-600 text-base md:text-lg font-medium">
                        {language === 'ru' ? 'сум' : 'so\'m'}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 md:space-y-4 mb-5 md:mb-6 flex-grow">
                    {planFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="text-accentGreen flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-gray-600 ml-2 text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-4 md:py-6 text-base md:text-lg font-medium rounded-xl transition-all duration-300 mt-auto ${
                      isPopular
                        ? 'bg-accentGreen hover:bg-accentGreen-dark text-black shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    {t.pricing.getStarted}
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 italic text-lg">
              На данный момент информация отсутствует
            </p>
          </div>
        )}
      </div>
    </section>
  );
}