'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import * as Lucide from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const anchorHref = (id: string) => `/#${id}`;

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex flex-col items-start">
            <button
              onClick={goToHome}
              className="cursor-pointer hover:opacity-80 transition-opacity duration-200 -translate-y-[10px] md:-translate-y-[10px]"
            >
              <img 
                src="/logo.svg" 
                alt="ARDEX" 
                className="h-40 md:h-40 w-auto"
              />
            </button>
            <span className="mt-2 text-[12px] md:text-sm font-medium pointer-events-none -translate-y-[70px] md:-translate-y-[70px]" style={{ color: '#706c62' }}>
              консалтинговая компания
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t.nav.services}
            </Link>
            <Link
              href={anchorHref('faq')}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t.nav.faq}
            </Link>
            <Link
              href={anchorHref('contacts')}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t.nav.contacts}
            </Link>
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 md:p-1">
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium rounded-md transition-all ${
                  language === 'ru'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('uz')}
                className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium rounded-md transition-all ${
                  language === 'uz'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                UZ
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 md:p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <Lucide.X size={20} /> : <Lucide.Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                href="/services"
                className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.services}
              </Link>
              <Link
                href={anchorHref('faq')}
                className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.faq}
              </Link>
              <Link
                href={anchorHref('contacts')}
                className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.contacts}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}