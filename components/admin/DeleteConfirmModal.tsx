import { Product } from '@/types/product';

interface DeleteConfirmModalProps {
  product: Product | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({ product, onClose, onConfirm }: DeleteConfirmModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-divider rounded-2xl w-full max-w-sm p-5 shadow-xl text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-error-light text-error flex items-center justify-center text-xl font-bold">
          !
        </div>
        <h3 className="font-bold text-base mb-1">حذف غذا</h3>
        <p className="text-xs text-gray-500 mb-4">
          آیا از حذف «<span className="font-semibold text-gray-800">{product.name}</span>» از منوی ترخینه اطمینان دارید؟
        </p>

        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-divider text-xs text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1.5 rounded-xl bg-error hover:opacity-90 text-white text-xs font-semibold transition cursor-pointer"
          >
            حذف شود
          </button>
        </div>
      </div>
    </div>
  );
}
