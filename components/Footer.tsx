'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Scale, MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const { isRTL, t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <Scale className="h-8 w-8 text-yellow-500" />
              <div className="text-xl font-bold">
                {isRTL ? 'أمانك' : 'Amank'}
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {isRTL 
                ? 'مكتب أمانك للمحاماة والاستشارات القانونية - خبرة تزيد عن 15 عامًا في تقديم الخدمات القانونية المتميزة'
                : 'Amank Law Firm - Over 15 years of experience providing exceptional legal services'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">{t('home')}</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">{t('about')}</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">{t('services')}</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">{t('blog')}</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Legal Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('legalServices')}</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300">{t('civilLaw')}</span></li>
              <li><span className="text-gray-300">{t('commercialLaw')}</span></li>
              <li><span className="text-gray-300">{t('familyLaw')}</span></li>
              <li><span className="text-gray-300">{t('criminalLaw')}</span></li>
              <li><span className="text-gray-300">{t('realEstate')}</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <MapPin className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  {isRTL 
                    ? 'الرياض، المملكة العربية السعودية'
                    : 'Riyadh, Saudi Arabia'
                  }
                </div>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                <div className="text-gray-300 text-sm">+966 11 123 4567</div>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                <div className="text-gray-300 text-sm">info@amank-law.com</div>
              </div>
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <Clock className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">{t('sunThu')}</div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">{t('followUs')}</h4>
              <div className="flex space-x-3 rtl:space-x-reverse">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 {isRTL ? 'أمانك' : 'Amank'} - {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}