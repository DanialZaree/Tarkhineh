"use client";

import { useState, memo } from "react";
import Image from "next/image";
import { Heart, Star1 } from "iconsax-react";
import { MenuItem } from "@/lib/branchData";
import { toPersianDigits, safeImageSrc } from "@/lib/utils";
import { useCart, useFavorites } from "@/lib/siteStorage";

export const FoodCard = memo(function FoodCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [added, setAdded] = useState(false);
  const liked = isFavorite(item.id);
  const imgSrc = safeImageSrc(item.image);
  const isRemote = imgSrc.startsWith("http://") || imgSrc.startsWith("https://");

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: imgSrc,
      discount: item.discount,
      rating: item.rating,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleLike = () => {
    toggleFavorite({
      id: item.id,
      name: item.name,
      price: item.price,
      image: imgSrc,
      rating: item.rating,
    });
  };

  return (
    <div className="w-57.5 sm:w-67.5 md:w-76.25 lg:w-81.25 xl:w-85 2xl:w-88.75 shrink-0 bg-white border border-neutral-200 hover:border-primary/60 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between snap-start">
      <div className="relative w-full h-42 sm:h-48 md:h-52 lg:h-58 bg-neutral-100 overflow-hidden">
        <Image
          src={imgSrc}
          alt={item.name}
          fill
          unoptimized={isRemote}
          sizes="(max-width: 640px) 230px, (max-width: 1024px) 305px, 355px"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-3 text-right font-sans">
        <h3 className="font-bold text-sm sm:text-base text-tarkhineh-dark text-center line-clamp-1">
          {item.name}
        </h3>
        <div className="flex items-center justify-between text-[11px] sm:text-xs">
          <button
            type="button"
            onClick={handleToggleLike}
            className="flex items-center gap-1 text-tarkhineh-muted hover:text-rose-500 transition-colors cursor-pointer"
            aria-label="افزودن به علاقه‌مندی‌ها"
          >
            <Heart
              size={18}
              color={liked ? "#e11d48" : "currentColor"}
              variant={liked ? "Bold" : "Linear"}
            />
            <span className="hidden sm:inline text-[11px]">افزودن به علاقه‌مندی‌ها</span>
          </button>

          <div dir="ltr" className="flex items-center gap-1.5">
            {item.discount && (
              <span className="bg-[#fff0f2] text-[#e03a4f] text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center">
                %{toPersianDigits(item.discount)}
              </span>
            )}
            {item.oldPrice && (
              <span className="text-[11px] sm:text-xs text-tarkhineh-muted line-through">
                {toPersianDigits(item.oldPrice)}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-1 text-tarkhineh-muted">
            <Star1 size={15} color="#f59e0b" variant="Bold" className="shrink-0 text-amber-500" />
            <span className="font-bold text-xs text-tarkhineh-dark">
              {toPersianDigits(item.rating)}
            </span>
            {item.ratingCount && (
              <span className="hidden sm:inline text-[10px] sm:text-[11px] text-tarkhineh-muted">
                ({toPersianDigits(item.ratingCount)} امتیاز)
              </span>
            )}
          </div>

          <div className="font-bold text-tarkhineh-dark text-xs sm:text-sm">
            <span>{toPersianDigits(item.price)}</span>
            <span className="text-[10px] sm:text-[11px] font-normal text-tarkhineh-muted mr-1">
              تومان
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full py-2 sm:py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
            added
              ? "bg-emerald-600 text-white"
              : "bg-primary hover:bg-primary-hover active:scale-[0.98] text-white"
          }`}
        >
          {added ? "به سبد افزوده شد ✓" : "افزودن به سبد خرید"}
        </button>
      </div>
    </div>
  );
});

export default FoodCard;
