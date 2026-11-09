import type { Metadata, Viewport } from 'next';
import { Galada, Hind_Siliguri, Cormorant_Garamond } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const galada = Galada({
  weight: '400',
  subsets: ['bengali', 'latin'],
  variable: '--font-galada',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '600', '700'],
  subsets: ['bengali', 'latin'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#6F0E20',
};

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  metadataBase: new URL('https://jhilik-koushik.wedding'),
  openGraph: {
    title: 'Jhilik & Koushik | শুভ বিবাহ',
    description:
      'আপনাকে সাদর আমন্ত্রণ জানাচ্ছি ঝিলিক ও কৌশিকের শুভ বিবাহ অনুষ্ঠানে।',
    images: ['/og-image.png'],
    siteName: 'Jhilik & Koushik | শুভ বিবাহ',
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${galada.variable} ${hindSiliguri.variable} ${cormorantGaramond.variable}`}
    >
      <body className={`${hindSiliguri.variable} ${cormorantGaramond.variable} ${galada.variable} font-body min-h-[100dvh]`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
