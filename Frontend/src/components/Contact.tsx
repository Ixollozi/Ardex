'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, MapPin } from 'lucide-react';
import { FaTelegram } from 'react-icons/fa';
import { apiClient, CompanyContact } from '@/lib/api';

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
  const [contactInfo, setContactInfo] = useState<CompanyContact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await apiClient.getContacts();
        setContactInfo(data);
      } catch (error) {
        console.error('Failed to fetch contact info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await apiClient.sendFeedback(formData);
      if (result.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Failed to send feedback:', error);
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
    <section id="contacts" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grey-900 mb-6">
            {t.contact.title}
          </h2>
          <p className="text-lg text-grey-600 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder={t.contact.name}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-14 px-6 rounded-xl border-grey-300 focus:border-[#1F6B5E] focus:ring-[#1F6B5E]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="email"
                  name="email"
                  placeholder={t.contact.email}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-14 px-6 rounded-xl border-grey-300 focus:border-[#1F6B5E] focus:ring-[#1F6B5E]"
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder={t.contact.phone}
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-14 px-6 rounded-xl border-grey-300 focus:border-[#1F6B5E] focus:ring-[#1F6B5E]"
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
                  className="px-6 py-4 rounded-xl border-grey-300 focus:border-[#1F6B5E] focus:ring-[#1F6B5E] resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1F6B5E] hover:bg-[#165048] text-white h-14 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.contact.send}...
                  </span>
                ) : (
                  <>
                    {t.contact.send}
                    <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </>
                )}
              </Button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl">
                  {language === 'ru' ? 'Сообщение успешно отправлено!' : 'Xabar muvaffaqiyatli yuborildi!'}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl">
                  {language === 'ru' ? 'Ошибка при отправке сообщения. Попробуйте еще раз.' : 'Xabarni yuborishda xatolik. Qayta urinib ko\'ring.'}
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1F6B5E]"></div>
                <p className="mt-4 text-grey-600">Загрузка контактов...</p>
              </div>
            ) : contactInfo ? (
              <div className="bg-grey-50 rounded-2xl p-8 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#E6F2F0] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#1F6B5E]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-grey-900 mb-2">
                      {t.contact.address}
                    </h3>
                    <p className="text-grey-600">
                      {contactInfo.address || t.contact.addressText}
                    </p>
                  </div>
                </div>

                {contactInfo.phone && (
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#E6F2F0] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[#1F6B5E] font-bold">📞</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-grey-900 mb-2">
                        {language === 'ru' ? 'Телефон' : 'Telefon'}
                      </h3>
                      <p className="text-grey-600">{contactInfo.phone}</p>
                    </div>
                  </div>
                )}

                {contactInfo.email && (
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#E6F2F0] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[#1F6B5E] font-bold">✉️</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-grey-900 mb-2">
                        Email
                      </h3>
                      <p className="text-grey-600">{contactInfo.email}</p>
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-grey-200">
                  <a
                    href={contactInfo.telegram || "https://t.me/eneca_uz"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 bg-[#0088cc] hover:bg-[#006699] text-white px-6 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group"
                  >
                    <FaTelegram size={24} />
                    <span className="font-medium">{t.contact.telegram}</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-grey-500 italic text-lg">
                  На данный момент информация отсутствует
                </p>
              </div>
            )}

            <div className="bg-grey-50 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-grey-900 mb-4">
                {language === 'ru' ? 'Режим работы' : 'Ish vaqti'}
              </h3>
              <div className="space-y-3 text-grey-600">
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