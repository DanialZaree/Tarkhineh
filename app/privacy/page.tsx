import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqPageContent from "@/components/FaqPageContent";

export const metadata: Metadata = {
  title: "حریم خصوصی | رستوران‌های زنجیره‌ای ترخینه",
  description: "سیاست حفظ حریم خصوصی و امنیت اطلاعات کاربران در رستوران‌های زنجیره‌ای ترخینه.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <FaqPageContent initialTab="privacy" />
      </main>
      <Footer />
    </div>
  );
}
