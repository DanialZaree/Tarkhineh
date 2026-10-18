"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, fa } from "@/lib/utils";
import { JALALI_MONTHS, JALALI_WEEKDAYS_SHORT, jalaliMonthLength, jalaliWeekday, toGregorian, toJalali } from "@/lib/jalali";

export interface CalendarProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  min?: Date;
  max?: Date;
  markWeekend?: boolean;
  occasion?: (date: Date) => string | null;
  compact?: boolean;
  className?: string;
}

const sameDay = (a: Date | null | undefined, b: Date) =>
  !!a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export function Calendar({ value, defaultValue = null, onChange, min, max, markWeekend = true, occasion, compact, className }: CalendarProps) {
  const [internal, setInternal] = React.useState<Date | null>(defaultValue);
  const selected = value === undefined ? internal : value;
  const today = React.useMemo(() => new Date(), []);
  const initial = toJalali(selected ?? today);
  const [view, setView] = React.useState({ jy: initial.jy, jm: initial.jm });

  const first = toGregorian(view.jy, view.jm, 1);
  const offset = jalaliWeekday(first);
  const days = jalaliMonthLength(view.jy, view.jm);
  const cells = Array.from({ length: offset + days }, (_, i) => (i < offset ? null : i - offset + 1));

  function move(delta: number) {
    setView((v) => {
      let jm = v.jm + delta;
      let jy = v.jy;
      if (jm < 1) { jm = 12; jy -= 1; }
      if (jm > 12) { jm = 1; jy += 1; }
      return { jy, jm };
    });
  }

  function pick(d: number) {
    const date = toGregorian(view.jy, view.jm, d);
    if (value === undefined) setInternal(date);
    onChange?.(date);
  }

  const nav = "flex size-7 cursor-pointer items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900";

  return (
    <div dir="rtl" className={cn("rounded-2xl border border-neutral-200 bg-white p-3.5 shadow-xl font-sans select-none", compact ? "w-57.5" : "w-70", className)}>
      <div className="flex items-center justify-between px-1 pb-1">
        <button type="button" aria-label="ماه بعد" onClick={() => move(1)} className={nav}><ChevronRight className="size-4" /></button>
        <span className={cn("font-bold text-tarkhineh-dark", compact ? "text-xs" : "text-sm")}>
          {JALALI_MONTHS[view.jm - 1]} {fa(view.jy)}
        </span>
        <button type="button" aria-label="ماه قبل" onClick={() => move(-1)} className={nav}><ChevronLeft className="size-4" /></button>
      </div>
      <div className={cn("mt-2 grid grid-cols-7 overflow-hidden text-center", compact ? "gap-px text-[10px]" : "gap-1 text-xs")} role="grid">
        {JALALI_WEEKDAYS_SHORT.map((d) => (
          <span key={d} className="py-1 text-neutral-400 font-medium text-[11px]" aria-hidden>{d}</span>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <span key={`e${i}`} className={compact ? "h-6 w-6" : "h-8 w-8"} />;
          const date = toGregorian(view.jy, view.jm, d);
          const isSel = sameDay(selected, date);
          const isToday = sameDay(today, date);
          const fri = i % 7 === 6;
          const disabled = (min && date < min) || (max && date > max);
          const holiday = occasion?.(date) ?? null;
          return (
            <button
              key={d}
              type="button"
              role="gridcell"
              aria-selected={isSel}
              aria-label={`${fa(d)} ${JALALI_MONTHS[view.jm - 1]}${holiday ? `، تعطیل: ${holiday}` : ""}`}
              title={holiday ?? undefined}
              disabled={!!disabled}
              onClick={() => pick(d)}
              className={cn(
                "flex mx-auto items-center justify-center rounded-full leading-none tabular-nums transition-all text-xs",
                compact ? "h-6 w-6" : "h-8 w-8",
                isSel && "bg-primary font-bold text-white shadow-xs",
                !isSel && isToday && "border border-primary text-primary font-bold",
                !isSel && markWeekend && fri && "text-rose-500 font-medium",
                !isSel && !fri && !isToday && "text-neutral-700 hover:bg-neutral-100",
                disabled && "cursor-not-allowed opacity-30",
              )}
            >
              {fa(d)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
