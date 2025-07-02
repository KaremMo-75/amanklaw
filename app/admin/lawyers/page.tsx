'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Scale,
  User,
  Upload,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Lawyer {
  id: string;
  nameAr: string;
  nameEn: string;
  specialtyAr: string;
  specialtyEn: string;
  bioAr: string;
  bioEn: string;
  image: string;
  experience: string;
  createdAt: string;
}

export default function LawyersPage() {
  const { isRTL, t } = useLanguage();
  const router = useRouter();
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLawyer, setEditingLawyer] = useState<Lawyer | null>(null);
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    specialtyAr: '',
    specialtyEn: '',
    bioAr: '',
    bioEn: '',
    image: '',
    experience: ''
  });
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // Check admin authentication
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/admin-login');
      return;
    }

    loadLawyers();
  }, [router]);

  const loadLawyers = () => {
    const savedLawyers = JSON.parse(localStorage.getItem('lawyers') || '[]');
    setLawyers(savedLawyers);
  };

  const resetForm = () => {
    setFormData({
      nameAr: '',
      nameEn: '',
      specialtyAr: '',
      specialtyEn: '',
      bioAr: '',
      bioEn: '',
      image: '',
      experience: ''
    });
    setEditingLawyer(null);
    setShowForm(false);
    setErrors([]);
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.nameAr.trim()) {
      newErrors.push(isRTL ? 'الاسم بالعربية مطلوب' : 'Arabic name is required');
    }
    if (!formData.nameEn.trim()) {
      newErrors.push(isRTL ? 'الاسم بالإنجليزية مطلوب' : 'English name is required');
    }
    if (!formData.specialtyAr.trim()) {
      newErrors.push(isRTL ? 'التخصص بالعربية مطلوب' : 'Arabic specialty is required');
    }
    if (!formData.specialtyEn.trim()) {
      newErrors.push(isRTL ? 'التخصص بالإنجليزية مطلوب' : 'English specialty is required');
    }
    if (!formData.experience.trim()) {
      newErrors.push(isRTL ? 'سنوات الخبرة مطلوبة' : 'Experience is required');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (editingLawyer) {
      // Update existing lawyer
      const updatedLawyers = lawyers.map(lawyer => 
        lawyer.id === editingLawyer.id 
          ? { ...lawyer, ...formData }
          : lawyer
      );
      setLawyers(updatedLawyers);
      localStorage.setItem('lawyers', JSON.stringify(updatedLawyers));
      setSuccess(isRTL ? 'تم تحديث المحامي بنجاح!' : 'Lawyer updated successfully!');
    } else {
      // Add new lawyer
      const newLawyer: Lawyer = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      const updatedLawyers = [...lawyers, newLawyer];
      setLawyers(updatedLawyers);
      localStorage.setItem('lawyers', JSON.stringify(updatedLawyers));
      setSuccess(isRTL ? 'تم إضافة المحامي بنجاح!' : 'Lawyer added successfully!');
    }

    resetForm();
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleEdit = (lawyer: Lawyer) => {
    setFormData({
      nameAr: lawyer.nameAr,
      nameEn: lawyer.nameEn,
      specialtyAr: lawyer.specialtyAr,
      specialtyEn: lawyer.specialtyEn,
      bioAr: lawyer.bioAr,
      bioEn: lawyer.bioEn,
      image: lawyer.image,
      experience: lawyer.experience
    });
    setEditingLawyer(lawyer);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm(isRTL ? 'هل أنت متأكد من حذف هذا المحامي؟' : 'Are you sure you want to delete this lawyer?')) {
      const updatedLawyers = lawyers.filter(lawyer => lawyer.id !== id);
      setLawyers(updatedLawyers);
      localStorage.setItem('lawyers', JSON.stringify(updatedLawyers));
      setSuccess(isRTL ? 'تم حذف المحامي بنجاح!' : 'Lawyer deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
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
                {isRTL ? 'إدارة المحامين' : 'Manage Lawyers'}
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
                onClick={() => setShowForm(!showForm)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {isRTL ? 'إضافة محامي' : 'Add Lawyer'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add/Edit Form */}
        {showForm && (
          <Card className="bg-white shadow-lg border-0 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {editingLawyer 
                  ? (isRTL ? 'تحرير المحامي' : 'Edit Lawyer')
                  : (isRTL ? 'إضافة محامي جديد' : 'Add New Lawyer')
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nameAr">{isRTL ? 'الاسم بالعربية' : 'Name in Arabic'}</Label>
                    <Input
                      id="nameAr"
                      value={formData.nameAr}
                      onChange={(e) => setFormData(prev => ({ ...prev, nameAr: e.target.value }))}
                      className="mt-2 text-right"
                      dir="rtl"
                      placeholder={isRTL ? 'أدخل اسم المحامي بالعربية' : 'Enter lawyer name in Arabic'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="nameEn">{isRTL ? 'الاسم بالإنجليزية' : 'Name in English'}</Label>
                    <Input
                      id="nameEn"
                      value={formData.nameEn}
                      onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
                      className="mt-2"
                      placeholder={isRTL ? 'أدخل اسم المحامي بالإنجليزية' : 'Enter lawyer name in English'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialtyAr">{isRTL ? 'التخصص بالعربية' : 'Specialty in Arabic'}</Label>
                    <Input
                      id="specialtyAr"
                      value={formData.specialtyAr}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialtyAr: e.target.value }))}
                      className="mt-2 text-right"
                      dir="rtl"
                      placeholder={isRTL ? 'مثال: القانون التجاري' : 'Example: Commercial Law'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialtyEn">{isRTL ? 'التخصص بالإنجليزية' : 'Specialty in English'}</Label>
                    <Input
                      id="specialtyEn"
                      value={formData.specialtyEn}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialtyEn: e.target.value }))}
                      className="mt-2"
                      placeholder="Example: Commercial Law"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">{isRTL ? 'سنوات الخبرة' : 'Years of Experience'}</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      className="mt-2"
                      placeholder={isRTL ? 'مثال: 15 سنة خبرة' : 'Example: 15 Years Experience'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="bioAr">{isRTL ? 'النبذة بالعربية' : 'Bio in Arabic'}</Label>
                    <Textarea
                      id="bioAr"
                      value={formData.bioAr}
                      onChange={(e) => setFormData(prev => ({ ...prev, bioAr: e.target.value }))}
                      className="mt-2 min-h-24 text-right"
                      dir="rtl"
                      placeholder={isRTL ? 'نبذة مختصرة عن المحامي' : 'Brief bio about the lawyer'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bioEn">{isRTL ? 'النبذة بالإنجليزية' : 'Bio in English'}</Label>
                    <Textarea
                      id="bioEn"
                      value={formData.bioEn}
                      onChange={(e) => setFormData(prev => ({ ...prev, bioEn: e.target.value }))}
                      className="mt-2 min-h-24"
                      placeholder="Brief bio about the lawyer"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <Label className="text-lg font-semibold">{isRTL ? 'صورة المحامي' : 'Lawyer Photo'}</Label>
                  <div className="mt-4">
                    {!formData.image ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">
                          {isRTL ? 'اختر صورة للمحامي' : 'Choose a photo for the lawyer'}
                        </p>
                        <label htmlFor="image-upload">
                          <Button type="button" variant="outline" className="cursor-pointer" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                              {isRTL ? 'رفع صورة' : 'Upload Photo'}
                            </span>
                          </Button>
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={formData.image}
                          alt="Lawyer"
                          className="w-32 h-32 object-cover rounded-lg mx-auto"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4 rtl:space-x-reverse">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    {editingLawyer 
                      ? (isRTL ? 'تحديث المحامي' : 'Update Lawyer')
                      : (isRTL ? 'إضافة المحامي' : 'Add Lawyer')
                    }
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    {isRTL ? 'إلغاء' : 'Cancel'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Lawyers List */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Scale className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
              {isRTL ? 'قائمة المحامين' : 'Lawyers List'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lawyers.length === 0 ? (
              <div className="text-center py-8">
                <Scale className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isRTL ? 'لا يوجد محامين' : 'No Lawyers Found'}
                </h3>
                <p className="text-gray-600">
                  {isRTL ? 'ابدأ بإضافة محامي جديد' : 'Start by adding a new lawyer'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lawyers.map((lawyer) => (
                  <Card key={lawyer.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        {lawyer.image ? (
                          <img
                            src={lawyer.image}
                            alt={isRTL ? lawyer.nameAr : lawyer.nameEn}
                            className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                            <User className="w-10 h-10 text-gray-400" />
                          </div>
                        )}
                        <h3 className="font-bold text-gray-900 text-lg">
                          {isRTL ? lawyer.nameAr : lawyer.nameEn}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {isRTL ? lawyer.specialtyAr : lawyer.specialtyEn}
                        </p>
                        <p className="text-sm text-gray-500">{lawyer.experience}</p>
                      </div>

                      {(lawyer.bioAr || lawyer.bioEn) && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {isRTL ? lawyer.bioAr : lawyer.bioEn}
                        </p>
                      )}

                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button
                          onClick={() => handleEdit(lawyer)}
                          size="sm"
                          variant="outline"
                          className="flex-1"
                        >
                          <Edit className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                          {isRTL ? 'تحرير' : 'Edit'}
                        </Button>
                        <Button
                          onClick={() => handleDelete(lawyer.id)}
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
    </div>
  );
}