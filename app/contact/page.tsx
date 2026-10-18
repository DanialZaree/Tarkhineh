import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPageContent from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "تماس با ما | رستوران‌های زنجیره‌ای ترخینه",
  description: "با ترخینه در تماس باشید. آدرس، شماره تماس و ساعات کاری شعبات رستوران‌های زنجیره‌ای ترخینه (اکباتان، چالوس، اقدسیه، ونک).",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <ContactPageContent />
      </main>
      <Footer />
    </div>
  );
}
