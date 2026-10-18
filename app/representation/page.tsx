import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RepresentationPageContent from "@/components/RepresentationPageContent";

export const metadata: Metadata = {
  title: "اعطای نمایندگی | رستوران‌های زنجیره‌ای ترخینه",
  description: "همین الان به خانواده بزرگ ترخینه بپیوندید! شرایط، مزایا و فرم ثبت درخواست نمایندگی رستوران‌های زنجیره‌ای ترخینه.",
};

export default function RepresentationPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <RepresentationPageContent />
      </main>
      <Footer />
    </div>
  );
}
