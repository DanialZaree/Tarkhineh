"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft2,
  ArrowRight2,
  Location,
  Call,
  Clock,
  MenuBoard,
} from "iconsax-react";
import HeroCarousel from "@/components/HeroCarousel";
import Carousel from "@/components/Carousel";
import FoodCard from "@/components/FoodCard";
import ReviewCard from "@/components/ReviewCard";
import {
  BranchInfo,
  SPECIAL_OFFERS,
  POPULAR_FOODS,
  INTERNATIONAL_FOODS,
  REVIEWS,
} from "@/lib/branchData";

const HERO_SLIDES = [
  { id: 1, image: "/slide-1.jpg", title: "طعم بی‌نظیر طبیعت!", link: "#menu-section" },
  { id: 2, image: "/slide-2.jpg", title: "اصالت طعم در تمام شعب ترخینه", link: "#menu-section" },
  { id: 3, image: "/slide-3.jpg", title: "پذیرایی شاهانه در محیطی آرام و دلپذیر", link: "#menu-section" },
];

function SectionTitle({ title, light = false }: { title: string; light?: boolean }) {
  return (
    <div className="w-full pr-6 sm:pr-10 md:pr-16 lg:pr-24 xl:pr-32 2xl:pr-40 pl-4 sm:pl-6">
      <h2 className={`text-lg sm:text-2xl font-bold text-right ${light ? "text-white" : "text-tarkhineh-dark"}`}>
        {title}
      </h2>
    </div>
  );
}

export default function BranchPageContent({ branch }: { branch: BranchInfo }) {
  const [gallerySlide, setGallerySlide] = useState(0);

  const prevGallery = () =>
    setGallerySlide((s) => (s - 1 + branch.images.length) % branch.images.length);
  const nextGallery = () =>
    setGallerySlide((s) => (s + 1) % branch.images.length);

  const infoItems = [
    {
      icon: Call,
      content: (
        <div className="text-xs sm:text-sm text-tarkhineh-dark leading-relaxed flex flex-col items-center font-sans" dir="ltr">
          <span>{branch.phone1}</span>
          {branch.phone2 && <span>{branch.phone2}</span>}
        </div>
      ),
    },
    {
      icon: Location,
      content: (
        <div className="text-xs sm:text-sm text-tarkhineh-dark leading-relaxed flex flex-col items-center">
          <span>{branch.addressLine1}</span>
          <span>{branch.addressLine2}</span>
        </div>
      ),
    },
    {
      icon: Clock,
      content: (
        <div className="text-xs sm:text-sm text-tarkhineh-dark leading-relaxed flex flex-col items-center">
          <span>{branch.hours}</span>
        </div>
      ),
    },
  ];

  return (
    <div dir="rtl" className="w-full font-sans pb-16">
      <HeroCarousel slides={HERO_SLIDES} />

      <section id="menu-section" className="w-full mt-10 sm:mt-14 space-y-4 sm:space-y-6">
        <SectionTitle title="پیشنهاد ویژه" />
        <Carousel>
          {SPECIAL_OFFERS.map((food) => (
            <FoodCard key={food.id} item={food} />
          ))}
        </Carousel>
      </section>

      <section className="w-full bg-primary-hover py-10 sm:py-14 my-12 sm:my-16 space-y-4 sm:space-y-6">
        <SectionTitle title="غذاهای محبوب" light />
        <Carousel fadeColor="green">
          {POPULAR_FOODS.map((food) => (
            <FoodCard key={food.id} item={food} />
          ))}
        </Carousel>
      </section>

      <section className="w-full my-12 sm:my-16 space-y-4 sm:space-y-6">
        <SectionTitle title="غذاهای غیر ایرانی" />
        <Carousel>
          {INTERNATIONAL_FOODS.map((food) => (
            <FoodCard key={food.id} item={food} />
          ))}
        </Carousel>

        <div className="flex justify-center pt-4 sm:pt-6">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all text-xs sm:text-sm font-medium shadow-xs"
          >
            <MenuBoard size={18} color="currentColor" variant="Linear" />
            <span>مشاهده منوی کامل</span>
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-18">
        <section className="pt-4">
          <h2 className="text-center text-xl sm:text-2xl font-bold text-tarkhineh-dark mb-6 sm:mb-8">
            {branch.name}
          </h2>

          <div className="relative">
            <div className="relative w-full h-70 sm:h-95 md:h-115 rounded-2xl overflow-hidden shadow-md bg-neutral-900">
              <Image
                src={branch.images[gallerySlide]}
                alt={branch.name}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              <button
                type="button"
                onClick={nextGallery}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="بعدی"
              >
                <ArrowLeft2 size={22} color="currentColor" variant="Linear" />
              </button>
              <button
                type="button"
                onClick={prevGallery}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="قبلی"
              >
                <ArrowRight2 size={22} color="currentColor" variant="Linear" />
              </button>
            </div>

            <div className="relative -mt-14 sm:-mt-20 z-30 max-w-4xl w-[94%] sm:w-[88%] mx-auto">
              <div className="bg-white rounded-sm border-2 border-primary shadow-xl p-3.5 sm:p-7 text-tarkhineh-dark">
                <div className="flex flex-col gap-2.5 sm:hidden text-xs text-tarkhineh-dark">
                  <div className="flex items-start xs:items-center gap-1.5">
                    <Location size={18} color="currentColor" variant="Linear" className="shrink-0 text-neutral-800 mt-0.5 xs:mt-0" />
                    <span className="leading-relaxed">{branch.address}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Call size={18} color="currentColor" variant="Linear" className="shrink-0 text-neutral-800" />
                      <span className="font-sans whitespace-nowrap" dir="ltr">{branch.phone || branch.phone1}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Clock size={18} color="currentColor" variant="Linear" className="shrink-0 text-neutral-800" />
                      <span className="whitespace-nowrap">
                        <span className="hidden min-[480px]:inline">
                          {branch.hours.startsWith("همه‌روزه از ") ? "همه‌روزه از " : ""}
                        </span>
                        <span>{branch.hours.replace(/^همه‌روزه\s*از\s*/, "")}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:grid grid-cols-3 gap-6 sm:gap-4 items-start text-center">
                  {infoItems.map(({ icon: Icon, content }, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <Icon size={34} color="currentColor" variant="Linear" className="text-neutral-800 mb-2.5" />
                      {content}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="pt-6 sm:pt-10">
        <h2 className="text-center text-xl sm:text-2xl font-bold text-tarkhineh-dark mb-6 sm:mb-8">
          نظرات کاربران
        </h2>

        <Carousel showDots>
          {REVIEWS.map((rev) => (
            <ReviewCard key={rev.id} review={rev} branchName={branch.name} />
          ))}
        </Carousel>
      </section>
    </div>
  );
}