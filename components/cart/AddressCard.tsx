"use client";

import { Edit2, Trash } from "iconsax-react";
import { toPersianDigits } from "@/lib/utils";
import type { Address } from "./types";

interface AddressCardProps {
  address: Address;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function AddressCard({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: AddressCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`rounded-xl p-3.5 sm:p-4 bg-white transition-all cursor-pointer text-right flex flex-col justify-between select-none ${
        isSelected
          ? "border border-primary shadow-2xs"
          : "border border-neutral-200 hover:border-neutral-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
          {address.detail}
        </p>
        <div className="flex items-center gap-2 text-neutral-500 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="hover:text-primary transition-colors cursor-pointer p-0.5"
            title="ویرایش آدرس"
            aria-label="ویرایش آدرس"
          >
            <Edit2 size={18} color="currentColor" variant="Linear" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="hover:text-rose-500 transition-colors cursor-pointer p-0.5"
            title="حذف آدرس"
            aria-label="حذف آدرس"
          >
            <Trash size={18} color="currentColor" variant="Linear" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
        <span className="font-medium text-neutral-600">{address.title}</span>
        {address.recipientName && <span>{address.recipientName}</span>}
        {address.phone && (
          <span dir="ltr">{toPersianDigits(address.phone)}</span>
        )}
      </div>
    </div>
  );
}
