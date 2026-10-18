import { Product } from '@/types/product';
import { formatPrice } from '@/lib/productStorage';
import StockBadge from './StockBadge';

interface ProductCardProps {
  product: Product;
  onDelete: (product: Product) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <div className="bg-surface border border-divider rounded-2xl overflow-hidden hover:border-primary transition-all flex flex-col shadow-xs">
      <div className="relative aspect-4/3 w-full bg-container overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 right-3 bg-white/95 text-primary border border-divider text-xs px-2.5 py-0.5 rounded-lg font-semibold shadow-2xs">
          {product.category}
        </span>
        <button
          onClick={() => onDelete(product)}
          className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-xs font-semibold text-gray-600 hover:text-white hover:bg-error transition cursor-pointer shadow-xs"
        >
          حذف
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-sm line-clamp-2 min-h-10 leading-snug">
            {product.name}
          </h3>
          <div className="mt-2">
            <StockBadge stock={product.stock} />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-divider flex items-center justify-between">
          <span className="text-xs text-gray-500">قیمت</span>
          <span className="text-sm font-bold text-primary font-sans">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
