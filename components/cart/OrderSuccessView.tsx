"use client";

import { useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { toPersianDigits } from "@/lib/utils";
import type { PaymentMethod } from "./types";

interface OrderSuccessViewProps {
  orderTrackingCode: string;
  paymentMethod: PaymentMethod;
  onGoHome: () => void;
  onTrackOrder?: () => void;
}

export function OrderSuccessView({
  orderTrackingCode,
  paymentMethod,
  onGoHome,
  onTrackOrder,
}: OrderSuccessViewProps) {
  const triggerFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    confetti({
      ...defaults,
      particleCount: 70,
      origin: { x: 0.2, y: 0.5 },
    });
    confetti({
      ...defaults,
      particleCount: 70,
      origin: { x: 0.8, y: 0.5 },
    });

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  useEffect(() => {
    triggerFireworks();
  }, []);

  return (
    <div
      dir="rtl"
      className="w-full font-sans py-14 sm:py-20 md:py-28 px-4 flex flex-col items-center justify-center relative overflow-hidden bg-white"
    >
      <div className="w-full max-w-xl text-center space-y-6 sm:space-y-7 z-10 animate-in fade-in duration-300">
        <div className="flex justify-center">
          <Image
            src="/check.svg"
            alt="موفقیت"
            width={160}
            height={150}
            className="w-32 h-30 sm:w-40 sm:h-38 object-contain drop-shadow-xs"
            priority
          />
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
          {paymentMethod === "offline"
            ? "سفارش شما با موفقیت ثبت شد!"
            : "پرداخت شما با موفقیت انجام شد!"}
        </h2>

        <p className="text-xs sm:text-sm text-neutral-500 font-medium">
          کد رهگیری سفارش شما: {toPersianDigits(orderTrackingCode || "۲۱۵۴۹۰۱۹")}
        </p>

        <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2">
          <button
            type="button"
            onClick={onGoHome}
            className="border border-primary text-primary hover:bg-primary/10 active:scale-[0.98] rounded-lg px-6 py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer"
          >
            بازگشت به صفحه اصلی
          </button>

          <button
            type="button"
            onClick={() => {
              triggerFireworks();
              onTrackOrder?.();
            }}
            className="bg-primary hover:bg-primary-hover active:scale-[0.98] text-white rounded-lg px-6 py-2.5 text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer"
          >
            پیگیری سفارش
          </button>
        </div>
      </div>
    </div>
  );
}
