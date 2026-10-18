import { useState } from 'react';
import { CATEGORIES, validateProductData } from '@/lib/productStorage';
import { Product } from '@/types/product';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (p: Product) => void;
}

const DEFAULT_IMG = '/food/pasta.png';

export default function ProductModal({ isOpen, onClose, onAddProduct }: ProductModalProps) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: CATEGORIES[0],
    stock: '',
    image: '',
  });
  const [errors, setErrors] = useState<{ name?: string; price?: string; stock?: string }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateProductData(form);
    if (!result.isValid) {
      setErrors(result.errors as { name?: string; price?: string; stock?: string });
      return;
    }

    const imgInput = form.image.trim();
    const safeImg = imgInput ? (imgInput.startsWith('/') || imgInput.startsWith('http://') || imgInput.startsWith('https://') ? imgInput : `/${imgInput}`) : DEFAULT_IMG;

    onAddProduct({
      id: 'food-' + Date.now(),
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      stock: Number(form.stock),
      image: safeImg,
      createdAt: new Date().toISOString(),
    });

    setForm({ name: '', price: '', category: CATEGORIES[0], stock: '', image: '' });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-divider rounded-2xl w-full max-w-md p-5 shadow-xl font-sans">
        <div className="flex justify-between items-center pb-3 border-b border-divider mb-4">
          <h2 className="font-bold text-base text-tarkhineh-dark">افزودن غذای جدید</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="block text-xs font-semibold mb-1">نام غذا</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-divider rounded-xl p-2 focus:outline-none focus:border-primary"
              placeholder="مثلاً: پاستا آلفردو"
            />
            {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">دسته‌بندی</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-divider rounded-xl p-2 focus:outline-none cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">موجودی روزانه</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full border border-divider rounded-xl p-2 focus:outline-none focus:border-primary font-sans"
                placeholder="0"
              />
              {errors.stock && <p className="text-xs text-error mt-1">{errors.stock}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">قیمت (تومان)</label>
            <input
              type="number"
              min="1"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border border-divider rounded-xl p-2 focus:outline-none focus:border-primary font-sans"
              placeholder="مثلاً: 140000"
            />
            {errors.price && <p className="text-xs text-error mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">آدرس تصویر (اختیاری)</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full border border-divider rounded-xl p-2 text-xs focus:outline-none focus:border-primary font-sans"
              placeholder="/food/pasta.png یا آدرس اینترنتی"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-divider">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl border border-divider text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition cursor-pointer"
            >
              ثبت غذا
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
