'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
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
  Eye,
  EyeOff,
  Search,
  Filter
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface Lawyer {
  id: string;
  nameAr: string;
  nameEn: string;
  image: string;
}

interface Article {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  isActive: boolean;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function ManageArticles() {
  const { isRTL, t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    contentAr: '',
    contentEn: '',
    isActive: true,
    slug: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    authorId: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    tags: '',
    image: ''
  });
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  // Quill editor configurations
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'script', 'indent', 'direction',
    'size', 'color', 'background', 'align',
    'link', 'image', 'video'
  ];

  useEffect(() => {
    loadArticles();
    loadLawyers();
  }, []);

  const loadArticles = () => {
    const savedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
    setArticles(savedArticles);
  };

  const loadLawyers = () => {
    const savedLawyers = JSON.parse(localStorage.getItem('lawyers') || '[]');
    setLawyers(savedLawyers);
  };

  const categories = [
    { id: 'civil', name: isRTL ? 'القانون المدني' : 'Civil Law' },
    { id: 'commercial', name: isRTL ? 'القانون التجاري' : 'Commercial Law' },
    { id: 'family', name: isRTL ? 'قانون الأسرة' : 'Family Law' },
    { id: 'criminal', name: isRTL ? 'القانون الجنائي' : 'Criminal Law' },
    { id: 'real-estate', name: isRTL ? 'العقارات' : 'Real Estate' },
    { id: 'labor', name: isRTL ? 'قانون العمل' : 'Labor Law' },
  ];

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const resetForm = () => {
    setFormData({
      titleAr: '',
      titleEn: '',
      contentAr: '',
      contentEn: '',
      isActive: true,
      slug: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      authorId: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      tags: '',
      image: ''
    });
    setEditingArticle(null);
    setShowForm(false);
    setShowPreview(false);
    setErrors([]);
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.titleAr.trim()) {
      newErrors.push(isRTL ? 'العنوان بالعربية مطلوب' : 'Arabic title is required');
    }
    if (!formData.contentAr.trim()) {
      newErrors.push(isRTL ? 'المحتوى بالعربية مطلوب' : 'Arabic content is required');
    }
    if (!formData.authorId.trim()) {
      newErrors.push(isRTL ? 'يجب اختيار الكاتب' : 'Author selection is required');
    }
    if (!formData.category.trim()) {
      newErrors.push(isRTL ? 'التصنيف مطلوب' : 'Category is required');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const selectedAuthor = lawyers.find(lawyer => lawyer.id === formData.authorId);
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    const slug = formData.slug || generateSlug(formData.titleEn || formData.titleAr);

    if (editingArticle) {
      // Update existing article
      const updatedArticles = articles.map(article => 
        article.id === editingArticle.id 
          ? { 
              ...article, 
              ...formData,
              slug,
              authorName: isRTL ? selectedAuthor?.nameAr || '' : selectedAuthor?.nameEn || '',
              authorImage: selectedAuthor?.image || '',
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
        slug,
        authorName: isRTL ? selectedAuthor?.nameAr || '' : selectedAuthor?.nameEn || '',
        authorImage: selectedAuthor?.image || '',
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
      isActive: article.isActive,
      slug: article.slug,
      metaTitle: article.metaTitle,
      metaDescription: article.metaDescription,
      metaKeywords: article.metaKeywords,
      authorId: article.authorId,
      date: article.date,
      category: article.category,
      tags: article.tags.join(', '),
      image: article.image
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

  const toggleArticleStatus = (id: string) => {
    const updatedArticles = articles.map(article => 
      article.id === id 
        ? { ...article, isActive: !article.isActive, updatedAt: new Date().toISOString() }
        : article
    );
    setArticles(updatedArticles);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && article.isActive) ||
      (filterStatus === 'inactive' && !article.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const PreviewModal = () => {
    if (!showPreview) return null;

    const selectedAuthor = lawyers.find(lawyer => lawyer.id === formData.authorId);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="text-lg font-bold">
              {isRTL ? 'معاينة المقال' : 'Article Preview'}
            </h3>
            <Button variant="ghost" onClick={() => setShowPreview(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-6">
            {formData.image && (
              <img 
                src={formData.image} 
                alt="Article" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <div className="mb-4">
              <Badge variant="secondary">{categories.find(c => c.id === formData.category)?.name}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL ? formData.titleAr : formData.titleEn || formData.titleAr}
            </h1>
            <div className="flex items-center mb-6 text-sm text-gray-600">
              {selectedAuthor && (
                <>
                  <img 
                    src={selectedAuthor.image} 
                    alt="Author" 
                    className="w-8 h-8 rounded-full mr-3 rtl:mr-0 rtl:ml-3"
                  />
                  <span className="mr-4 rtl:mr-0 rtl:ml-4">
                    {isRTL ? selectedAuthor.nameAr : selectedAuthor.nameEn}
                  </span>
                </>
              )}
              <Calendar className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
              <span>{new Date(formData.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
            </div>
            <div 
              className="prose max-w-none"
              dir={isRTL ? 'rtl' : 'ltr'}
              dangerouslySetInnerHTML={{ 
                __html: isRTL ? formData.contentAr : formData.contentEn || formData.contentAr 
              }}
            />
          </div>
        </div>
      </div>
    );
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

      {/* Search and Filters */}
      <Card className="bg-white shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={isRTL ? 'البحث في المقالات...' : 'Search articles...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rtl:pl-4 rtl:pr-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={isRTL ? 'التصنيف' : 'Category'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isRTL ? 'جميع التصنيفات' : 'All Categories'}</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder={isRTL ? 'الحالة' : 'Status'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isRTL ? 'الكل' : 'All'}</SelectItem>
                  <SelectItem value="active">{isRTL ? 'نشط' : 'Active'}</SelectItem>
                  <SelectItem value="inactive">{isRTL ? 'غير نشط' : 'Inactive'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

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

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="titleAr">{isRTL ? 'العنوان بالعربية *' : 'Arabic Title *'}</Label>
                  <Input
                    id="titleAr"
                    value={formData.titleAr}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, titleAr: e.target.value }));
                      if (!formData.slug && !editingArticle) {
                        setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                      }
                    }}
                    className="mt-2 text-right"
                    dir="rtl"
                    placeholder={isRTL ? 'أدخل عنوان المقال بالعربية' : 'Enter article title in Arabic'}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="titleEn">{isRTL ? 'العنوان بالإنجليزية' : 'English Title'}</Label>
                  <Input
                    id="titleEn"
                    value={formData.titleEn}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, titleEn: e.target.value }));
                      if (!formData.slug && !editingArticle) {
                        setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                      }
                    }}
                    className="mt-2"
                    placeholder={isRTL ? 'أدخل عنوان المقال بالإنجليزية' : 'Enter article title in English'}
                  />
                </div>
              </div>

              {/* Content Fields with Rich Text Editor */}
              <div className="space-y-6">
                <div>
                  <Label>{isRTL ? 'المحتوى بالعربية *' : 'Arabic Content *'}</Label>
                  <div className="mt-2" dir="rtl">
                    <ReactQuill
                      value={formData.contentAr}
                      onChange={(value) => setFormData(prev => ({ ...prev, contentAr: value }))}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder={isRTL ? 'اكتب محتوى المقال بالعربية...' : 'Write article content in Arabic...'}
                      style={{ direction: 'rtl', textAlign: 'right' }}
                    />
                  </div>
                </div>

                <div>
                  <Label>{isRTL ? 'المحتوى بالإنجليزية' : 'English Content'}</Label>
                  <div className="mt-2">
                    <ReactQuill
                      value={formData.contentEn}
                      onChange={(value) => setFormData(prev => ({ ...prev, contentEn: value }))}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder={isRTL ? 'اكتب محتوى المقال بالإنجليزية...' : 'Write article content in English...'}
                    />
                  </div>
                </div>
              </div>

              {/* Article Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="author">{isRTL ? 'الكاتب *' : 'Author *'}</Label>
                  <Select value={formData.authorId} onValueChange={(value) => setFormData(prev => ({ ...prev, authorId: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={isRTL ? 'اختر الكاتب' : 'Select author'} />
                    </SelectTrigger>
                    <SelectContent>
                      {lawyers.map((lawyer) => (
                        <SelectItem key={lawyer.id} value={lawyer.id}>
                          <div className="flex items-center">
                            <img 
                              src={lawyer.image} 
                              alt="Author" 
                              className="w-6 h-6 rounded-full mr-2 rtl:mr-0 rtl:ml-2"
                            />
                            {isRTL ? lawyer.nameAr : lawyer.nameEn}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="category">{isRTL ? 'التصنيف *' : 'Category *'}</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="mt-2">
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
                </div>
              </div>

              {/* SEO Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isRTL ? 'إعدادات SEO' : 'SEO Settings'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="slug">{isRTL ? 'الرابط المختصر' : 'Slug'}</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      className="mt-2"
                      placeholder="article-slug"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <Label htmlFor="metaTitle">{isRTL ? 'عنوان SEO' : 'Meta Title'}</Label>
                    <Input
                      id="metaTitle"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                      className="mt-2"
                      placeholder={isRTL ? 'عنوان للمحركات البحث' : 'SEO title for search engines'}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="metaDescription">{isRTL ? 'وصف SEO' : 'Meta Description'}</Label>
                  <Input
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                    className="mt-2"
                    placeholder={isRTL ? 'وصف مختصر للمقال لمحركات البحث' : 'Brief description for search engines'}
                  />
                </div>

                <div>
                  <Label htmlFor="metaKeywords">{isRTL ? 'كلمات مفتاحية SEO' : 'Meta Keywords'}</Label>
                  <Input
                    id="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaKeywords: e.target.value }))}
                    className="mt-2"
                    placeholder={isRTL ? 'كلمة1، كلمة2، كلمة3' : 'keyword1, keyword2, keyword3'}
                  />
                </div>
              </div>

              {/* Additional Fields */}
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
                </div>
              </div>

              {/* Article Visibility */}
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label className="text-sm font-medium">
                  {formData.isActive 
                    ? (isRTL ? 'المقال مرئي للجمهور' : 'Article is visible to public')
                    : (isRTL ? 'المقال مخفي عن الجمهور' : 'Article is hidden from public')
                  }
                </Label>
              </div>

              {/* Form Actions */}
              <div className="flex space-x-4 rtl:space-x-reverse">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {editingArticle 
                    ? (isRTL ? 'تحديث المقال' : 'Update Article')
                    : (isRTL ? 'إضافة المقال' : 'Add Article')
                  }
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowPreview(true)}
                  disabled={!formData.titleAr || !formData.contentAr}
                >
                  <Eye className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {isRTL ? 'معاينة' : 'Preview'}
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

      {/* Articles List */}
      <Card className="bg-white shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
              {isRTL ? 'قائمة المقالات' : 'Articles List'}
            </div>
            <Badge variant="secondary">
              {filteredArticles.length} {isRTL ? 'مقال' : 'articles'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
                  ? (isRTL ? 'لا توجد مقالات مطابقة' : 'No matching articles')
                  : (isRTL ? 'لا توجد مقالات' : 'No articles found')
                }
              </h3>
              <p className="text-gray-600">
                {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
                  ? (isRTL ? 'جرب تغيير معايير البحث' : 'Try changing your search criteria')
                  : (isRTL ? 'ابدأ بإضافة مقال جديد' : 'Start by adding a new article')
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left rtl:text-right py-3 px-4 font-semibold">
                      {isRTL ? 'العنوان' : 'Title'}
                    </th>
                    <th className="text-left rtl:text-right py-3 px-4 font-semibold">
                      {isRTL ? 'الكاتب' : 'Author'}
                    </th>
                    <th className="text-left rtl:text-right py-3 px-4 font-semibold">
                      {isRTL ? 'التصنيف' : 'Category'}
                    </th>
                    <th className="text-left rtl:text-right py-3 px-4 font-semibold">
                      {isRTL ? 'التاريخ' : 'Date'}
                    </th>
                    <th className="text-left rtl:text-right py-3 px-4 font-semibold">
                      {isRTL ? 'الحالة' : 'Status'}
                    </th>
                    <th className="text-left rtl:text-right py-3 px-4 font-semibold">
                      {isRTL ? 'الإجراءات' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((article) => (
                    <tr key={article.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {article.image && (
                            <img 
                              src={article.image} 
                              alt="Article" 
                              className="w-12 h-12 object-cover rounded mr-3 rtl:mr-0 rtl:ml-3"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-900 line-clamp-1">
                              {isRTL ? article.titleAr : article.titleEn || article.titleAr}
                            </div>
                            <div className="text-sm text-gray-500">
                              {article.views} {isRTL ? 'مشاهدة' : 'views'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img 
                            src={article.authorImage} 
                            alt="Author" 
                            className="w-8 h-8 rounded-full mr-2 rtl:mr-0 rtl:ml-2"
                          />
                          <span className="text-sm">{article.authorName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="text-xs">
                          {categories.find(c => c.id === article.category)?.name}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(article.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Switch
                            checked={article.isActive}
                            onCheckedChange={() => toggleArticleStatus(article.id)}
                            size="sm"
                          />
                          <span className="ml-2 rtl:ml-0 rtl:mr-2 text-xs">
                            {article.isActive 
                              ? (isRTL ? 'نشط' : 'Active')
                              : (isRTL ? 'مخفي' : 'Hidden')
                            }
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button
                            onClick={() => handleEdit(article)}
                            size="sm"
                            variant="outline"
                          >
                            <Edit className="w-3 h-3" />
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Modal */}
      <PreviewModal />
    </div>
  );
}