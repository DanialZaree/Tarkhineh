"use client";

import Image from "next/image";
import { Star1, Trash } from "iconsax-react";
import { toPersianDigits } from "@/lib/utils";
import { QuantityPill } from "./QuantityPill";
import { OrderSummary } from "./OrderSummary";
import type { CartItem } from "./types";

interface Step0CartProps {
  items: CartItem[];
  totalCount: number;
  totalDiscount: number;
  payableAmount: number;
  isLoggedIn: boolean;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceed: () => void;
}

export function Step0Cart({
  items,
  totalCount,
  totalDiscount,
  payableAmount,
  isLoggedIn,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceed,
}: Step0CartProps) {
  return (
    <>
      {/* cart-mobile */}
      <div className="block md:hidden mt-3 border border-neutral-200 rounded-2xl bg-white p-4 shadow-2xs space-y-4">
        <div className="max-h-75 overflow-y-auto space-y-2.5 pl-1">
          {items.map((item) => (
            <div key={item.id} className="bg-[#f8f9fa] rounded-xl p-3 flex items-center justify-between">
              <div className="space-y-1 text-right">
                <h3 className="font-bold text-xs sm:text-sm text-tarkhineh-dark">{item.name}</h3>
                <p className="text-[11px] sm:text-xs text-neutral-500">
                  {toPersianDigits(item.price.toLocaleString())} تومان
                </p>
              </div>
              <QuantityPill
                quantity={item.quantity}
                onInc={() => onUpdateQuantity(item.id, 1)}
                onDec={() => onUpdateQuantity(item.id, -1)}
                onRemove={() => onRemoveItem(item.id)}
              />
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-neutral-200">
          <OrderSummary
            totalCount={totalCount}
            totalDiscount={totalDiscount}
            payableAmount={payableAmount}
            showHeader={false}
            onProceed={onProceed}
            isLoggedIn={isLoggedIn}
            step={0}
          />
        </div>
      </div>

      {/* cart-desktop */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 border border-neutral-200 rounded-2xl bg-white p-4 sm:p-6 max-h-145 overflow-y-auto space-y-3.5 shadow-2xs">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-neutral-100 rounded-xl p-3.5 flex flex-row items-center gap-4 hover:border-primary/20 transition-all"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 bg-neutral-100 z-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-between min-w-0 h-full py-0.5 text-right">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-tarkhineh-dark truncate">{item.name}</h3>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
                    aria-label="حذف آیتم"
                  >
                    <Trash size={18} color="currentColor" variant="Linear" />
                  </button>
                </div>

                <p className="text-xs text-neutral-500 line-clamp-1 my-1">{item.description}</p>

                <div className="flex items-center gap-0.5 text-amber-500 my-1">
                  {Array.from({ length: 5 }, (_, i) => {
                    const rating = item.rating ?? 5;
                    return (
                      <Star1
                        key={i}
                        size={12}
                        color="#f59e0b"
                        variant={i < rating ? "Bold" : "Linear"}
                        className={i < rating ? "text-amber-500" : "text-neutral-300"}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-100">
                  <QuantityPill
                    quantity={item.quantity}
                    onInc={() => onUpdateQuantity(item.id, 1)}
                    onDec={() => onUpdateQuantity(item.id, -1)}
                    onRemove={() => onRemoveItem(item.id)}
                  />

                  <div className="flex items-center gap-2">
                    {item.discountPercent && (
                      <span className="bg-[#fff0f2] text-[#e03a4f] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        %{toPersianDigits(item.discountPercent)}
                      </span>
                    )}
                    {item.oldPrice && (
                      <span className="text-xs text-neutral-400 line-through">
                        {toPersianDigits(item.oldPrice.toLocaleString())}
                      </span>
                    )}
                    <span className="font-bold text-sm sm:text-base text-tarkhineh-dark">
                      {toPersianDigits(item.price.toLocaleString())} تومان
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 border border-neutral-200 rounded-2xl bg-white p-5 shadow-2xs lg:sticky lg:top-24 z-10">
          <OrderSummary
            totalCount={totalCount}
            totalDiscount={totalDiscount}
            payableAmount={payableAmount}
            onClear={onClearCart}
            showHeader={true}
            onProceed={onProceed}
            isLoggedIn={isLoggedIn}
            step={0}
          />
        </div>
      </div>
    </>
  );
}
