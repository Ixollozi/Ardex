'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaTelegram, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const { language, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-grey-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-[#1F6B5E] mb-4">
              ARDEX
            </h3>
            <p className="text-grey-300 leading-relaxed">
              {language === 'ru' 
                ? 'Профессиональный консалтинг и инжиниринг для развития вашего бизнеса'
                : 'Biznesingizni rivojlantirish uchun professional konsalting va muhandislik'
              }
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://t.me/eneca_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-grey-800 hover:bg-[#1F6B5E] rounded-lg flex items-center justify-center transition-colors"
              >
                <FaTelegram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-grey-800 hover:bg-[#1F6B5E] rounded-lg flex items-center justify-center transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-grey-800 hover:bg-[#1F6B5E] rounded-lg flex items-center justify-center transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-grey-800 hover:bg-[#1F6B5E] rounded-lg flex items-center justify-center transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">
              {language === 'ru' ? 'Быстрые ссылки' : 'Tez havolalar'}
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-grey-300 hover:text-[#1F6B5E] transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-grey-300 hover:text-[#1F6B5E] transition-colors"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('cases')}
                  className="text-grey-300 hover:text-[#1F6B5E] transition-colors"
                >
                  {t.nav.cases}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-grey-300 hover:text-[#1F6B5E] transition-colors"
                >
                  {t.nav.pricing}
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">
              {t.nav.services}
            </h4>
            <ul className="space-y-3 text-grey-300">
              {t.services.items.slice(0, 4).map((service, idx) => (
                <li key={idx}>
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">
              {t.nav.contacts}
            </h4>
            <ul className="space-y-3 text-grey-300">
              <li>
                {language === 'ru' ? 'Email:' : 'Elektron pochta:'}<br />
                <a href="mailto:info@eneca.uz" className="hover:text-[#1F6B5E] transition-colors">
                  info@eneca.uz
                </a>
              </li>
              <li>
                {language === 'ru' ? 'Телефон:' : 'Telefon:'}<br />
                <a href="tel:+998901234567" className="hover:text-[#1F6B5E] transition-colors">
                  +998 90 123 45 67
                </a>
              </li>
              <li>
                {t.contact.address}:<br />
                {t.contact.addressText}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-grey-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-grey-400 text-sm">
            </p>
            <div className="flex space-x-6 text-sm text-grey-400">
              <a href="#" className="hover:text-[#1F6B5E] transition-colors">
                {language === 'ru' ? 'Политика конфиденциальности' : 'Maxfiylik siyosati'}
              </a>
              <a href="#" className="hover:text-[#1F6B5E] transition-colors">
                {language === 'ru' ? 'Условия использования' : 'Foydalanish shartlari'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}