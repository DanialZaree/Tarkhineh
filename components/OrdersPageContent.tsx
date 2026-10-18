"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight2,
  Calendar,
  Clock,
  Shop,
  TruckFast,
  CloseCircle,
  ArrowLeft2,
} from "iconsax-react";
import { cn, toPersianDigits } from "@/lib/utils";
import ProfileSidebar from "@/components/ProfileSidebar";
import { useOrders, Order, OrderItem, OrderStatus } from "@/lib/siteStorage";

export type FilterType = "all" | OrderStatus;
export type { Order, OrderItem, OrderStatus };

const FILTER_TABS: { id: FilterType; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "current", label: "جاری" },
  { id: "delivered", label: "تحویل‌شده" },
  { id: "cancelled", label: "لغوشده" },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; badgeCls: string }> = {
  current: { label: "جاری", badgeCls: "bg-amber-50 text-amber-700" },
  delivered: { label: "تحویل شده", badgeCls: "bg-emerald-50 text-emerald-700" },
  cancelled: { label: "لغو شده", badgeCls: "bg-rose-50 text-rose-600" },
};

function OrderItemsSlider({ items }: { items: OrderItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    ref.current?.scrollBy({ left: direction === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <div className="relative group/slider w-full py-1">
      <div
        ref={ref}
        className="flex items-stretch gap-3 sm:gap-3.5 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="shrink-0 w-36 sm:w-40 md:w-44 border border-neutral-200 rounded-xl p-2.5 bg-white text-center flex flex-col items-center hover:border-neutral-300 hover:shadow-xs transition-all shadow-2xs"
          >
            <div className="relative w-full aspect-16/10 rounded-lg overflow-hidden bg-neutral-100 shadow-2xs">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 144px, 176px"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-1.5 left-1.5 bg-white/95 text-neutral-800 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded shadow-2xs border border-neutral-200/80 font-sans">
                ×{toPersianDigits(item.quantity)}
              </span>
            </div>

            <span className="text-xs sm:text-sm font-semibold text-tarkhineh-dark mt-2.5 truncate w-full text-center">
              {item.name}
            </span>
            <span className="text-[11px] sm:text-xs text-neutral-500 mt-1 font-sans text-center">
              {item.price}
            </span>
          </div>
        ))}
      </div>

      {items.length > 3 && (
        <>
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-neutral-700 hover:text-primary shadow-md border border-neutral-200 items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="آیتم‌های بعدی"
          >
            <ArrowLeft2 size={16} color="currentColor" variant="Linear" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-neutral-700 hover:text-primary shadow-md border border-neutral-200 items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="آیتم‌های قبلی"
          >
            <ArrowRight2 size={16} color="currentColor" variant="Linear" />
          </button>
        </>
      )}
    </div>
  );
}

export default function OrdersPageContent() {
  const { orders, cancelOrder } = useOrders();
  const [filter, setFilter] = useState<FilterType>("all");
  const [cancellingOrder, setCancellingOrder] = useState<Order | null>(null);

  const handleConfirmCancel = () => {
    if (!cancellingOrder) return;
    cancelOrder(cancellingOrder.id);
    setCancellingOrder(null);
  };

  const filteredOrders = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div dir="rtl" className="w-full font-sans bg-[#fafafa] min-h-[calc(100vh-160px)] py-6 sm:py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* mobile-header */}
        <div className="flex items-center justify-between pb-4 sm:hidden">
          <Link href="/profile" className="p-1 text-tarkhineh-dark hover:text-primary transition-colors">
            <ArrowRight2 size={20} color="currentColor" variant="Linear" />
          </Link>
          <h1 className="text-base font-bold text-tarkhineh-dark text-center flex-1">
            سفارشات
          </h1>
          <div className="w-7" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <ProfileSidebar />

          <main className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-5 sm:p-8 shadow-2xs">
            <div className="hidden sm:block pb-5 mb-6 border-b border-neutral-200">
              <h2 className="text-base sm:text-lg font-bold text-tarkhineh-dark">
                پیگیری سفارشات
              </h2>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-6 border-b border-neutral-100 no-scrollbar">
              {FILTER_TABS.map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilter(tab.id)}
                    className={cn(
                      "px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer",
                      isActive
                        ? "bg-primary text-white shadow-2xs"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80"
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm sm:text-base font-medium text-neutral-500">
                  سفارشی در این بخش یافت نشد!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => {
                  const statusConf = STATUS_CONFIG[order.status];
                  return (
                    <article
                      key={order.id}
                      className="border border-neutral-200 rounded-2xl p-4 sm:p-6 bg-white hover:border-neutral-300 transition-all shadow-2xs"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-neutral-100 gap-2">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Shop size={22} color="currentColor" variant="Linear" className="text-neutral-500 shrink-0" />
                          <h3 className="font-bold text-sm sm:text-base text-tarkhineh-dark">
                            {order.branch}
                          </h3>
                        </div>
                        <span className={cn("text-xs font-semibold px-3 py-1 rounded-full", statusConf.badgeCls)}>
                          {statusConf.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 text-xs sm:text-sm text-neutral-600 border-b border-neutral-100">
                        <div className="flex items-center gap-2">
                          <Calendar size={18} color="currentColor" variant="Linear" className="text-neutral-400 shrink-0" />
                          <span>{order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TruckFast size={18} color="currentColor" variant="Linear" className="text-neutral-400 shrink-0" />
                          <span>{order.deliveryType}</span>
                        </div>
                        {order.deliveryTimeRemaining && order.status === "current" && (
                          <div className="flex items-center gap-2 text-amber-700 font-medium">
                            <Clock size={18} color="currentColor" variant="Linear" className="shrink-0" />
                            <span>زمان تحویل تقریبی: {order.deliveryTimeRemaining}</span>
                          </div>
                        )}
                        <div className="sm:col-span-2 text-neutral-500 text-xs leading-relaxed">
                          آدرس: {order.address}
                        </div>
                      </div>

                      <div className="py-3">
                        <OrderItemsSlider items={order.items} />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-neutral-100 gap-4">
                        <div className="flex items-center gap-3 text-xs sm:text-sm">
                          <span className="text-neutral-500">مبلغ کل:</span>
                          <span className="font-bold text-tarkhineh-dark font-sans">{order.totalPrice}</span>
                          {order.discount && (
                            <span className="text-emerald-700 text-xs font-medium">
                              (تخفیف: {order.discount})
                            </span>
                          )}
                        </div>

                        {order.status === "current" && (
                          <button
                            type="button"
                            onClick={() => setCancellingOrder(order)}
                            className="px-5 py-2 rounded-lg border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-medium transition-colors cursor-pointer self-end sm:self-auto"
                          >
                            لغو سفارش
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {cancellingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl p-6 sm:p-8 text-center shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="relative flex items-center justify-center pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-base text-tarkhineh-dark">لغو سفارش</h3>
              <button
                type="button"
                onClick={() => setCancellingOrder(null)}
                className="absolute left-0 text-neutral-400 hover:text-neutral-600 p-1 cursor-pointer transition-colors"
                aria-label="بستن"
              >
                <CloseCircle size={22} color="currentColor" variant="Linear" />
              </button>
            </div>

            <p className="text-xs sm:text-sm md:text-base font-medium text-tarkhineh-dark my-6 leading-relaxed">
              آیا از لغو سفارش خود مطمئن هستید؟
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCancellingOrder(null)}
                className="flex-1 bg-primary hover:bg-primary-hover active:scale-95 text-white rounded-lg py-2.5 text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer"
              >
                بازگشت
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="flex-1 border border-rose-300 text-rose-600 hover:bg-rose-50 active:scale-95 rounded-lg py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer"
              >
                لغو سفارش
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
