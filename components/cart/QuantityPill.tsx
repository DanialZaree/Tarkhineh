"use client";

import { Add, Minus, Trash } from "iconsax-react";
import { toPersianDigits } from "@/lib/utils";

interface QuantityPillProps {
  quantity: number;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
}

export function QuantityPill({ quantity, onInc, onDec, onRemove }: QuantityPillProps) {
  return (
    <div className="bg-[#e6f2eb] rounded-lg px-2.5 py-1 inline-flex items-center gap-2 text-primary font-bold text-xs sm:text-sm select-none">
      <button
        type="button"
        onClick={onInc}
        className="hover:scale-110 active:scale-95 transition-transform cursor-pointer"
        aria-label="افزایش تعداد"
      >
        <Add size={14} color="currentColor" variant="Linear" />
      </button>

      <span className="min-w-4 text-center">{toPersianDigits(quantity)}</span>

      {quantity > 1 ? (
        <button
          type="button"
          onClick={onDec}
          className="hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          aria-label="کاهش تعداد"
        >
          <Minus size={14} color="currentColor" variant="Linear" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onRemove}
          className="text-neutral-500 hover:text-rose-500 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          aria-label="حذف آیتم"
        >
          <Trash size={14} color="currentColor" variant="Linear" />
        </button>
      )}
    </div>
  );
}
