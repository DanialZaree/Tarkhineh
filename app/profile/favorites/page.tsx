import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FavoritesPageContent from "@/components/FavoritesPageContent";

export const metadata: Metadata = {
  title: "علاقمندی‌ها | رستوران‌های زنجیره‌ای ترخینه",
  description: "لیست غذاها و محصولات مورد علاقه شما در رستوران‌های زنجیره‌ای ترخینه.",
};

export default function ProfileFavoritesPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <FavoritesPageContent />
      </main>
      <Footer />
    </div>
  );
}
