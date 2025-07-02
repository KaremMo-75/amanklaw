'use client';

import React, { useEffect, useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Users, Award, Shield, ArrowRight, Phone, CheckCircle } from 'lucide-react';

// Lazy load components for better performance
const LazyFeatureCard = lazy(() => import('@/components/FeatureCard'));

// Loading component
const LoadingCard = () => (
  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-700 w-16 h-16 rounded-full mx-auto mb-6"></div>
    <div className="bg-gray-200 dark:bg-gray-700 h-6 rounded mb-4"></div>
    <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded"></div>
  </div>
);

export default function HomePage() {
  const { isRTL, t } = useLanguage();
  const [siteContent, setSiteContent] = useState<any>(null);
  const [themeColors, setThemeColors] = useState<any>(null);

  useEffect(() => {
    // Load site content from localStorage
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      const content = JSON.parse(savedContent);
      setSiteContent(content);
      
      // Apply theme colors if available
      if (content.themeColors) {
        setThemeColors(content.themeColors);
        applyThemeColors(content.themeColors);
      }
    }
  }, []);

  const applyThemeColors = (colors: any) => {
    if (!colors) return;
    
    const root = document.documentElement;
    if (colors.primary) root.style.setProperty('--color-primary', colors.primary);
    if (colors.secondary) root.style.setProperty('--color-secondary', colors.secondary);
    if (colors.background) root.style.setProperty('--color-background', colors.background);
    if (colors.text) root.style.setProperty('--color-text', colors.text);
  };

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
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {siteContent?.homepage?.heroImage && (
          <div className="absolute inset-0">
            <img 
              src={siteContent.homepage.heroImage} 
              alt="Hero" 
              className="w-full h-full object-cover opacity-30"
              loading="eager"
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-start rtl:lg:text-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
                {heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in">
                {heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start rtl:lg:justify-end animate-fade-in">
                <Button 
                  size="lg" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg btn-hover"
                  onClick={handleContactClick}
                  style={{ backgroundColor: themeColors?.secondary || '#eab308' }}
                >
                  <Phone className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
                  {heroButtonText}
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-800 dark:hover:text-gray-900 px-8 py-4 text-lg btn-hover">
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
                    <Scale 
                      className="w-16 h-16 mx-auto mb-4" 
                      style={{ color: themeColors?.secondary || '#eab308' }}
                    />
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: themeColors?.secondary || '#eab308' }}
                    >
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
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('whyChooseUs')}
            </h2>
            <div 
              className="w-24 h-1 mx-auto"
              style={{ backgroundColor: themeColors?.secondary || '#eab308' }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Suspense fallback={<LoadingCard />}>
              {features.map((feature, index) => (
                <Card key={index} className="bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                  <CardContent className="p-8 text-center">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ backgroundColor: themeColors?.primary ? `${themeColors.primary}20` : '#dbeafe' }}
                    >
                      {feature.icon ? (
                        <feature.icon 
                          className="w-8 h-8"
                          style={{ color: themeColors?.primary || '#1e40af' }}
                        />
                      ) : (
                        <Award 
                          className="w-8 h-8"
                          style={{ color: themeColors?.primary || '#1e40af' }}
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('legalServices')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
              <Card key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg" 
              className="btn-hover"
              style={{ backgroundColor: themeColors?.primary || '#1e40af' }}
            >
              <Link href="/services">
                {t('services')}
                <ArrowRight className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="text-white py-16"
        style={{ 
          background: themeColors?.primary 
            ? `linear-gradient(to right, ${themeColors.primary}, ${themeColors.primary}dd)` 
            : 'linear-gradient(to right, #1e40af, #1e3a8a)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isRTL ? 'هل تحتاج استشارة قانونية؟' : 'Need Legal Consultation?'}
          </h2>
          <p className="text-xl text-blue-100 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {isRTL 
              ? 'تواصل معنا اليوم للحصول على استشارة قانونية مجانية من خبرائنا'
              : 'Contact us today for a free legal consultation from our experts'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="font-semibold btn-hover"
              onClick={handleContactClick}
              style={{ backgroundColor: themeColors?.secondary || '#eab308', color: '#000' }}
            >
              <Phone className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
              {contactButtonText}
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-800 dark:hover:text-gray-900 btn-hover">
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