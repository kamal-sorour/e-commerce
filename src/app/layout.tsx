import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Exo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/NavBar/NavBar";
import Footer from "@/components/layout/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/providers/Providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
});

const siteUrl = process.env.NEXTAUTH_URL || "https://yassify.store";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yassify — Fresh Groceries Delivered Fast",
    template: "%s | Yassify",
  },
  description:
    "Yassify is your premium online grocery store for fresh, high-quality produce and everyday essentials. Shop fruits, vegetables, dairy, and pantry staples with fast delivery and unbeatable prices.",
  keywords: [
    "grocery", "online grocery", "fresh produce", "fruits", "vegetables",
    "dairy", "pantry", "delivery", "Yassify", "e-commerce", "fresh food",
    "organic", "shopping", "Egypt", "Cairo",
  ],
  authors: [{ name: "Yassify Team" }],
  creator: "Yassify",
  publisher: "Yassify",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Yassify",
    title: "Yassify — Fresh Groceries Delivered Fast",
    description:
      "Premium online grocery store with fresh produce, fast delivery, and unbeatable prices.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yassify — Fresh Groceries Delivered Fast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yassify — Fresh Groceries Delivered Fast",
    description:
      "Premium online grocery store with fresh produce, fast delivery, and unbeatable prices.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${exo.variable} h-full antialiased`}
    >
      <body className="antialiased">
        <Providers>
          <Navbar />
          <Toaster position="top-right" />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
