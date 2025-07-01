'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'الخدمات',
    blog: 'المدونة',
    contact: 'اتصل بنا',
    
    // Homepage
    heroTitle: 'مكتب أمانك للمحاماة والاستشارات القانونية',
    heroSubtitle: 'نقدم خدمات قانونية متميزة بخبرة تزيد عن 15 عامًا في مختلف المجالات القانونية',
    heroButton: 'احجز استشارة مجانية',
    whyChooseUs: 'لماذا تختار أمانك؟',
    experience: 'خبرة واسعة',
    experienceDesc: 'أكثر من 15 عامًا في الممارسة القانونية',
    trust: 'ثقة وأمانة',
    trustDesc: 'نحافظ على سرية معلومات عملائنا',
    results: 'نتائج مضمونة',
    resultsDesc: 'نسعى لتحقيق أفضل النتائج لعملائنا',
    
    // About
    aboutTitle: 'من نحن',
    aboutIntro: 'مكتب أمانك للمحاماة والاستشارات القانونية مؤسسة رائدة في تقديم الخدمات القانونية المتميزة',
    mission: 'رسالتنا',
    missionText: 'تقديم خدمات قانونية متميزة تحقق العدالة وتحمي حقوق عملائنا',
    vision: 'رؤيتنا',
    visionText: 'أن نكون المكتب القانوني الأول والأكثر ثقة في المنطقة',
    ourTeam: 'فريقنا',
    
    // Services
    servicesTitle: 'خدماتنا القانونية',
    servicesIntro: 'نقدم مجموعة شاملة من الخدمات القانونية المتخصصة',
    civilLaw: 'القانون المدني',
    civilLawDesc: 'قضايا العقود والمسؤولية المدنية والأضرار',
    commercialLaw: 'القانون التجاري',
    commercialLawDesc: 'تأسيس الشركات والعقود التجارية والاستثمار',
    familyLaw: 'قانون الأسرة',
    familyLawDesc: 'قضايا الزواج والطلاق والحضانة والنفقة',
    criminalLaw: 'القانون الجنائي',
    criminalLawDesc: 'الدفاع في القضايا الجنائية والجنح',
    realEstate: 'العقارات',
    realEstateDesc: 'عقود البيع والشراء والإيجار والملكية',
    labor: 'قانون العمل',
    laborDesc: 'قضايا العمال وعقود العمل والتأمينات',
    
    // Blog
    blogTitle: 'مدونة أمانك القانونية',
    latestArticles: 'أحدث المقالات',
    readMore: 'اقرأ المزيد',
    publishedOn: 'نُشر في',
    categories: 'التصنيفات',
    tags: 'الكلمات المفتاحية',
    
    // Contact
    contactTitle: 'تواصل معنا',
    contactIntro: 'نحن هنا لمساعدتك في جميع احتياجاتك القانونية',
    getInTouch: 'ابدأ المحادثة',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    subject: 'الموضوع',
    message: 'الرسالة',
    send: 'إرسال',
    office: 'المكتب',
    workingHours: 'ساعات العمل',
    sunThu: 'الأحد - الخميس: 9:00 ص - 6:00 م',
    
    // Footer
    quickLinks: 'روابط سريعة',
    legalServices: 'الخدمات القانونية',
    followUs: 'تابعنا',
    allRightsReserved: 'جميع الحقوق محفوظة',
    
    // Admin/Blog Management
    createPost: 'إنشاء مقال جديد',
    title: 'العنوان',
    content: 'المحتوى',
    category: 'التصنيف',
    featuredImage: 'الصورة المميزة',
    publish: 'نشر',
    draft: 'مسودة',
    schedule: 'جدولة النشر',
  },
  
  en: {
    // Navigation
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    blog: 'Blog',
    contact: 'Contact',
    
    // Homepage
    heroTitle: 'Amank Law Firm & Legal Consultations',
    heroSubtitle: 'We provide exceptional legal services with over 15 years of experience across various legal fields',
    heroButton: 'Book Free Consultation',
    whyChooseUs: 'Why Choose Amank?',
    experience: 'Extensive Experience',
    experienceDesc: 'Over 15 years of legal practice',
    trust: 'Trust & Integrity',
    trustDesc: 'We maintain client confidentiality',
    results: 'Guaranteed Results',
    resultsDesc: 'We strive for the best outcomes for our clients',
    
    // About
    aboutTitle: 'About Us',
    aboutIntro: 'Amank Law Firm is a leading institution in providing exceptional legal services',
    mission: 'Our Mission',
    missionText: 'To provide exceptional legal services that achieve justice and protect our clients\' rights',
    vision: 'Our Vision',
    visionText: 'To be the leading and most trusted law firm in the region',
    ourTeam: 'Our Team',
    
    // Services
    servicesTitle: 'Our Legal Services',
    servicesIntro: 'We provide a comprehensive range of specialized legal services',
    civilLaw: 'Civil Law',
    civilLawDesc: 'Contract disputes, civil liability, and damages',
    commercialLaw: 'Commercial Law',
    commercialLawDesc: 'Company formation, commercial contracts, and investment',
    familyLaw: 'Family Law',
    familyLawDesc: 'Marriage, divorce, custody, and alimony cases',
    criminalLaw: 'Criminal Law',
    criminalLawDesc: 'Defense in criminal cases and misdemeanors',
    realEstate: 'Real Estate',
    realEstateDesc: 'Sale, purchase, lease, and ownership contracts',
    labor: 'Labor Law',
    laborDesc: 'Employee cases, employment contracts, and insurance',
    
    // Blog
    blogTitle: 'Amank Legal Blog',
    latestArticles: 'Latest Articles',
    readMore: 'Read More',
    publishedOn: 'Published on',
    categories: 'Categories',
    tags: 'Tags',
    
    // Contact
    contactTitle: 'Contact Us',
    contactIntro: 'We are here to help you with all your legal needs',
    getInTouch: 'Get In Touch',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    subject: 'Subject',
    message: 'Message',
    send: 'Send',
    office: 'Office',
    workingHours: 'Working Hours',
    sunThu: 'Sunday - Thursday: 9:00 AM - 6:00 PM',
    
    // Footer
    quickLinks: 'Quick Links',
    legalServices: 'Legal Services',
    followUs: 'Follow Us',
    allRightsReserved: 'All Rights Reserved',
    
    // Admin/Blog Management
    createPost: 'Create New Post',
    title: 'Title',
    content: 'Content',
    category: 'Category',
    featuredImage: 'Featured Image',
    publish: 'Publish',
    draft: 'Draft',
    schedule: 'Schedule Publishing',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    isRTL: language === 'ar',
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}