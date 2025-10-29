'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { apiClient } from '@/lib/api';

export default function Contact() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Отладочная информация
  console.log('Contact component rendered with language:', language);
  console.log('Contact translations:', t.contact);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Подготавливаем данные: убираем пустые строки для необязательных полей
      const dataToSend = {
        name: formData.name.trim(),
        message: formData.message.trim(),
        email: formData.email?.trim() || undefined,
        phone: formData.phone?.trim() || undefined,
      };
      
      const result = await apiClient.sendOrder(dataToSend);
      if (result.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Failed to send order:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contacts" className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 md:mb-3">
            {t.contact.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 md:p-7 border-2 border-gray-100 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder={t.contact.name}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-14 md:h-16 px-5 md:px-6 rounded-xl border-2 border-gray-200 focus:border-accentGreen focus:ring-2 focus:ring-accentGreen/20 text-base md:text-lg font-medium shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <Input
                    type="email"
                    name="email"
                    placeholder={t.contact.email}
                    value={formData.email}
                    onChange={handleChange}
                    className="h-14 md:h-16 px-5 md:px-6 rounded-xl border-2 border-gray-200 focus:border-accentGreen focus:ring-2 focus:ring-accentGreen/20 text-base md:text-lg font-medium shadow-sm"
                  />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder={t.contact.phone}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[\+0-9\-\s\(\)]{7,}"
                    className="h-14 md:h-16 px-5 md:px-6 rounded-xl border-2 border-gray-200 focus:border-accentGreen focus:ring-2 focus:ring-accentGreen/20 text-base md:text-lg font-medium shadow-sm"
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder={t.contact.message}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="px-5 md:px-6 py-4 md:py-5 rounded-xl border-2 border-gray-200 focus:border-accentGreen focus:ring-2 focus:ring-accentGreen/20 resize-none text-base md:text-lg font-medium shadow-sm"
                  />
                </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-accentGreen to-accentGreen-dark text-white h-14 md:h-16 text-lg md:text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.contact.send}...
                  </span>
                ) : (
                  <>
                    {t.contact.send}
                    <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </>
                )}
              </Button>

              {submitStatus === 'success' && (
                <div className="p-3 md:p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm md:text-base">
                  {language === 'ru' ? 'Заказ успешно отправлен!' : 'Buyurtma muvaffaqiyatli yuborildi!'}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-3 md:p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm md:text-base">
                  {language === 'ru' ? 'Ошибка при отправке заказа. Попробуйте еще раз.' : 'Buyurtmani yuborishda xatolik. Qayta urinib ko\'ring.'}
                </div>
              )}
            </form>
            </div>
          </div>

          {/* Working Hours */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-7 border-2 border-gray-100 shadow-lg">
              <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-4 md:mb-5">
                {language === 'ru' ? 'Режим работы' : 'Ish vaqti'}
              </h3>
              <div className="space-y-3 text-gray-700 text-base md:text-lg font-medium">
                <div className="flex justify-between">
                  <span>{language === 'ru' ? 'Понедельник - Пятница' : 'Dushanba - Juma'}</span>
                  <span className="font-medium">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'ru' ? 'Суббота' : 'Shanba'}</span>
                  <span className="font-medium">10:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'ru' ? 'Воскресенье' : 'Yakshanba'}</span>
                  <span className="font-medium">{language === 'ru' ? 'Выходной' : 'Dam olish'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}