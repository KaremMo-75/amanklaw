'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  User,
  Scale,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Lawyer {
  id: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  specialtyAr: string;
  specialtyEn: string;
  experience: string;
  image: string;
  createdAt: string;
}

export default function ManageLawyers() {
  const { isRTL, t } = useLanguage();
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLawyer, setEditingLawyer] = useState<Lawyer | null>(null);
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    titleAr: '',
    titleEn: '',
    specialtyAr: '',
    specialtyEn: '',
    experience: '',
    image: ''
  });
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    loadLawyers();
  }, []);

  const loadLawyers = () => {
    const savedLawyers = JSON.parse(localStorage.getItem('lawyers') || '[]');
    setLawyers(savedLawyers);
  };

  const resetForm = () => {
    setFormData({
      nameAr: '',
      nameEn: '',
      titleAr: '',
      titleEn: '',
      specialtyAr: '',
      specialtyEn: '',
      experience: '',
      image: ''
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
    if (!formData.titleAr.trim()) {
      newErrors.push(isRTL ? 'المنصب بالعربية مطلوب' : 'Arabic title is required');
    }
    if (!formData.titleEn.trim()) {
      newErrors.push(isRTL ? 'المنصب بالإنجليزية مطلوب' : 'English title is required');
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
    if (!formData.image.trim()) {
      newErrors.push(isRTL ? 'رابط الصورة مطلوب' : 'Image URL is required');
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
      titleAr: lawyer.titleAr,
      titleEn: lawyer.titleEn,
      specialtyAr: lawyer.specialtyAr,
      specialtyEn: lawyer.specialtyEn,
      experience: lawyer.experience,
      image: lawyer.image
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isRTL ? 'إدارة المحامين' : 'Manage Lawyers'}
          </h2>
          <p className="text-gray-600">
            {isRTL 
              ? 'إضافة وتحرير وحذف معلومات المحامين'
              : 'Add, edit, and delete lawyer information'
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
          {isRTL ? 'إضافة محامي' : 'Add Lawyer'}
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="bg-white shadow-lg border-0">
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
                  <Label htmlFor="titleAr">{isRTL ? 'المنصب بالعربية' : 'Title in Arabic'}</Label>
                  <Input
                    id="titleAr"
                    value={formData.titleAr}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleAr: e.target.value }))}
                    className="mt-2 text-right"
                    dir="rtl"
                    placeholder={isRTL ? 'مثال: الشريك المؤسس' : 'Example: Founding Partner'}
                  />
                </div>

                <div>
                  <Label htmlFor="titleEn">{isRTL ? 'المنصب بالإنجليزية' : 'Title in English'}</Label>
                  <Input
                    id="titleEn"
                    value={formData.titleEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
                    className="mt-2"
                    placeholder="Example: Founding Partner"
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
              </div>

              <div className="flex space-x-4 rtl:space-x-reverse">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {editingLawyer 
                    ? (isRTL ? 'تحديث المحامي' : 'Update Lawyer')
                    : (isRTL ? 'إضافة المحامي' : 'Add Lawyer')
                  }
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

      {/* Lawyers Table */}
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
                      <img
                        src={lawyer.image}
                        alt={isRTL ? lawyer.nameAr : lawyer.nameEn}
                        className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
                      />
                      <h3 className="font-bold text-gray-900 text-lg">
                        {isRTL ? lawyer.nameAr : lawyer.nameEn}
                      </h3>
                      <Badge variant="secondary" className="mb-2">
                        {isRTL ? lawyer.titleAr : lawyer.titleEn}
                      </Badge>
                      <p className="text-blue-600 font-medium text-sm">
                        {isRTL ? lawyer.specialtyAr : lawyer.specialtyEn}
                      </p>
                      <p className="text-sm text-gray-500">{lawyer.experience}</p>
                    </div>

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
  );
}