"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft2, Gallery, Maximize4, CloseCircle } from "iconsax-react";

const BRANCHES = [
  {
    id: "ekbatan",
    title: "شعبه اکباتان",
    address: "شهرک اکباتان، فاز ۳، مجتمع تجاری کوروش، طبقه سوم",
    image: "/branch-ekbatan.jpg",
    link: "/branch/ekbatan",
  },
  {
    id: "chalous",
    title: "شعبه چالوس",
    address: "چالوس، خیابان ۱۷ شهریور، بعد کوچه کوروش، جنب داروخانه دکتر میلانی",
    image: "/branch-chalous.jpg",
    link: "/branch/chalous",
  },
  {
    id: "aqdasiyeh",
    title: "شعبه اقدسیه",
    address: "خیابان اقدسیه ، نرسیده به میدان خیام، پلاک ۸",
    image: "/branch-aqdasiyeh.jpg",
    link: "/branch/aqdasiyeh",
  },
  {
    id: "vanak",
    title: "شعبه ونک",
    address: "میدان ونک، خیابان فردوسی، نبش کوچه نیلوفر، پلاک ۲۶",
    image: "/branch-vanak.jpg",
    link: "/branch/vanak",
  },
];

const GALLERY_IMAGES = [
  { id: 1, src: "/branch-ekbatan.jpg", alt: "شعبه اکباتان" },
  { id: 2, src: "/branch-chalous.jpg", alt: "شعبه چالوس" },
  { id: 3, src: "/branch-aqdasiyeh.jpg", alt: "شعبه اقدسیه" },
  { id: 4, src: "/branch-vanak.jpg", alt: "شعبه ونک" },
  { id: 5, src: "/about-bg.jpg", alt: "فضای باز ترخینه" },
  { id: 6, src: "/slide-3.jpg", alt: "سالن اصلی ترخینه" },
];

export default function BranchSection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (!activeImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage]);

  return (
    <section dir="rtl" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 font-sans">
      <h2 className="text-center font-bold text-xl sm:text-2xl text-tarkhineh-dark mb-8 sm:mb-12">
        ترخینه گردی
      </h2>

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {BRANCHES.map((b) => (
          <div
            key={b.id}
            className="group flex flex-col bg-white border border-tarkhineh-border hover:border-primary rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div
              onClick={() => setActiveImage(b.image)}
              className="relative w-full h-48 lg:h-52 overflow-hidden bg-neutral-100 cursor-pointer"
            >
              <Image
                src={b.image}
                alt={b.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transform-gpu transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/30 flex items-center justify-center text-white shadow-md">
                  <Gallery size={22} color="currentColor" variant="Linear" />
                </div>
              </div>
            </div>

            <Link
              href={b.link}
              className="p-4 sm:p-5 flex flex-col items-center text-center flex-1 justify-between"
            >
              <div>
                <h3 className="font-bold text-base sm:text-lg text-tarkhineh-dark mb-2 group-hover:text-primary transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs text-tarkhineh-muted leading-relaxed line-clamp-2 px-1">
                  {b.address}
                </p>
              </div>

              <div className="h-9 flex items-center justify-center mt-3">
                <span className="opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-1.5 px-4 py-1.5 rounded border border-primary text-primary text-xs font-medium hover:bg-primary hover:text-white">
                  <span>صفحه شعبه</span>
                  <ArrowLeft2 size={14} color="currentColor" variant="Linear" />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        {BRANCHES.map((b) => (
          <div
            key={b.id}
            className="group flex flex-row items-center bg-white border border-tarkhineh-border active:border-primary hover:border-primary rounded-lg overflow-hidden shadow-sm transition-all duration-200"
          >
            <Link href={b.link} className="flex-1 p-3.5 sm:p-4 text-right">
              <h3 className="font-bold text-sm sm:text-base text-tarkhineh-dark mb-1.5 group-hover:text-primary transition-colors">
                {b.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-tarkhineh-muted leading-relaxed line-clamp-2">
                {b.address}
              </p>
            </Link>

            <div
              onClick={() => setActiveImage(b.image)}
              className="relative w-36 sm:w-44 h-28 sm:h-32 shrink-0 overflow-hidden bg-neutral-100 cursor-pointer"
            >
              <Image
                src={b.image}
                alt={b.title}
                fill
                sizes="(max-width: 640px) 40vw, 180px"
                className="object-cover"
              />
              <div className="absolute bottom-2 left-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none">
                <Maximize4 size={20} color="currentColor" variant="Linear" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl h-80 sm:h-110 md:h-130 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/10"
          >
            <Image
              src={activeImage}
              alt="تصویر گالری شعبه"
              fill
              className="object-cover"
              priority
            />

            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 p-1.5 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-all cursor-pointer"
              aria-label="بستن"
            >
              <CloseCircle size={24} color="currentColor" variant="Linear" />
            </button>

            <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 bg-black/50 rounded-lg sm:rounded-xl">
              {GALLERY_IMAGES.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveImage(img.src)}
                  className={`relative w-11 h-8 sm:w-16 sm:h-11 rounded overflow-hidden transition-all cursor-pointer ${
                    activeImage === img.src
                      ? "ring-2 ring-white scale-105 opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
