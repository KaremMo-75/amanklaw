'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  Eye, 
  Calendar, 
  Image as ImageIcon, 
  Tag, 
  FileText,
  Languages,
  Plus,
  X,
  Upload
} from 'lucide-react';

export default function BlogAdminPage() {
  const { isRTL, t, language } = useLanguage();
  const [postData, setPostData] = useState({
    titleAr: '',
    titleEn: '',
    contentAr: '',
    contentEn: '',
    excerptAr: '',
    excerptEn: '',
    category: '',
    tags: [] as string[],
    featuredImage: '',
    publishDate: '',
    status: 'draft' as 'draft' | 'published' | 'scheduled'
  });
  
  const [currentTag, setCurrentTag] = useState('');

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
    setPostData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (currentTag.trim() && !postData.tags.includes(currentTag.trim())) {
      setPostData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPostData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = (status: 'draft' | 'published' | 'scheduled') => {
    const updatedPost = { ...postData, status };
    console.log('Saving post:', updatedPost);
    // Here you would typically send the data to your backend
    alert(isRTL ? 'تم حفظ المقال بنجاح!' : 'Article saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('createPost')}
          </h1>
          <p className="text-gray-600">
            {isRTL 
              ? 'إنشاء وإدارة المقالات القانونية باللغتين العربية والإنجليزية'
              : 'Create and manage legal articles in both Arabic and English'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post Content */}
            <Card>
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
                  
                  <TabsContent value="ar" className="space-y-4">
                    <div>
                      <Label htmlFor="titleAr">{isRTL ? 'العنوان بالعربية' : 'Arabic Title'}</Label>
                      <Input
                        id="titleAr"
                        value={postData.titleAr}
                        onChange={(e) => handleInputChange('titleAr', e.target.value)}
                        placeholder={isRTL ? 'أدخل عنوان المقال باللغة العربية' : 'Enter article title in Arabic'}
                        className="text-right"
                        dir="rtl"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="excerptAr">{isRTL ? 'الملخص بالعربية' : 'Arabic Excerpt'}</Label>
                      <Textarea
                        id="excerptAr"
                        value={postData.excerptAr}
                        onChange={(e) => handleInputChange('excerptAr', e.target.value)}
                        placeholder={isRTL ? 'ملخص قصير للمقال باللغة العربية' : 'Short excerpt in Arabic'}
                        className="min-h-20 text-right"
                        dir="rtl"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="contentAr">{isRTL ? 'المحتوى بالعربية' : 'Arabic Content'}</Label>
                      <Textarea
                        id="contentAr"
                        value={postData.contentAr}
                        onChange={(e) => handleInputChange('contentAr', e.target.value)}
                        placeholder={isRTL ? 'محتوى المقال الكامل باللغة العربية' : 'Full article content in Arabic'}
                        className="min-h-96 text-right"
                        dir="rtl"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="en" className="space-y-4">
                    <div>
                      <Label htmlFor="titleEn">{isRTL ? 'العنوان بالإنجليزية' : 'English Title'}</Label>
                      <Input
                        id="titleEn"
                        value={postData.titleEn}
                        onChange={(e) => handleInputChange('titleEn', e.target.value)}
                        placeholder={isRTL ? 'أدخل عنوان المقال باللغة الإنجليزية' : 'Enter article title in English'}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="excerptEn">{isRTL ? 'الملخص بالإنجليزية' : 'English Excerpt'}</Label>
                      <Textarea
                        id="excerptEn"
                        value={postData.excerptEn}
                        onChange={(e) => handleInputChange('excerptEn', e.target.value)}
                        placeholder={isRTL ? 'ملخص قصير للمقال باللغة الإنجليزية' : 'Short excerpt in English'}
                        className="min-h-20"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="contentEn">{isRTL ? 'المحتوى بالإنجليزية' : 'English Content'}</Label>
                      <Textarea
                        id="contentEn"
                        value={postData.contentEn}
                        onChange={(e) => handleInputChange('contentEn', e.target.value)}
                        placeholder={isRTL ? 'محتوى المقال الكامل باللغة الإنجليزية' : 'Full article content in English'}
                        className="min-h-96"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  {isRTL ? 'خيارات النشر' : 'Publishing Options'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">{isRTL ? 'حالة المقال' : 'Status'}</Label>
                  <Select value={postData.status} onValueChange={(value: 'draft' | 'published' | 'scheduled') => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">{isRTL ? 'مسودة' : 'Draft'}</SelectItem>
                      <SelectItem value="published">{isRTL ? 'منشور' : 'Published'}</SelectItem>
                      <SelectItem value="scheduled">{isRTL ? 'مجدول' : 'Scheduled'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {postData.status === 'scheduled' && (
                  <div>
                    <Label htmlFor="publishDate">{isRTL ? 'تاريخ النشر' : 'Publish Date'}</Label>
                    <Input
                      id="publishDate"
                      type="datetime-local"
                      value={postData.publishDate}
                      onChange={(e) => handleInputChange('publishDate', e.target.value)}
                    />
                  </div>
                )}
                
                <div className="flex flex-col space-y-2">
                  <Button onClick={() => handleSave('draft')} variant="outline" className="w-full">
                    <Save className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    {t('draft')}
                  </Button>
                  <Button onClick={() => handleSave('published')} className="w-full">
                    <Eye className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    {t('publish')}
                  </Button>
                  {postData.status === 'scheduled' && (
                    <Button onClick={() => handleSave('scheduled')} className="w-full bg-yellow-600 hover:bg-yellow-700">
                      <Calendar className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      {t('schedule')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardHeader>
                <CardTitle>{t('category')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={postData.category} onValueChange={(value) => handleInputChange('category', value)}>
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

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  {t('tags')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder={isRTL ? 'أضف كلمة مفتاحية' : 'Add a tag'}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {postData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 rtl:ml-0 rtl:mr-2 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  {t('featuredImage')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="featuredImage">{isRTL ? 'رابط الصورة' : 'Image URL'}</Label>
                  <Input
                    id="featuredImage"
                    value={postData.featuredImage}
                    onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {isRTL ? 'رفع صورة' : 'Upload Image'}
                </Button>
                
                {postData.featuredImage && (
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={postData.featuredImage}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}