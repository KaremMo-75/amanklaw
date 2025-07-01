'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Users, Award, Shield, ArrowRight, Phone, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const { isRTL, t } = useLanguage();
  const [siteContent, setSiteContent] = useState<any>(null);

  useEffect(() => {
    // Load site content from localStorage
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      setSiteContent(JSON.parse(savedContent));
    }
  }, []);

  // Use saved content or fallback to defaults
  const heroTitle = siteContent?.homepage?.heroTitleAr && siteContent?.homepage?.heroTitleEn
    ? (isRTL ? siteContent.homepage.heroTitleAr : siteContent.homepage.heroTitleEn)
    : t('heroTitle');

  const heroSubtitle = siteContent?.homepage?.heroSubtitleAr && siteContent?.homepage?.heroSubtitleEn
    ? (isRTL ? siteContent.homepage.heroSubtitleAr : siteContent.homepage.heroSubtitleEn)
    : t('heroSubtitle');

  const heroButtonText = siteContent?.homepage?.heroButtonTextAr && siteContent?.homepage?.heroButtonTextEn
    ? (isRTL ? siteContent.homepage.heroButtonTextAr : siteContent.homepage.heroButtonTextEn)
    : t('heroButton');

  const contactButtonText = siteContent?.contact?.contactButtonTextAr && siteContent?.contact?.contactButtonTextEn
    ? (isRTL ? siteContent.contact.contactButtonTextAr : siteContent.contact.contactButtonTextEn)
    : t('contact');

  const whatsappUrl = siteContent?.contact?.whatsappUrl || 'https://wa.me/966111234567';

  const features = siteContent?.homepage?.featuresAr && siteContent?.homepage?.featuresEn
    ? (isRTL ? siteContent.homepage.featuresAr : siteContent.homepage.featuresEn)
    : [
        {
          icon: Award,
          title: t('experience'),
          description: t('experienceDesc'),
        },
        {
          icon: Shield,
          title: t('trust'),
          description: t('trustDesc'),
        },
        {
          icon: CheckCircle,
          title: t('results'),
          description: t('resultsDesc'),
        },
      ];

  const handleContactClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {siteContent?.homepage?.heroImage && (
          <div className="absolute inset-0">
            <img 
              src={siteContent.homepage.heroImage} 
              alt="Hero" 
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-start rtl:lg:text-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                {heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start rtl:lg:justify-end">
                <Button 
                  size="lg" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg"
                  onClick={handleContactClick}
                >
                  <Phone className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
                  {heroButtonText}
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 text-lg">
                  <Link href="/services" className="flex items-center">
                    {t('services')}
                    <ArrowRight className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <Scale className="w-64 h-64 text-yellow-500 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Scale className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <div className="text-2xl font-bold">
                      {isRTL ? 'أمانك' : 'Amank'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('whyChooseUs')}
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                <CardContent className="p-8 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    {feature.icon ? (
                      <feature.icon className="w-8 h-8 text-blue-800" />
                    ) : (
                      <Award className="w-8 h-8 text-blue-800" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('legalServices')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('servicesIntro')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: t('civilLaw'), desc: t('civilLawDesc') },
              { title: t('commercialLaw'), desc: t('commercialLawDesc') },
              { title: t('familyLaw'), desc: t('familyLawDesc') },
              { title: t('criminalLaw'), desc: t('criminalLawDesc') },
              { title: t('realEstate'), desc: t('realEstateDesc') },
              { title: t('labor'), desc: t('laborDesc') },
            ].map((service, index) => (
              <Card key={index} className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-blue-800 hover:bg-blue-900">
              <Link href="/services">
                {t('services')}
                <ArrowRight className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isRTL ? 'هل تحتاج استشارة قانونية؟' : 'Need Legal Consultation?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {isRTL 
              ? 'تواصل معنا اليوم للحصول على استشارة قانونية مجانية من خبرائنا'
              : 'Contact us today for a free legal consultation from our experts'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              onClick={handleContactClick}
            >
              <Phone className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
              {contactButtonText}
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-800">
              <Link href="/about">
                {t('about')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}