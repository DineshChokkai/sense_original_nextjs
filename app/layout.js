// app/layout.jsx
import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import LenisScroll from "./LenisScroll";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  metadataBase: new URL("https://sense-original-nextjs.vercel.app"),

  title: "SenseOriginal - Counterfeit Protection & Product Authentication",
  description:
    "SenseOriginal provides NFC-based authentication & anti-counterfeiting technology with real-time verification and brand protection.",

  icons: {
    icon: "/vite.png",
    // apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    url: "https://sense-original-nextjs.vercel.app",
    title: "SenseOriginal - Counterfeit Protection & Product Authentication",
    description:
      "Advanced NFC-based product authentication. Protect your brand from counterfeits.",
    images: [
      {
        url: "https://sense-original-nextjs.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SenseOriginal - Product Authentication",
      },
    ],
    siteName: "SenseOriginal",
  },

  twitter: {
    card: "summary_large_image",
    title: "SenseOriginal - Counterfeit Protection & Product Authentication",
    description:
      "Advanced NFC-based product authentication. Protect your brand from counterfeits.",
    images: ["https://sense-original-nextjs.vercel.app/opengraph-image.png"],
  },

  // EXTRA: Microsoft Teams + WhatsApp required meta tags
  other: {
    "og:image": "https://sense-original-nextjs.vercel.app/opengraph-image.png",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/png",
    "og:type": "website",
    "og:title": "SenseOriginal - Counterfeit Protection & Product Authentication",
    "og:description": "Advanced NFC-based product authentication. Protect your brand from counterfeits.",
    "og:url": "https://sense-original-nextjs.vercel.app",
    "msapplication-TileImage":
      "https://sense-original-nextjs.vercel.app/opengraph-image.png",
    "msapplication-TileColor": "#6B7280",
    
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
