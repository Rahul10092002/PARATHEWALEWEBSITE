import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://parathawale.example"),
  title: "Best Paratha in Indore | Paratha Wale Sudama Nagar",
  description:
    "Craving delicious parathas in Indore? Visit Paratha Wale near Lucky Bakery, Sudama Nagar. Fresh stuffed parathas, student thalis, affordable meals and customizable options.",
  keywords: [
    "best paratha in Indore",
    "student thali Indore",
    "affordable food in Sudama Nagar",
    "paratha shop near me",
    "budget meals Indore",
    "Paratha Wale",
  ],
  openGraph: {
    title: "Best Paratha in Indore | Paratha Wale Sudama Nagar",
    description:
      "Fresh stuffed parathas, student thalis, and budget-friendly meals in Sudama Nagar, Indore.",
    siteName: "Paratha Wale",
    locale: "en_IN",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Paratha in Indore | Paratha Wale Sudama Nagar",
    description:
      "Fresh stuffed parathas, student thalis, and customizable budget meals in Indore.",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
