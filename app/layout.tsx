import type { Metadata } from "next";
import "@fontsource-variable/estedad";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-geist'});

export const metadata: Metadata = {
  title: "رستوران‌های زنجیره‌ای ترخینه",
  description: "سفارش آنلاین غذا و خدمات رستوران‌های زنجیره‌ای ترخینه",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={cn("h-full", "font-sans", geist.variable)}>
      <body className="min-h-screen bg-surface text-primary-dark font-sans antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
