import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  weight: ["700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parathewalewebsite.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // ── Title & Description ────────────────────────────────────────────────
  title: {
    default: "Best paratha in Indore | Parathe wale — Sudama Nagar",
    template: "%s | Parathe wale Indore",
  },
  description:
    "Craving fresh stuffed parathas in Indore? Visit Parathe wale, Sudama Nagar — aloo, paneer, cheese parathas, student thalis from ₹30. Open daily 8AM–11PM. Order on WhatsApp.",

  // ── Keywords ───────────────────────────────────────────────────────────
  keywords: [
    "best paratha in Indore",
    "paratha shop Sudama Nagar",
    "student thali Indore",
    "affordable food Sudama Nagar",
    "paratha shop near me Indore",
    "budget meals Indore students",
    "Parathe wale",
    "aloo paratha Indore",
    "paneer paratha Indore",
    "cheese paratha Indore",
    "thali Sudama Nagar",
    "WhatsApp food order Indore",
  ],

  // ── Canonical ──────────────────────────────────────────────────────────
  alternates: {
    canonical: "/",
  },

  // ── Robots ────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── OpenGraph ─────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Parathe wale",
    title: "Best paratha in Indore | Parathe wale — Sudama Nagar",
    description:
      "Fresh stuffed parathas, student thalis & budget-friendly meals in Sudama Nagar, Indore. Order on WhatsApp. Open daily 8AM–11PM.",
    url: siteUrl,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Parathe wale — Fresh Stuffed parathas in Sudama Nagar, Indore",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Best paratha in Indore | Parathe wale — Sudama Nagar",
    description:
      "Fresh stuffed parathas, student thalis, customizable budget meals. Order on WhatsApp — Sudama Nagar, Indore.",
    images: ["/twitter-image"],
  },

  // ── App manifest / icons ─────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="h-full scroll-smooth antialiased">
      <body className={`${inter.variable} ${poppins.variable} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
