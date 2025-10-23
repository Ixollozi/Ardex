'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Users, Shield, Lightbulb } from 'lucide-react';

const icons = [Award, Users, Shield, Lightbulb];

export default function WhyUs() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grey-900 mb-6">
            {t.whyUs.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.whyUs.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
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
      </div>
    </section>
  );
}