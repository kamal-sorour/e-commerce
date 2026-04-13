import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/NavBar/NavBar";
import Footer from "@/components/layout/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yassify - Fresh Groceries Delivered Fast",
  description: "Yassify is your go-to online grocery store for fresh, high-quality produce and everyday essentials. With a wide selection of fruits, vegetables, dairy, and pantry staples, we make it easy to shop for all your grocery needs from the comfort of your home. Enjoy fast delivery, unbeatable prices, and a seamless shopping experience with Yassify.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="antialiased"> 
         <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
