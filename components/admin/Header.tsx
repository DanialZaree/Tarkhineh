import Link from 'next/link';
import Image from 'next/image';
import { toPersianDigits } from '@/lib/productStorage';

interface HeaderProps {
  totalCount: number;
  totalStock: number;
  onOpenAddModal: () => void;
}

export default function Header({ totalCount, totalStock, onOpenAddModal }: HeaderProps) {
  return (
    <header className="border-b border-divider bg-surface sticky top-0 z-20 py-3.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/" title="بازگشت به سایت ترخینه" className="shrink-0 hover:opacity-80 transition">
            <Image src="/logo-emblem.svg" alt="ترخینه" width={32} height={32} className="h-8 w-auto" />
          </Link>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-tarkhineh-dark">
              مدیریت غذاهای ترخینه
            </h1>
            <p className="text-xs text-gray-500 font-sans">
              {toPersianDigits(totalCount)} غذا | موجودی کل: {toPersianDigits(totalStock)}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs"
        >
          <span>+</span>
          <span>افزودن غذا</span>
        </button>
      </div>
    </header>
  );
}
