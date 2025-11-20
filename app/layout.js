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

  openGraph: {
    type: "website",
    url: "https://sense-original-nextjs.vercel.app",
    title: "SenseOriginal - Counterfeit Protection & Product Authentication",
    description:
      "Advanced NFC-based product authentication. Protect your brand from counterfeits.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SenseOriginal - Product Authentication",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SenseOriginal - Counterfeit Protection & Product Authentication",
    description:
      "Advanced NFC-based product authentication. Protect your brand from counterfeits.",
    images: ["/opengraph-image.png"],
  },

  // EXTRA FOR WHATSAPP + TEAMS
  other: {
    "og:image": "https://sense-original-nextjs.vercel.app/opengraph-image.png",
    "og:image:width": "1200",
    "og:image:height": "630",

    "msapplication-TileImage":
      "https://sense-original-nextjs.vercel.app/opengraph-image.png",
    "msapplication-TileColor": "#BDBDBD",
    "theme-color": "#BDBDBD",
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
