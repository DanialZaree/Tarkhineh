interface EmptyStateProps {
  isFiltered: boolean;
  onReset: () => void;
  onAdd: () => void;
}

export default function EmptyState({ isFiltered, onReset, onAdd }: EmptyStateProps) {
  return (
    <div className="bg-container border border-divider rounded-2xl p-8 text-center my-6">
      <p className="text-gray-600 text-sm mb-4">
        {isFiltered ? 'غذایی با این مشخصات یافت نشد.' : 'هنوز غذایی در منوی ترخینه ثبت نشده است.'}
      </p>
      {isFiltered ? (
        <button
          onClick={onReset}
          className="px-4 py-2 text-xs font-semibold bg-white border border-divider rounded-xl cursor-pointer hover:border-primary"
        >
          پاک کردن فیلترها
        </button>
      ) : (
        <button
          onClick={onAdd}
          className="px-4 py-2 text-xs font-semibold bg-primary text-white rounded-xl cursor-pointer hover:bg-primary-hover shadow-xs"
        >
          + افزودن اولین غذا
        </button>
      )}
    </div>
  );
}
