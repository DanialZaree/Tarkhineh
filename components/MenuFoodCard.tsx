"use client";

import { useState, memo } from "react";
import Image from "next/image";
import { Heart, Star1 } from "iconsax-react";
import { MenuItem } from "@/lib/menuData";
import { toPersianDigits, safeImageSrc } from "@/lib/utils";
import { useCart, useFavorites } from "@/lib/siteStorage";

export const MenuFoodCard = memo(function MenuFoodCard({ item }: { item: MenuItem }) {
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
      description: item.description,
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
    <div className="bg-white border border-neutral-200 hover:border-primary/50 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-row items-center p-2.5 sm:p-3.5 gap-2.5 sm:gap-4">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-lg sm:rounded-xl overflow-hidden shrink-0 bg-neutral-100">
        <Image
          src={imgSrc}
          alt={item.name}
          fill
          unoptimized={isRemote}
          sizes="(max-width: 640px) 96px, 144px"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between text-right font-sans min-w-0 h-full py-0.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-xs sm:text-sm md:text-base text-tarkhineh-dark truncate">
            {item.name}
          </h3>

          <div dir="ltr" className="flex items-center gap-1.5 shrink-0">
            {item.discount && (
              <span className="bg-[#fff0f2] text-[#e03a4f] text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-full inline-flex items-center">
                %{toPersianDigits(item.discount)}
              </span>
            )}
            {item.oldPrice && (
              <span className="text-[10px] sm:text-xs text-tarkhineh-muted line-through">
                {toPersianDigits(item.oldPrice)}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 my-1">
          <p className="text-[10px] sm:text-xs text-neutral-500 leading-relaxed line-clamp-1 sm:line-clamp-2 flex-1">
            {item.description}
          </p>

          <div className="font-bold text-xs sm:text-sm text-tarkhineh-dark shrink-0 whitespace-nowrap">
            <span>{toPersianDigits(item.price)}</span>
            <span className="text-[10px] sm:text-[11px] font-normal text-tarkhineh-muted mr-1">
              تومان
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-neutral-100">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleToggleLike}
              className="text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
              aria-label="افزودن به علاقه‌مندی‌ها"
            >
              <Heart
                size={16}
                color={liked ? "#e11d48" : "currentColor"}
                variant={liked ? "Bold" : "Linear"}
              />
            </button>

            <div className="flex items-center gap-0.5 text-amber-500">
              {Array.from({ length: 5 }, (_, i) => (
                <Star1
                  key={i}
                  size={12}
                  color="#f59e0b"
                  variant={i < item.rating ? "Bold" : "Linear"}
                  className={i < item.rating ? "text-amber-500" : "text-neutral-300"}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`py-1.5 px-2.5 sm:px-3.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-primary hover:bg-primary-hover active:scale-[0.98] text-white"
            }`}
          >
            {added ? "افزوده شد ✓" : "افزودن به سبد خرید"}
          </button>
        </div>
      </div>
    </div>
  );
});

export default MenuFoodCard;
