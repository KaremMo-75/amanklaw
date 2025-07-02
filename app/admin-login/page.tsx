'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scale, User, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface AdminUser {
  username: string;
  password: string;
  role: 'admin' | 'superadmin';
  createdAt: string;
}

export default function AdminLoginPage() {
  const { isRTL, t } = useLanguage();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      router.push('/admin/dashboard');
    }

    // Initialize default superadmin if no admin users exist
    const adminUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    if (adminUsers.length === 0) {
      const defaultSuperAdmin: AdminUser = {
        username: 'superadmin',
        password: 'admin123',
        role: 'superadmin',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('adminUsers', JSON.stringify([defaultSuperAdmin]));
    }
  }, [router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate empty fields
    if (!formData.username.trim() || !formData.password.trim()) {
      setError(isRTL ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get admin users from localStorage
    const adminUsers: AdminUser[] = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    
    // Find matching user
    const user = adminUsers.find(u => 
      u.username === formData.username && u.password === formData.password
    );

    if (user) {
      // Save logged in user
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      localStorage.setItem('adminLoginTime', new Date().toISOString());
      router.push('/admin/dashboard');
    } else {
      setError(isRTL ? 'اسم المستخدم أو كلمة المرور غير صحيحة' : 'Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <Card className="w-full max-w-md bg-white shadow-2xl border-0 relative z-10">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
              <Scale className="w-8 h-8 text-blue-800" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isRTL ? 'دخول المدير' : 'Admin Login'}
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {isRTL 
              ? 'ادخل بياناتك للوصول إلى لوحة التحكم'
              : 'Enter your credentials to access the admin panel'
            }
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2 rtl:mr-0 rtl:ml-2 flex-shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                {isRTL ? 'اسم المستخدم' : 'Username'}
              </Label>
              <div className="relative">
                <User className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  required
                  className="pl-10 rtl:pl-4 rtl:pr-10 h-12"
                  placeholder={isRTL ? 'أدخل اسم المستخدم' : 'Enter your username'}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                {isRTL ? 'كلمة المرور' : 'Password'}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="pl-10 pr-10 rtl:pl-10 rtl:pr-10 h-12"
                  placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 bg-blue-800 hover:bg-blue-900 text-white font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                  {isRTL ? 'جاري الدخول...' : 'Signing in...'}
                </div>
              ) : (
                isRTL ? 'دخول' : 'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center mb-2">
              {isRTL ? 'بيانات الدخول الافتراضية:' : 'Default Credentials:'}
            </p>
            <div className="text-xs text-gray-700 space-y-1">
              <div><strong>Username:</strong> superadmin</div>
              <div><strong>Password:</strong> admin123</div>
              <div><strong>Role:</strong> Super Admin</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}