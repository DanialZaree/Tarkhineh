import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddressesPageContent from "@/components/AddressesPageContent";

export const metadata: Metadata = {
  title: "آدرس‌های من | رستوران‌های زنجیره‌ای ترخینه",
  description: "مدیریت و ثبت آدرس‌های تحویل سفارش در رستوران‌های زنجیره‌ای ترخینه.",
};

export default function AddressesPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <AddressesPageContent />
      </main>
      <Footer />
    </div>
  );
}
