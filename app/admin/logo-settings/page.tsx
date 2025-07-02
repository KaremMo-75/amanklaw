'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Image as ImageIcon,
  Save,
  CheckCircle,
  Scale
} from 'lucide-react';

export default function LogoSettingsPage() {
  const { isRTL, t } = useLanguage();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [logo, setLogo] = useState<string>('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check admin authentication and role
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/admin-login');
      return;
    }

    const user = JSON.parse(loggedInUser);
    if (user.role !== 'superadmin') {
      router.push('/admin/dashboard');
      return;
    }

    setCurrentUser(user);

    // Load existing logo
    const siteContent = JSON.parse(localStorage.getItem('siteContent') || '{}');
    if (siteContent.logo) {
      setLogo(siteContent.logo);
    }
  }, [router]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert(isRTL ? 'حجم الملف كبير جداً. الحد الأقصى 2 ميجابايت' : 'File size too large. Maximum 2MB allowed');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert(isRTL ? 'يرجى اختيار ملف صورة صحيح' : 'Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogo(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogo('');
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Get existing site content
      const siteContent = JSON.parse(localStorage.getItem('siteContent') || '{}');
      
      // Update logo
      siteContent.logo = logo;
      
      // Save to localStorage
      localStorage.setItem('siteContent', JSON.stringify(siteContent));
      
      setSuccess(isRTL ? 'تم حفظ الشعار بنجاح!' : 'Logo saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      alert(isRTL ? 'حدث خطأ أثناء حفظ الشعار' : 'Error saving logo');
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
                {isRTL ? 'إعدادات الشعار' : 'Logo Settings'}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {isRTL ? 'رفع الشعار' : 'Upload Logo'}
              </CardTitle>
              <p className="text-gray-600 text-sm">
                {isRTL 
                  ? 'ارفع شعار الموقع الجديد. الحد الأقصى للحجم 2 ميجابايت'
                  : 'Upload a new site logo. Maximum file size 2MB'
                }
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {!logo ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    {isRTL ? 'اختر ملف الشعار' : 'Choose logo file'}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {isRTL ? 'PNG, JPG, SVG حتى 2MB' : 'PNG, JPG, SVG up to 2MB'}
                  </p>
                  <label htmlFor="logo-upload">
                    <Button type="button" variant="outline" className="cursor-pointer" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                        {isRTL ? 'رفع شعار' : 'Upload Logo'}
                      </span>
                    </Button>
                  </label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative bg-gray-50 rounded-lg p-6 text-center">
                    <img
                      src={logo}
                      alt="Logo"
                      className="max-h-32 mx-auto"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex space-x-4 rtl:space-x-reverse">
                    <label htmlFor="logo-upload-replace" className="flex-1">
                      <Button type="button" variant="outline" className="w-full cursor-pointer" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {isRTL ? 'استبدال الشعار' : 'Replace Logo'}
                        </span>
                      </Button>
                    </label>
                    <input
                      id="logo-upload-replace"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex-1 bg-blue-800 hover:bg-blue-900"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                          {isRTL ? 'جاري الحفظ...' : 'Saving...'}
                        </div>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {isRTL ? 'حفظ' : 'Save'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {isRTL ? 'معاينة' : 'Preview'}
              </CardTitle>
              <p className="text-gray-600 text-sm">
                {isRTL 
                  ? 'كيف سيظهر الشعار في الموقع'
                  : 'How the logo will appear on the website'
                }
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Header Preview */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  {isRTL ? 'في رأس الصفحة' : 'In Header'}
                </h3>
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      {logo ? (
                        <img src={logo} alt="Logo" className="h-8 w-auto" />
                      ) : (
                        <Scale className="h-8 w-8 text-blue-800" />
                      )}
                      <div className="text-xl font-bold text-blue-800">
                        {isRTL ? 'أمانك' : 'Amank'}
                      </div>
                    </div>
                    <div className="flex space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                      <span>{isRTL ? 'الرئيسية' : 'Home'}</span>
                      <span>{isRTL ? 'من نحن' : 'About'}</span>
                      <span>{isRTL ? 'الخدمات' : 'Services'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Preview */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  {isRTL ? 'في تذييل الصفحة' : 'In Footer'}
                </h3>
                <div className="bg-gray-900 text-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    {logo ? (
                      <img src={logo} alt="Logo" className="h-6 w-auto filter brightness-0 invert" />
                    ) : (
                      <Scale className="h-6 w-6 text-yellow-500" />
                    )}
                    <div className="text-lg font-bold">
                      {isRTL ? 'أمانك' : 'Amank'}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {isRTL 
                      ? 'مكتب أمانك للمحاماة والاستشارات القانونية'
                      : 'Amank Law Firm & Legal Consultations'
                    }
                  </p>
                </div>
              </div>

              {/* Guidelines */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">
                  {isRTL ? 'إرشادات الشعار' : 'Logo Guidelines'}
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• {isRTL ? 'استخدم خلفية شفافة للحصول على أفضل النتائج' : 'Use transparent background for best results'}</li>
                  <li>• {isRTL ? 'الأبعاد المثلى: 200x60 بكسل' : 'Optimal dimensions: 200x60 pixels'}</li>
                  <li>• {isRTL ? 'تنسيقات مدعومة: PNG, JPG, SVG' : 'Supported formats: PNG, JPG, SVG'}</li>
                  <li>• {isRTL ? 'الحد الأقصى للحجم: 2 ميجابايت' : 'Maximum file size: 2MB'}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}