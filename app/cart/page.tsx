import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartPageContent from "@/components/CartPageContent";

export const metadata: Metadata = {
  title: "سبد خرید | رستوران‌های زنجیره‌ای ترخینه",
  description: "سبد خرید و تکمیل سفارش آنلاین از شعب رستوران‌های زنجیره‌ای ترخینه.",
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-page flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <CartPageContent />
      </main>
      <Footer />
    </div>
  );
}
