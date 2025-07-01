'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Scale, Target, Eye, Users, Award, CheckCircle, Globe, Briefcase } from 'lucide-react';

export default function AboutPage() {
  const { isRTL, t } = useLanguage();

  const stats = [
    { icon: Users, value: '500+', label: isRTL ? 'عميل راضي' : 'Satisfied Clients' },
    { icon: Award, value: '15+', label: isRTL ? 'سنة خبرة' : 'Years Experience' },
    { icon: CheckCircle, value: '95%', label: isRTL ? 'معدل النجاح' : 'Success Rate' },
    { icon: Globe, value: '10+', label: isRTL ? 'مجال قانوني' : 'Legal Areas' },
  ];

  const team = [
    {
      name: isRTL ? 'المحامي أحمد محمد' : 'Ahmed Mohammed',
      title: isRTL ? 'الشريك المؤسس' : 'Founding Partner',
      specialization: isRTL ? 'القانون التجاري والشركات' : 'Commercial & Corporate Law',
      experience: isRTL ? '20 سنة خبرة' : '20 Years Experience',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: isRTL ? 'المحامية فاطمة الزهراني' : 'Fatima Al-Zahrani',
      title: isRTL ? 'شريك أول' : 'Senior Partner',
      specialization: isRTL ? 'قانون الأسرة والأحوال الشخصية' : 'Family & Personal Status Law',
      experience: isRTL ? '15 سنة خبرة' : '15 Years Experience',
      image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: isRTL ? 'المحامي خالد العتيبي' : 'Khalid Al-Otaibi',
      title: isRTL ? 'محامي أول' : 'Senior Attorney',
      specialization: isRTL ? 'القانون الجنائي والدفاع' : 'Criminal Defense Law',
      experience: isRTL ? '12 سنة خبرة' : '12 Years Experience',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: isRTL ? 'المحامية نورا الحربي' : 'Nora Al-Harbi',
      title: isRTL ? 'محامية أولى' : 'Senior Attorney',
      specialization: isRTL ? 'قانون العمل والتأمينات' : 'Labor & Insurance Law',
      experience: isRTL ? '10 سنوات خبرة' : '10 Years Experience',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('aboutTitle')}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('aboutIntro')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-900" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                    <Target className="w-6 h-6 text-blue-800" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{t('mission')}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {t('missionText')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                    <Eye className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{t('vision')}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {t('visionText')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isRTL ? 'قيمنا' : 'Our Values'}
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Scale,
                title: isRTL ? 'العدالة' : 'Justice',
                desc: isRTL ? 'نسعى لتحقيق العدالة في جميع قضايانا' : 'We strive for justice in all our cases'
              },
              {
                icon: Users,
                title: isRTL ? 'الثقة' : 'Trust',
                desc: isRTL ? 'نبني علاقات طويلة الأمد مع عملائنا' : 'We build long-term relationships with our clients'
              },
              {
                icon: Award,
                title: isRTL ? 'التميز' : 'Excellence',
                desc: isRTL ? 'نقدم خدمات قانونية متميزة وعالية الجودة' : 'We provide exceptional and high-quality legal services'
              },
            ].map((value, index) => (
              <Card key={index} className="bg-gray-50 border-0 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-blue-800" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('ourTeam')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isRTL 
                ? 'فريق من الخبراء المتخصصين في مختلف المجالات القانونية'
                : 'A team of experts specialized in various legal fields'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.title}</Badge>
                  <p className="text-sm text-gray-600 mb-2">{member.specialization}</p>
                  <p className="text-xs text-blue-600 font-medium">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}