'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { apiClient, Case } from '@/lib/api';

const fallbackCases = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop',
    titleRu: 'Автоматизация текстильного производства',
    titleUz: 'To\'qimachilik ishlab chiqarishini avtomatlashtirish',
    categoryRu: 'Промышленность',
    categoryUz: 'Sanoat',
    descriptionRu: 'Внедрение системы автоматического контроля качества и управления производственными линиями на текстильной фабрике. Результат: повышение производительности на 40% и снижение брака на 60%.',
    descriptionUz: 'To\'qimachilik fabrikasida ishlab chiqarish liniyalarini avtomatik nazorat qilish va boshqarish tizimini joriy etish. Natija: mahsuldorlik 40% oshdi va nuqson 60% kamaydi.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop',
    titleRu: 'ERP система для торговой сети',
    titleUz: 'Savdo tarmog\'i uchun ERP tizimi',
    categoryRu: 'IT',
    categoryUz: 'IT',
    descriptionRu: 'Разработка и внедрение корпоративной системы управления ресурсами для сети из 50 магазинов. Интеграция с поставщиками, автоматизация складского учета и аналитика продаж.',
    descriptionUz: '50 ta do\'kondan iborat tarmoq uchun korporativ resurslarni boshqarish tizimini ishlab chiqish va joriy etish. Ta\'minotchilar bilan integratsiya, ombor hisobini avtomatlashtirish va sotish tahlili.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop',
    titleRu: 'Цифровая трансформация банка',
    titleUz: 'Bankning raqamli transformatsiyasi',
    categoryRu: 'Финансы',
    categoryUz: 'Moliya',
    descriptionRu: 'Полная цифровизация банковских процессов: мобильное приложение, онлайн-банкинг, система скоринга и интеграция с платежными системами. Увеличение клиентской базы в 3 раза.',
    descriptionUz: 'Bank jarayonlarini to\'liq raqamlashtirish: mobil ilova, onlayn-banking, skoring tizimi va to\'lov tizimlari bilan integratsiya. Mijozlar bazasi 3 marta oshdi.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop',
    titleRu: 'Система управления энергопотреблением',
    titleUz: 'Energiya iste\'molini boshqarish tizimi',
    categoryRu: 'Энергетика',
    categoryUz: 'Energetika',
    descriptionRu: 'Создание интеллектуальной системы мониторинга и оптимизации энергопотребления для промышленного предприятия. Экономия электроэнергии составила 25%.',
    descriptionUz: 'Sanoat korxonasi uchun energiya iste\'molini monitoring va optimallashtirishning aqlli tizimini yaratish. Elektr energiyasini tejash 25% ni tashkil etdi.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop',
    titleRu: 'Образовательная платформа для вузов',
    titleUz: 'Oliy ta\'lim muassasalari uchun ta\'lim platformasi',
    categoryRu: 'Образование',
    categoryUz: 'Ta\'lim',
    descriptionRu: 'Разработка комплексной LMS платформы с видеолекциями, тестированием, электронным журналом и системой аналитики успеваемости для 5 университетов.',
    descriptionUz: '5 ta universitet uchun videoleksiyalar, testlash, elektron jurnal va muvaffaqiyat tahlili tizimi bilan to\'liq LMS platformasini ishlab chiqish.',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&auto=format&fit=crop',
    titleRu: 'Аудит IT-инфраструктуры госучреждения',
    titleUz: 'Davlat muassasasining IT-infrastrukturasi audit',
    categoryRu: 'Государственный сектор',
    categoryUz: 'Davlat sektori',
    descriptionRu: 'Комплексный аудит IT-системы министерства: анализ безопасности, производительности, рекомендации по модернизации. Снижение рисков на 80%.',
    descriptionUz: 'Vazirlik IT-tizimining kompleks audit: xavfsizlik, samaradorlik tahlili, modernizatsiya bo\'yicha tavsiyalar. Xavflar 80% kamaydi.',
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