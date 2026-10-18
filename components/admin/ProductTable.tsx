import { Product } from '@/types/product';
import { formatPrice } from '@/lib/productStorage';
import StockBadge from './StockBadge';

interface ProductTableProps {
  products: Product[];
  onDelete: (product: Product) => void;
}

export default function ProductTable({ products, onDelete }: ProductTableProps) {
  return (
    <div className="bg-surface border border-divider rounded-2xl overflow-x-auto shadow-xs">
      <table className="w-full text-right border-collapse text-sm">
        <thead>
          <tr className="border-b border-divider bg-container text-xs text-gray-600 font-semibold">
            <th className="p-3">تصویر</th>
            <th className="p-3">نام غذا</th>
            <th className="p-3">دسته‌بندی</th>
            <th className="p-3">موجودی</th>
            <th className="p-3">قیمت</th>
            <th className="p-3 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-divider">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-container transition">
              <td className="p-3 w-14">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-10 h-10 rounded-lg object-cover border border-divider"
                />
              </td>
              <td className="p-3 font-medium max-w-xs truncate">{p.name}</td>
              <td className="p-3">
                <span className="px-2 py-0.5 rounded text-xs bg-container border border-divider">
                  {p.category}
                </span>
              </td>
              <td className="p-3 whitespace-nowrap">
                <StockBadge stock={p.stock} />
              </td>
              <td className="p-3 font-bold text-primary whitespace-nowrap">
                {formatPrice(p.price)}
              </td>
              <td className="p-3 text-center whitespace-nowrap">
                <button
                  onClick={() => onDelete(p)}
                  className="px-2.5 py-1 text-xs text-gray-500 hover:text-white hover:bg-error rounded-lg border border-divider transition cursor-pointer"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
