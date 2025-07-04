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
  Clock
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

export default function BlogPage() {
  const { isRTL, t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Load articles from localStorage or initialize with default data
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    } else {
      // Initialize with default articles data
      const defaultArticles: Article[] = [
        {
          id: '1',
          titleAr: 'التطورات الجديدة في قانون الشركات السعودي',
          titleEn: 'New Developments in Saudi Corporate Law',
          excerptAr: 'نظرة شاملة على التحديثات الأخيرة في قانون الشركات وتأثيرها على الأعمال التجارية',
          excerptEn: 'A comprehensive look at recent updates in corporate law and their impact on business',
          contentAr: 'شهد قانون الشركات السعودي تطورات مهمة خلال العام الماضي، حيث تم إدخال تعديلات جوهرية تهدف إلى تعزيز بيئة الأعمال وجذب الاستثمارات. هذه التطورات تشمل تبسيط إجراءات تأسيس الشركات، وتحديث آليات الحوكمة، وتطوير أطر العمل للشركات الناشئة.',
          contentEn: 'Saudi corporate law has witnessed important developments over the past year, with substantial amendments introduced to enhance the business environment and attract investments. These developments include simplifying company establishment procedures, updating governance mechanisms, and developing frameworks for startups.',
          author: isRTL ? 'المحامي أحمد محمد' : 'Ahmed Mohammed',
          date: '2024-01-15',
          category: 'commercial',
          categoryNameAr: 'القانون التجاري',
          categoryNameEn: 'Commercial Law',
          readTime: isRTL ? '5 دقائق' : '5 min read',
          image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600',
          tags: isRTL ? ['قانون الشركات', 'الأعمال', 'الاستثمار'] : ['Corporate Law', 'Business', 'Investment'],
          views: 245,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          titleAr: 'حقوق الطفل في قضايا الحضانة: دليل شامل',
          titleEn: 'Child Rights in Custody Cases: A Comprehensive Guide',
          excerptAr: 'كيف يحمي القانون السعودي حقوق الطفل في قضايا الحضانة والنفقة',
          excerptEn: 'How Saudi law protects child rights in custody and alimony cases',
          contentAr: 'تعتبر حماية حقوق الطفل من أهم المبادئ في النظام القضائي السعودي، خاصة في قضايا الحضانة والنفقة. يركز القانون على مصلحة الطفل العليا كمعيار أساسي في جميع القرارات المتعلقة بالحضانة.',
          contentEn: 'Protecting child rights is one of the most important principles in the Saudi judicial system, especially in custody and alimony cases. The law focuses on the best interests of the child as a fundamental criterion in all custody-related decisions.',
          author: isRTL ? 'المحامية فاطمة الزهراني' : 'Fatima Al-Zahrani',
          date: '2024-01-10',
          category: 'family',
          categoryNameAr: 'قانون الأسرة',
          categoryNameEn: 'Family Law',
          readTime: isRTL ? '7 دقائق' : '7 min read',
          image: 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg?auto=compress&cs=tinysrgb&w=600',
          tags: isRTL ? ['حقوق الطفل', 'الحضانة', 'قانون الأسرة'] : ['Child Rights', 'Custody', 'Family Law'],
          views: 189,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          titleAr: 'التحكيم التجاري: البديل الأمثل لحل النزاعات',
          titleEn: 'Commercial Arbitration: The Optimal Alternative for Dispute Resolution',
          excerptAr: 'مزايا التحكيم التجاري وكيفية الاستفادة منه في حل النزاعات التجارية',
          excerptEn: 'Advantages of commercial arbitration and how to benefit from it in resolving commercial disputes',
          contentAr: 'يعتبر التحكيم التجاري وسيلة فعالة لحل النزاعات التجارية، حيث يوفر مرونة أكبر وسرعة في الفصل مقارنة بالمحاكم التقليدية. كما يتميز بالسرية والخصوصية التي تحتاجها الشركات.',
          contentEn: 'Commercial arbitration is an effective means of resolving commercial disputes, offering greater flexibility and speed in resolution compared to traditional courts. It also features the confidentiality and privacy that companies need.',
          author: isRTL ? 'المحامي خالد العتيبي' : 'Khalid Al-Otaibi',
          date: '2024-01-05',
          category: 'commercial',
          categoryNameAr: 'القانون التجاري',
          categoryNameEn: 'Commercial Law',
          readTime: isRTL ? '6 دقائق' : '6 min read',
          image: 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=600',
          tags: isRTL ? ['التحكيم', 'النزاعات التجارية', 'القانون'] : ['Arbitration', 'Commercial Disputes', 'Law'],
          views: 156,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '4',
          titleAr: 'قانون العمل الجديد: ما يجب أن يعرفه أصحاب العمل',
          titleEn: 'New Labor Law: What Employers Need to Know',
          excerptAr: 'التحديثات الأخيرة في قانون العمل وتأثيرها على العلاقة بين أصحاب العمل والموظفين',
          excerptEn: 'Recent updates in labor law and their impact on employer-employee relationships',
          contentAr: 'شهد قانون العمل السعودي تحديثات مهمة تهدف إلى تعزيز حقوق العمال وتحسين بيئة العمل. هذه التحديثات تتضمن تنظيم ساعات العمل، وحماية أجور العمال، وتطوير آليات حل النزاعات العمالية.',
          contentEn: 'Saudi labor law has undergone important updates aimed at enhancing worker rights and improving the work environment. These updates include regulating working hours, protecting worker wages, and developing labor dispute resolution mechanisms.',
          author: isRTL ? 'المحامية نورا الحربي' : 'Nora Al-Harbi',
          date: '2023-12-28',
          category: 'labor',
          categoryNameAr: 'قانون العمل',
          categoryNameEn: 'Labor Law',
          readTime: isRTL ? '8 دقائق' : '8 min read',
          image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600',
          tags: isRTL ? ['قانون العمل', 'حقوق العمال', 'التوظيف'] : ['Labor Law', 'Worker Rights', 'Employment'],
          views: 203,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '5',
          titleAr: 'الملكية الفكرية في العصر الرقمي',
          titleEn: 'Intellectual Property in the Digital Age',
          excerptAr: 'حماية الملكية الفكرية في ظل التطور التكنولوجي والتجارة الإلكترونية',
          excerptEn: 'Protecting intellectual property amid technological development and e-commerce',
          contentAr: 'مع تزايد أهمية التكنولوجيا والتجارة الإلكترونية، أصبحت حماية الملكية الفكرية أكثر تعقيداً وأهمية. يناقش هذا المقال التحديات الجديدة والحلول المتاحة لحماية الحقوق الفكرية.',
          contentEn: 'With the increasing importance of technology and e-commerce, protecting intellectual property has become more complex and important. This article discusses new challenges and available solutions for protecting intellectual rights.',
          author: isRTL ? 'المحامي أحمد محمد' : 'Ahmed Mohammed',
          date: '2023-12-20',
          category: 'civil',
          categoryNameAr: 'القانون المدني',
          categoryNameEn: 'Civil Law',
          readTime: isRTL ? '6 دقائق' : '6 min read',
          image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600',
          tags: isRTL ? ['الملكية الفكرية', 'التكنولوجيا', 'القانون الرقمي'] : ['Intellectual Property', 'Technology', 'Digital Law'],
          views: 178,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '6',
          titleAr: 'دليل الاستثمار العقاري القانوني',
          titleEn: 'Legal Real Estate Investment Guide',
          excerptAr: 'كل ما تحتاج معرفته عن الجوانب القانونية للاستثمار العقاري في المملكة',
          excerptEn: 'Everything you need to know about legal aspects of real estate investment in the Kingdom',
          contentAr: 'يقدم هذا الدليل نظرة شاملة على القوانين والأنظمة المنظمة للاستثمار العقاري في المملكة، بما في ذلك حقوق الملكية، وإجراءات التسجيل، والضرائب العقارية.',
          contentEn: 'This guide provides a comprehensive overview of laws and regulations governing real estate investment in the Kingdom, including property rights, registration procedures, and real estate taxes.',
          author: isRTL ? 'المحامي خالد العتيبي' : 'Khalid Al-Otaibi',
          date: '2023-12-15',
          category: 'real-estate',
          categoryNameAr: 'العقارات',
          categoryNameEn: 'Real Estate',
          readTime: isRTL ? '9 دقائق' : '9 min read',
          image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
          tags: isRTL ? ['العقارات', 'الاستثمار', 'الملكية'] : ['Real Estate', 'Investment', 'Property'],
          views: 134,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      setArticles(defaultArticles);
      localStorage.setItem('articles', JSON.stringify(defaultArticles));
    }
  }, [isRTL]);

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
    const title = isRTL ? article.titleAr : article.titleEn;
    const excerpt = isRTL ? article.excerptAr : article.excerptEn;
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = filteredArticles[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 dark:from-gray-900 dark:to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('blogTitle')}</h1>
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
                    alt={isRTL ? featuredArticle.titleAr : featuredArticle.titleEn}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <Badge variant="secondary" className="mr-3 rtl:mr-0 rtl:ml-3">
                      {isRTL ? featuredArticle.categoryNameAr : featuredArticle.categoryNameEn}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                      {featuredArticle.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {isRTL ? featuredArticle.titleAr : featuredArticle.titleEn}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {isRTL ? featuredArticle.excerptAr : featuredArticle.excerptEn}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <User className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      <span className="mr-4 rtl:mr-0 rtl:ml-4">{featuredArticle.author}</span>
                      <Calendar className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      <span>{new Date(featuredArticle.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
                    </div>
                    
                    <Button asChild>
                      <Link href={`/blog/${featuredArticle.id}`}>
                        {t('readMore')}
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('latestArticles')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(1).map((article) => (
              <Card key={article.id} className="bg-white dark:bg-gray-700 shadow-lg border-0 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src={article.image} 
                    alt={isRTL ? article.titleAr : article.titleEn}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">
                      {isRTL ? article.categoryNameAr : article.categoryNameEn}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">
                    {isRTL ? article.titleAr : article.titleEn}
                  </h3>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {isRTL ? article.excerptAr : article.excerptEn}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <User className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      <span className="mr-3 rtl:mr-0 rtl:ml-3">{article.author}</span>
                      <Calendar className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      <span>{new Date(article.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
                    </div>
                    
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/blog/${article.id}`}>
                        {t('readMore')}
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