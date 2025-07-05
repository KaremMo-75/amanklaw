'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  User, 
  ArrowLeft,
  Clock,
  Share2,
  Tag,
  BookOpen
} from 'lucide-react';

export default function BlogPostClient() {
  const params = useParams();
  const { isRTL, t } = useLanguage();
  const postId = params.id as string;

  // Mock article data - in a real app, this would come from a database
  const articles = [
    {
      id: '1',
      slug: 'new-developments-saudi-corporate-law',
      title: isRTL ? 'التطورات الجديدة في قانون الشركات السعودي' : 'New Developments in Saudi Corporate Law',
      content: isRTL
        ? `شهد قانون الشركات السعودي تطورات مهمة خلال العام الماضي، حيث تم إدخال تعديلات جوهرية تهدف إلى تعزيز بيئة الأعمال وجذب الاستثمارات.

## أبرز التطورات

### 1. تبسيط إجراءات التأسيس
تم تبسيط إجراءات تأسيس الشركات بشكل كبير، حيث أصبح بإمكان المستثمرين إنجاز معاملات التأسيس في وقت قياسي لا يتجاوز 24 ساعة في بعض الحالات.

### 2. تحديث آليات الحوكمة
تم تطوير قواعد الحوكمة للشركات المساهمة لتتماشى مع أفضل الممارسات الدولية، مما يعزز من شفافية الشركات ويحمي حقوق المساهمين.

### 3. دعم الشركات الناشئة
وضعت الحكومة إطار عمل خاص للشركات الناشئة يتضمن مرونة أكبر في المتطلبات التنظيمية والمالية.

## التأثير على الأعمال

هذه التطورات لها تأثير إيجابي واضح على بيئة الأعمال في المملكة:

- **سهولة الاستثمار**: أصبح من الأسهل للمستثمرين المحليين والأجانب بدء أعمالهم
- **شفافية أكبر**: قواعد الحوكمة الجديدة تعزز الثقة في السوق
- **دعم الابتكار**: الشركات الناشئة تحصل على دعم أكبر للنمو والتطور

## الخلاصة

تم تصميم هذه التطورات لتحقيق أهداف رؤية المملكة 2030 في تنويع الاقتصاد وجذب الاستثمارات. ننصح الشركات بمراجعة أوضاعها القانونية للاستفادة من هذه التحديثات.`
        : `Saudi corporate law has witnessed important developments over the past year, with substantial amendments introduced to enhance the business environment and attract investments.

## Key Developments

### 1. Simplified Establishment Procedures
Company establishment procedures have been significantly simplified, allowing investors to complete incorporation processes in record time, sometimes within 24 hours.

### 2. Updated Governance Mechanisms
Governance rules for joint-stock companies have been developed to align with international best practices, enhancing corporate transparency and protecting shareholder rights.

### 3. Startup Support
The government has established a special framework for startups that includes greater flexibility in regulatory and financial requirements.

## Impact on Business

These developments have a clear positive impact on the business environment in the Kingdom:

- **Ease of Investment**: It has become easier for local and foreign investors to start their businesses
- **Greater Transparency**: New governance rules enhance market confidence
- **Innovation Support**: Startups receive greater support for growth and development

## Conclusion

These developments are designed to achieve the goals of Saudi Vision 2030 in diversifying the economy and attracting investments. We advise companies to review their legal status to benefit from these updates.`,
      author: isRTL ? 'المحامي أحمد محمد' : 'Ahmed Mohammed',
      date: '2024-01-15',
      category: 'commercial',
      categoryName: isRTL ? 'القانون التجاري' : 'Commercial Law',
      readTime: isRTL ? '5 دقائق' : '5 min read',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1200',
      tags: isRTL ? ['قانون الشركات', 'الأعمال', 'الاستثمار'] : ['Corporate Law', 'Business', 'Investment']
    },
    {
      id: '2',
      slug: 'child-rights-custody-cases-guide',
      title: isRTL ? 'حقوق الطفل في قضايا الحضانة: دليل شامل' : 'Child Rights in Custody Cases: A Comprehensive Guide',
      content: isRTL
        ? `تعتبر حماية حقوق الطفل من أهم المبادئ في النظام القضائي السعودي، خاصة في قضايا الحضانة والنفقة.

## المبادئ الأساسية

### 1. مصلحة الطفل العليا
يركز القانون على مصلحة الطفل العليا كمعيار أساسي في جميع القرارات المتعلقة بالحضانة.

### 2. الحق في الرعاية
كل طفل له الحق في الحصول على الرعاية الكاملة من الوالدين.

## الخلاصة

حماية حقوق الطفل أولوية قصوى في النظام القانوني السعودي.`
        : `Protecting child rights is one of the most important principles in the Saudi judicial system, especially in custody and alimony cases.

## Basic Principles

### 1. Best Interests of the Child
The law focuses on the best interests of the child as a fundamental criterion in all custody-related decisions.

### 2. Right to Care
Every child has the right to receive full care from their parents.

## Conclusion

Protecting child rights is a top priority in the Saudi legal system.`,
      author: isRTL ? 'المحامية فاطمة الزهراني' : 'Fatima Al-Zahrani',
      date: '2024-01-10',
      category: 'family',
      categoryName: isRTL ? 'قانون الأسرة' : 'Family Law',
      readTime: isRTL ? '3 دقائق' : '3 min read',
      image: 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg?auto=compress&cs=tinysrgb&w=1200',
      tags: isRTL ? ['حقوق الطفل', 'الحضانة', 'قانون الأسرة'] : ['Child Rights', 'Custody', 'Family Law']
    }
  ];

  // Find article by ID or slug
  const article = articles.find(a => a.id === postId || a.slug === postId);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isRTL ? 'المقال غير موجود' : 'Article Not Found'}
          </h1>
          <p className="text-gray-600 mb-6">
            {isRTL ? 'المقال الذي تبحث عنه غير متوفر' : 'The article you are looking for is not available'}
          </p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
              {isRTL ? 'العودة للمدونة' : 'Back to Blog'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      } else if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
            {paragraph.replace('### ', '')}
          </h3>
        );
      } else if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-700 leading-relaxed mb-2 mr-6 rtl:mr-0 rtl:ml-6">
            {paragraph.replace('- ', '')}
          </li>
        );
      } else if (paragraph.trim() === '') {
        return <br key={index} />;
      } else {
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {paragraph}
          </p>
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-96 bg-gray-900">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-8 left-8 rtl:left-auto rtl:right-8">
          <Button asChild variant="secondary" size="sm">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
              {isRTL ? 'العودة للمدونة' : 'Back to Blog'}
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <Card className="bg-white shadow-xl border-0">
          <CardContent className="p-8 md:p-12">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <Badge variant="secondary" className="text-sm">
                  {article.categoryName}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                  {article.readTime}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                {article.title}
              </h1>
              
              <div className="flex items-center justify-between border-b border-gray-200 pb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  <span className="mr-4 rtl:mr-0 rtl:ml-4">{article.author}</span>
                  <Calendar className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  <span>{new Date(article.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
                </div>
                
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {isRTL ? 'مشاركة' : 'Share'}
                </Button>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {formatContent(article.content)}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-4 h-4 text-gray-500 mr-2 rtl:mr-0 rtl:ml-2" />
                <span className="text-sm font-medium text-gray-700 mr-3 rtl:mr-0 rtl:ml-3">
                  {t('tags')}:
                </span>
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4 flex-shrink-0">
                  <User className="w-8 h-8 text-blue-800" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{article.author}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {isRTL 
                      ? 'محامي متخصص في القانون التجاري والشركات، يتمتع بخبرة واسعة في تقديم الاستشارات القانونية للشركات والمستثمرين.'
                      : 'A lawyer specializing in commercial and corporate law, with extensive experience in providing legal advice to companies and investors.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {isRTL ? 'هل تحتاج استشارة قانونية؟' : 'Need Legal Consultation?'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isRTL 
                  ? 'تواصل معنا للحصول على استشارة قانونية متخصصة'
                  : 'Contact us for specialized legal consultation'
                }
              </p>
              <Button asChild size="lg" className="bg-blue-800 hover:bg-blue-900">
                <Link href="/contact">
                  {t('contact')}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Related Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {isRTL ? 'مقالات ذات صلة' : 'Related Articles'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((relatedArticle) => (
              <Card key={relatedArticle.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video">
                  <img 
                    src={relatedArticle.image} 
                    alt={relatedArticle.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {relatedArticle.categoryName}
                  </Badge>
                  <h3 className="font-bold text-gray-900 mb-3 line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {new Date(relatedArticle.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                    </div>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/blog/${relatedArticle.slug || relatedArticle.id}`}>
                        {t('readMore')}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}