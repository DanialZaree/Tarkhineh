import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqPageContent from "@/components/FaqPageContent";

export const metadata: Metadata = {
  title: "قوانین ترخینه | رستوران‌های زنجیره‌ای ترخینه",
  description: "قوانین، شرایط و ضوابط سفارش آنلاین و حضوری در رستوران‌های زنجیره‌ای ترخینه.",
};

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <FaqPageContent initialTab="rules" />
      </main>
      <Footer />
    </div>
  );
}
