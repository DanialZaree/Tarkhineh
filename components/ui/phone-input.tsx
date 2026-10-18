"use client";

import * as React from "react";
import { cn, fa, en } from "@/lib/utils";

export interface PhoneInputProps {
  value?: string;
  onChange?: (digits: string, valid: boolean) => void;
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
}

export function PhoneInput({
  value = "",
  onChange,
  className,
  autoFocus,
  placeholder = "شماره همراه",
}: PhoneInputProps) {
  const [internal, setInternal] = React.useState(value);
  const current = value !== undefined ? value : internal;
  const raw = en(current).replace(/\D/g, "");
  const digits = raw.startsWith("0") ? raw.slice(1, 11) : raw.slice(0, 10);
  const valid = /^9\d{9}$/.test(digits);

  const formatDisplay = (d: string) => {
    if (!d) return "";
    const full = "0" + d;
    if (full.length <= 4) return fa(full);
    if (full.length <= 7) return fa(`${full.slice(0, 4)} ${full.slice(4)}`);
    return fa(`${full.slice(0, 4)} ${full.slice(4, 7)} ${full.slice(7, 11)}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextRaw = en(e.target.value).replace(/\D/g, "");
    const nextDigits = nextRaw.startsWith("0") ? nextRaw.slice(1, 11) : nextRaw.slice(0, 10);
    setInternal(nextDigits);
    onChange?.(nextDigits, /^9\d{9}$/.test(nextDigits));
  };

  return (
    <div
      className={cn(
        "flex h-12 w-full items-center rounded-lg border border-neutral-300 bg-white px-3.5 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
        digits.length === 10 && !valid ? "border-red-500" : "",
        className
      )}
    >
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        autoFocus={autoFocus}
        value={formatDisplay(digits)}
        onChange={handleChange}
        placeholder={placeholder}
        dir={digits ? "ltr" : "rtl"}
        className={cn(
          "h-full w-full bg-transparent text-sm tabular-nums outline-none placeholder:text-neutral-400 text-neutral-800",
          digits ? "text-center tracking-wider font-medium" : "text-right"
        )}
      />
    </div>
  );
}
