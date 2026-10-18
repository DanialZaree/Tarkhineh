"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  SearchNormal1,
  ArrowRight2,
  Star1,
} from "iconsax-react";
import { cn, toPersianDigits } from "@/lib/utils";
import ProfileSidebar from "@/components/ProfileSidebar";
import { useCart, useFavorites, FavoriteItem } from "@/lib/siteStorage";

export type FavoriteCategory = "all" | "main" | "appetizer" | "dessert" | "drink";

const CATEGORY_TABS: { id: FavoriteCategory; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "main", label: "غذای اصلی" },
  { id: "appetizer", label: "پیش غذا" },
  { id: "dessert", label: "دسر" },
  { id: "drink", label: "نوشیدنی" },
];

export default function FavoritesPageContent() {
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<FavoriteCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleRemove = (id: string) => {
    removeFavorite(id);
  };

  const handleAddToCart = (item: FavoriteItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      rating: item.rating,
    });
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const filtered = favorites.filter(
    (item) =>
      (activeCategory === "all" || item.category === activeCategory) &&
      item.name.includes(searchQuery.trim())
  );

  return (
    <div dir="rtl" className="w-full font-sans bg-[#fafafa] min-h-[calc(100vh-160px)] py-4 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* mobile-header */}
        <div className="flex items-center justify-between pb-3 sm:hidden">
          <Link href="/profile" className="p-1 text-tarkhineh-dark hover:text-primary transition-colors cursor-pointer">
            <ArrowRight2 size={20} color="currentColor" variant="Linear" />
          </Link>
          <h1 className="text-base font-bold text-tarkhineh-dark text-center flex-1">علاقه‌مندی‌ها</h1>
          <div className="w-7" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <ProfileSidebar />

          <main className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-4 sm:p-7 shadow-2xs min-h-115 flex flex-col">
            <div className="hidden sm:block pb-4 mb-5 border-b border-neutral-200">
              <h2 className="text-base sm:text-lg font-bold text-tarkhineh-dark">علاقه‌مندی‌ها</h2>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-neutral-100">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {CATEGORY_TABS.map((tab) => {
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveCategory(tab.id)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap border",
                        isActive
                          ? "bg-emerald-50 text-primary border-primary/30 font-semibold"
                          : "bg-neutral-100 text-neutral-600 border-transparent hover:bg-neutral-200"
                      )}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="relative w-full sm:w-56 md:w-60">
                <input
                  type="text"
                  placeholder="جستجو..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pr-8 pl-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:outline-none placeholder:text-neutral-400 font-sans"
                />
                <SearchNormal1
                  size={14}
                  color="currentColor"
                  variant="Linear"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
              </div>
            </div>

            {favorites.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12 sm:py-20">
                <p className="text-xs sm:text-sm md:text-base font-medium text-neutral-600 mb-6 max-w-md leading-relaxed">
                  شما در حال حاضر هیچ محصولی را به علاقه‌مندی‌ها اضافه نکرده‌اید!
                </p>
                <Link
                  href="/menu"
                  className="border border-primary text-primary hover:bg-primary hover:text-white rounded-lg px-8 py-2.5 text-xs sm:text-sm font-medium transition-all shadow-2xs"
                >
                  منوی رستوران
                </Link>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8 sm:py-14 animate-in fade-in duration-200">
                <p className="text-xs sm:text-sm md:text-base font-medium text-neutral-700 mb-6 sm:mb-8">
                  موردی با این مشخصات پیدا نکردیم!
                </p>
                <div className="relative w-48 h-48 sm:w-60 sm:h-60 mx-auto">
                  <Image
                    src="/match-not-found.png"
                    alt="موردی با این مشخصات پیدا نکردیم"
                    fill
                    className="object-contain pointer-events-none"
                    priority
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="border border-neutral-200 rounded-xl sm:rounded-2xl bg-white overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-xs hover:border-neutral-300 transition-all group"
                  >
                    <div className="relative w-full aspect-4/3 bg-neutral-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-2.5 sm:p-3.5 flex flex-col flex-1 justify-between gap-2.5">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-semibold text-xs sm:text-sm text-tarkhineh-dark truncate text-right flex-1">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          className="text-rose-600 hover:scale-110 active:scale-95 transition-transform p-0.5 cursor-pointer shrink-0"
                          title="حذف از علاقمندی‌ها"
                          aria-label="حذف از علاقمندی‌ها"
                        >
                          <Heart size={18} color="currentColor" variant="Bold" className="text-rose-600" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-neutral-600 text-[11px] sm:text-xs">
                        <div className="hidden sm:flex items-center gap-0.5" dir="ltr">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star1
                              key={s}
                              size={14}
                              color={s <= item.rating ? "#f59e0b" : "#d1d5db"}
                              variant="Bold"
                              className={s <= item.rating ? "text-amber-500" : "text-neutral-300"}
                            />
                          ))}
                        </div>
                        <div className="flex sm:hidden items-center gap-1 text-[11px] font-sans">
                          <Star1 size={14} color="#f59e0b" variant="Bold" className="text-amber-500" />
                          <span>{toPersianDigits(item.rating)}</span>
                        </div>
                        <span className="font-sans text-neutral-700 font-medium">{item.price}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className={`w-full mt-1 ${
                          addedItems[item.id]
                            ? "bg-emerald-600 text-white"
                            : "bg-primary hover:bg-primary-hover active:scale-95 text-white"
                        } rounded-lg py-2 text-xs sm:text-sm font-medium transition-all text-center cursor-pointer shadow-2xs`}
                      >
                        {addedItems[item.id] ? "به سبد افزوده شد ✓" : "افزودن به سبد خرید"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
