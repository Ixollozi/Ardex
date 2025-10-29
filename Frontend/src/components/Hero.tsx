'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { apiClient, PageSeo } from '@/lib/api';

export default function Hero() {
  const { t, language } = useLanguage();
  const [pageSeo, setPageSeo] = useState<PageSeo | null>(null);

  useEffect(() => {
    const fetchPageSeo = async () => {
      try {
        const seo = await apiClient.getPageSeo('home', language);
        setPageSeo(seo);
      } catch (error) {
        console.error('Failed to fetch home page SEO:', error);
      }
    };

    fetchPageSeo();
  }, [language]);

  const scrollToContacts = () => {
    const element = document.getElementById('contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-16 md:pt-20 lg:pt-24 pb-10 md:pb-14 lg:pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-3 md:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
              {pageSeo?.title || t.hero.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed font-normal">
              {pageSeo?.description || t.hero.subtitle}
            </p>
            <Button
              onClick={scrollToContacts}
              className="bg-gradient-to-r from-accentGreen to-accentGreen-dark text-white px-8 md:px-10 py-5 md:py-6 text-lg md:text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:scale-105"
            >
              {t.hero.cta}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-accentGreen/10">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop"
                alt="Modern office building"
                className="w-full h-[300px] sm:h-[400px] md:h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}