"use client";

import Image from "next/image";
import { AddCircle, DocumentText, Location, ShoppingBag, TickCircle, Trash, TruckFast, Warning2 } from "iconsax-react";
import { toPersianDigits } from "@/lib/utils";
import { QuantityPill } from "./QuantityPill";
import { AddressCard } from "./AddressCard";
import { OrderSummary } from "./OrderSummary";
import type { Address, CartItem, DeliveryMethod } from "./types";

interface Step1InfoProps {
  deliveryMethod: DeliveryMethod;
  onSetDeliveryMethod: (m: DeliveryMethod) => void;
  addresses: Address[];
  selectedAddressId: string | null;
  onSelectAddress: (id: string) => void;
  onOpenAddAddress: () => void;
  onOpenEditAddress: (addr: Address) => void;
  onDeleteAddress: (id: string) => void;
  orderNotes: string;
  onOrderNotesChange: (val: string) => void;
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

export function Step1Info({
  deliveryMethod,
  onSetDeliveryMethod,
  addresses,
  selectedAddressId,
  onSelectAddress,
  onOpenAddAddress,
  onOpenEditAddress,
  onDeleteAddress,
  orderNotes,
  onOrderNotesChange,
  items,
  totalCount,
  totalDiscount,
  payableAmount,
  isLoggedIn,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceed,
}: Step1InfoProps) {
  return (
    <>
      {/* step1-mobile */}
      <div className="block md:hidden mt-3 space-y-4">
        <div className="border border-neutral-200 rounded-2xl bg-white p-4 shadow-2xs">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-200 text-sm font-bold text-tarkhineh-dark">
            <TruckFast size={20} color="currentColor" variant="Linear" />
            <span>روش تحویل سفارش</span>
          </div>

          <div className="pt-4 space-y-4">
            <div
              onClick={() => onSetDeliveryMethod("courier")}
              className="flex items-center gap-3 cursor-pointer select-none py-1 group"
            >
              <span
                className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center p-0.5 transition-colors shrink-0"
              >
                {deliveryMethod === "courier" && (
                  <span className="w-full h-full rounded-full bg-[#00ba88]" />
                )}
              </span>
              <span className="text-sm font-medium text-neutral-700">ارسال توسط پیک</span>
              <TruckFast size={20} color="currentColor" variant="Linear" className="text-neutral-600 shrink-0" />
            </div>

            <div
              onClick={() => onSetDeliveryMethod("pickup")}
              className="flex items-center gap-3 cursor-pointer select-none py-1 group"
            >
              <span
                className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center p-0.5 transition-colors shrink-0"
              >
                {deliveryMethod === "pickup" && (
                  <span className="w-full h-full rounded-full bg-[#00ba88]" />
                )}
              </span>
              <span className="text-sm font-medium text-neutral-700">تحویل حضوری</span>
              <ShoppingBag size={20} color="currentColor" variant="Linear" className="text-neutral-600 shrink-0" />
            </div>
          </div>
        </div>

        {deliveryMethod === "courier" ? (
          <div className="border border-neutral-200 rounded-2xl bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2 text-sm font-bold text-tarkhineh-dark">
                <Location size={20} color="currentColor" variant="Linear" />
                <span>آدرس‌ها</span>
              </div>
              <button
                type="button"
                onClick={onOpenAddAddress}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:opacity-80 transition-opacity cursor-pointer"
              >
                <AddCircle size={16} color="currentColor" variant="Linear" />
                <span>افزودن آدرس</span>
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="py-10 text-center text-xs text-neutral-400 select-none">
                شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!
              </div>
            ) : (
              <div className="pt-3 space-y-3">
                {addresses.map((addr) => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    isSelected={selectedAddressId === addr.id}
                    onSelect={() => onSelectAddress(addr.id)}
                    onEdit={() => onOpenEditAddress(addr)}
                    onDelete={() => onDeleteAddress(addr.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="border border-neutral-200 rounded-2xl bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-200 text-sm font-bold text-tarkhineh-dark">
              <Location size={20} color="currentColor" variant="Linear" />
              <span>آدرس شعبه اکباتان</span>
            </div>

            <div className="pt-3 space-y-1.5 text-[11px] sm:text-xs text-neutral-600 text-right leading-relaxed">
              <p className="text-neutral-700 text-xs sm:text-[13px]">شهرک اکباتان، فاز ۳، مجتمع تجاری کوروش، طبقه سوم</p>
              <p className="text-neutral-500">شماره تماس ۱: ۵۴۸۹ ۱۲۵۴ -۰۲۱</p>
              <p className="text-neutral-500">شماره تماس ۲: ۵۴۸۹ ۱۲۵۵ -۰۲۱</p>
              <p className="text-neutral-500 pt-0.5">ساعت کاری: همه‌روزه از ساعت ۱۲ تا ۲۳ بجز روزهای تعطیل</p>
            </div>
          </div>
        )}

        <div className="border border-neutral-200 rounded-2xl bg-white p-4 shadow-2xs">
          <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-neutral-500">
            <DocumentText size={18} color="currentColor" variant="Linear" />
            <span>توضیحات سفارش (اختیاری)</span>
          </div>
          <textarea
            rows={3}
            value={orderNotes}
            onChange={(e) => onOrderNotesChange(e.target.value)}
            placeholder="توضیحات خود را در مورد سفارش بنویسید..."
            className="w-full text-xs sm:text-sm bg-transparent border-0 p-0 focus:outline-none resize-none text-tarkhineh-dark placeholder:text-neutral-400 min-h-17.5"
          />
        </div>

        <div className="border border-neutral-200 rounded-2xl bg-white p-4 shadow-2xs">
          <OrderSummary
            totalCount={totalCount}
            totalDiscount={totalDiscount}
            payableAmount={payableAmount}
            showHeader={false}
            onProceed={onProceed}
            isLoggedIn={isLoggedIn}
            step={1}
            deliveryMethod={deliveryMethod}
          />
        </div>
      </div>

      {/* step1-desktop */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-5">
          <div className="border border-neutral-200 rounded-2xl bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-tarkhineh-dark shrink-0">
                <TruckFast size={22} color="currentColor" variant="Linear" />
                <span>روش تحویل سفارش</span>
              </div>

              <div className="flex items-center gap-8">
                <div
                  onClick={() => onSetDeliveryMethod("courier")}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <span
                    className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center p-0.5 transition-colors shrink-0"
                  >
                    {deliveryMethod === "courier" && (
                      <span className="w-full h-full rounded-full bg-[#00ba88]" />
                    )}
                  </span>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-700">
                      <span>ارسال توسط پیک</span>
                      <TruckFast size={18} color="currentColor" variant="Linear" className="text-neutral-600 shrink-0" />
                    </div>
                    <span className="text-[11px] text-neutral-400">توسط پیک رستوران ارسال شود.</span>
                  </div>
                </div>

                <div
                  onClick={() => onSetDeliveryMethod("pickup")}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <span
                    className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center p-0.5 transition-colors shrink-0"
                  >
                    {deliveryMethod === "pickup" && (
                      <span className="w-full h-full rounded-full bg-[#00ba88]" />
                    )}
                  </span>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-700">
                      <span>تحویل حضوری</span>
                      <ShoppingBag size={18} color="currentColor" variant="Linear" className="text-neutral-600 shrink-0" />
                    </div>
                    <span className="text-[11px] text-neutral-400">حضوری از شعبه تحویل بگیرید.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {deliveryMethod === "courier" ? (
            <div className="border border-neutral-200 rounded-2xl bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-tarkhineh-dark">
                  <Location size={20} color="currentColor" variant="Linear" />
                  <span>آدرس‌ها</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenAddAddress}
                  className="flex items-center gap-1 text-xs sm:text-sm font-medium text-primary hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <AddCircle size={18} color="currentColor" variant="Linear" />
                  <span>افزودن آدرس</span>
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="py-16 text-center text-xs sm:text-sm text-neutral-400 select-none">
                  شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 pt-4">
                  {addresses.map((addr) => (
                    <AddressCard
                      key={addr.id}
                      address={addr}
                      isSelected={selectedAddressId === addr.id}
                      onSelect={() => onSelectAddress(addr.id)}
                      onEdit={() => onOpenEditAddress(addr)}
                      onDelete={() => onDeleteAddress(addr.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="border border-neutral-200 rounded-2xl bg-white p-5 shadow-2xs flex flex-row items-center justify-between gap-6">
              <div className="flex-1 space-y-1.5 text-right text-xs text-neutral-600">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-tarkhineh-dark mb-1">
                  <Location size={18} color="currentColor" variant="Linear" />
                  <span>آدرس شعبه اکباتان</span>
                </div>
                <p className="text-neutral-700 text-xs sm:text-[13px] font-normal leading-relaxed">
                  اکباتان، خیابان ریاحی، کوچه سیزدهم، ساختمان آیسا، طبقه همکف
                </p>
                <p className="text-neutral-500 text-[11px] sm:text-xs">شماره تماس ۱: ۵۴۸۹ ۱۲۵۴ -۰۲۱</p>
                <p className="text-neutral-500 text-[11px] sm:text-xs">شماره تماس ۲: ۵۴۸۹ ۱۲۵۵ -۰۲۱</p>
                <p className="text-neutral-500 text-[11px] sm:text-xs">ساعت کاری: همه‌روزه از ساعت ۱۲ تا ۲۳ بجز روزهای تعطیل</p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => window.open("https://maps.google.com/?q=Ekbatan,Tehran", "_blank")}
                    className="border border-neutral-400 hover:border-neutral-600 rounded-lg px-5 py-1.5 text-[11px] sm:text-xs text-neutral-600 hover:text-neutral-800 transition-colors cursor-pointer"
                  >
                    مشاهده در نقشه
                  </button>
                </div>
              </div>

              <div className="relative w-62.5 lg:w-67.5 h-43.75 rounded-xl overflow-hidden border border-neutral-200 shrink-0">
                <Image
                  src="/map-ekbatan.png"
                  alt="نقشه شعبه اکباتان"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="border border-neutral-200 rounded-2xl bg-white p-4 sm:p-5 shadow-2xs">
            <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-neutral-500">
              <DocumentText size={20} color="currentColor" variant="Linear" />
              <span>توضیحات سفارش (اختیاری)</span>
            </div>
            <textarea
              rows={4}
              value={orderNotes}
              onChange={(e) => onOrderNotesChange(e.target.value)}
              placeholder="توضیحات خود را در مورد سفارش بنویسید..."
              className="w-full text-xs sm:text-sm bg-transparent border-0 p-0 focus:outline-none resize-none text-tarkhineh-dark placeholder:text-neutral-400 min-h-22.5"
            />
          </div>
        </div>

        <div className="lg:col-span-5 border border-neutral-200 rounded-2xl bg-white p-5 shadow-2xs lg:sticky lg:top-24 z-10 space-y-3.5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <span className="font-bold text-sm text-tarkhineh-dark">
              سبد خرید ({toPersianDigits(totalCount)})
            </span>
            <button
              type="button"
              onClick={onClearCart}
              className="text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer"
              aria-label="پاک کردن سبد خرید"
            >
              <Trash size={18} color="currentColor" variant="Linear" />
            </button>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-2.5 pl-1">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-right py-1">
                <QuantityPill
                  quantity={item.quantity}
                  onInc={() => onUpdateQuantity(item.id, 1)}
                  onDec={() => onUpdateQuantity(item.id, -1)}
                  onRemove={() => onRemoveItem(item.id)}
                />
                <div className="space-y-0.5 text-right">
                  <h4 className="font-bold text-xs sm:text-sm text-tarkhineh-dark">{item.name}</h4>
                  <p className="text-[11px] sm:text-xs text-neutral-400">
                    {toPersianDigits(item.price.toLocaleString())} تومان
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs sm:text-sm text-neutral-600">
            <span>تخفیف محصولات</span>
            <span>{toPersianDigits(totalDiscount.toLocaleString())} تومان</span>
          </div>

          {deliveryMethod === "courier" && (
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

          <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-sm sm:text-base font-bold text-tarkhineh-dark">
            <span>مبلغ قابل پرداخت</span>
            <span className="text-primary font-bold text-base sm:text-lg">
              {toPersianDigits(payableAmount.toLocaleString())} تومان
            </span>
          </div>

          <button
            type="button"
            onClick={onProceed}
            className="w-full bg-primary hover:bg-primary-hover active:scale-[0.98] text-white rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium transition-all shadow-xs cursor-pointer"
          >
            <TickCircle size={20} color="currentColor" variant="Linear" />
            <span>ثبت سفارش</span>
          </button>
        </div>
      </div>
    </>
  );
}
