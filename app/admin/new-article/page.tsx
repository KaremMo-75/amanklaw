'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  ArrowLeft, 
  Upload, 
  X, 
  Image as ImageIcon,
  Languages,
  FileText,
  Tag
} from 'lucide-react';

interface Article {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  excerptAr: string;
  excerptEn: string;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

export default function NewArticlePage() {
  const { isRTL, t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  
  const [formData, setFormData] = useState<Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'views'>>({
    titleAr: '',
    titleEn: '',
    contentAr: '',
    contentEn: '',
    excerptAr: '',
    excerptEn: '',
    category: '',
    image: ''
  });
  
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check admin authentication
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/admin-login');
      return;
    }

    // Load article for editing
    if (editId) {
      const articles = JSON.parse(localStorage.getItem('cmsArticles') || '[]');
      const article = articles.find((a: Article) => a.id === editId);
      if (article) {
        setFormData({
          titleAr: article.titleAr,
          titleEn: article.titleEn,
          contentAr: article.contentAr,
          contentEn: article.contentEn,
          excerptAr: article.excerptAr,
          excerptEn: article.excerptEn,
          category: article.category,
          image: article.image
        });
        setImagePreview(article.image);
      }
    }
  }, [router, editId]);

  const categories = isRTL ? [
    { id: 'civil', name: 'القانون المدني' },
    { id: 'commercial', name: 'القانون التجاري' },
    { id: 'family', name: 'قانون الأسرة' },
    { id: 'criminal', name: 'القانون الجنائي' },
    { id: 'real-estate', name: 'العقارات' },
    { id: 'labor', name: 'قانون العمل' },
  ] : [
    { id: 'civil', name: 'Civil Law' },
    { id: 'commercial', name: 'Commercial Law' },
    { id: 'family', name: 'Family Law' },
    { id: 'criminal', name: 'Criminal Law' },
    { id: 'real-estate', name: 'Real Estate' },
    { id: 'labor', name: 'Labor Law' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    if (!formData.titleAr || !formData.titleEn || !formData.contentAr || !formData.contentEn || !formData.category) {
      alert(isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    try {
      const articles = JSON.parse(localStorage.getItem('cmsArticles') || '[]');
      const now = new Date().toISOString();

      if (editId) {
        // Update existing article
        const articleIndex = articles.findIndex((a: Article) => a.id === editId);
        if (articleIndex !== -1) {
          articles[articleIndex] = {
            ...articles[articleIndex],
            ...formData,
            updatedAt: now
          };
        }
      } else {
        // Create new article
        const newArticle: Article = {
          id: Date.now().toString(),
          ...formData,
          createdAt: now,
          updatedAt: now,
          views: 0
        };
        articles.push(newArticle);
      }

      localStorage.setItem('cmsArticles', JSON.stringify(articles));
      
      // Show success message
      alert(isRTL ? 'تم حفظ المقال بنجاح!' : 'Article saved successfully!');
      
      // Redirect to articles list
      router.push('/admin/articles');
    } catch (error) {
      alert(isRTL ? 'حدث خطأ أثناء حفظ المقال' : 'Error saving article');
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
                {editId 
                  ? (isRTL ? 'تحرير المقال' : 'Edit Article')
                  : (isRTL ? 'إنشاء مقال جديد' : 'Create New Article')
                }
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Article Content */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                    {isRTL ? 'محتوى المقال' : 'Article Content'}
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
                    
                    <TabsContent value="ar" className="space-y-4 mt-6">
                      <div>
                        <Label htmlFor="titleAr">{isRTL ? 'العنوان بالعربية' : 'Arabic Title'} *</Label>
                        <Input
                          id="titleAr"
                          value={formData.titleAr}
                          onChange={(e) => handleInputChange('titleAr', e.target.value)}
                          placeholder={isRTL ? 'أدخل عنوان المقال باللغة العربية' : 'Enter article title in Arabic'}
                          className="mt-2 text-right"
                          dir="rtl"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="excerptAr">{isRTL ? 'الملخص بالعربية' : 'Arabic Excerpt'}</Label>
                        <Textarea
                          id="excerptAr"
                          value={formData.excerptAr}
                          onChange={(e) => handleInputChange('excerptAr', e.target.value)}
                          placeholder={isRTL ? 'ملخص قصير للمقال باللغة العربية' : 'Short excerpt in Arabic'}
                          className="mt-2 min-h-20 text-right"
                          dir="rtl"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="contentAr">{isRTL ? 'المحتوى بالعربية' : 'Arabic Content'} *</Label>
                        <Textarea
                          id="contentAr"
                          value={formData.contentAr}
                          onChange={(e) => handleInputChange('contentAr', e.target.value)}
                          placeholder={isRTL ? 'محتوى المقال الكامل باللغة العربية' : 'Full article content in Arabic'}
                          className="mt-2 min-h-96 text-right"
                          dir="rtl"
                          required
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="en" className="space-y-4 mt-6">
                      <div>
                        <Label htmlFor="titleEn">{isRTL ? 'العنوان بالإنجليزية' : 'English Title'} *</Label>
                        <Input
                          id="titleEn"
                          value={formData.titleEn}
                          onChange={(e) => handleInputChange('titleEn', e.target.value)}
                          placeholder={isRTL ? 'أدخل عنوان المقال باللغة الإنجليزية' : 'Enter article title in English'}
                          className="mt-2"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="excerptEn">{isRTL ? 'الملخص بالإنجليزية' : 'English Excerpt'}</Label>
                        <Textarea
                          id="excerptEn"
                          value={formData.excerptEn}
                          onChange={(e) => handleInputChange('excerptEn', e.target.value)}
                          placeholder={isRTL ? 'ملخص قصير للمقال باللغة الإنجليزية' : 'Short excerpt in English'}
                          className="mt-2 min-h-20"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="contentEn">{isRTL ? 'المحتوى بالإنجليزية' : 'English Content'} *</Label>
                        <Textarea
                          id="contentEn"
                          value={formData.contentEn}
                          onChange={(e) => handleInputChange('contentEn', e.target.value)}
                          placeholder={isRTL ? 'محتوى المقال الكامل باللغة الإنجليزية' : 'Full article content in English'}
                          className="mt-2 min-h-96"
                          required
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Category */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                    {t('category')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر التصنيف' : 'Select category'} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                    {isRTL ? 'الصورة المميزة' : 'Featured Image'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        {isRTL ? 'اختر صورة للمقال' : 'Choose an image for the article'}
                      </p>
                      <label htmlFor="image-upload">
                        <Button type="button" variant="outline" className="cursor-pointer" asChild>
                          <span>
                            <Upload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                            {isRTL ? 'رفع صورة' : 'Upload Image'}
                          </span>
                        </Button>
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Save Actions */}
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-blue-800 hover:bg-blue-900"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                        {isRTL ? 'جاري الحفظ...' : 'Saving...'}
                      </div>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                        {editId 
                          ? (isRTL ? 'تحديث المقال' : 'Update Article')
                          : (isRTL ? 'حفظ المقال' : 'Save Article')
                        }
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}