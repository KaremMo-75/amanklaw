'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export default function ContactInfoPage() {
  const { isRTL, t } = useLanguage();
  const router = useRouter();
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '',
    email: '',
    whatsapp: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  });
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check admin authentication
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/admin-login');
      return;
    }

    // Load existing contact info
    const savedContactInfo = localStorage.getItem('contactInfo');
    if (savedContactInfo) {
      setContactInfo(JSON.parse(savedContactInfo));
    }
  }, [router]);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    // Validate email format
    if (contactInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      newErrors.push(isRTL ? 'تنسيق البريد الإلكتروني غير صحيح' : 'Invalid email format');
    }

    // Validate WhatsApp URL format
    if (contactInfo.whatsapp && !contactInfo.whatsapp.startsWith('https://wa.me/')) {
      newErrors.push(isRTL ? 'رابط واتساب يجب أن يبدأ بـ https://wa.me/' : 'WhatsApp URL must start with https://wa.me/');
    }

    // Validate social media URLs
    const socialFields = [
      { field: 'facebook', name: isRTL ? 'فيسبوك' : 'Facebook', pattern: 'facebook.com' },
      { field: 'twitter', name: isRTL ? 'تويتر' : 'Twitter', pattern: 'twitter.com' },
      { field: 'instagram', name: isRTL ? 'إنستغرام' : 'Instagram', pattern: 'instagram.com' },
      { field: 'linkedin', name: isRTL ? 'لينكد إن' : 'LinkedIn', pattern: 'linkedin.com' }
    ];

    socialFields.forEach(({ field, name, pattern }) => {
      const value = contactInfo[field as keyof ContactInfo];
      if (value && !value.includes(pattern)) {
        newErrors.push(`${name} ${isRTL ? 'رابط غير صحيح' : 'URL is invalid'}`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
    if (errors.length > 0) setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
      setSuccess(isRTL ? 'تم حفظ معلومات الاتصال بنجاح!' : 'Contact information saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setErrors([isRTL ? 'حدث خطأ أثناء حفظ المعلومات' : 'Error saving contact information']);
    }

    setIsLoading(false);
  };

  const contactFields = [
    {
      key: 'phone' as keyof ContactInfo,
      label: isRTL ? 'رقم الهاتف' : 'Phone Number',
      icon: Phone,
      placeholder: '+966 11 123 4567',
      type: 'tel'
    },
    {
      key: 'email' as keyof ContactInfo,
      label: isRTL ? 'البريد الإلكتروني' : 'Email Address',
      icon: Mail,
      placeholder: 'info@amank-law.com',
      type: 'email'
    },
    {
      key: 'whatsapp' as keyof ContactInfo,
      label: isRTL ? 'رابط واتساب' : 'WhatsApp URL',
      icon: MessageSquare,
      placeholder: 'https://wa.me/966111234567',
      type: 'url'
    },
    {
      key: 'facebook' as keyof ContactInfo,
      label: isRTL ? 'فيسبوك' : 'Facebook',
      icon: Facebook,
      placeholder: 'https://facebook.com/amanklaw',
      type: 'url'
    },
    {
      key: 'twitter' as keyof ContactInfo,
      label: isRTL ? 'تويتر (X)' : 'Twitter (X)',
      icon: Twitter,
      placeholder: 'https://twitter.com/amanklaw',
      type: 'url'
    },
    {
      key: 'instagram' as keyof ContactInfo,
      label: isRTL ? 'إنستغرام' : 'Instagram',
      icon: Instagram,
      placeholder: 'https://instagram.com/amanklaw',
      type: 'url'
    },
    {
      key: 'linkedin' as keyof ContactInfo,
      label: isRTL ? 'لينكد إن' : 'LinkedIn',
      icon: Linkedin,
      placeholder: 'https://linkedin.com/company/amanklaw',
      type: 'url'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => router.back()} className="mr-4 rtl:mr-0 rtl:ml-4">
                <ArrowLeft className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
                {isRTL ? 'رجوع' : 'Back'}
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                {isRTL ? 'معلومات الاتصال' : 'Contact Information'}
              </h1>
            </div>
            {success && (
              <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                <CheckCircle className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {success}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
              {isRTL ? 'تحديث معلومات الاتصال والتواصل الاجتماعي' : 'Update Contact & Social Media Information'}
            </CardTitle>
            <p className="text-gray-600 text-sm">
              {isRTL 
                ? 'قم بتحديث معلومات الاتصال وروابط وسائل التواصل الاجتماعي'
                : 'Update contact information and social media links'
              }
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 rtl:mr-0 rtl:ml-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-red-800 font-medium mb-1">
                        {isRTL ? 'يرجى تصحيح الأخطاء التالية:' : 'Please correct the following errors:'}
                      </h4>
                      <ul className="text-red-700 text-sm space-y-1">
                        {errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactFields.map((field) => (
                  <div key={field.key}>
                    <Label htmlFor={field.key} className="flex items-center mb-2">
                      <field.icon className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      {field.label}
                    </Label>
                    <Input
                      id={field.key}
                      type={field.type}
                      value={contactInfo[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="mt-1"
                      dir={field.type === 'url' || field.type === 'email' || field.type === 'tel' ? 'ltr' : undefined}
                    />
                  </div>
                ))}
              </div>

              {/* Preview Section */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isRTL ? 'معاينة' : 'Preview'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {contactFields.map((field) => {
                    const value = contactInfo[field.key];
                    if (!value) return null;

                    return (
                      <div key={field.key} className="flex items-center p-3 bg-white rounded-lg border">
                        <field.icon className="w-5 h-5 text-blue-600 mr-2 rtl:mr-0 rtl:ml-2 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500 truncate">{field.label}</p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {field.type === 'url' ? (
                              <a 
                                href={value} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {isRTL ? 'رابط' : 'Link'}
                              </a>
                            ) : (
                              value
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-blue-800 hover:bg-blue-900 px-8"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                      {isRTL ? 'جاري الحفظ...' : 'Saving...'}
                    </div>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}