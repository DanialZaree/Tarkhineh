"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import Image from "next/image";
import {
  Bank,
  EmptyWallet,
  Chart,
  Book,
  DocumentUpload,
  Calendar as CalendarIcon,
  TickCircle,
} from "iconsax-react";
import { Calendar } from "@/components/ui/calendar";
import { Combobox } from "@/components/ui/combobox";
import { toPersianDigits } from "@/lib/utils";
import { toJalali, JALALI_MONTHS } from "@/lib/jalali";

const IRAN_PROVINCES = [
  "تهران", "اصفهان", "فارس", "خراسان رضوی", "آذربایجان شرقی", "خوزستان", "مازندران",
  "گیلان", "البرز", "قم", "کرمان", "یزد", "همدان", "کرمانشاه", "هرمزگان", "بوشهر",
  "زنجان", "قزوین", "سمنان", "مرکزی", "اردبیل", "گلستان", "کردستان", "لرستان",
  "سیستان و بلوچستان", "چهارمحال و بختیاری", "کهگیلویه و بویراحمد", "خراسان جنوبی",
  "خراسان شمالی", "ایلام", "آذربایجان غربی"
];

const BADGES = [
  { icon: Bank, title: "بیش از ۲۰ شعبه فعال در سراسر کشور" },
  { icon: EmptyWallet, title: "تسهیلات راه‌اندازی رستوران و تجهیز آن" },
  { icon: Chart, title: "طرح‌های تشویقی ارتقای فروش" },
  { icon: Book, title: "اعطای دستورالعمل پخت غذاها" },
];

const ADVANTAGES = [
  "استفاده از برند شناخته شده ترخینه",
  "مشاوره در امور حقوقی، مالی و مالیاتی",
  "به حداقل رساندن ریسک سرمایه‌گذاری",
  "پشتیبانی بازاریابی و منابع انسانی",
  "تسریع روند بازگشت سرمایه",
  "دریافت مشاوره جهت تأمین مواد اولیه و تجهیزات",
  "مشاوره‌های تخصصی جهت مدیریت رستوران",
  "طرح‌های تشویقی برای ارتقا فروش",
];

const FACILITIES = [
  ["پروانه کسب دارد.", "پارکینگ دارد."],
  ["آشپزخانه دارد.", "انبار دارد."],
];

const inputClass =
  "w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border border-neutral-200 bg-white focus:border-primary focus:outline-none text-tarkhineh-dark placeholder:text-neutral-400";
const smallInputClass =
  "w-full h-10 px-3.5 text-xs sm:text-sm rounded-xl border border-neutral-200 bg-white focus:border-primary focus:outline-none text-tarkhineh-dark placeholder:text-neutral-400";

export default function RepresentationPageContent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateString, setDateString] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [province, setProvince] = useState("");
  const [demoToast, setDemoToast] = useState<string | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isCalendarOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const j = toJalali(date);
    setDateString(`${toPersianDigits(j.jd)} ${JALALI_MONTHS[j.jm - 1]} ${toPersianDigits(j.jy)}`);
    setIsCalendarOpen(false);
  };

  const showDemoToast = (msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setDemoToast(msg);
    toastTimerRef.current = setTimeout(() => {
      setDemoToast(null);
      toastTimerRef.current = null;
    }, 3000);
  };

  const handleConsultSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dateString) {
      showDemoToast("لطفاً زمان ایده‌آل را انتخاب نمایید");
      return;
    }
    showDemoToast("درخواست مشاوره شما با موفقیت ثبت شد");
  };

  const handleFranchiseSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!province) {
      showDemoToast("لطفاً استان را انتخاب نمایید");
      return;
    }
    showDemoToast("اطلاعات درخواست نمایندگی با موفقیت ثبت شد");
  };

  return (
    <div dir="rtl" className="w-full font-sans bg-white pb-20">
      <section className="relative w-full h-55 sm:h-70 md:h-85 flex items-center justify-center overflow-hidden">
        <Image
          src="/franchise-hero.jpg"
          alt="اعطای نمایندگی ترخینه"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-relaxed drop-shadow-md text-center px-4">
          همین الان به خانواده بزرگ ترخینه بپیوندید!
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {BADGES.map(({ icon: Icon, title }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-primary flex items-center justify-center bg-white group hover:scale-105 transition-transform">
                <Icon size={46} color="currentColor" variant="Linear" className="text-primary" />
              </div>
              <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm font-medium text-tarkhineh-dark max-w-42.5 leading-relaxed">
                {title}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pt-4 pb-12">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-tarkhineh-dark text-center mb-6 sm:mb-8">
          مزیت دریافت نمایندگی
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 text-right">
          {ADVANTAGES.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rotate-45 border-2 border-primary shrink-0" />
              <span className="text-xs sm:text-sm text-neutral-700 font-normal leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-tarkhineh-dark text-center mb-6">
          دریافت مشاوره
        </h2>
        <form onSubmit={handleConsultSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 items-start">
            <input
              type="text"
              name="consultName"
              placeholder="نام و نام‌خانوادگی"
              required
              minLength={3}
              className={inputClass}
            />
            <input
              type="tel"
              name="consultPhone"
              placeholder="شماره تماس"
              dir="ltr"
              required
              pattern="09[0-9]{9}"
              title="شماره همراه معتبر ۱۱ رقمی"
              className={`${inputClass} text-left`}
            />

            <div className="relative" ref={calendarRef}>
              <div
                onClick={() => setIsCalendarOpen((prev) => !prev)}
                className="w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border border-neutral-200 bg-white flex items-center justify-between cursor-pointer hover:border-neutral-300 transition-colors"
              >
                <span className={dateString ? "text-tarkhineh-dark" : "text-neutral-400"}>
                  {dateString || "زمان ایده‌آل"}
                </span>
                <CalendarIcon size={18} color="currentColor" variant="Linear" className="text-neutral-400 shrink-0" />
              </div>
              {isCalendarOpen && (
                <div className="absolute top-full mt-2 left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <Calendar
                    value={selectedDate}
                    onChange={handleDateSelect}
                    className="shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 mx-auto block bg-primary hover:bg-primary-hover active:scale-[0.98] text-white rounded-lg px-8 py-2.5 text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer"
          >
            درخواست مشاوره
          </button>
        </form>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-10">
        <div className="border border-neutral-200 rounded-2xl md:rounded-3xl bg-white p-6 sm:p-10 md:p-12 shadow-xs space-y-8">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-tarkhineh-dark text-center pb-2">
            فرم درخواست نمایندگی
          </h2>

          <form onSubmit={handleFranchiseSubmit} className="space-y-8">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-tarkhineh-dark text-right mb-3">
                مشخصات فردی متقاضی
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="نام و نام‌خانوادگی"
                  required
                  minLength={3}
                  className={inputClass}
                />
                <input
                  type="text"
                  name="nationalCode"
                  placeholder="کد ملی"
                  dir="ltr"
                  required
                  pattern="[0-9]{10}"
                  minLength={10}
                  maxLength={10}
                  title="کد ملی ۱۰ رقمی"
                  className={`${inputClass} text-left`}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="شماره تماس"
                  dir="ltr"
                  required
                  pattern="09[0-9]{9}"
                  title="شماره همراه معتبر ۱۱ رقمی"
                  className={`${inputClass} text-left`}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-bold text-tarkhineh-dark text-right mb-3">
                آدرس ملک متقاضی
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-stretch">
                  <Combobox
                    options={IRAN_PROVINCES}
                    value={province}
                    onChange={setProvince}
                    placeholder="استان"
                    emptyText="استانی پیدا نشد"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="شهر"
                    required
                    minLength={2}
                    className={smallInputClass}
                  />
                  <input
                    type="text"
                    name="region"
                    placeholder="منطقه"
                    required
                    className={smallInputClass}
                  />
                  <input
                    type="text"
                    name="addressDetail"
                    placeholder="آدرس دقیق"
                    required
                    minLength={5}
                    className={smallInputClass}
                  />
                </div>

                <div className="lg:col-span-4 flex items-center justify-center">
                  <div className="relative w-full max-w-79.5 h-33.5 rounded-xl overflow-hidden border border-neutral-200 shadow-2xs group cursor-pointer hover:shadow-xs transition-shadow">
                    <Image
                      src="/representation-map.png"
                      alt="ثبت موقعیت روی نقشه"
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 318px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-bold text-tarkhineh-dark text-right mb-3">
                مشخصات ملک متقاضی
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                <input
                  type="text"
                  name="ownershipType"
                  placeholder="نوع مالکیت"
                  required
                  className={inputClass}
                />
                <input
                  type="number"
                  name="area"
                  placeholder="مساحت ملک (متر مربع)"
                  required
                  min="10"
                  className={inputClass}
                />
                <input
                  type="number"
                  name="buildingAge"
                  placeholder="سن بنا"
                  required
                  min="0"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-bold text-tarkhineh-dark text-right mb-3">
                امکانات ملک متقاضی
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <span className="text-xs text-neutral-500 mb-3 block">ملک متقاضی:</span>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 pt-1">
                    {FACILITIES.map((col, colIdx) => (
                      <div key={colIdx} className="space-y-3.5">
                        {col.map((item) => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm text-neutral-700">
                            <input
                              type="checkbox"
                              name="facilities"
                              value={item}
                              className="w-4 h-4 rounded border-neutral-300 text-primary accent-primary cursor-pointer"
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-neutral-500 mb-2 block">تصاویر ملک</span>
                  <label className="border-2 border-dashed border-neutral-300 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 transition-colors bg-neutral-50/50 group min-h-35">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                    <DocumentUpload size={36} color="currentColor" variant="Linear" className="text-neutral-400 group-hover:text-primary transition-colors mb-2" />
                    <span className="text-xs text-neutral-500 font-normal">
                      تصاویری از ملک را بارگذاری کنید...
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover active:scale-[0.98] text-white rounded-lg px-12 py-3 text-sm font-medium transition-all shadow-xs cursor-pointer block mx-auto"
              >
                ثبت اطلاعات
              </button>
            </div>
          </form>
        </div>
      </section>

      {demoToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-tarkhineh-dark text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3 duration-200">
          <TickCircle size={20} color="#4ade80" variant="Bold" />
          <span>{demoToast}</span>
        </div>
      )}
    </div>
  );
}
