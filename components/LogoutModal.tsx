"use client";

import { Add } from "iconsax-react";

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans animate-in fade-in duration-150"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-95 sm:max-w-100 bg-white rounded-2xl p-5 sm:p-6 shadow-2xl text-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 sm:left-5 sm:top-5 p-1 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
          aria-label="بستن"
        >
          <Add size={22} color="currentColor" variant="Linear" className="rotate-45" />
        </button>
        <h3 className="font-bold text-base sm:text-lg text-tarkhineh-dark mb-4">خروج</h3>
        <p className="text-xs sm:text-sm text-neutral-600 mb-6 select-none font-normal">
          آیا مایل به خروج از حساب کاربری خود هستید؟
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 max-w-32.5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
          >
            بازگشت
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 max-w-32.5 py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            خروج
          </button>
        </div>
      </div>
    </div>
  );
}
