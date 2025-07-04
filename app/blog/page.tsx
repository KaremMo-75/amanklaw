'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Search, 
  BookOpen,
  Clock,
  Eye
} from 'lucide-react';

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

export default function BlogPage() {
  const { isRTL, t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Load articles from localStorage and filter only active ones
    const savedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
    const activeArticles = savedArticles.filter((article: Article) => article.isActive);
    
    if (activeArticles.length === 0) {
      // Initialize with default articles if none exist
      initializeDefaultArticles();
    } else {
      setArticles(activeArticles);
    }
  }, []);

  const initializeDefaultArticles = () => {
    const defaultArticles: Article[] = [
      {
        id: '1',
        titleAr: 'التطورات الجديدة في قانون الشركات السعودي',
        titleEn: 'New Developments in Saudi Corporate Law',
        contentAr: `
          <h2>مقدمة</h2>
          <p>شهد قانون الشركات السعودي تطورات مهمة خلال العام الماضي، حيث تم إدخال تعديلات جوهرية تهدف إلى تعزيز بيئة الأعمال وجذب الاستثمارات.</p>
          
          <h2>أبرز التطورات</h2>
          <h3>1. تبسيط إجراءات التأسيس</h3>
          <p>تم تبسيط إجراءات تأسيس الشركات بشكل كبير، حيث أصبح بإمكان المستثمرين إنجاز معاملات التأسيس في وقت قياسي لا يتجاوز 24 ساعة في بعض الحالات.</p>
          
          <h3>2. تحديث آليات الحوكمة</h3>
          <p>تم تطوير قواعد الحوكمة للشركات المساهمة لتتماشى مع أفضل الممارسات الدولية، مما يعزز من شفافية الشركات ويحمي حقوق المساهمين.</p>
        `,
        contentEn: `
          <h2>Introduction</h2>
          <p>Saudi corporate law has witnessed important developments over the past year, with substantial amendments introduced to enhance the business environment and attract investments.</p>
          
          <h2>Key Developments</h2>
          <h3>1. Simplified Establishment Procedures</h3>
          <p>Company establishment procedures have been significantly simplified, allowing investors to complete incorporation processes in record time, sometimes within 24 hours.</p>
          
          <h3>2. Updated Governance Mechanisms</h3>
          <p>Governance rules for joint-stock companies have been developed to align with international best practices, enhancing corporate transparency and protecting shareholder rights.</p>
        `,
        isActive: true,
        slug: 'new-developments-saudi-corporate-law',
        metaTitle: 'التطورات الجديدة في قانون الشركات السعودي | أمانك',
        metaDescription: 'تعرف على أحدث التطورات في قانون الشركات السعودي وتأثيرها على بيئة الأعمال',
        metaKeywords: 'قانون الشركات، السعودية، الأعمال، الاستثمار',
        authorId: '1',
        authorName: isRTL ? 'المحامي أحمد محمد' : 'Ahmed Mohammed',
        authorImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        date: '2024-01-15',
        category: 'commercial',
        tags: isRTL ? ['قانون الشركات', 'الأعمال', 'الاستثمار'] : ['Corporate Law', 'Business', 'Investment'],
        image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600',
        views: 245,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        titleAr: 'حقوق الطفل في قضايا الحضانة: دليل شامل',
        titleEn: 'Child Rights in Custody Cases: A Comprehensive Guide',
        contentAr: `
          <h2>أهمية حماية حقوق الطفل</h2>
          <p>تعتبر حماية حقوق الطفل من أهم المبادئ في النظام القضائي السعودي، خاصة في قضايا الحضانة والنفقة. يركز القانون على مصلحة الطفل العليا كمعيار أساسي في جميع القرارات المتعلقة بالحضانة.</p>
          
          <h2>المبادئ الأساسية</h2>
          <ul>
            <li>مصلحة الطفل العليا</li>
            <li>الحق في الرعاية والحماية</li>
            <li>الحق في التعليم والصحة</li>
            <li>الحق في التواصل مع الوالدين</li>
          </ul>
        `,
        contentEn: `
          <h2>Importance of Child Rights Protection</h2>
          <p>Protecting child rights is one of the most important principles in the Saudi judicial system, especially in custody and alimony cases. The law focuses on the best interests of the child as a fundamental criterion in all custody-related decisions.</p>
          
          <h2>Basic Principles</h2>
          <ul>
            <li>Best interests of the child</li>
            <li>Right to care and protection</li>
            <li>Right to education and health</li>
            <li>Right to communicate with parents</li>
          </ul>
        `,
        isActive: true,
        slug: 'child-rights-custody-cases-guide',
        metaTitle: 'حقوق الطفل في قضايا الحضانة | دليل شامل',
        metaDescription: 'دليل شامل حول حقوق الطفل في قضايا الحضانة والنفقة في القانون السعودي',
        metaKeywords: 'حقوق الطفل، الحضانة، قانون الأسرة، النفقة',
        authorId: '2',
        authorName: isRTL ? 'المحامية فاطمة الزهراني' : 'Fatima Al-Zahrani',
        authorImage: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        date: '2024-01-10',
        category: 'family',
        tags: isRTL ? ['حقوق الطفل', 'الحضانة', 'قانون الأسرة'] : ['Child Rights', 'Custody', 'Family Law'],
        image: 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg?auto=compress&cs=tinysrgb&w=600',
        views: 189,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    setArticles(defaultArticles);
    localStorage.setItem('articles', JSON.stringify(defaultArticles));
  };

  const categories = isRTL ? [
    { id: 'all', name: 'جميع المقالات', count: articles.length },
    { id: 'civil', name: 'القانون المدني', count: articles.filter(a => a.category === 'civil').length },
    { id: 'commercial', name: 'القانون التجاري', count: articles.filter(a => a.category === 'commercial').length },
    { id: 'family', name: 'قانون الأسرة', count: articles.filter(a => a.category === 'family').length },
    { id: 'criminal', name: 'القانون الجنائي', count: articles.filter(a => a.category === 'criminal').length },
    { id: 'real-estate', name: 'العقارات', count: articles.filter(a => a.category === 'real-estate').length },
    { id: 'labor', name: 'قانون العمل', count: articles.filter(a => a.category === 'labor').length },
  ] : [
    { id: 'all', name: 'All Articles', count: articles.length },
    { id: 'civil', name: 'Civil Law', count: articles.filter(a => a.category === 'civil').length },
    { id: 'commercial', name: 'Commercial Law', count: articles.filter(a => a.category === 'commercial').length },
    { id: 'family', name: 'Family Law', count: articles.filter(a => a.category === 'family').length },
    { id: 'criminal', name: 'Criminal Law', count: articles.filter(a => a.category === 'criminal').length },
    { id: 'real-estate', name: 'Real Estate', count: articles.filter(a => a.category === 'real-estate').length },
    { id: 'labor', name: 'Labor Law', count: articles.filter(a => a.category === 'labor').length },
  ];

  const filteredArticles = articles.filter(article => {
    const title = isRTL ? article.titleAr : article.titleEn || article.titleAr;
    const content = isRTL ? article.contentAr : article.contentEn || article.contentAr;
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = filteredArticles[0];

  const getCategoryName = (categoryId: string) => {
    const categoryMap: { [key: string]: { ar: string; en: string } } = {
      'civil': { ar: 'القانون المدني', en: 'Civil Law' },
      'commercial': { ar: 'القانون التجاري', en: 'Commercial Law' },
      'family': { ar: 'قانون الأسرة', en: 'Family Law' },
      'criminal': { ar: 'القانون الجنائي', en: 'Criminal Law' },
      'real-estate': { ar: 'العقارات', en: 'Real Estate' },
      'labor': { ar: 'قانون العمل', en: 'Labor Law' },
    };
    return isRTL ? categoryMap[categoryId]?.ar : categoryMap[categoryId]?.en;
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const getReadTime = (content: string) => {
    const words = stripHtml(content).split(' ').length;
    const readTime = Math.ceil(words / 200); // Average reading speed
    return isRTL ? `${readTime} دقائق` : `${readTime} min read`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 dark:from-gray-900 dark:to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'مدونة أمانك القانونية' : 'Amank Legal Blog'}
            </h1>
            <p className="text-xl text-blue-100 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {isRTL 
                ? 'اكتشف أحدث المقالات والتحديثات القانونية من خبراء أمانك'
                : 'Discover the latest legal articles and updates from Amank experts'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {isRTL ? 'المقال المميز' : 'Featured Article'}
              </h2>
            </div>
            
            <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-square">
                  <img 
                    src={featuredArticle.image} 
                    alt={isRTL ? featuredArticle.titleAr : featuredArticle.titleEn || featuredArticle.titleAr}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <Badge variant="secondary" className="mr-3 rtl:mr-0 rtl:ml-3">
                      {getCategoryName(featuredArticle.category)}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                      {getReadTime(isRTL ? featuredArticle.contentAr : featuredArticle.contentEn || featuredArticle.contentAr)}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {isRTL ? featuredArticle.titleAr : featuredArticle.titleEn || featuredArticle.titleAr}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {stripHtml(isRTL ? featuredArticle.contentAr : featuredArticle.contentEn || featuredArticle.contentAr).substring(0, 200)}...
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <img 
                        src={featuredArticle.authorImage} 
                        alt="Author" 
                        className="w-8 h-8 rounded-full mr-2 rtl:mr-0 rtl:ml-2"
                      />
                      <span className="mr-4 rtl:mr-0 rtl:ml-4">{featuredArticle.authorName}</span>
                      <Calendar className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      <span>{new Date(featuredArticle.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
                    </div>
                    
                    <Button asChild>
                      <Link href={`/blog/${featuredArticle.slug || featuredArticle.id}`}>
                        {isRTL ? 'اقرأ المزيد' : 'Read More'}
                        <ArrowRight className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={isRTL ? 'البحث في المقالات...' : 'Search articles...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rtl:pl-4 rtl:pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isRTL ? 'أحدث المقالات' : 'Latest Articles'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(1).map((article) => (
              <Card key={article.id} className="bg-white dark:bg-gray-700 shadow-lg border-0 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src={article.image} 
                    alt={isRTL ? article.titleAr : article.titleEn || article.titleAr}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">
                      {getCategoryName(article.category)}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Eye className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      {article.views}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">
                    {isRTL ? article.titleAr : article.titleEn || article.titleAr}
                  </h3>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {stripHtml(isRTL ? article.contentAr : article.contentEn || article.contentAr).substring(0, 150)}...
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <img 
                        src={article.authorImage} 
                        alt="Author" 
                        className="w-6 h-6 rounded-full mr-2 rtl:mr-0 rtl:ml-2"
                      />
                      <span className="mr-3 rtl:mr-0 rtl:ml-3">{article.authorName}</span>
                      <Calendar className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      <span>{new Date(article.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      {getReadTime(isRTL ? article.contentAr : article.contentEn || article.contentAr)}
                    </div>
                    
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/blog/${article.slug || article.id}`}>
                        {isRTL ? 'اقرأ المزيد' : 'Read More'}
                        <ArrowRight className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1 rtl:rotate-180" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {isRTL ? 'لا توجد مقالات' : 'No Articles Found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isRTL 
                  ? 'لم يتم العثور على مقالات تطابق البحث'
                  : 'No articles found matching your search criteria'
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}