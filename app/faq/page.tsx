import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqPageContent from "@/components/FaqPageContent";

export const metadata: Metadata = {
  title: "پرسش‌های متداول | رستوران‌های زنجیره‌ای ترخینه",
  description: "سوالات متداول از ترخینه. پاسخ به پرسش‌های شما درباره امکانات ترخینه، حساب کاربری، روش‌های پرداخت و تخفیف‌ها.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <FaqPageContent initialTab="faq" />
      </main>
      <Footer />
    </div>
  );
}
