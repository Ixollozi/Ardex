'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaTelegram, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa6';
import { apiClient, CompanyContact, Service, PageSeo } from '@/lib/api';

export default function Footer() {
  const { language, t } = useLanguage();
  const [contactInfo, setContactInfo] = useState<CompanyContact | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSeo, setPageSeo] = useState<PageSeo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const [contactData, servicesData, homePageSeo] = await Promise.all([
          apiClient.getContacts(language),
          apiClient.getServices(),
          apiClient.getPageSeo('home', language)
        ]);
        console.log('Contact data:', contactData);
        console.log('Contact address:', contactData?.address);
        console.log('Services data:', servicesData);
        console.log('Home page SEO:', homePageSeo);
        setContactInfo(contactData);
        setServices(servicesData);
        setPageSeo(homePageSeo);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-accentGreen mb-3 md:mb-4">
              ARDEX
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {language === 'ru' 
                ? 'Профессиональный консалтинг и инжиниринг для развития вашего бизнеса'
                : 'Biznesingizni rivojlantirish uchun professional konsalting va muhandislik'
              }
            </p>
            <div className="flex space-x-3 md:space-x-4 mt-4 md:mt-6">
              <a
                href={pageSeo?.telegram_url || contactInfo?.telegram || "https://t.me/eneca_uz"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 hover:bg-accentGreen rounded-lg flex items-center justify-center transition-colors"
              >
                <FaTelegram size={16} />
              </a>
              <a
                href={pageSeo?.linkedin_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 hover:bg-accentGreen rounded-lg flex items-center justify-center transition-colors"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href={pageSeo?.facebook_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 hover:bg-accentGreen rounded-lg flex items-center justify-center transition-colors"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href={pageSeo?.instagram_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 hover:bg-accentGreen rounded-lg flex items-center justify-center transition-colors"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4">
              {language === 'ru' ? 'Быстрые ссылки' : 'Tez havolalar'}
            </h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-accentGreen transition-colors text-sm md:text-base">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-300 hover:text-accentGreen transition-colors text-sm md:text-base">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="/#cases" className="text-gray-300 hover:text-accentGreen transition-colors text-sm md:text-base">
                  {t.nav.cases}
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-gray-300 hover:text-accentGreen transition-colors text-sm md:text-base">
                  {t.nav.pricing}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4">
              {t.nav.services}
            </h4>
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="animate-pulse bg-gray-700 h-4 rounded w-3/4"></div>
                ))}
              </div>
            ) : (
              <ul className="space-y-3 text-gray-300">
                {services.slice(0, 4).map((service) => (
                  <li key={service.id}>
                    <a 
                      href={`/services#${service.slug}`} 
                      className="hover:text-accentGreen transition-colors"
                      onClick={(e) => {
                        // Если мы уже на странице услуг, предотвращаем переход
                        if (window.location.pathname === '/services') {
                          e.preventDefault();
                          // Находим элемент услуги и кликаем по нему
                          const serviceElement = document.querySelector(`[data-service-slug="${service.slug}"]`) as HTMLElement;
                          if (serviceElement) {
                            serviceElement.click();
                          }
                        }
                      }}
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
                {services.length === 0 && (
                  <li className="text-gray-500 italic">
                    {language === 'ru' ? 'Услуги загружаются...' : 'Xizmatlar yuklanmoqda...'}
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4">
              {t.nav.contacts}
            </h4>
            {loading ? (
              <div className="space-y-3 text-gray-300">
                <div className="animate-pulse bg-gray-700 h-4 rounded w-3/4"></div>
                <div className="animate-pulse bg-gray-700 h-4 rounded w-1/2"></div>
                <div className="animate-pulse bg-gray-700 h-4 rounded w-2/3"></div>
              </div>
            ) : (
              <ul className="space-y-3 text-gray-300">
                {contactInfo?.email && (
                  <li>
                    {language === 'ru' ? 'Email:' : 'Elektron pochta:'}<br />
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-accentGreen transition-colors">
                      {contactInfo.email}
                    </a>
                  </li>
                )}
                {contactInfo?.phone && (
                  <li>
                    {language === 'ru' ? 'Телефон:' : 'Telefon:'}<br />
                    <a href={`tel:${contactInfo.phone}`} className="hover:text-accentGreen transition-colors">
                      {contactInfo.phone}
                    </a>
                  </li>
                )}
                {contactInfo?.address && (
                  <li>
                    {t.contact.address}:<br />
                    {contactInfo.address}
                  </li>
                )}
                {!contactInfo?.email && !contactInfo?.phone && !contactInfo?.address && (
                  <li className="text-gray-500 italic">
                    {language === 'ru' ? 'Контактная информация загружается...' : 'Aloqa ma\'lumotlari yuklanmoqda...'}
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        
      </div>
    </footer>
  );
}