"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
  itemClassName?: string;
}

export function Accordion({
  items,
  multiple = true,
  defaultOpen = [],
  className,
  itemClassName,
}: AccordionProps) {
  const [open, setOpen] = React.useState<string[]>(defaultOpen);
  const toggle = (id: string) =>
    setOpen((o) =>
      o.includes(id) ? o.filter((x) => x !== id) : multiple ? [...o, id] : [id]
    );

  return (
    <div
      className={cn(
        "divide-y divide-neutral-200 rounded-xl md:rounded-2xl border border-neutral-300 bg-white shadow-2xs overflow-hidden",
        className
      )}
    >
      {items.map((it) => {
        const isOpen = open.includes(it.id);
        return (
          <div key={it.id} className={cn("transition-colors", itemClassName)}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`acc-${it.id}`}
                onClick={() => toggle(it.id)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 text-start text-xs sm:text-sm md:text-base font-medium transition-colors hover:text-primary select-none group"
              >
                <div
                  className={cn(
                    "transition-colors leading-normal",
                    isOpen
                      ? "text-primary font-semibold"
                      : "text-tarkhineh-dark group-hover:text-primary"
                  )}
                >
                  {it.title}
                </div>
                <ChevronDown
                  className={cn(
                    "size-4 sm:size-5 shrink-0 transition-transform duration-200",
                    isOpen ? "rotate-180 text-primary" : "text-neutral-500 group-hover:text-primary"
                  )}
                />
              </button>
            </h3>
            <div
              id={`acc-${it.id}`}
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm md:text-[14px] leading-relaxed sm:leading-loose text-neutral-600 font-normal text-justify">
                  {it.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
