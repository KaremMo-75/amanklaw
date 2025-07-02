'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Scale, Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { language, setLanguage, isRTL, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logo, setLogo] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeColors, setThemeColors] = useState<any>(null);

  useEffect(() => {
    // Load logo and theme colors from localStorage
    const siteContent = JSON.parse(localStorage.getItem('siteContent') || '{}');
    if (siteContent.logo) {
      setLogo(siteContent.logo);
    }
    if (siteContent.themeColors) {
      setThemeColors(siteContent.themeColors);
      applyThemeColors(siteContent.themeColors);
    }

    // Load dark mode preference
    const savedTheme = localStorage.getItem('userThemePreference');
    const prefersDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const applyThemeColors = (colors: any) => {
    if (!colors) return;
    
    const root = document.documentElement;
    if (colors.primary) root.style.setProperty('--color-primary', colors.primary);
    if (colors.secondary) root.style.setProperty('--color-secondary', colors.secondary);
    if (colors.background) root.style.setProperty('--color-background', colors.background);
    if (colors.text) root.style.setProperty('--color-text', colors.text);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('userThemePreference', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('userThemePreference', 'light');
    }
  };

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            {logo ? (
              <img src={logo} alt="Logo" className="h-8 w-auto" />
            ) : (
              <Scale className="h-8 w-8 text-blue-800 dark:text-blue-400" />
            )}
            <div className="text-xl font-bold text-blue-800 dark:text-blue-400">
              {isRTL ? 'أمانك' : 'Amank'}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleDarkMode}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            {/* Language Toggle */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleLanguage}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleDarkMode}
              className="flex items-center"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleLanguage}
              className="flex items-center"
            >
              <Globe className="h-4 w-4" />
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}