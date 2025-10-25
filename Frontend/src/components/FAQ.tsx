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
    <section id="faq" className="py-20 md:py-32 bg-grey-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grey-900 mb-6">
            {t.faq.title}
          </h2>
        </div>

        {loading ? (
          <SkeletonList items={5} />
        ) : displayFAQ.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-4">
            {displayFAQ.map((item) => {
              return (
                <AccordionItem
                  key={item.id}
                  value={`item-${item.id}`}
                  className="bg-white rounded-xl border border-grey-200 px-6 data-[state=open]:shadow-lg transition-shadow"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-grey-900 hover:text-[#1F6B5E] py-6 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-grey-600 leading-relaxed pb-6">
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