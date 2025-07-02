'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  FileText, 
  Plus, 
  BarChart3, 
  Users, 
  Eye,
  LogOut,
  Calendar,
  TrendingUp,
  Edit,
  User,
  MessageSquare,
  Shield,
  UserPlus,
  Scale,
  Phone,
  Image as ImageIcon,
  Mail
} from 'lucide-react';

interface AdminUser {
  username: string;
  password: string;
  role: 'admin' | 'superadmin';
  createdAt: string;
}

export default function AdminDashboard() {
  const { isRTL, t } = useLanguage();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    totalLawyers: 0,
    totalAdmins: 0,
    totalSubmissions: 0,
    lastLogin: ''
  });

  useEffect(() => {
    // Check admin authentication
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/admin-login');
      return;
    }

    const user = JSON.parse(loggedInUser);
    setCurrentUser(user);

    // Load stats
    const articles = JSON.parse(localStorage.getItem('cmsArticles') || '[]');
    const lawyers = JSON.parse(localStorage.getItem('lawyers') || '[]');
    const adminUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    setStats({
      totalArticles: articles.length,
      totalViews: articles.reduce((sum: number, article: any) => sum + (article.views || 0), 0),
      totalLawyers: lawyers.length,
      totalAdmins: adminUsers.length,
      totalSubmissions: submissions.length,
      lastLogin: loginTime ? new Date(loginTime).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US') : ''
    });
  }, [router, isRTL]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('adminLoginTime');
    router.push('/admin-login');
  };

  const quickActions = [
    {
      title: isRTL ? 'إنشاء مقال جديد' : 'Create New Article',
      description: isRTL ? 'أضف مقال جديد إلى المدونة' : 'Add a new article to the blog',
      icon: Plus,
      href: '/admin/new-article',
      color: 'bg-green-500 hover:bg-green-600',
      roles: ['admin', 'superadmin']
    },
    {
      title: isRTL ? 'إدارة المقالات' : 'Manage Articles',
      description: isRTL ? 'عرض وتحرير المقالات الموجودة' : 'View and edit existing articles',
      icon: FileText,
      href: '/admin/articles',
      color: 'bg-blue-500 hover:bg-blue-600',
      roles: ['admin', 'superadmin']
    },
    {
      title: isRTL ? 'إدارة المحامين' : 'Manage Lawyers',
      description: isRTL ? 'إضافة وتحرير معلومات المحامين' : 'Add and edit lawyer information',
      icon: Scale,
      href: '/admin/lawyers',
      color: 'bg-purple-500 hover:bg-purple-600',
      roles: ['admin', 'superadmin']
    },
    {
      title: isRTL ? 'إدارة المديرين' : 'Manage Admins',
      description: isRTL ? 'إضافة وإدارة حسابات المديرين' : 'Add and manage admin accounts',
      icon: UserPlus,
      href: '/admin/manage-admins',
      color: 'bg-red-500 hover:bg-red-600',
      roles: ['superadmin']
    },
    {
      title: isRTL ? 'تحرير محتوى الموقع' : 'Edit Site Content',
      description: isRTL ? 'تحديث محتوى الصفحات الرئيسية' : 'Update main page content',
      icon: Edit,
      href: '/admin/content',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      roles: ['admin', 'superadmin']
    },
    {
      title: isRTL ? 'إعدادات الشعار' : 'Logo Settings',
      description: isRTL ? 'تحديث شعار الموقع' : 'Update site logo',
      icon: ImageIcon,
      href: '/admin/logo-settings',
      color: 'bg-pink-500 hover:bg-pink-600',
      roles: ['superadmin']
    },
    {
      title: isRTL ? 'معلومات الاتصال' : 'Contact Info',
      description: isRTL ? 'تحديث معلومات التواصل الاجتماعي' : 'Update social media and contact info',
      icon: Phone,
      href: '/admin/contact-info',
      color: 'bg-teal-500 hover:bg-teal-600',
      roles: ['admin', 'superadmin']
    },
    {
      title: isRTL ? 'رسائل التواصل' : 'Contact Submissions',
      description: isRTL ? 'عرض رسائل العملاء' : 'View customer messages',
      icon: Mail,
      href: '/admin/contact-submissions',
      color: 'bg-orange-500 hover:bg-orange-600',
      roles: ['admin', 'superadmin']
    },
    {
      title: isRTL ? 'إعدادات الحساب' : 'Account Settings',
      description: isRTL ? 'إدارة بيانات الحساب وكلمة المرور' : 'Manage account details and password',
      icon: User,
      href: '/admin/account-settings',
      color: 'bg-gray-500 hover:bg-gray-600',
      roles: ['admin', 'superadmin']
    }
  ];

  const statsCards = [
    {
      title: isRTL ? 'إجمالي المقالات' : 'Total Articles',
      value: stats.totalArticles,
      icon: FileText,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: isRTL ? 'إجمالي المشاهدات' : 'Total Views',
      value: stats.totalViews,
      icon: Eye,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: isRTL ? 'عدد المحامين' : 'Total Lawyers',
      value: stats.totalLawyers,
      icon: Scale,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: isRTL ? 'عدد المديرين' : 'Total Admins',
      value: stats.totalAdmins,
      icon: Users,
      color: 'text-red-600 bg-red-100',
      roles: ['superadmin']
    },
    {
      title: isRTL ? 'رسائل التواصل' : 'Contact Messages',
      value: stats.totalSubmissions,
      icon: MessageSquare,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      title: isRTL ? 'آخر دخول' : 'Last Login',
      value: stats.lastLogin,
      icon: Calendar,
      color: 'text-indigo-600 bg-indigo-100'
    }
  ];

  const filteredActions = quickActions.filter(action => 
    action.roles.includes(currentUser?.role || 'admin')
  );

  const filteredStats = statsCards.filter(stat => 
    !stat.roles || stat.roles.includes(currentUser?.role || 'admin')
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {isRTL ? 'لوحة التحكم' : 'Admin Dashboard'}
              </h1>
              <Badge 
                variant={currentUser?.role === 'superadmin' ? 'default' : 'secondary'} 
                className="ml-3 rtl:ml-0 rtl:mr-3"
              >
                {currentUser?.role === 'superadmin' 
                  ? (isRTL ? 'مدير عام' : 'Super Admin')
                  : (isRTL ? 'مدير' : 'Admin')
                }
              </Badge>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-sm text-gray-600">
                {isRTL ? 'مرحباً' : 'Welcome'}, {currentUser?.username}
              </span>
              <Button asChild variant="outline">
                <Link href="/">
                  <Eye className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {isRTL ? 'عرض الموقع' : 'View Site'}
                </Link>
              </Button>
              <Button onClick={handleLogout} variant="outline" className="text-red-600 hover:text-red-700">
                <LogOut className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {isRTL ? 'خروج' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isRTL ? 'مرحباً بك في لوحة التحكم' : 'Welcome to Admin Dashboard'}
          </h2>
          <p className="text-gray-600">
            {isRTL 
              ? 'إدارة محتوى موقع أمانك للمحاماة والاستشارات القانونية'
              : 'Manage content for Amank Law Firm website'
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredStats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {isRTL ? 'الإجراءات السريعة' : 'Quick Actions'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActions.map((action, index) => (
              <Card key={index} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full ${action.color} flex items-center justify-center mx-auto mb-4`}>
                      <action.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                    <Button asChild className="w-full">
                      <Link href={action.href}>
                        {isRTL ? 'انتقال' : 'Go'}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
              {isRTL ? 'النشاط الأخير' : 'Recent Activity'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isRTL ? 'لا يوجد نشاط حديث' : 'No Recent Activity'}
              </h3>
              <p className="text-gray-600">
                {isRTL 
                  ? 'ابدأ بإنشاء مقال جديد لرؤية النشاط هنا'
                  : 'Start by creating a new article to see activity here'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}