"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft2, ArrowRight2, SearchNormal1 } from "iconsax-react";

const SLIDES = [
  { id: 1, image: "/slide-1.jpg", title: "تجربه غذای سالم و گیاهی به سبک ترخینه", link: "/menu" },
  { id: 2, image: "/slide-2.jpg", title: "طعم اصیل و به‌یادماندنی غذاهای اصیل ایرانی", link: "/menu" },
  { id: 3, image: "/slide-3.jpg", title: "لحظاتی خوش و دلنشین در شعب زنجیره‌ای ترخینه", link: "/branch/ekbatan" },
  { id: 4, image: "/drawer-banner.jpg", title: "عطر و بوی نان داغ و کباب تازه در هر وعده", link: "/menu" },
  { id: 5, image: "/slide-1.jpg", title: "تلفیق سلامت و طعم در منوی ویژه ترخینه", link: "/menu" },
  { id: 6, image: "/slide-2.jpg", title: "پذیرایی بی‌نظیر و حرفه‌ای در محیطی آرام و مدرن", link: "/menu" },
];

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  link: string;
}

interface HeroCarouselProps {
  slides?: HeroSlide[];
  showSearch?: boolean;
}

export default function HeroCarousel({ slides, showSearch = false }: HeroCarouselProps = {}) {
  const activeSlides = slides && slides.length > 0 ? slides : SLIDES;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const next = () => setCurrent((c) => (c + 1) % activeSlides.length);
  const prev = () => setCurrent((c) => (c - 1 + activeSlides.length) % activeSlides.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(t);
  }, [paused, activeSlides.length]);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    setTouchStart(null);
  };

  return (
    <>
      <section
        dir="rtl"
        className="relative w-full h-85 sm:h-105 md:h-125 lg:h-135 overflow-hidden select-none bg-neutral-900 font-sans"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        {activeSlides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="100vw"
              className={`object-cover transition-transform duration-7000 ${i === current ? "scale-105" : "scale-100"}`}
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/35" />
          </div>
        ))}

        <div className="relative z-20 h-full max-w-5xl mx-auto px-6 sm:px-12 flex flex-col items-center justify-center text-center">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            {activeSlides[current].title}
          </h1>
          <Link
            href={activeSlides[current].link}
            className="mt-5 sm:mt-7 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-primary text-white text-sm sm:text-base font-medium hover:bg-primary-hover active:scale-95 transition-all shadow-lg"
          >
            سفارش آنلاین غذا
          </Link>
        </div>

        <button
          type="button"
          onClick={next}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 text-white/80 hover:text-white hover:scale-110 active:scale-90 transition-all cursor-pointer"
          aria-label="بعدی"
        >
          <ArrowLeft2 size={28} color="currentColor" variant="Linear" />
        </button>

        <button
          type="button"
          onClick={prev}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 text-white/80 hover:text-white hover:scale-110 active:scale-90 transition-all cursor-pointer"
          aria-label="قبلی"
        >
          <ArrowRight2 size={28} color="currentColor" variant="Linear" />
        </button>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
          <svg
            viewBox="0 0 240 34"
            className="w-50 sm:w-57.5 h-7.5 sm:h-8.5 fill-white drop-shadow-[0_-3px_6px_rgba(0,0,0,0.08)] block"
            preserveAspectRatio="none"
          >
            <path d="M 0,34 C 10,34 14,0 24,0 L 216,0 C 226,0 230,34 240,34 Z" />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center gap-2 pt-0.5 pointer-events-auto">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className="w-4 h-4 flex items-center justify-center cursor-pointer outline-none"
                aria-label={`اسلاید ${i + 1}`}
              >
                <span
                  className={`rounded-full transition-all duration-200 ${
                    i === current
                      ? "w-3 h-3 bg-primary ring-[3px] ring-primary-tint"
                      : "w-2 h-2 bg-tarkhineh-subtle hover:bg-neutral-600"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {showSearch && (
        <div dir="rtl" className="block md:hidden w-full px-4 pt-4 pb-2 font-sans">
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="جستجو"
              className="w-full h-11 pr-4 pl-11 rounded-lg bg-surface border border-tarkhineh-border text-sm text-tarkhineh-dark placeholder:text-tarkhineh-dark focus:border-primary focus:outline-none transition-colors"
            />
            <SearchNormal1
              size={20}
              color="currentColor"
              variant="Linear"
              className="absolute left-3.5 pointer-events-none text-tarkhineh-dark"
            />
          </div>
        </div>
      )}
    </>
  );
}
