"use client";

import {
  Card,
  CardPos,
  DiscountShape,
  TickCircle,
  Trash,
  Wallet2,
  WalletMoney,
  Warning2,
} from "iconsax-react";
import { toPersianDigits } from "@/lib/utils";
import { QuantityPill } from "./QuantityPill";
import { OrderSummary } from "./OrderSummary";
import type { CartItem, DeliveryMethod, PaymentGateway, PaymentMethod } from "./types";

interface Step2PaymentProps {
  discountCode: string;
  onDiscountCodeChange: (val: string) => void;
  paymentMethod: PaymentMethod;
  onSetPaymentMethod: (m: PaymentMethod) => void;
  selectedGateway: PaymentGateway;
  onSelectGateway: (g: PaymentGateway) => void;
  items: CartItem[];
  totalCount: number;
  totalDiscount: number;
  payableAmount: number;
  deliveryMethod: DeliveryMethod;
  isLoggedIn: boolean;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceed: () => void;
}

export function Step2Payment({
  discountCode,
  onDiscountCodeChange,
  paymentMethod,
  onSetPaymentMethod,
  selectedGateway,
  onSelectGateway,
  items,
  totalCount,
  totalDiscount,
  payableAmount,
  deliveryMethod,
  isLoggedIn,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceed,
}: Step2PaymentProps) {
  return (
    <>
      {/* step2-mobile */}
      <div className="block md:hidden mt-3 space-y-4">
        <div className="border border-neutral-200 rounded-2xl bg-white p-4 shadow-2xs">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-200 text-sm font-bold text-tarkhineh-dark">
            <DiscountShape size={20} color="currentColor" variant="Linear" />
            <span>ثبت کد تخفیف</span>
          </div>
          <div className="pt-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="کد تخفیف"
              value={discountCode}
              onChange={(e) => onDiscountCodeChange(e.target.value)}
              className="flex-1 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-right focus:outline-none focus:border-neutral-300 text-tarkhineh-dark placeholder:text-neutral-400"
            />
            <button
              type="button"
              className="bg-neutral-300 hover:bg-neutral-400 text-neutral-600 rounded-lg px-4 py-2 text-xs font-medium transition-colors cursor-pointer shrink-0"
            >
              ثبت کد
            </button>
          </div>
        </div>
        <div className="border border-neutral-200 rounded-2xl bg-white p-4 shadow-2xs">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-200 text-sm font-bold text-tarkhineh-dark">
            <WalletMoney size={20} color="currentColor" variant="Linear" />
            <span>روش پرداخت</span>
          </div>

          <div className="pt-4 flex items-center justify-between gap-2">
            <div
              onClick={() => onSetPaymentMethod("online")}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <span className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center p-0.5 transition-colors shrink-0">
                {paymentMethod === "online" && (
                  <span className="w-full h-full rounded-full bg-[#00ba88]" />
                )}
              </span>
              <span className="text-xs font-medium text-neutral-700">پرداخت اینترنتی</span>
              <CardPos size={18} color="currentColor" variant="Linear" className="text-neutral-600 shrink-0" />
            </div>
            <div
              onClick={() => onSetPaymentMethod("offline")}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <span className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center p-0.5 transition-colors shrink-0">
                {paymentMethod === "offline" && (
                  <span className="w-full h-full rounded-full bg-[#00ba88]" />
                )}
              </span>
              <span className="text-xs font-medium text-neutral-700">پرداخت در محل</span>
              <Wallet2 size={18} color="currentColor" variant="Linear" className="text-neutral-600 shrink-0" />
            </div>
          </div>
        </div>
        {paymentMethod === "online" ? (
          <div className="border border-neutral-200 rounded-2xl bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-200 text-sm font-bold text-tarkhineh-dark">
              <Card size={20} color="currentColor" variant="Linear" />
              <span>درگاه پرداخت</span>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onSelectGateway("saman")}
                className={`w-23.5 h-23.5 rounded-2xl border flex items-center justify-center p-2 transition-all cursor-pointer bg-white ${
                  selectedGateway === "saman"
                    ? "border-2 border-primary shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <img src="/bank/bank-saman.svg" alt="بانک سامان" className="w-16 h-16 max-h-16 max-w-16 object-contain" />
              </button>
              <button
                type="button"
                onClick={() => onSelectGateway("mellat")}
                className={`w-23.5 h-23.5 rounded-2xl border flex items-center justify-center p-2 transition-all cursor-pointer bg-white ${
                  selectedGateway === "mellat"
                    ? "border-2 border-primary shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <img src="/bank/Mellat.svg" alt="بانک ملت" className="w-16 h-16 max-h-16 max-w-16 object-contain" />
              </button>
              <button
                type="button"
                onClick={() => onSelectGateway("parsian")}
                className={`w-23.5 h-23.5 rounded-2xl border flex items-center justify-center p-2 transition-all cursor-pointer bg-white ${
                  selectedGateway === "parsian"
                    ? "border-2 border-primary shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <img src="/bank/Parsian-Bank.svg" alt="بانک پارسیان" className="w-16 h-16 max-h-16 max-w-16 object-contain" />
              </button>
            </div>

            <div className="mt-4 text-center text-[10px] sm:text-xs text-neutral-400 leading-relaxed space-y-0.5">
              <p>پرداخت از طریق کلیه کارت‌های عضو شتاب امکان‌پذیر است.</p>
              <p>(لطفا قبل از پرداخت فیلترشکن خود را خاموش کنید.)</p>
            </div>
          </div>
        ) : (
          <div className="border border-neutral-200 rounded-2xl bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-200 text-sm font-bold text-tarkhineh-dark">
              <Warning2 size={20} color="currentColor" variant="Linear" />
              <span>قابل توجه</span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed text-right pt-3">
              هزینه سفارش شما در حین تحویل کالا دریافت خواهد شد. لطفا قبل از تحویل کالا کارت بانکی یا پول نقد همراه خود داشته باشید و از درخواست برای پرداخت در زمان بعدی یا نسیه خودداری فرمایید. با تشکر از همراهی شما.
            </p>
          </div>
        )}
        <div className="border border-neutral-200 rounded-2xl bg-white p-4 shadow-2xs">
          <OrderSummary
            totalCount={totalCount}
            totalDiscount={totalDiscount}
            payableAmount={payableAmount}
            showHeader={false}
            onProceed={onProceed}
            isLoggedIn={isLoggedIn}
            step={2}
            deliveryMethod={deliveryMethod}
            shippingCost={29000}
            paymentMethod={paymentMethod}
          />
        </div>
      </div>

      {/* step2-desktop */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-5">
          <div className="border border-neutral-200 rounded-2xl bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-tarkhineh-dark shrink-0">
                <DiscountShape size={22} color="currentColor" variant="Linear" />
                <span>ثبت کد تخفیف</span>
              </div>

              <div className="flex items-center gap-2.5">
                <input
                  type="text"
                  placeholder="کد تخفیف"
                  value={discountCode}
                  onChange={(e) => onDiscountCodeChange(e.target.value)}
                  className="border border-neutral-200 rounded-lg px-4 py-2 text-xs sm:text-sm text-right focus:outline-none focus:border-neutral-300 w-48 text-tarkhineh-dark placeholder:text-neutral-400"
                />
                <button
                  type="button"
                  className="bg-neutral-300 hover:bg-neutral-400 text-neutral-600 rounded-lg px-5 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0"
                >
                  ثبت کد
                </button>
              </div>
            </div>
          </div>
          <div className="border border-neutral-200 rounded-2xl bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-tarkhineh-dark shrink-0">
                <WalletMoney size={22} color="currentColor" variant="Linear" />
                <span>روش پرداخت</span>
              </div>

              <div className="flex items-center gap-8">
                <div
                  onClick={() => onSetPaymentMethod("online")}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <span className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center p-0.5 transition-colors shrink-0">
                    {paymentMethod === "online" && (
                      <span className="w-full h-full rounded-full bg-[#00ba88]" />
                    )}
                  </span>
                  <div className="text-right">
                    <span className="text-xs sm:text-sm text-neutral-700 font-medium block">پرداخت اینترنتی</span>
                    <span className="text-[11px] text-neutral-400 block">توسط پیک رستوران ارسال شود.</span>
                  </div>
                  <CardPos size={22} color="currentColor" variant="Linear" className="text-neutral-600 shrink-0" />
                </div>
                <div
                  onClick={() => onSetPaymentMethod("offline")}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <span className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center p-0.5 transition-colors shrink-0">
                    {paymentMethod === "offline" && (
                      <span className="w-full h-full rounded-full bg-[#00ba88]" />
                    )}
                  </span>
                  <div className="text-right">
                    <span className="text-xs sm:text-sm text-neutral-700 font-medium block">پرداخت در محل</span>
                    <span className="text-[11px] text-neutral-400 block">توسط پیک رستوران ارسال شود.</span>
                  </div>
                  <Wallet2 size={22} color="currentColor" variant="Linear" className="text-neutral-600 shrink-0" />
                </div>
              </div>
            </div>
          </div>
          {paymentMethod === "online" ? (
            <div className="border border-neutral-200 rounded-2xl bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-tarkhineh-dark shrink-0">
                  <Card size={22} color="currentColor" variant="Linear" />
                  <span>درگاه پرداخت</span>
                </div>
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => onSelectGateway("saman")}
                    className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border flex items-center justify-center p-3 transition-all cursor-pointer bg-white ${
                      selectedGateway === "saman"
                        ? "border-2 border-primary shadow-xs"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <img src="/bank/bank-saman.svg" alt="بانک سامان" className="w-20 h-20 sm:w-24 sm:h-24 max-h-24 max-w-24 object-contain" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectGateway("mellat")}
                    className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border flex items-center justify-center p-3 transition-all cursor-pointer bg-white ${
                      selectedGateway === "mellat"
                        ? "border-2 border-primary shadow-xs"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <img src="/bank/Mellat.svg" alt="بانک ملت" className="w-20 h-20 sm:w-24 sm:h-24 max-h-24 max-w-24 object-contain" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectGateway("parsian")}
                    className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border flex items-center justify-center p-3 transition-all cursor-pointer bg-white ${
                      selectedGateway === "parsian"
                        ? "border-2 border-primary shadow-xs"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <img src="/bank/Parsian-Bank.svg" alt="بانک پارسیان" className="w-20 h-20 sm:w-24 sm:h-24 max-h-24 max-w-24 object-contain" />
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center text-xs text-neutral-400 leading-relaxed space-y-0.5">
                <p>پرداخت از طریق کلیه کارت‌های عضو شتاب امکان‌پذیر است.</p>
                <p>(لطفا قبل از پرداخت فیلترشکن خود را خاموش کنید.)</p>
              </div>
            </div>
          ) : (
            <div className="border border-neutral-200 rounded-2xl bg-white p-5 shadow-2xs flex flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-tarkhineh-dark shrink-0">
                <Warning2 size={22} color="currentColor" variant="Linear" />
                <span>قابل توجه</span>
              </div>
              <p className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed text-right flex-1">
                هزینه سفارش شما در حین تحویل کالا دریافت خواهد شد. لطفا قبل از تحویل کالا کارت بانکی یا پول نقد همراه خود داشته باشید و از درخواست برای پرداخت در زمان بعدی یا نسیه خودداری فرمایید. با تشکر از همراهی شما.
              </p>
            </div>
          )}
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
            <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs sm:text-sm text-neutral-600">
              <span>هزینه ارسال</span>
              <span>۲۹,۰۰۰ تومان</span>
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
            {paymentMethod === "offline" ? (
              <>
                <TickCircle size={20} color="currentColor" variant="Linear" />
                <span>ثبت سفارش</span>
              </>
            ) : (
              <>
                <Card size={20} color="currentColor" variant="Linear" />
                <span>تایید و پرداخت</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
