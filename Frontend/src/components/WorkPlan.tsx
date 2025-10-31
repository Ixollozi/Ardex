'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiClient, WorkStep } from '@/lib/api';
import Image from 'next/image';
import { Fallback, SkeletonGrid } from '@/components/ui/fallback';

export default function WorkPlan() {
  const { t } = useLanguage();
  const [steps, setSteps] = useState<WorkStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        setError(null);
        const data = await apiClient.getWorkPlan();
        console.log('WorkPlan data received:', data);
        // сортируем по order на всякий случай
        const sortedData = [...data].sort((a, b) => a.order - b.order);
        setSteps(sortedData);
        console.log('WorkPlan steps set:', sortedData);
      } catch (e) {
        console.error('WorkPlan fetch error:', e);
        setError('Не удалось загрузить этапы работы');
      } finally {
        setLoading(false);
      }
    };
    fetchSteps();
  }, []);

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
          <Fallback type="error" title="Ошибка" description={error} />
        ) : steps.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Этапы работы будут добавлены в ближайшее время</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className="relative overflow-hidden group shadow-lg hover:shadow-xl transition duration-300"
                style={{
                  // Стрелка, у которой правый край фаской (как на макете)
                  clipPath: 'polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%, 0 0)',
                  borderRadius: 16,
                  willChange: 'transform, box-shadow',
                }}
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
                <div className="relative p-5 md:p-6 min-h-[220px] md:min-h-[260px] flex flex-col justify-end">
                  {/* Номер этапа - крупный, полупрозрачный серый в верхнем левом углу */}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 text-gray-200/90 bg-gray-900/30 backdrop-blur-sm w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-lg select-none">
                    {idx + 1}
                  </div>
                  {/* Текст в нижней части */}
                  <div className="relative z-10">
                    <h3 className="text-white text-base md:text-lg lg:text-xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
                      {step.title}
                    </h3>
                    {step.description && (
                      <div 
                        className="text-white/90 text-sm md:text-base leading-relaxed formatted-content" 
                        dangerouslySetInnerHTML={{ __html: step.description }} 
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


