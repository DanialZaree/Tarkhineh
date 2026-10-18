"use client";

import { Add } from "iconsax-react";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  title: string;
  onTitleChange: (val: string) => void;
  recipient: string;
  onRecipientChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  detail: string;
  onDetailChange: (val: string) => void;
  onSave: () => void;
}

export function AddressModal({
  isOpen,
  onClose,
  isEditing,
  title,
  onTitleChange,
  recipient,
  onRecipientChange,
  phone,
  onPhoneChange,
  detail,
  onDetailChange,
  onSave,
}: AddressModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-neutral-100 text-right font-sans space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <h3 className="font-bold text-sm sm:text-base text-tarkhineh-dark">
            {isEditing ? "ویرایش آدرس" : "ثبت آدرس جدید"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors p-1"
            aria-label="بستن"
          >
            <Add size={20} color="currentColor" variant="Linear" className="rotate-45" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">عنوان آدرس</label>
            <input
              type="text"
              placeholder="مثال: محل کار، خانه"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full text-xs sm:text-sm rounded-xl border border-neutral-200 p-2.5 focus:border-primary focus:outline-none text-tarkhineh-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">نام تحویل‌گیرنده (اختیاری)</label>
            <input
              type="text"
              placeholder="مثال: سردار وظیفه"
              value={recipient}
              onChange={(e) => onRecipientChange(e.target.value)}
              className="w-full text-xs sm:text-sm rounded-xl border border-neutral-200 p-2.5 focus:border-primary focus:outline-none text-tarkhineh-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">شماره تماس تحویل‌گیرنده (اختیاری)</label>
            <input
              type="tel"
              dir="ltr"
              placeholder="۰۹۱۴ ۸۶۴ ۳۳۵۰"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="w-full text-xs sm:text-sm rounded-xl border border-neutral-200 p-2.5 focus:border-primary focus:outline-none text-tarkhineh-dark text-left"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">آدرس دقیق</label>
            <textarea
              rows={3}
              placeholder="تهران: اقدسیه، بزرگراه ارتش، مجتمع شمیران سنتر، طبقه ۱۰"
              value={detail}
              onChange={(e) => onDetailChange(e.target.value)}
              className="w-full text-xs sm:text-sm rounded-xl border border-neutral-200 p-2.5 focus:border-primary focus:outline-none resize-none text-tarkhineh-dark"
            />
          </div>
        </div>

        <div className="flex gap-2.5 pt-2">
          <button
            type="button"
            onClick={onSave}
            className="flex-1 bg-primary hover:bg-primary-hover text-white rounded-lg py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer"
          >
            {isEditing ? "ذخیره تغییرات" : "ثبت آدرس"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-600 hover:border-neutral-300 transition-colors cursor-pointer"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}
