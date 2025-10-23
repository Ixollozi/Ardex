'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { apiClient, PricingPlan } from '@/lib/api';

const fallbackPricingPlans = [
  {
    nameRu: 'Базовый',
    nameUz: 'Asosiy',
    price: '500,000',
    featuresRu: [
      'Первичная консультация',
      'Анализ текущей ситуации',
      'Рекомендации по улучшению',
      'Email поддержка',
      'Базовая документация',
    ],
    featuresUz: [
      'Dastlabki konsultatsiya',
      'Joriy vaziyatni tahlil qilish',
      'Yaxshilash bo\'yicha tavsiyalar',
      'Email yordam',
      'Asosiy hujjatlar',
    ],
    popular: false,
  },
  {
    nameRu: 'Профессиональный',
    nameUz: 'Professional',
    price: '1,500,000',
    featuresRu: [
      'Все из базового плана',
      'Разработка стратегии',
      'Внедрение решений',
      'Приоритетная поддержка',
      'Обучение персонала',
      'Ежемесячные отчеты',
    ],
    featuresUz: [
      'Asosiy rejadagi hammasi',
      'Strategiya ishlab chiqish',
      'Yechimlarni joriy etish',
      'Ustuvor qo\'llab-quvvatlash',
      'Xodimlarni o\'qitish',
      'Oylik hisobotlar',
    ],
    popular: true,
  },
  {
    nameRu: 'Корпоративный',
    nameUz: 'Korporativ',
    price: '3,000,000',
    featuresRu: [
      'Все из профессионального',
      'Полное сопровождение',
      'Персональный менеджер',
      'Круглосуточная поддержка',
      'Расширенная аналитика',
      'Индивидуальные решения',
      'Гарантия результата',
    ],
    featuresUz: [
      'Professional rejadagi hammasi',
      'To\'liq qo\'llab-quvvatlash',
      'Shaxsiy menejer',
      'Kunlik qo\'llab-quvvatlash',
      'Kengaytirilgan tahlil',
      'Individual yechimlar',
      'Natija kafolati',
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
    <section id="pricing" className="py-20 md:py-32 bg-grey-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grey-900 mb-6">
            {t.pricing.title}
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1F6B5E]"></div>
            <p className="mt-4 text-grey-600">Загрузка тарифов...</p>
          </div>
        ) : displayPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayPlans.map((plan, index) => {
              const planName = plan.title;
              const planPrice = plan.price.toString();
              const planFeatures = plan.features.split('\n').filter(f => f.trim());
              const isPopular = index === 1;
              
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl p-8 ${
                    isPopular
                      ? 'border-2 border-[#1F6B5E] shadow-xl scale-105'
                      : 'border border-grey-200 shadow-md'
                  } transition-all duration-300 hover:shadow-xl`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-2 bg-[#1F6B5E] text-white text-sm font-medium rounded-full shadow-lg">
                        {language === 'ru' ? 'Популярный' : 'Mashhur'}
                      </span>
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-grey-900 mb-4">
                      {planName}
                    </h3>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-[#1F6B5E]">
                        {planPrice}
                      </span>
                      <span className="text-grey-600 ml-2">
                        {language === 'ru' ? 'сум' : 'so\'m'} {t.pricing.perMonth}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {planFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="text-[#1F6B5E] flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-grey-600 ml-3">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-6 text-lg font-medium rounded-xl transition-all duration-300 ${
                      isPopular
                        ? 'bg-[#1F6B5E] hover:bg-[#165048] text-white shadow-lg hover:shadow-xl'
                        : 'bg-grey-100 hover:bg-grey-200 text-grey-900'
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
            <p className="text-grey-500 italic text-lg">
              На данный момент информация отсутствует
            </p>
          </div>
        )}
      </div>
    </section>
  );
}