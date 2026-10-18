import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrdersPageContent from "@/components/OrdersPageContent";

export const metadata: Metadata = {
  title: "پیگیری سفارشات | رستوران‌های زنجیره‌ای ترخینه",
  description: "پیگیری سفارشات جاری، تاریخچه سفارش‌های تحویل شده و لغو شده در رستوران‌های زنجیره‌ای ترخینه.",
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <OrdersPageContent />
      </main>
      <Footer />
    </div>
  );
}
