import { toPersianDigits } from '@/lib/productStorage';

export default function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded bg-error-light text-error">
        <span className="w-1.5 h-1.5 rounded-full bg-error" />
        ناموجود
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded bg-warning-light text-warning">
        <span className="w-1.5 h-1.5 rounded-full bg-warning" />
        محدود ({toPersianDigits(stock)})
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded bg-success-light text-success">
      <span className="w-1.5 h-1.5 rounded-full bg-success" />
      موجود ({toPersianDigits(stock)})
    </span>
  );
}
