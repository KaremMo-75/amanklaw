'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Scale, 
  Building, 
  Heart, 
  Shield, 
  Home, 
  Users, 
  FileText, 
  Gavel,
  Phone,
  ArrowRight 
} from 'lucide-react';

export default function ServicesPage() {
  const { isRTL, t } = useLanguage();

  const services = [
    {
      icon: Scale,
      title: t('civilLaw'),
      description: t('civilLawDesc'),
      details: isRTL ? [
        'قضايا العقود والالتزامات',
        'المسؤولية المدنية والتعويضات',
        'المنازعات التجارية',
        'قضايا الملكية الفكرية',
        'التحكيم والوساطة'
      ] : [
        'Contract and obligation disputes',
        'Civil liability and compensation',
        'Commercial disputes',
        'Intellectual property cases',
        'Arbitration and mediation'
      ],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      icon: Building,
      title: t('commercialLaw'),
      description: t('commercialLawDesc'),
      details: isRTL ? [
        'تأسيس الشركات والمؤسسات',
        'العقود التجارية والاستثمار',
        'قضايا الإفلاس والتصفية',
        'الاندماج والاستحواذ',
        'قانون الأوراق المالية'
      ] : [
        'Company and business formation',
        'Commercial contracts and investment',
        'Bankruptcy and liquidation cases',
        'Mergers and acquisitions',
        'Securities law'
      ],
      color: 'bg-green-100 text-green-800'
    },
    {
      icon: Heart,
      title: t('familyLaw'),
      description: t('familyLawDesc'),
      details: isRTL ? [
        'قضايا الزواج والطلاق',
        'الحضانة والنفقة',
        'تقسيم الممتلكات',
        'قضايا النسب والتبني',
        'العنف الأسري'
      ] : [
        'Marriage and divorce cases',
        'Custody and alimony',
        'Property division',
        'Paternity and adoption cases',
        'Domestic violence'
      ],
      color: 'bg-pink-100 text-pink-800'
    },
    {
      icon: Shield,
      title: t('criminalLaw'),
      description: t('criminalLawDesc'),
      details: isRTL ? [
        'الدفاع في القضايا الجنائية',
        'قضايا الجنح والمخالفات',
        'جرائم الأموال العامة',
        'جرائم المعلوماتية',
        'التمثيل أمام المحاكم العليا'
      ] : [
        'Criminal defense cases',
        'Misdemeanor and violation cases',
        'Public fund crimes',
        'Cybercrime',
        'Supreme court representation'
      ],
      color: 'bg-red-100 text-red-800'
    },
    {
      icon: Home,
      title: t('realEstate'),
      description: t('realEstateDesc'),
      details: isRTL ? [
        'عقود البيع والشراء',
        'عقود الإيجار والتأجير',
        'تسجيل الملكية العقارية',
        'النزاعات العقارية',
        'التطوير العقاري'
      ] : [
        'Sale and purchase contracts',
        'Lease and rental agreements',
        'Property registration',
        'Real estate disputes',
        'Real estate development'
      ],
      color: 'bg-orange-100 text-orange-800'
    },
    {
      icon: Users,
      title: t('labor'),
      description: t('laborDesc'),
      details: isRTL ? [
        'عقود العمل والتوظيف',
        'قضايا فصل الموظفين',
        'حقوق العمال والتأمينات',
        'السلامة المهنية',
        'المنازعات العمالية'
      ] : [
        'Employment contracts and hiring',
        'Employee termination cases',
        'Worker rights and insurance',
        'Occupational safety',
        'Labor disputes'
      ],
      color: 'bg-purple-100 text-purple-800'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('servicesTitle')}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('servicesIntro')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4 ${service.color}`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {service.title}
                    </CardTitle>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {isRTL ? 'نشمل:' : 'We cover:'}
                    </h4>
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 rtl:mr-0 rtl:ml-3 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isRTL ? 'كيف نعمل' : 'How We Work'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isRTL 
                ? 'نتبع منهجية واضحة لضمان أفضل النتائج لعملائنا'
                : 'We follow a clear methodology to ensure the best results for our clients'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: isRTL ? 'الاستشارة الأولية' : 'Initial Consultation',
                desc: isRTL ? 'نستمع لقضيتك ونقيم الوضع القانوني' : 'We listen to your case and assess the legal situation'
              },
              {
                step: '02',
                title: isRTL ? 'التحليل والتخطيط' : 'Analysis & Planning',
                desc: isRTL ? 'نحلل القضية ونضع استراتيجية قانونية محكمة' : 'We analyze the case and develop a solid legal strategy'
              },
              {
                step: '03',
                title: isRTL ? 'التنفيذ والمتابعة' : 'Execution & Follow-up',
                desc: isRTL ? 'نبدأ العمل على القضية مع متابعة مستمرة' : 'We start working on the case with continuous follow-up'
              },
              {
                step: '04',
                title: isRTL ? 'النتائج والحلول' : 'Results & Solutions',
                desc: isRTL ? 'نحقق أفضل النتائج الممكنة لعملائنا' : 'We achieve the best possible results for our clients'
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isRTL ? 'احصل على استشارة قانونية مجانية' : 'Get Free Legal Consultation'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {isRTL 
              ? 'تواصل معنا اليوم لمناقشة قضيتك مع خبرائنا القانونيين'
              : 'Contact us today to discuss your case with our legal experts'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Link href="/contact">
                <Phone className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
                {t('contact')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-800">
              <Link href="/about">
                {t('about')}
                <ArrowRight className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}