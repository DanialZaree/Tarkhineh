import { CATEGORIES, toPersianDigits } from '@/lib/productStorage';
import { SortOption } from '@/types/product';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  selectedCategory: string;
  onCategoryChange: (v: string) => void;
  sortBy: SortOption;
  onSortChange: (v: SortOption) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (v: 'grid' | 'table') => void;
  totalFilteredCount: number;
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalFilteredCount,
}: FilterBarProps) {
  return (
    <div className="bg-container border border-divider rounded-2xl p-3.5 mb-6 space-y-3">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="جستجوی غذا..."
          className="flex-1 bg-white border border-divider rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-primary"
        />

        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="bg-white border border-divider rounded-xl py-2 px-3 text-sm focus:outline-none cursor-pointer"
        >
          <option value="all">همه دسته‌ها</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="bg-white border border-divider rounded-xl py-2 px-3 text-sm focus:outline-none cursor-pointer"
        >
          <option value="newest">جدیدترین</option>
          <option value="price-asc">قیمت: کم به زیاد</option>
          <option value="price-desc">قیمت: زیاد به کم</option>
          <option value="name-asc">نام: الف تا ی</option>
        </select>

        <div className="flex bg-white rounded-xl border border-divider p-1 self-start md:self-auto">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
              viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-500'
            }`}
          >
            کارت
          </button>
          <button
            onClick={() => onViewModeChange('table')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
              viewMode === 'table' ? 'bg-primary text-white' : 'text-gray-500'
            }`}
          >
            جدول
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500 pt-1">
        <span>نتایج: {toPersianDigits(totalFilteredCount)} مورد</span>
        {(searchQuery || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              onSearchChange('');
              onCategoryChange('all');
            }}
            className="text-primary hover:underline cursor-pointer"
          >
            پاک کردن فیلترها
          </button>
        )}
      </div>
    </div>
  );
}
