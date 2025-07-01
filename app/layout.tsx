import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSansArabic = Noto_Sans_Arabic({ 
  subsets: ['arabic'], 
  variable: '--font-arabic' 
});

export const metadata: Metadata = {
  title: 'Amank Law Firm | أمانك للمحاماة والاستشارات القانونية',
  description: 'Professional legal services with over 15 years of experience | خدمات قانونية متميزة بخبرة تزيد عن 15 عامًا',
  keywords: 'law firm, legal services, lawyer, attorney, محاماة, قانوني, استشارات قانونية',
  authors: [{ name: 'Amank Law Firm' }],
  openGraph: {
    title: 'Amank Law Firm | أمانك للمحاماة والاستشارات القانونية',
    description: 'Professional legal services with over 15 years of experience',
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${notoSansArabic.variable} font-sans antialiased`}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}