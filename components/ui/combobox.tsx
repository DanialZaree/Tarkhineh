"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComboboxProps {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  className?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

function fold(s: string) {
  return s.replace(/ي/g, "ی").replace(/ى/g, "ی").replace(/ك/g, "ک").replace(/[آأإ]/g, "ا").replace(/[\s‌]+/g, "");
}

export function Combobox({
  options,
  value = "",
  onChange,
  placeholder = "جست‌وجو…",
  emptyText = "چیزی پیدا نشد",
  className,
  id,
  name,
  disabled,
  required,
  ...aria
}: ComboboxProps) {
  const [query, setQuery] = React.useState(value);
  const [prevValue, setPrevValue] = React.useState(value);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const listId = React.useId();
  const root = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  if (value !== prevValue) {
    setPrevValue(value);
    setQuery(value);
  }

  const q = query.trim();
  const filtered = React.useMemo(() => {
    const f = fold(q);
    if (!f || q === value) return options;
    const starts = options.filter((o) => fold(o).startsWith(f));
    const contains = options.filter((o) => !fold(o).startsWith(f) && fold(o).includes(f));
    return [...starts, ...contains];
  }, [options, q, value]);

  React.useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, index]);

  React.useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (root.current && !root.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function pick(v: string) {
    setQuery(v);
    onChange?.(v);
    setOpen(false);
  }

  return (
    <div ref={root} className={cn("relative", className)}>
      <div
        className={cn(
          "flex h-10 w-full items-center rounded-xl border border-neutral-200 bg-white pe-2 ps-3 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20",
          aria["aria-invalid"] ? "border-rose-500/60" : "hover:border-neutral-300",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          {...aria}
          disabled={disabled}
          required={required}
          autoComplete="off"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setIndex(0);
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setIndex((i) => Math.min(filtered.length - 1, i + 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => Math.max(0, i - 1)); }
            if (e.key === "Enter" && open && filtered[index]) { e.preventDefault(); pick(filtered[index]); }
            if (e.key === "Escape") setOpen(false);
          }}
          className="h-full min-w-0 flex-1 bg-transparent pe-1 text-xs sm:text-sm leading-8 outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed text-tarkhineh-dark text-right"
        />
        <button
          type="button"
          tabIndex={-1}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((o) => !o);
          }}
          className="p-1 cursor-pointer text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="نمایش گزینه‌ها"
        >
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
        </button>
      </div>
      {name && <input type="hidden" name={name} value={value} />}
      {open && (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          dir="rtl"
          className="absolute top-full mt-1.5 inset-x-0 z-50 max-h-56 overflow-auto rounded-xl border border-neutral-200 bg-white p-1.5 text-xs sm:text-sm leading-7 shadow-xl text-right animate-in fade-in zoom-in-95 duration-100"
        >
          {filtered.length === 0 && <li className="px-3 py-2 text-neutral-400">{emptyText}</li>}
          {filtered.map((o, i) => (
            <li
              key={o}
              role="option"
              data-index={i}
              aria-selected={o === value}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(o);
              }}
              onMouseEnter={() => setIndex(i)}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors",
                i === index ? "bg-primary-tint text-primary font-medium" : "hover:bg-neutral-50 text-neutral-700",
              )}
            >
              <span className="inline-block pe-[0.2em]">
                {q && q !== value && o.startsWith(q) ? (
                  <>
                    <span className="font-semibold text-primary">{q}</span>
                    {o.slice(q.length)}
                  </>
                ) : (
                  o
                )}
              </span>
              {o === value && <Check className="size-3.5 shrink-0 text-primary" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
