'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import * as Lucide from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const goToHome = () => {
    // Если мы на главной странице, скроллим к началу
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Если мы на другой странице, переходим на главную
      window.location.href = '/';
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-grey-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={goToHome}
              className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src="/logo.svg" 
                alt="ARDEX" 
                className="h-40 md:h-40 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={goToHome}
              className="text-sm font-medium text-grey-600 hover:text-[#1F6B5E] transition-colors"
            >
              {t.nav.home}
            </button>
            <Link
              href="/services"
              className="text-sm font-medium text-grey-600 hover:text-[#1F6B5E] transition-colors"
            >
              {t.nav.services}
            </Link>
            <button
              onClick={() => scrollToSection('cases')}
              className="text-sm font-medium text-grey-600 hover:text-[#1F6B5E] transition-colors"
            >
              {t.nav.cases}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium text-grey-600 hover:text-[#1F6B5E] transition-colors"
            >
              {t.nav.pricing}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium text-grey-600 hover:text-[#1F6B5E] transition-colors"
            >
              {t.nav.faq}
            </button>
            <button
              onClick={() => scrollToSection('contacts')}
              className="text-sm font-medium text-grey-600 hover:text-[#1F6B5E] transition-colors"
            >
              {t.nav.contacts}
            </button>
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-grey-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  language === 'ru'
                    ? 'bg-[#1F6B5E] text-white'
                    : 'text-grey-600 hover:text-grey-900'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('uz')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  language === 'uz'
                    ? 'bg-[#1F6B5E] text-white'
                    : 'text-grey-600 hover:text-grey-900'
                }`}
              >
                UZ
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-grey-600 hover:text-[#1F6B5E] hover:bg-grey-100"
            >
              {mobileMenuOpen ? <Lucide.X size={24} /> : <Lucide.Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-grey-200">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={goToHome}
                className="text-base font-medium text-grey-600 hover:text-[#1F6B5E] transition-colors text-left"
              >
                {t.nav.home}
              </button>
              <Link
                href="/services"
                className="text-base font-medium text-grey-600 hover:text-[#1F6B5E] transition-colors text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.services}
              </Link>
              <button
                onClick={() => scrollToSection('cases')}
                className="text-base font-medium text-grey-600 hover:text-[#1F6B5E] transition-colors text-left"
              >
                {t.nav.cases}
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-base font-medium text-grey-600 hover:text-[#1F6B5E] transition-colors text-left"
              >
                {t.nav.pricing}
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-base font-medium text-grey-600 hover:text-[#1F6B5E] transition-colors text-left"
              >
                {t.nav.faq}
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className="text-base font-medium text-grey-600 hover:text-[#1F6B5E] transition-colors text-left"
              >
                {t.nav.contacts}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}