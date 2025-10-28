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
    <section id="home" className="relative pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-20 lg:pb-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {pageSeo?.title || t.hero.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-light">
              {pageSeo?.description || t.hero.subtitle}
            </p>
            <Button
              onClick={scrollToContacts}
              className="bg-accentGreen hover:bg-accentGreen-dark text-black px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {t.hero.cta}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop"
                alt="Modern office building"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}