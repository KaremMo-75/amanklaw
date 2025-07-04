'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  FileText,
  Calendar,
  User,
  Tag,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';

interface Article {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  excerptAr: string;
  excerptEn: string;
  author: string;
  date: string;
  category: string;
  categoryNameAr: string;
  categoryNameEn: string;
  readTime: string;
  image: string;
  tags: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function ManageArticles() {
  const { isRTL, t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    contentAr: '',
    contentEn: '',
    excerptAr: '',
    excerptEn: '',
    author: '',
    date: '',
    category: '',
    readTime: '',
    image: '',
    tags: ''
  });
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    const savedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
    setArticles(savedArticles);
  };

  const categories = [
    { id: 'civil', nameAr: 'القانون المدني', nameEn: 'Civil Law' },
    { id: 'commercial', nameAr: 'القانون التجاري', nameEn: 'Commercial Law' },
    { id: 'family', nameAr: 'قانون الأسرة', nameEn: 'Family Law' },
    { id: 'criminal', nameAr: 'القانون الجنائي', nameEn: 'Criminal Law' },
    { id: 'real-estate', nameAr: 'العقارات', nameEn: 'Real Estate' },
    { id: 'labor', nameAr: 'قانون العمل', nameEn: 'Labor Law' },
  ];

  const resetForm = () => {
    setFormData({
      titleAr: '',
      titleEn: '',
      contentAr: '',
      contentEn: '',
      excerptAr: '',
      excerptEn: '',
      author: '',
      date: '',
      category: '',
      readTime: '',
      image: '',
      tags: ''
    });
    setEditingArticle(null);
    setShowForm(false);
    setErrors([]);
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.titleAr.trim()) {
      newErrors.push(isRTL ? 'العنوان بالعربية مطلوب' : 'Arabic title is required');
    }
    if (!formData.titleEn.trim()) {
      newErrors.push(isRTL ? 'العنوان بالإنجليزية مطلوب' : 'English title is required');
    }
    if (!formData.contentAr.trim()) {
      newErrors.push(isRTL ? 'المحتوى بالعربية مطلوب' : 'Arabic content is required');
    }
    if (!formData.contentEn.trim()) {
      newErrors.push(isRTL ? 'المحتوى بالإنجليزية مطلوب' : 'English content is required');
    }
    if (!formData.author.trim()) {
      newErrors.push(isRTL ? 'اسم الكاتب مطلوب' : 'Author name is required');
    }
    if (!formData.date.trim()) {
      newErrors.push(isRTL ? 'تاريخ النشر مطلوب' : 'Publication date is required');
    }
    if (!formData.category.trim()) {
      newErrors.push(isRTL ? 'التصنيف مطلوب' : 'Category is required');
    }
    if (!formData.readTime.trim()) {
      newErrors.push(isRTL ? 'وقت القراءة مطلوب' : 'Read time is required');
    }
    if (!formData.image.trim()) {
      newErrors.push(isRTL ? 'رابط الصورة مطلوب' : 'Image URL is required');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const selectedCategory = categories.find(cat => cat.id === formData.category);
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    if (editingArticle) {
      // Update existing article
      const updatedArticles = articles.map(article => 
        article.id === editingArticle.id 
          ? { 
              ...article, 
              ...formData,
              categoryNameAr: selectedCategory?.nameAr || '',
              categoryNameEn: selectedCategory?.nameEn || '',
              tags: tagsArray,
              updatedAt: new Date().toISOString()
            }
          : article
      );
      setArticles(updatedArticles);
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
      setSuccess(isRTL ? 'تم تحديث المقال بنجاح!' : 'Article updated successfully!');
    } else {
      // Add new article
      const newArticle: Article = {
        id: Date.now().toString(),
        ...formData,
        categoryNameAr: selectedCategory?.nameAr || '',
        categoryNameEn: selectedCategory?.nameEn || '',
        tags: tagsArray,
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const updatedArticles = [...articles, newArticle];
      setArticles(updatedArticles);
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
      setSuccess(isRTL ? 'تم إضافة المقال بنجاح!' : 'Article added successfully!');
    }

    resetForm();
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleEdit = (article: Article) => {
    setFormData({
      titleAr: article.titleAr,
      titleEn: article.titleEn,
      contentAr: article.contentAr,
      contentEn: article.contentEn,
      excerptAr: article.excerptAr,
      excerptEn: article.excerptEn,
      author: article.author,
      date: article.date,
      category: article.category,
      readTime: article.readTime,
      image: article.image,
      tags: article.tags.join(', ')
    });
    setEditingArticle(article);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm(isRTL ? 'هل أنت متأكد من حذف هذا المقال؟' : 'Are you sure you want to delete this article?')) {
      const updatedArticles = articles.filter(article => article.id !== id);
      setArticles(updatedArticles);
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
      setSuccess(isRTL ? 'تم حذف المقال بنجاح!' : 'Article deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isRTL ? 'إدارة المقالات' : 'Manage Articles'}
          </h2>
          <p className="text-gray-600">
            {isRTL 
              ? 'إضافة وتحرير وحذف مقالات المدونة القانونية'
              : 'Add, edit, and delete legal blog articles'
            }
          </p>
        </div>
        {success && (
          <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            <CheckCircle className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
            {success}
          </div>
        )}
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {isRTL ? 'إضافة مقال' : 'Add Article'}
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
              {editingArticle 
                ? (isRTL ? 'تحرير المقال' : 'Edit Article')
                : (isRTL ? 'إضافة مقال جديد' : 'Add New Article')
              }
            </CardTitle>
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

              {/* Title Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="titleAr">{isRTL ? 'العنوان بالعربية' : 'Title in Arabic'}</Label>
                  <Input
                    id="titleAr"
                    value={formData.titleAr}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleAr: e.target.value }))}
                    className="mt-2 text-right"
                    dir="rtl"
                    placeholder={isRTL ? 'أدخل عنوان المقال بالعربية' : 'Enter article title in Arabic'}
                  />
                </div>

                <div>
                  <Label htmlFor="titleEn">{isRTL ? 'العنوان بالإنجليزية' : 'Title in English'}</Label>
                  <Input
                    id="titleEn"
                    value={formData.titleEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
                    className="mt-2"
                    placeholder={isRTL ? 'أدخل عنوان المقال بالإنجليزية' : 'Enter article title in English'}
                  />
                </div>
              </div>

              {/* Excerpt Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="excerptAr">{isRTL ? 'الملخص بالعربية' : 'Excerpt in Arabic'}</Label>
                  <Textarea
                    id="excerptAr"
                    value={formData.excerptAr}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerptAr: e.target.value }))}
                    className="mt-2 min-h-20 text-right"
                    dir="rtl"
                    placeholder={isRTL ? 'ملخص قصير للمقال بالعربية' : 'Short excerpt in Arabic'}
                  />
                </div>

                <div>
                  <Label htmlFor="excerptEn">{isRTL ? 'الملخص بالإنجليزية' : 'Excerpt in English'}</Label>
                  <Textarea
                    id="excerptEn"
                    value={formData.excerptEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerptEn: e.target.value }))}
                    className="mt-2 min-h-20"
                    placeholder={isRTL ? 'ملخص قصير للمقال بالإنجليزية' : 'Short excerpt in English'}
                  />
                </div>
              </div>

              {/* Content Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contentAr">{isRTL ? 'المحتوى بالعربية' : 'Content in Arabic'}</Label>
                  <Textarea
                    id="contentAr"
                    value={formData.contentAr}
                    onChange={(e) => setFormData(prev => ({ ...prev, contentAr: e.target.value }))}
                    className="mt-2 min-h-48 text-right"
                    dir="rtl"
                    placeholder={isRTL ? 'محتوى المقال الكامل بالعربية (يمكن استخدام Markdown)' : 'Full article content in Arabic (Markdown supported)'}
                  />
                </div>

                <div>
                  <Label htmlFor="contentEn">{isRTL ? 'المحتوى بالإنجليزية' : 'Content in English'}</Label>
                  <Textarea
                    id="contentEn"
                    value={formData.contentEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, contentEn: e.target.value }))}
                    className="mt-2 min-h-48"
                    placeholder={isRTL ? 'محتوى المقال الكامل بالإنجليزية (يمكن استخدام Markdown)' : 'Full article content in English (Markdown supported)'}
                  />
                </div>
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="author">{isRTL ? 'الكاتب' : 'Author'}</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="mt-2"
                    placeholder={isRTL ? 'اسم الكاتب' : 'Author name'}
                  />
                </div>

                <div>
                  <Label htmlFor="date">{isRTL ? 'تاريخ النشر' : 'Publication Date'}</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="category">{isRTL ? 'التصنيف' : 'Category'}</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={isRTL ? 'اختر التصنيف' : 'Select category'} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {isRTL ? category.nameAr : category.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="readTime">{isRTL ? 'وقت القراءة' : 'Read Time'}</Label>
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                    className="mt-2"
                    placeholder={isRTL ? '5 دقائق' : '5 min read'}
                  />
                </div>
              </div>

              {/* Image and Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="image">{isRTL ? 'رابط الصورة' : 'Image URL'}</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="mt-2"
                    placeholder="https://example.com/image.jpg"
                    dir="ltr"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">{isRTL ? 'الكلمات المفتاحية' : 'Tags'}</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    className="mt-2"
                    placeholder={isRTL ? 'كلمة1، كلمة2، كلمة3' : 'tag1, tag2, tag3'}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {isRTL ? 'افصل بين الكلمات بفاصلة' : 'Separate tags with commas'}
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 rtl:space-x-reverse">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {editingArticle 
                    ? (isRTL ? 'تحديث المقال' : 'Update Article')
                    : (isRTL ? 'إضافة المقال' : 'Add Article')
                  }
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Articles Table */}
      <Card className="bg-white shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
            {isRTL ? 'قائمة المقالات' : 'Articles List'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {articles.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isRTL ? 'لا توجد مقالات' : 'No Articles Found'}
              </h3>
              <p className="text-gray-600">
                {isRTL ? 'ابدأ بإضافة مقال جديد' : 'Start by adding a new article'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="aspect-video">
                    <img 
                      src={article.image} 
                      alt={isRTL ? article.titleAr : article.titleEn}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {isRTL ? article.categoryNameAr : article.categoryNameEn}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500">
                        <Eye className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                        {article.views}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                      {isRTL ? article.titleAr : article.titleEn}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {isRTL ? article.excerptAr : article.excerptEn}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                        <span className="mr-2 rtl:mr-0 rtl:ml-2">{article.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                        {new Date(article.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button
                        onClick={() => handleEdit(article)}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                        {isRTL ? 'تحرير' : 'Edit'}
                      </Button>
                      <Button
                        onClick={() => handleDelete(article.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}