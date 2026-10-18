"use client";

import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

export interface CarouselProps {
  children: ReactNode;
  fadeColor?: "white" | "green";
  showDots?: boolean;
}

export function Carousel({
  children,
  fadeColor = "white",
  showDots = false,
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stopsRef = useRef<number[]>([0]);
  const rafRef = useRef(0);

  const [stopCount, setStopCount] = useState(1);
  const [activeStop, setActiveStop] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const readPosition = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrolled = Math.abs(el.scrollLeft);
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(scrolled > 8);
    setCanNext(max - scrolled > 8);

    if (showDots) {
      let nearest = 0, best = Infinity;
      stopsRef.current.forEach((pos, i) => {
        const d = Math.abs(pos - scrolled);
        if (d < best) { best = d; nearest = i; }
      });
      setActiveStop(nearest);
    }
  }, [showDots]);

  const measure = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (!showDots) return readPosition();

    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const scrolled = Math.abs(el.scrollLeft);
    const box = el.getBoundingClientRect();
    const stops: number[] = [];

    for (const child of Array.from(el.children) as HTMLElement[]) {
      const pos = Math.min(Math.max(0, Math.round(box.right - child.getBoundingClientRect().right + scrolled)), max);
      if (!stops.length || pos - stops[stops.length - 1] >= 8) stops.push(pos);
    }

    if (max > 0 && stops[stops.length - 1] !== max) {
      while (stops.length > 1 && max - stops[stops.length - 1] < 8) stops.pop();
      stops.push(max);
    }

    stopsRef.current = stops.length ? stops : [0];
    setStopCount(stopsRef.current.length);
    readPosition();
  }, [showDots, readPosition]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        readPosition();
      });
    };

    const ro = new ResizeObserver(measure);
    el.addEventListener("scroll", onScroll, { passive: true });
    ro.observe(el);
    measure();

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [measure, readPosition]);

  const goToStop = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const stops = stopsRef.current;
    const target = stops[Math.min(Math.max(index, 0), stops.length - 1)];
    el.scrollTo({ left: -target });
  };

  const scroll = (dir: 1 | -1) => {
    if (showDots) goToStop(activeStop + dir);
    else scrollRef.current?.scrollBy({ left: dir * -350, behavior: "smooth" });
  };

  return (
    <div className="relative w-full pr-6 sm:pr-10 md:pr-16 lg:pr-24 xl:pr-32 2xl:pr-40 pl-4 sm:pl-6">
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto motion-safe:scroll-smooth py-2 pl-6 sm:pl-10 snap-x snap-mandatory outline-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
      <div
        className={`pointer-events-none hidden md:block absolute left-0 top-0 bottom-0 w-36 md:w-48 lg:w-60 z-10 bg-linear-to-r transition-opacity duration-300 ${
          canNext ? "opacity-100" : "opacity-0"
        } ${
          fadeColor === "green"
            ? "from-primary-hover via-primary-hover/85 to-transparent"
            : "from-white via-white/90 to-transparent"
        }`}
      />
      {canNext && (
        <button
          type="button"
          onClick={() => scroll(1)}
          className="hidden md:flex absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-lg border border-neutral-300 bg-white/95 shadow-md items-center justify-center text-neutral-600 hover:text-black hover:border-neutral-500 transition-all cursor-pointer"
        >
          <ArrowLeft2 size={18} color="currentColor" variant="Linear" />
        </button>
      )}

      {canPrev && (
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="hidden md:flex absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-lg border border-neutral-300 bg-white/95 shadow-md items-center justify-center text-neutral-600 hover:text-black hover:border-neutral-500 transition-all cursor-pointer"
        >
          <ArrowRight2 size={18} color="currentColor" variant="Linear" />
        </button>
      )}
      {showDots && stopCount > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: stopCount }, (_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToStop(idx)}
              className={`rounded-full transition-all duration-200 cursor-pointer ${
                idx === activeStop
                  ? "w-2.5 h-2.5 bg-primary"
                  : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Carousel;
