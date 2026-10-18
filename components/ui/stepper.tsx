import { cn } from "@/lib/utils";

export interface StepItem {
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: StepItem[];
  current?: number;
  className?: string;
  onStepClick?: (index: number) => void;
}

export function Stepper({ steps, current = 0, className, onStepClick }: StepperProps) {
  return (
    <ol className={cn("flex items-center w-full max-w-2xl mx-auto", className)}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === steps.length - 1;

        return (
          <li key={i} className={cn("flex items-center", last ? "shrink-0" : "flex-1")}>
            <div
              onClick={() => onStepClick?.(i)}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base whitespace-nowrap transition-colors select-none",
                active
                  ? "text-primary font-bold"
                  : done
                  ? "text-primary font-medium hover:opacity-80"
                  : "text-neutral-400",
                onStepClick && (done || active) ? "cursor-pointer" : ""
              )}
            >
              {s.icon && <span className="shrink-0">{s.icon}</span>}
              <span>{s.label}</span>
            </div>
            {!last && (
              <span
                className={cn(
                  "mx-2 sm:mx-4 md:mx-6 flex-1 border-t-2 border-dashed transition-colors",
                  done ? "border-primary" : "border-neutral-300"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
