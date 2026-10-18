import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "درباره ما | رستوران‌های زنجیره‌ای ترخینه",
  description: "درباره ترخینه بیشتر بدانید! رستوران‌های زنجیره‌ای ترخینه از سال ۱۳۶۸ با ارائه غذاهای باکیفیت و محیطی دلنشین در خدمت مردم شریف ایران است.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <AboutPageContent />
      </main>
      <Footer />
    </div>
  );
}
