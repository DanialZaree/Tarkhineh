import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfilePageContent from "@/components/ProfilePageContent";

export const metadata: Metadata = {
  title: "پروفایل کاربری | رستوران‌های زنجیره‌ای ترخینه",
  description: "مشاهده و ویرایش اطلاعات شخصی حساب کاربری در رستوران‌های زنجیره‌ای ترخینه.",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <ProfilePageContent />
      </main>
      <Footer />
    </div>
  );
}
