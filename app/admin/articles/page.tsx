'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  ArrowLeft,
  FileText,
  Calendar,
  Filter
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

interface AdminUser {
  username: string;
  password: string;
  role: 'admin' | 'superadmin';
  createdAt: string;
}

export default function ManageArticlesPage() {
  const { isRTL, t } = useLanguage();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Check admin authentication
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/admin-login');
      return;
    }

    const user = JSON.parse(loggedInUser);
    setCurrentUser(user);

    // Load articles
    loadArticles();
  }, [router]);

  const loadArticles = () => {
    const savedArticles = JSON.parse(localStorage.getItem('cmsArticles') || '[]');
    setArticles(savedArticles);
  };

  const categories = isRTL ? [
    { id: 'all', name: 'جميع المقالات' },
    { id: 'civil', name: 'القانون المدني' },
    { id: 'commercial', name: 'القانون التجاري' },
    { id: 'family', name: 'قانون الأسرة' },
    { id: 'criminal', name: 'القانون الجنائي' },
    { id: 'real-estate', name: 'العقارات' },
    { id: 'labor', name: 'قانون العمل' },
  ] : [
    { id: 'all', name: 'All Articles' },
    { id: 'civil', name: 'Civil Law' },
    { id: 'commercial', name: 'Commercial Law' },
    { id: 'family', name: 'Family Law' },
    { id: 'criminal', name: 'Criminal Law' },
    { id: 'real-estate', name: 'Real Estate' },
    { id: 'labor', name: 'Labor Law' },
  ];

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.titleEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (articleId: string) => {
    // Only superadmin can delete articles
    if (currentUser?.role !== 'superadmin') {
      alert(isRTL ? 'ليس لديك صلاحية لحذف المقالات' : 'You do not have permission to delete articles');
      return;
    }

    if (confirm(isRTL ? 'هل أنت متأكد من حذف هذا المقال؟' : 'Are you sure you want to delete this article?')) {
      const updatedArticles = articles.filter(article => article.id !== articleId);
      setArticles(updatedArticles);
      localStorage.setItem('cmsArticles', JSON.stringify(updatedArticles));
    }
  };

  const handleEdit = (articleId: string) => {
    router.push(`/admin/new-article?edit=${articleId}`);
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
                {isRTL ? 'إدارة المقالات' : 'Manage Articles'}
              </h1>
            </div>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/admin/new-article">
                <Plus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {isRTL ? 'مقال جديد' : 'New Article'}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <Card className="bg-white shadow-lg border-0 mb-8">
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
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="text-sm"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        {filteredArticles.length === 0 ? (
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {searchTerm || selectedCategory !== 'all' 
                  ? (isRTL ? 'لا توجد مقالات مطابقة' : 'No matching articles')
                  : (isRTL ? 'لا توجد مقالات' : 'No articles yet')
                }
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory !== 'all'
                  ? (isRTL ? 'جرب تغيير معايير البحث' : 'Try changing your search criteria')
                  : (isRTL ? 'ابدأ بإنشاء مقالك الأول' : 'Start by creating your first article')
                }
              </p>
              {(!searchTerm && selectedCategory === 'all') && (
                <Button asChild className="bg-blue-800 hover:bg-blue-900">
                  <Link href="/admin/new-article">
                    <Plus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    {isRTL ? 'إنشاء مقال جديد' : 'Create New Article'}
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                {article.image && (
                  <div className="aspect-video">
                    <img 
                      src={article.image} 
                      alt={isRTL ? article.titleAr : article.titleEn}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryName(article.category)}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Eye className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      {article.views || 0}
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg leading-tight line-clamp-2">
                    {isRTL ? article.titleAr : article.titleEn}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {isRTL ? article.excerptAr : article.excerptEn}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      {new Date(article.createdAt).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button 
                      onClick={() => handleEdit(article.id)}
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                    >
                      <Edit className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      {isRTL ? 'تحرير' : 'Edit'}
                    </Button>
                    {currentUser?.role === 'superadmin' && (
                      <Button 
                        onClick={() => handleDelete(article.id)}
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}