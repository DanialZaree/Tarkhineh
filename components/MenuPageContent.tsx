"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { SearchNormal1, ShoppingCart, ArrowLeft2 } from "iconsax-react";
import HeroCarousel from "@/components/HeroCarousel";
import MenuFoodCard from "@/components/MenuFoodCard";
import {
  CATEGORIES,
  MAIN_SUBCATEGORIES,
  ALL_MENU_ITEMS,
  type MenuItem,
} from "@/lib/menuData";
import { getStoredProducts } from "@/lib/productStorage";
import { toPersianDigits } from "@/lib/utils";

const PERSIAN_TO_CAT: Record<string, "main" | "appetizer" | "dessert" | "drink"> = {
  "غذای اصلی": "main",
  "پیش‌غذا": "appetizer",
  "دسر": "dessert",
  "نوشیدنی": "drink",
};

const MENU_HERO_SLIDES = [
  {
    id: 1,
    image: "/slide-1.jpg",
    title: "لذت غذای سالم و گیاهی را با ترخینه تجربه کنید!",
    link: "#menu-content",
  },
  {
    id: 2,
    image: "/slide-2.jpg",
    title: "طعم اصیل و به‌یادماندنی غذاهای اصیل ایرانی",
    link: "#menu-content",
  },
  {
    id: 3,
    image: "/slide-3.jpg",
    title: "تلفیق سلامت و طعم در منوی ویژه ترخینه",
    link: "#menu-content",
  },
];

const ALL_SUBCATS = [{ id: "all", name: "همه غذاها" }, ...MAIN_SUBCATEGORIES];

export default function MenuPageContent() {
  const [foods, setFoods] = useState<MenuItem[]>(ALL_MENU_ITEMS);
  const [activeCategory, setActiveCategory] = useState<"main" | "appetizer" | "dessert" | "drink">("main");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const syncFoods = () => {
      const stored = getStoredProducts();
      if (!stored || stored.length === 0) return;
      const originalMap = new Map(ALL_MENU_ITEMS.map((item) => [item.id, item]));

      const mapped: MenuItem[] = stored.map((p: any) => {
        const orig = originalMap.get(p.id);
        const cat = PERSIAN_TO_CAT[p.category] || (p.category as any) || "main";
        return {
          id: p.id,
          name: p.name,
          description: orig?.description || "غذای تازه و اصیل تهیه شده با مرغوب‌ترین مواد اولیه ترخینه",
          image: p.image || "/food/pasta.png",
          price: typeof p.price === "number" ? toPersianDigits(p.price.toLocaleString("fa-IR")) : toPersianDigits(p.price),
          oldPrice: orig?.oldPrice,
          discount: orig?.discount,
          rating: orig?.rating || 5,
          ratingCount: orig?.ratingCount || 1,
          category: cat,
          subCategory: orig?.subCategory || "iranian",
        };
      });

      setFoods(mapped);
    };

    syncFoods();
    window.addEventListener("tarkhineh_storage_change", syncFoods);
    window.addEventListener("storage", syncFoods);
    return () => {
      window.removeEventListener("tarkhineh_storage_change", syncFoods);
      window.removeEventListener("storage", syncFoods);
    };
  }, []);

  const currentCategoryObj = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  const handleSubCategoryClick = (subId: string) => {
    setActiveSubCategory((prev) => (prev === subId ? "all" : subId));
  };

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return foods.filter((item) => {
      if (item.category !== activeCategory) return false;
      if (activeCategory === "main" && activeSubCategory !== "all" && item.subCategory !== activeSubCategory) {
        return false;
      }
      if (q) {
        return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [foods, activeCategory, activeSubCategory, searchQuery]);

  const sections = useMemo(() => {
    if (activeCategory !== "main") {
      return [{ id: activeCategory, title: currentCategoryObj.name, items: filteredItems }];
    }

    if (searchQuery.trim() || activeSubCategory !== "all") {
      const activeSubName = MAIN_SUBCATEGORIES.find((s) => s.id === activeSubCategory)?.name;
      return [{
        id: activeSubCategory,
        title: activeSubName || "نتایج جستجو",
        items: filteredItems,
      }];
    }

    return MAIN_SUBCATEGORIES.map((sub) => ({
      id: sub.id,
      title: sub.name,
      items: filteredItems.filter((item) => item.subCategory === sub.id),
    })).filter((sec) => sec.items.length > 0);
  }, [activeCategory, activeSubCategory, searchQuery, filteredItems, currentCategoryObj.name]);

  return (
    <div dir="rtl" className="w-full font-sans pb-20">
      <HeroCarousel slides={MENU_HERO_SLIDES} />

      <div className="w-full bg-[#f2f2f2] border-b border-neutral-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-5 sm:gap-10 overflow-x-auto scrollbar-none py-2.5 sm:py-3.5">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveSubCategory("all");
                    setSearchQuery("");
                  }}
                  className={`text-xs sm:text-sm md:text-base font-bold whitespace-nowrap pb-1 transition-all cursor-pointer ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div id="menu-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6 space-y-4 sm:space-y-6">
        {activeCategory === "main" && (
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {ALL_SUBCATS.map((sub) => {
              const isSelected = activeSubCategory === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => handleSubCategoryClick(sub.id)}
                  className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#e2e8f0] text-primary font-bold shadow-2xs"
                      : "bg-[#ededed] text-neutral-800 hover:bg-[#e5e5e5]"
                  }`}
                >
                  <span>{sub.name}</span>
                  <ArrowLeft2 size={13} color="currentColor" variant="Linear" className="text-neutral-500 shrink-0" />
                </button>
              );
            })}
          </div>
        )}

        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو"
            className="w-full h-10 sm:h-11 pr-4 pl-11 rounded-lg border border-neutral-300 focus:border-primary focus:outline-none bg-white text-xs sm:text-sm text-tarkhineh-dark placeholder:text-tarkhineh-dark transition-colors text-right shadow-2xs"
          />
          <SearchNormal1
            size={20}
            color="currentColor"
            variant="Linear"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-800 pointer-events-none"
          />
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-neutral-500">
            <p className="text-sm sm:text-base font-medium">موردی یافت نشد.</p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs text-primary underline cursor-pointer"
              >
                پاک کردن جستجو
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-8 sm:space-y-12 pt-1">
            {sections.map((section, idx) => (
              <section key={section.id} id={`sub-${section.id}`} className="space-y-3.5 sm:space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-xl font-bold text-tarkhineh-dark text-right">
                    {section.title}
                  </h2>
                  {idx === 0 && (
                    <Link
                      href="/cart"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all text-xs font-medium shadow-2xs"
                    >
                      <ShoppingCart size={15} color="currentColor" variant="Linear" />
                      <span>تکمیل خرید</span>
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  {section.items.map((item) => (
                    <MenuFoodCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
