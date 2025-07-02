'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  Calendar,
  Shield,
  CheckCircle
} from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
  isRead: boolean;
}

export default function ContactPage() {
  const { isRTL, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState<any>(null);

  useEffect(() => {
    // Load contact info from localStorage
    const savedContactInfo = localStorage.getItem('contactInfo');
    if (savedContactInfo) {
      setContactInfo(JSON.parse(savedContactInfo));
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create submission object
    const submission: ContactSubmission = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      submittedAt: new Date().toISOString(),
      isRead: false
    };

    // Save to localStorage
    const existingSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    existingSubmissions.push(submission);
    localStorage.setItem('contactSubmissions', JSON.stringify(existingSubmissions));
    
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(isRTL ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Your message has been sent successfully! We will contact you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    setIsSubmitting(false);
  };

  const contactInfoData = [
    {
      icon: MapPin,
      title: isRTL ? 'العنوان' : 'Address',
      details: [
        contactInfo?.address || (isRTL ? 'شارع الملك فهد، الرياض' : 'King Fahd Road, Riyadh'),
        isRTL ? 'المملكة العربية السعودية، 12345' : 'Saudi Arabia, 12345'
      ]
    },
    {
      icon: Phone,
      title: isRTL ? 'الهاتف' : 'Phone',
      details: [contactInfo?.phone || '+966 11 123 4567']
    },
    {
      icon: Mail,
      title: isRTL ? 'البريد الإلكتروني' : 'Email',
      details: [contactInfo?.email || 'info@amank-law.com']
    },
    {
      icon: Clock,
      title: isRTL ? 'ساعات العمل' : 'Working Hours',
      details: [
        isRTL ? 'الأحد - الخميس: 9:00 ص - 6:00 م' : 'Sunday - Thursday: 9:00 AM - 6:00 PM',
        isRTL ? 'الجمعة - السبت: مواعيد طارئة فقط' : 'Friday - Saturday: Emergency appointments only'
      ]
    }
  ];

  const features = [
    {
      icon: MessageSquare,
      title: isRTL ? 'استشارة مجانية' : 'Free Consultation',
      desc: isRTL ? 'استشارة أولية مجانية لمدة 30 دقيقة' : '30-minute free initial consultation'
    },
    {
      icon: Calendar,
      title: isRTL ? 'مواعيد مرنة' : 'Flexible Scheduling',
      desc: isRTL ? 'مواعيد متاحة في المساء وعطلات نهاية الأسبوع' : 'Evening and weekend appointments available'
    },
    {
      icon: Shield,
      title: isRTL ? 'سرية تامة' : 'Complete Confidentiality',
      desc: isRTL ? 'حماية كاملة لخصوصية ومعلومات العملاء' : 'Full protection of client privacy and information'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('contactTitle')}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('contactIntro')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-800" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {t('getInTouch')}
                </CardTitle>
                <p className="text-gray-600">
                  {isRTL 
                    ? 'املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن'
                    : 'Fill out the form below and we will contact you as soon as possible'
                  }
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t('name')} *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="mt-1"
                        placeholder={isRTL ? 'اسمك الكامل' : 'Your full name'}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t('phone')}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-1"
                        placeholder="+966 5X XXX XXXX"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">{t('email')} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="mt-1"
                      placeholder={isRTL ? 'بريدك الإلكتروني' : 'your.email@example.com'}
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">{t('subject')} *</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                      className="mt-1"
                      placeholder={isRTL ? 'موضوع الاستشارة' : 'Subject of consultation'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">{t('message')} *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      className="mt-1 min-h-32"
                      placeholder={isRTL ? 'اشرح لنا تفاصيل قضيتك أو استفسارك...' : 'Tell us about your case or inquiry...'}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                        {isRTL ? 'جاري الإرسال...' : 'Sending...'}
                      </div>
                    ) : (
                      <>
                        <Send className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
                        {t('send')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {isRTL ? 'معلومات الاتصال' : 'Contact Information'}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {isRTL 
                    ? 'يمكنك التواصل معنا من خلال أي من الطرق التالية، وسنكون سعداء لمساعدتك'
                    : 'You can contact us through any of the following methods, and we will be happy to help you'
                  }
                </p>
              </div>

              {contactInfoData.map((info, index) => (
                <Card key={index} className="bg-white shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4 flex-shrink-0">
                        <info.icon className="w-6 h-6 text-blue-800" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Map Placeholder */}
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p className="font-medium">
                        {isRTL ? 'خريطة الموقع' : 'Location Map'}
                      </p>
                      <p className="text-sm">
                        {isRTL ? 'شارع الملك فهد، الرياض' : 'King Fahd Road, Riyadh'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-blue-800 text-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-yellow-400 mb-1">24/7</div>
                      <div className="text-sm text-blue-100">
                        {isRTL ? 'دعم طوارئ' : 'Emergency Support'}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400 mb-1">15+</div>
                      <div className="text-sm text-blue-100">
                        {isRTL ? 'سنة خبرة' : 'Years Experience'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}