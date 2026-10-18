"use client";

import { Card, TickCircle, Trash, User, Warning2 } from "iconsax-react";
import { toPersianDigits } from "@/lib/utils";
import type { DeliveryMethod, PaymentMethod } from "./types";

interface OrderSummaryProps {
  totalCount: number;
  totalDiscount: number;
  payableAmount: number;
  onClear?: () => void;
  showHeader?: boolean;
  onProceed?: () => void;
  isLoggedIn?: boolean;
  step?: number;
  deliveryMethod?: DeliveryMethod;
  shippingCost?: number;
  paymentMethod?: PaymentMethod;
}

export function OrderSummary({
  totalCount,
  totalDiscount,
  payableAmount,
  onClear,
  showHeader = true,
  onProceed,
  isLoggedIn = false,
  step = 0,
  deliveryMethod = "courier",
  shippingCost = 29000,
  paymentMethod = "online",
}: OrderSummaryProps) {
  const isCompleteInfo = step === 1;
  const isPayment = step === 2;
  const isPickup = deliveryMethod === "pickup";

  return (
    <div className="space-y-3.5">
      {showHeader && (
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <span className="font-bold text-sm text-tarkhineh-dark">
            سبد خرید ({toPersianDigits(totalCount)})
          </span>
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer"
              aria-label="پاک کردن سبد خرید"
            >
              <Trash size={18} color="currentColor" variant="Linear" />
            </button>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-600">
        <span>تخفیف محصولات</span>
        <span>{toPersianDigits(totalDiscount.toLocaleString())} تومان</span>
      </div>
      {step < 2 && !isPickup && (
        <div className="pt-2 border-t border-neutral-200">
          <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-600">
            <span>هزینه ارسال</span>
            <span>۰ تومان</span>
          </div>
          <div className="flex items-start gap-1.5 mt-2 text-xs text-[#b45309] leading-relaxed">
            <Warning2 size={16} color="currentColor" variant="Bold" className="shrink-0 mt-0.5" />
            <span>هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال انتخابی شما محاسبه و به این مبلغ اضافه خواهد شد.</span>
          </div>
        </div>
      )}

      {step === 2 && !isPickup && (
        <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs sm:text-sm text-neutral-600">
          <span>هزینه ارسال</span>
          <span>{toPersianDigits(shippingCost.toLocaleString())} تومان</span>
        </div>
      )}

      <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-sm sm:text-base font-bold text-tarkhineh-dark">
        <span>مبلغ قابل پرداخت</span>
        <span className="text-primary font-bold text-base sm:text-lg">
          {toPersianDigits(payableAmount.toLocaleString())} تومان
        </span>
      </div>

      <button
        type="button"
        onClick={onProceed}
        className={`w-full rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium transition-all shadow-xs cursor-pointer ${
          isCompleteInfo && !isLoggedIn
            ? "bg-neutral-100 text-neutral-400 hover:bg-neutral-200"
            : "bg-primary hover:bg-primary-hover active:scale-[0.98] text-white"
        }`}
      >
        {isPayment ? (
          paymentMethod === "offline" ? (
            <>
              <TickCircle size={18} color="currentColor" variant="Linear" />
              <span>ثبت سفارش</span>
            </>
          ) : (
            <>
              <Card size={18} color="currentColor" variant="Linear" />
              <span>تایید و پرداخت</span>
            </>
          )
        ) : isCompleteInfo ? (
          <>
            <TickCircle size={18} color="currentColor" variant="Linear" />
            <span>{isLoggedIn ? "ثبت سفارش" : "ورود/ثبت‌نام"}</span>
          </>
        ) : (
          <>
            <User size={18} color="currentColor" variant="Linear" />
            <span>{isLoggedIn ? "تکمیل اطلاعات" : "ورود/ثبت‌نام"}</span>
          </>
        )}
      </button>
    </div>
  );
}
