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
  Upload,
  X,
  Image as ImageIcon,
  Home,
  Info,
  Phone,
  MessageSquare,
  CheckCircle,
  Languages
} from 'lucide-react';

interface SiteContent {
  homepage: {
    heroTitleAr: string;
    heroTitleEn: string;
    heroSubtitleAr: string;
    heroSubtitleEn: string;
    heroButtonTextAr: string;
    heroButtonTextEn: string;
    heroImage: string;
    featuresAr: Array<{title: string; description: string}>;
    featuresEn: Array<{title: string; description: string}>;
  };
  about: {
    titleAr: string;
    titleEn: string;
    contentAr: string;
    contentEn: string;
    image: string;
    missionAr: string;
    missionEn: string;
    visionAr: string;
    visionEn: string;
  };
  footer: {
    descriptionAr: string;
    descriptionEn: string;
    phone: string;
    email: string;
    addressAr: string;
    addressEn: string;
    workingHoursAr: string;
    workingHoursEn: string;
  };
  contact: {
    whatsappUrl: string;
    contactButtonTextAr: string;
    contactButtonTextEn: string;
  };
}

interface AdminUser {
  username: string;
  password: string;
  role: 'admin' | 'superadmin';
  createdAt: string;
}

export default function ContentManagementPage() {
  const { isRTL, t } = useLanguage();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('homepage');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent>({
    homepage: {
      heroTitleAr: 'مكتب أمانك للمحاماة والاستشارات القانونية',
      heroTitleEn: 'Amank Law Firm & Legal Consultations',
      heroSubtitleAr: 'نقدم خدمات قانونية متميزة بخبرة تزيد عن 15 عامًا في مختلف المجالات القانونية',
      heroSubtitleEn: 'We provide exceptional legal services with over 15 years of experience across various legal fields',
      heroButtonTextAr: 'احجز استشارة مجانية',
      heroButtonTextEn: 'Book Free Consultation',
      heroImage: '',
      featuresAr: [
        { title: 'خبرة واسعة', description: 'أكثر من 15 عامًا في الممارسة القانونية' },
        { title: 'ثقة وأمانة', description: 'نحافظ على سرية معلومات عملائنا' },
        { title: 'نتائج مضمونة', description: 'نسعى لتحقيق أفضل النتائج لعملائنا' }
      ],
      featuresEn: [
        { title: 'Extensive Experience', description: 'Over 15 years of legal practice' },
        { title: 'Trust & Integrity', description: 'We maintain client confidentiality' },
        { title: 'Guaranteed Results', description: 'We strive for the best outcomes for our clients' }
      ]
    },
    about: {
      titleAr: 'من نحن',
      titleEn: 'About Us',
      contentAr: 'مكتب أمانك للمحاماة والاستشارات القانونية مؤسسة رائدة في تقديم الخدمات القانونية المتميزة',
      contentEn: 'Amank Law Firm is a leading institution in providing exceptional legal services',
      image: '',
      missionAr: 'تقديم خدمات قانونية متميزة تحقق العدالة وتحمي حقوق عملائنا',
      missionEn: 'To provide exceptional legal services that achieve justice and protect our clients\' rights',
      visionAr: 'أن نكون المكتب القانوني الأول والأكثر ثقة في المنطقة',
      visionEn: 'To be the leading and most trusted law firm in the region'
    },
    footer: {
      descriptionAr: 'مكتب أمانك للمحاماة والاستشارات القانونية - خبرة تزيد عن 15 عامًا في تقديم الخدمات القانونية المتميزة',
      descriptionEn: 'Amank Law Firm - Over 15 years of experience providing exceptional legal services',
      phone: '+966 11 123 4567',
      email: 'info@amank-law.com',
      addressAr: 'الرياض، المملكة العربية السعودية',
      addressEn: 'Riyadh, Saudi Arabia',
      workingHoursAr: 'الأحد - الخميس: 9:00 ص - 6:00 م',
      workingHoursEn: 'Sunday - Thursday: 9:00 AM - 6:00 PM'
    },
    contact: {
      whatsappUrl: 'https://wa.me/966111234567',
      contactButtonTextAr: 'تواصل معنا',
      contactButtonTextEn: 'Contact Us'
    }
  });

  useEffect(() => {
    // Check admin authentication
    try {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (!loggedInUser) {
        console.log('No logged in user found, redirecting to login');
        router.push('/admin-login');
        return;
      }

      const user = JSON.parse(loggedInUser);
      setCurrentUser(user);
      setIsAuthenticated(true);

      // Load saved content
      const savedContent = localStorage.getItem('siteContent');
      if (savedContent) {
        setSiteContent(JSON.parse(savedContent));
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      router.push('/admin-login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleInputChange = (section: keyof SiteContent, field: string, value: string) => {
    setSiteContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFeatureChange = (language: 'Ar' | 'En', index: number, field: 'title' | 'description', value: string) => {
    setSiteContent(prev => ({
      ...prev,
      homepage: {
        ...prev.homepage,
        [`features${language}`]: prev.homepage[`features${language}`].map((feature, i) => 
          i === index ? { ...feature, [field]: value } : feature
        )
      }
    }));
  };

  const handleImageUpload = (section: keyof SiteContent, field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        handleInputChange(section, field, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (section: keyof SiteContent, field: string) => {
    handleInputChange(section, field, '');
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      localStorage.setItem('siteContent', JSON.stringify(siteContent));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      alert(isRTL ? 'حدث خطأ أثناء حفظ المحتوى' : 'Error saving content');
    }
    
    setIsSaving(false);
  };

  const validateWhatsAppUrl = (url: string) => {
    const whatsappRegex = /^https:\/\/wa\.me\/\d+$/;
    return whatsappRegex.test(url);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  // Show error if not authenticated
  if (!isAuthenticated) {
    return null; // Router will handle redirect
  }

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
                {isRTL ? 'إدارة محتوى الموقع' : 'Site Content Management'}
              </h1>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {showSuccess && (
                <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                  <CheckCircle className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {isRTL ? 'تم الحفظ بنجاح!' : 'Saved successfully!'}
                </div>
              )}
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-800 hover:bg-blue-900"
              >
                {isSaving ? (
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="homepage" className="flex items-center">
              <Home className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {isRTL ? 'الرئيسية' : 'Homepage'}
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center">
              <Info className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {isRTL ? 'من نحن' : 'About'}
            </TabsTrigger>
            <TabsTrigger value="footer" className="flex items-center">
              <Phone className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {isRTL ? 'التذييل' : 'Footer'}
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {isRTL ? 'الاتصال' : 'Contact'}
            </TabsTrigger>
          </TabsList>

          {/* Homepage Content */}
          <TabsContent value="homepage" className="space-y-6">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle>{isRTL ? 'محتوى الصفحة الرئيسية' : 'Homepage Content'}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="ar" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="ar">
                      <Languages className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      عربي
                    </TabsTrigger>
                    <TabsTrigger value="en">
                      <Languages className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      English
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ar" className="space-y-6 mt-6">
                    <div>
                      <Label>{isRTL ? 'عنوان البطل' : 'Hero Title'}</Label>
                      <Input
                        value={siteContent.homepage.heroTitleAr}
                        onChange={(e) => handleInputChange('homepage', 'heroTitleAr', e.target.value)}
                        className="mt-2 text-right"
                        dir="rtl"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'العنوان الفرعي' : 'Hero Subtitle'}</Label>
                      <Textarea
                        value={siteContent.homepage.heroSubtitleAr}
                        onChange={(e) => handleInputChange('homepage', 'heroSubtitleAr', e.target.value)}
                        className="mt-2 text-right"
                        dir="rtl"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'نص الزر' : 'Button Text'}</Label>
                      <Input
                        value={siteContent.homepage.heroButtonTextAr}
                        onChange={(e) => handleInputChange('homepage', 'heroButtonTextAr', e.target.value)}
                        className="mt-2 text-right"
                        dir="rtl"
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <Label className="text-lg font-semibold">{isRTL ? 'المميزات' : 'Features'}</Label>
                      <div className="space-y-4 mt-4">
                        {siteContent.homepage.featuresAr.map((feature, index) => (
                          <Card key={index} className="p-4">
                            <div className="space-y-3">
                              <Input
                                placeholder={isRTL ? 'عنوان المميزة' : 'Feature Title'}
                                value={feature.title}
                                onChange={(e) => handleFeatureChange('Ar', index, 'title', e.target.value)}
                                className="text-right"
                                dir="rtl"
                              />
                              <Textarea
                                placeholder={isRTL ? 'وصف المميزة' : 'Feature Description'}
                                value={feature.description}
                                onChange={(e) => handleFeatureChange('Ar', index, 'description', e.target.value)}
                                className="text-right"
                                dir="rtl"
                              />
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="en" className="space-y-6 mt-6">
                    <div>
                      <Label>{isRTL ? 'عنوان البطل' : 'Hero Title'}</Label>
                      <Input
                        value={siteContent.homepage.heroTitleEn}
                        onChange={(e) => handleInputChange('homepage', 'heroTitleEn', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'العنوان الفرعي' : 'Hero Subtitle'}</Label>
                      <Textarea
                        value={siteContent.homepage.heroSubtitleEn}
                        onChange={(e) => handleInputChange('homepage', 'heroSubtitleEn', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'نص الزر' : 'Button Text'}</Label>
                      <Input
                        value={siteContent.homepage.heroButtonTextEn}
                        onChange={(e) => handleInputChange('homepage', 'heroButtonTextEn', e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <Label className="text-lg font-semibold">{isRTL ? 'المميزات' : 'Features'}</Label>
                      <div className="space-y-4 mt-4">
                        {siteContent.homepage.featuresEn.map((feature, index) => (
                          <Card key={index} className="p-4">
                            <div className="space-y-3">
                              <Input
                                placeholder="Feature Title"
                                value={feature.title}
                                onChange={(e) => handleFeatureChange('En', index, 'title', e.target.value)}
                              />
                              <Textarea
                                placeholder="Feature Description"
                                value={feature.description}
                                onChange={(e) => handleFeatureChange('En', index, 'description', e.target.value)}
                              />
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Hero Image */}
                <div className="mt-6">
                  <Label className="text-lg font-semibold">{isRTL ? 'صورة البطل' : 'Hero Image'}</Label>
                  <div className="mt-4">
                    {!siteContent.homepage.heroImage ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">
                          {isRTL ? 'اختر صورة للصفحة الرئيسية' : 'Choose a hero image'}
                        </p>
                        <label htmlFor="hero-image-upload">
                          <Button type="button" variant="outline" className="cursor-pointer" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                              {isRTL ? 'رفع صورة' : 'Upload Image'}
                            </span>
                          </Button>
                        </label>
                        <input
                          id="hero-image-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('homepage', 'heroImage', e)}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={siteContent.homepage.heroImage}
                          alt="Hero"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage('homepage', 'heroImage')}
                          className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Content */}
          <TabsContent value="about" className="space-y-6">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle>{isRTL ? 'محتوى صفحة من نحن' : 'About Page Content'}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="ar" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="ar">
                      <Languages className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      عربي
                    </TabsTrigger>
                    <TabsTrigger value="en">
                      <Languages className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      English
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ar" className="space-y-6 mt-6">
                    <div>
                      <Label>{isRTL ? 'العنوان' : 'Title'}</Label>
                      <Input
                        value={siteContent.about.titleAr}
                        onChange={(e) => handleInputChange('about', 'titleAr', e.target.value)}
                        className="mt-2 text-right"
                        dir="rtl"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'المحتوى' : 'Content'}</Label>
                      <Textarea
                        value={siteContent.about.contentAr}
                        onChange={(e) => handleInputChange('about', 'contentAr', e.target.value)}
                        className="mt-2 min-h-32 text-right"
                        dir="rtl"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'الرسالة' : 'Mission'}</Label>
                      <Textarea
                        value={siteContent.about.missionAr}
                        onChange={(e) => handleInputChange('about', 'missionAr', e.target.value)}
                        className="mt-2 text-right"
                        dir="rtl"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'الرؤية' : 'Vision'}</Label>
                      <Textarea
                        value={siteContent.about.visionAr}
                        onChange={(e) => handleInputChange('about', 'visionAr', e.target.value)}
                        className="mt-2 text-right"
                        dir="rtl"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="en" className="space-y-6 mt-6">
                    <div>
                      <Label>{isRTL ? 'العنوان' : 'Title'}</Label>
                      <Input
                        value={siteContent.about.titleEn}
                        onChange={(e) => handleInputChange('about', 'titleEn', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'المحتوى' : 'Content'}</Label>
                      <Textarea
                        value={siteContent.about.contentEn}
                        onChange={(e) => handleInputChange('about', 'contentEn', e.target.value)}
                        className="mt-2 min-h-32"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'الرسالة' : 'Mission'}</Label>
                      <Textarea
                        value={siteContent.about.missionEn}
                        onChange={(e) => handleInputChange('about', 'missionEn', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'الرؤية' : 'Vision'}</Label>
                      <Textarea
                        value={siteContent.about.visionEn}
                        onChange={(e) => handleInputChange('about', 'visionEn', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* About Image */}
                <div className="mt-6">
                  <Label className="text-lg font-semibold">{isRTL ? 'صورة من نحن' : 'About Image'}</Label>
                  <div className="mt-4">
                    {!siteContent.about.image ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">
                          {isRTL ? 'اختر صورة لصفحة من نحن' : 'Choose an about image'}
                        </p>
                        <label htmlFor="about-image-upload">
                          <Button type="button" variant="outline" className="cursor-pointer" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                              {isRTL ? 'رفع صورة' : 'Upload Image'}
                            </span>
                          </Button>
                        </label>
                        <input
                          id="about-image-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('about', 'image', e)}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={siteContent.about.image}
                          alt="About"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage('about', 'image')}
                          className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Footer Content */}
          <TabsContent value="footer" className="space-y-6">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle>{isRTL ? 'محتوى التذييل' : 'Footer Content'}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="ar" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="ar">
                      <Languages className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      عربي
                    </TabsTrigger>
                    <TabsTrigger value="en">
                      <Languages className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      English
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ar" className="space-y-6 mt-6">
                    <div>
                      <Label>{isRTL ? 'وصف الشركة' : 'Company Description'}</Label>
                      <Textarea
                        value={siteContent.footer.descriptionAr}
                        onChange={(e) => handleInputChange('footer', 'descriptionAr', e.target.value)}
                        className="mt-2 text-right"
                        dir="rtl"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'العنوان' : 'Address'}</Label>
                      <Textarea
                        value={siteContent.footer.addressAr}
                        onChange={(e) => handleInputChange('footer', 'addressAr', e.target.value)}
                        className="mt-2 text-right"
                        dir="rtl"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'ساعات العمل' : 'Working Hours'}</Label>
                      <Input
                        value={siteContent.footer.workingHoursAr}
                        onChange={(e) => handleInputChange('footer', 'workingHoursAr', e.target.value)}
                        className="mt-2 text-right"
                        dir="rtl"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="en" className="space-y-6 mt-6">
                    <div>
                      <Label>{isRTL ? 'وصف الشركة' : 'Company Description'}</Label>
                      <Textarea
                        value={siteContent.footer.descriptionEn}
                        onChange={(e) => handleInputChange('footer', 'descriptionEn', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'العنوان' : 'Address'}</Label>
                      <Textarea
                        value={siteContent.footer.addressEn}
                        onChange={(e) => handleInputChange('footer', 'addressEn', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'ساعات العمل' : 'Working Hours'}</Label>
                      <Input
                        value={siteContent.footer.workingHoursEn}
                        onChange={(e) => handleInputChange('footer', 'workingHoursEn', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Contact Info */}
                <div className="mt-6 space-y-4">
                  <Label className="text-lg font-semibold">{isRTL ? 'معلومات الاتصال' : 'Contact Information'}</Label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                      <Input
                        value={siteContent.footer.phone}
                        onChange={(e) => handleInputChange('footer', 'phone', e.target.value)}
                        className="mt-2"
                        dir="ltr"
                      />
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'البريد الإلكتروني' : 'Email Address'}</Label>
                      <Input
                        type="email"
                        value={siteContent.footer.email}
                        onChange={(e) => handleInputChange('footer', 'email', e.target.value)}
                        className="mt-2"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Settings */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle>{isRTL ? 'إعدادات الاتصال' : 'Contact Settings'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>{isRTL ? 'رابط واتساب' : 'WhatsApp URL'}</Label>
                  <Input
                    value={siteContent.contact.whatsappUrl}
                    onChange={(e) => handleInputChange('contact', 'whatsappUrl', e.target.value)}
                    className="mt-2"
                    dir="ltr"
                    placeholder="https://wa.me/966111234567"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {isRTL 
                      ? 'مثال: https://wa.me/966111234567'
                      : 'Example: https://wa.me/966111234567'
                    }
                  </p>
                  {siteContent.contact.whatsappUrl && !validateWhatsAppUrl(siteContent.contact.whatsappUrl) && (
                    <p className="text-sm text-red-500 mt-1">
                      {isRTL ? 'رابط واتساب غير صحيح' : 'Invalid WhatsApp URL format'}
                    </p>
                  )}
                </div>

                <Tabs defaultValue="ar" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="ar">
                      <Languages className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      عربي
                    </TabsTrigger>
                    <TabsTrigger value="en">
                      <Languages className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      English
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ar" className="space-y-4 mt-6">
                    <div>
                      <Label>{isRTL ? 'نص زر الاتصال' : 'Contact Button Text'}</Label>
                      <Input
                        value={siteContent.contact.contactButtonTextAr}
                        onChange={(e) => handleInputChange('contact', 'contactButtonTextAr', e.target.value)}
                        className="mt-2 text-right"
                        dir="rtl"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="en" className="space-y-4 mt-6">
                    <div>
                      <Label>{isRTL ? 'نص زر الاتصال' : 'Contact Button Text'}</Label>
                      <Input
                        value={siteContent.contact.contactButtonTextEn}
                        onChange={(e) => handleInputChange('contact', 'contactButtonTextEn', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Preview */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    {isRTL ? 'معاينة الزر' : 'Button Preview'}
                  </Label>
                  <Button 
                    className="bg-blue-800 hover:bg-blue-900"
                    onClick={() => window.open(siteContent.contact.whatsappUrl, '_blank')}
                    disabled={!validateWhatsAppUrl(siteContent.contact.whatsappUrl)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    {isRTL ? siteContent.contact.contactButtonTextAr : siteContent.contact.contactButtonTextEn}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}