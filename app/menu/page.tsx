import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuPageContent from "@/components/MenuPageContent";

export const metadata: Metadata = {
  title: "منوی رستوران | رستوران‌های زنجیره‌ای ترخینه",
  description: "مشاهده منوی کامل غذاهای ایرانی، غذاهای غیر ایرانی، پیتزاها، ساندویچ‌ها، پیش‌غذا، دسر و نوشیدنی‌های ترخینه.",
};

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-page flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <MenuPageContent />
      </main>
      <Footer />
    </div>
  );
}
