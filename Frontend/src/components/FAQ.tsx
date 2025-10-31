'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Fallback, SkeletonList } from '@/components/ui/fallback';
import { apiClient, type FAQ } from '@/lib/api';

export default function FAQ() {
  const { t } = useLanguage();
  const [faqItems, setFaqItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const data = await apiClient.getFAQ();
        setFaqItems(data);
      } catch (error) {
        console.error('Failed to fetch FAQ:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQ();
  }, []);

  // Показываем только данные с бэкенда
  const displayFAQ = faqItems;

  return (
    <section id="faq" className="pt-10 md:pt-14 lg:pt-16 pb-12 md:pb-16 lg:pb-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 md:mb-3">
            {t.faq.title}
          </h2>
        </div>

        {loading ? (
          <SkeletonList items={5} />
        ) : displayFAQ.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4 pb-12 md:pb-16">
            {displayFAQ.map((item) => {
              return (
                <AccordionItem
                  key={item.id}
                  value={`item-${item.id}`}
                  className="bg-white rounded-xl border-2 border-gray-200 px-5 md:px-6 data-[state=open]:shadow-xl data-[state=open]:border-accentGreen/30 transition-all"
                >
                  <AccordionTrigger className="text-left text-lg md:text-xl font-extrabold text-gray-900 hover:text-accentGreen py-4 md:py-5 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-4 md:pb-5 text-base md:text-lg font-normal">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <Fallback
            type="empty"
            title="FAQ недоступен"
            description="На данный момент часто задаваемые вопросы не добавлены"
          />
        )}
      </div>
    </section>
  );
}