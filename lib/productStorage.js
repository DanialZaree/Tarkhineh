import { toPersianDigits } from "./utils";
import { ALL_MENU_ITEMS } from "./menuData";

export const STORAGE_KEY = "tarkhineh_admin_menu_foods";

export const CATEGORIES = [
  "غذای اصلی",
  "پیش‌غذا",
  "دسر",
  "نوشیدنی",
];

const CATEGORY_MAP = {
  main: "غذای اصلی",
  appetizer: "پیش‌غذا",
  dessert: "دسر",
  drink: "نوشیدنی",
};

const DEFAULT_STOCKS = [18, 12, 25, 8, 15, 20, 10, 14, 22, 16, 30, 9];

function parsePrice(p) {
  const digits = "۰۱۲۳۴۵۶۷۸۹";
  return Number(String(p).replace(/[۰-۹]/g, (d) => String(digits.indexOf(d))).replace(/[^\d]/g, "")) || 100000;
}

export const INITIAL_PRODUCTS = ALL_MENU_ITEMS.map((item, idx) => ({
  id: item.id,
  name: item.name,
  price: parsePrice(item.price),
  category: CATEGORY_MAP[item.category] || "غذای اصلی",
  stock: DEFAULT_STOCKS[idx % DEFAULT_STOCKS.length],
  image: item.image,
  createdAt: new Date(2026, 9, 1 + (idx % 25)).toISOString(),
}));

export function getStoredProducts() {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProducts(products) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent("tarkhineh_storage_change", { detail: { domain: "foods" } }));
  } catch {}
}

export function validateProductData(data = {}) {
  const errors = {};
  if (!data.name?.trim()) errors.name = "نام غذا الزامی است.";
  if (!data.price || Number(data.price) <= 0) errors.price = "قیمت باید عدد مثبت باشد.";
  if (data.stock === "" || data.stock === undefined || Number(data.stock) < 0) errors.stock = "موجودی نمی‌تواند منفی باشد.";
  return { isValid: Object.keys(errors).length === 0, errors };
}

export const formatPrice = (price) => Number(price).toLocaleString("fa-IR") + " تومان";

export { toPersianDigits };
