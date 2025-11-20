import './globals.css';
import { Inter, Outfit } from 'next/font/google';
import LenisScroll from './LenisScroll';
import Logo from '../public/images/brandlogo.png';
const inter = Inter({ subsets: ['latin'] });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata = {
  title: 'SenseOriginal - Counterfeit Protection & Product Authentication',
  description: 'SenseOriginal provides advanced NFC-based product authentication and anti-counterfeiting solutions. Protect your brand with real-time verification, tamper-proof technology, and customer trust.',
  keywords: 'SenseOriginal, product authentication, anti-counterfeiting, NFC authentication, counterfeit protection, brand protection, product verification, genuine products, anti-fake, product authenticity',
  authors: [{ name: 'SenseOriginal' }],
  robots: 'index, follow',
  themeColor: '#E6E9EE',
  icons: {
    icon: '/vite.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://senseoriginal.com/',
    title: 'SenseOriginal - Counterfeit Protection & Product Authentication',
    description: 'Advanced NFC-based product authentication. Protect your brand from counterfeits with SenseOriginal\'s real-time verification system.',
    images: [
      {
        url: Logo,
        width: 1200,
        height: 630,
        alt: 'SenseOriginal - Product Authentication',
      },
    ],
    siteName: 'SenseOriginal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SenseOriginal - Counterfeit Protection & Product Authentication',
    description: 'Advanced NFC-based product authentication. Protect your brand from counterfeits with real-time verification.',
    images: ['/assets/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={outfit.className}>
        <LenisScroll />
        {children}
      </body>
    </html>
  );
}
