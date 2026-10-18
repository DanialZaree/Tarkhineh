import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import MenuCategories from "@/components/MenuCategories";
import AboutSection from "@/components/AboutSection";
import BranchSection from "@/components/BranchSection";
import Footer from "@/components/Footer";

export default function RootPage() {
  return (
    <div className="min-h-screen bg-page flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <HeroCarousel showSearch />
        <MenuCategories />
        <AboutSection />
        <BranchSection />
      </main>
      <Footer />
    </div>
  );
}

