'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  User,
  Calendar,
  Trash2,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
  isRead: boolean;
}

export default function ContactSubmissionsPage() {
  const { isRTL, t } = useLanguage();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check admin authentication
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/admin-login');
      return;
    }

    loadSubmissions();
  }, [router]);

  const loadSubmissions = () => {
    const savedSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    // Sort by newest first
    const sortedSubmissions = savedSubmissions.sort((a: ContactSubmission, b: ContactSubmission) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    setSubmissions(sortedSubmissions);
  };

  const markAsRead = (id: string) => {
    const updatedSubmissions = submissions.map(submission =>
      submission.id === id ? { ...submission, isRead: true } : submission
    );
    setSubmissions(updatedSubmissions);
    localStorage.setItem('contactSubmissions', JSON.stringify(updatedSubmissions));
  };

  const deleteSubmission = (id: string) => {
    if (confirm(isRTL ? 'هل أنت متأكد من حذف هذه الرسالة؟' : 'Are you sure you want to delete this message?')) {
      const updatedSubmissions = submissions.filter(submission => submission.id !== id);
      setSubmissions(updatedSubmissions);
      localStorage.setItem('contactSubmissions', JSON.stringify(updatedSubmissions));
      setSuccess(isRTL ? 'تم حذف الرسالة بنجاح!' : 'Message deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = submissions.filter(s => !s.isRead).length;

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
                {isRTL ? 'رسائل التواصل' : 'Contact Submissions'}
              </h1>
              {unreadCount > 0 && (
                <Badge className="ml-3 rtl:ml-0 rtl:mr-3 bg-red-500">
                  {unreadCount} {isRTL ? 'جديد' : 'new'}
                </Badge>
              )}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {submissions.length === 0 ? (
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isRTL ? 'لا توجد رسائل' : 'No Messages Yet'}
              </h3>
              <p className="text-gray-600">
                {isRTL 
                  ? 'لم يتم استلام أي رسائل من العملاء بعد'
                  : 'No customer messages have been received yet'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <Card 
                key={submission.id} 
                className={`bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300 ${
                  !submission.isRead ? 'ring-2 ring-blue-200' : ''
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-800" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{submission.name}</CardTitle>
                        <p className="text-sm text-gray-600">{submission.subject}</p>
                      </div>
                      {!submission.isRead && (
                        <Badge className="bg-blue-500">
                          {isRTL ? 'جديد' : 'New'}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                        {formatDate(submission.submittedAt)}
                      </div>
                      <Button
                        onClick={() => deleteSubmission(submission.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
                      <span className="text-sm text-gray-600">{submission.email}</span>
                    </div>
                    {submission.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
                        <span className="text-sm text-gray-600">{submission.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {isRTL ? 'الرسالة:' : 'Message:'}
                    </h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {submission.message}
                    </p>
                  </div>

                  {!submission.isRead && (
                    <div className="mt-4 pt-4 border-t">
                      <Button
                        onClick={() => markAsRead(submission.id)}
                        size="sm"
                        variant="outline"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                        {isRTL ? 'تم القراءة' : 'Mark as Read'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}