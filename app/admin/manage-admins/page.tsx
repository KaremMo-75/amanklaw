'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  UserPlus, 
  Trash2, 
  Shield, 
  User,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminUser {
  username: string;
  password: string;
  role: 'admin' | 'superadmin';
  createdAt: string;
}

export default function ManageAdminsPage() {
  const { isRTL, t } = useLanguage();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check admin authentication and role
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/admin-login');
      return;
    }

    const user = JSON.parse(loggedInUser);
    if (user.role !== 'superadmin') {
      router.push('/admin/dashboard');
      return;
    }

    setCurrentUser(user);
    loadAdminUsers();
  }, [router]);

  const loadAdminUsers = () => {
    const users = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    setAdminUsers(users);
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!newAdmin.username.trim()) {
      newErrors.push(isRTL ? 'اسم المستخدم مطلوب' : 'Username is required');
    } else if (newAdmin.username.length < 3) {
      newErrors.push(isRTL ? 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل' : 'Username must be at least 3 characters');
    } else if (adminUsers.some(user => user.username === newAdmin.username)) {
      newErrors.push(isRTL ? 'اسم المستخدم موجود بالفعل' : 'Username already exists');
    }

    if (!newAdmin.password.trim()) {
      newErrors.push(isRTL ? 'كلمة المرور مطلوبة' : 'Password is required');
    } else if (newAdmin.password.length < 6) {
      newErrors.push(isRTL ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
    }

    if (newAdmin.password !== newAdmin.confirmPassword) {
      newErrors.push(isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleAddAdmin = () => {
    if (!validateForm()) return;

    const adminUser: AdminUser = {
      username: newAdmin.username,
      password: newAdmin.password,
      role: 'admin',
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...adminUsers, adminUser];
    setAdminUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));

    setNewAdmin({ username: '', password: '', confirmPassword: '' });
    setShowAddForm(false);
    setErrors([]);
    setSuccess(isRTL ? 'تم إضافة المدير بنجاح!' : 'Admin added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDeleteAdmin = (username: string) => {
    if (username === currentUser?.username) {
      alert(isRTL ? 'لا يمكنك حذف حسابك الخاص' : 'You cannot delete your own account');
      return;
    }

    if (confirm(isRTL ? 'هل أنت متأكد من حذف هذا المدير؟' : 'Are you sure you want to delete this admin?')) {
      const updatedUsers = adminUsers.filter(user => user.username !== username);
      setAdminUsers(updatedUsers);
      localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
      setSuccess(isRTL ? 'تم حذف المدير بنجاح!' : 'Admin deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const togglePasswordVisibility = (username: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [username]: !prev[username]
    }));
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
                {isRTL ? 'إدارة المديرين' : 'Manage Admins'}
              </h1>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {success && (
                <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                  <CheckCircle className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {success}
                </div>
              )}
              <Button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-green-600 hover:bg-green-700"
              >
                <UserPlus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {isRTL ? 'إضافة مدير' : 'Add Admin'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Admin Form */}
        {showAddForm && (
          <Card className="bg-white shadow-lg border-0 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {isRTL ? 'إضافة مدير جديد' : 'Add New Admin'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="username">{isRTL ? 'اسم المستخدم' : 'Username'}</Label>
                  <Input
                    id="username"
                    value={newAdmin.username}
                    onChange={(e) => setNewAdmin(prev => ({ ...prev, username: e.target.value }))}
                    placeholder={isRTL ? 'أدخل اسم المستخدم' : 'Enter username'}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="password">{isRTL ? 'كلمة المرور' : 'Password'}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin(prev => ({ ...prev, password: e.target.value }))}
                    placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter password'}
                    className="mt-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="confirmPassword">{isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={newAdmin.confirmPassword}
                    onChange={(e) => setNewAdmin(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder={isRTL ? 'أعد إدخال كلمة المرور' : 'Re-enter password'}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="flex space-x-4 rtl:space-x-reverse">
                <Button onClick={handleAddAdmin} className="bg-green-600 hover:bg-green-700">
                  <UserPlus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {isRTL ? 'إضافة المدير' : 'Add Admin'}
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowAddForm(false);
                  setNewAdmin({ username: '', password: '', confirmPassword: '' });
                  setErrors([]);
                }}>
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin Users List */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
              {isRTL ? 'قائمة المديرين' : 'Admin Users List'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {adminUsers.length === 0 ? (
              <div className="text-center py-8">
                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isRTL ? 'لا يوجد مديرين' : 'No Admins Found'}
                </h3>
                <p className="text-gray-600">
                  {isRTL ? 'ابدأ بإضافة مدير جديد' : 'Start by adding a new admin'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminUsers.map((user, index) => (
                  <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3">
                            <User className="w-5 h-5 text-blue-800" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{user.username}</h3>
                            <Badge 
                              variant={user.role === 'superadmin' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {user.role === 'superadmin' 
                                ? (isRTL ? 'مدير عام' : 'Super Admin')
                                : (isRTL ? 'مدير' : 'Admin')
                              }
                            </Badge>
                          </div>
                        </div>
                        {user.username === currentUser?.username && (
                          <Badge variant="outline" className="text-xs">
                            {isRTL ? 'أنت' : 'You'}
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center justify-between">
                          <span>{isRTL ? 'كلمة المرور:' : 'Password:'}</span>
                          <div className="flex items-center">
                            <span className="font-mono mr-2 rtl:mr-0 rtl:ml-2">
                              {showPasswords[user.username] ? user.password : '••••••••'}
                            </span>
                            <button
                              onClick={() => togglePasswordVisibility(user.username)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {showPasswords[user.username] ? 
                                <EyeOff className="w-4 h-4" /> : 
                                <Eye className="w-4 h-4" />
                              }
                            </button>
                          </div>
                        </div>
                        <div>
                          <span>{isRTL ? 'تاريخ الإنشاء:' : 'Created:'}</span>
                          <span className="ml-2 rtl:ml-0 rtl:mr-2">
                            {new Date(user.createdAt).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                          </span>
                        </div>
                      </div>

                      {user.username !== currentUser?.username && user.role !== 'superadmin' && (
                        <div className="mt-4 pt-4 border-t">
                          <Button
                            onClick={() => handleDeleteAdmin(user.username)}
                            variant="outline"
                            size="sm"
                            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                            {isRTL ? 'حذف' : 'Delete'}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}