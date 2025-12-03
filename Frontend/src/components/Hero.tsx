'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { apiClient, PageSeo } from '@/lib/api';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function Hero() {
  const { t, language } = useLanguage();
  const [pageSeo, setPageSeo] = useState<PageSeo | null>(null);
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  useEffect(() => {
    const fetchPageSeo = async () => {
      try {
        const seo = await apiClient.getPageSeo('home', language);
        setPageSeo(seo);
      } catch (error) {
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight pt-4 sm:pt-6 md:pt-8 lg:pt-10">
              {pageSeo?.title || t.hero.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed font-normal">
              {pageSeo?.description || t.hero.subtitle}
            </p>
            <Button
              onClick={scrollToContacts}
              className="bg-gradient-to-r from-gray-900 to-black text-white px-8 md:px-10 py-5 md:py-6 text-lg md:text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:scale-105"
            >
              {t.hero.cta}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>

          {/* Hero Image Carousel */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-gray-200/50">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[autoplayPlugin.current]}
                className="w-full"
              >
                <CarouselContent>
                  {[
                    '/gettyimages-1482140442-612x612.jpg',
                    '/gettyimages-1728002245-612x612.jpg',
                    '/gettyimages-2189495681-612x612.jpg',
                    '/gettyimages-503015273-612x612.jpg',
                    '/gettyimages-537682635-612x612.jpg',
                  ].map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[550px]">
                        <Image
                          src={image}
                          alt={`Hero image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}