'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  ArrowLeft, 
  Settings,
  Languages,
  Globe,
  CheckCircle
} from 'lucide-react';

interface SiteInfo {
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  taglineAr: string;
  taglineEn: string;
  phone: string;
  email: string;
  address: string;
}

export default function EditSitePage() {
  const { isRTL, t } = useLanguage();
  const router = useRouter();
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    nameAr: 'أمانك للمحاماة والاستشارات القانونية',
    nameEn: 'Amank Law Firm & Legal Consultations',
    descriptionAr: 'مكتب أمانك للمحاماة والاستشارات القانونية - خبرة تزيد عن 15 عامًا في تقديم الخدمات القانونية المتميزة',
    descriptionEn: 'Amank Law Firm - Over 15 years of experience providing exceptional legal services',
    taglineAr: 'نقدم خدمات قانونية متميزة بخبرة تزيد عن 15 عامًا في مختلف المجالات القانونية',
    taglineEn: 'We provide exceptional legal services with over 15 years of experience across various legal fields',
    phone: '+966 11 123 4567',
    email: 'info@amank-law.com',
    address: 'شارع الملك فهد، الرياض، المملكة العربية السعودية'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check admin authentication
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/admin-login');
      return;
    }

    // Load saved site info
    const savedSiteInfo = localStorage.getItem('cmsSiteInfo');
    if (savedSiteInfo) {
      setSiteInfo(JSON.parse(savedSiteInfo));
    }
  }, [router]);

  const handleInputChange = (field: keyof SiteInfo, value: string) => {
    setSiteInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Save to localStorage
      localStorage.setItem('cmsSiteInfo', JSON.stringify(siteInfo));
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      alert(isRTL ? 'حدث خطأ أثناء حفظ المعلومات' : 'Error saving site information');
    }
    
    setIsLoading(false);
  };

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
                {isRTL ? 'تحرير معلومات الموقع' : 'Edit Site Information'}
              </h1>
            </div>
            {showSuccess && (
              <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                <CheckCircle className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {isRTL ? 'تم الحفظ بنجاح!' : 'Saved successfully!'}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Site Identity */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {isRTL ? 'هوية الموقع' : 'Site Identity'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ar" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ar" className="flex items-center">
                    <Languages className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    عربي
                  </TabsTrigger>
                  <TabsTrigger value="en" className="flex items-center">
                    <Languages className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    English
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="ar" className="space-y-6 mt-6">
                  <div>
                    <Label htmlFor="nameAr">{isRTL ? 'اسم الموقع بالعربية' : 'Site Name in Arabic'}</Label>
                    <Input
                      id="nameAr"
                      value={siteInfo.nameAr}
                      onChange={(e) => handleInputChange('nameAr', e.target.value)}
                      className="mt-2 text-right"
                      dir="rtl"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="descriptionAr">{isRTL ? 'وصف الموقع بالعربية' : 'Site Description in Arabic'}</Label>
                    <Textarea
                      id="descriptionAr"
                      value={siteInfo.descriptionAr}
                      onChange={(e) => handleInputChange('descriptionAr', e.target.value)}
                      className="mt-2 min-h-20 text-right"
                      dir="rtl"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="taglineAr">{isRTL ? 'الشعار بالعربية' : 'Tagline in Arabic'}</Label>
                    <Textarea
                      id="taglineAr"
                      value={siteInfo.taglineAr}
                      onChange={(e) => handleInputChange('taglineAr', e.target.value)}
                      className="mt-2 min-h-20 text-right"
                      dir="rtl"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="en" className="space-y-6 mt-6">
                  <div>
                    <Label htmlFor="nameEn">{isRTL ? 'اسم الموقع بالإنجليزية' : 'Site Name in English'}</Label>
                    <Input
                      id="nameEn"
                      value={siteInfo.nameEn}
                      onChange={(e) => handleInputChange('nameEn', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="descriptionEn">{isRTL ? 'وصف الموقع بالإنجليزية' : 'Site Description in English'}</Label>
                    <Textarea
                      id="descriptionEn"
                      value={siteInfo.descriptionEn}
                      onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                      className="mt-2 min-h-20"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="taglineEn">{isRTL ? 'الشعار بالإنجليزية' : 'Tagline in English'}</Label>
                    <Textarea
                      id="taglineEn"
                      value={siteInfo.taglineEn}
                      onChange={(e) => handleInputChange('taglineEn', e.target.value)}
                      className="mt-2 min-h-20"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {isRTL ? 'معلومات الاتصال' : 'Contact Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                  <Input
                    id="phone"
                    value={siteInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-2"
                    dir="ltr"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">{isRTL ? 'البريد الإلكتروني' : 'Email Address'}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={siteInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2"
                    dir="ltr"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">{isRTL ? 'العنوان' : 'Address'}</Label>
                <Textarea
                  id="address"
                  value={siteInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="mt-2 min-h-20"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
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
      </div>
    </div>
  );
}