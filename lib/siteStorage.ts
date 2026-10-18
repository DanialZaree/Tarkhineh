"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { INITIAL_CART_ITEMS } from "@/components/cart/types";
import type {
  CartItem,
  AddressItem,
  Order,
  OrderItem,
  OrderStatus,
  UserProfile,
  FavoriteItem,
  AuthState,
  StorageDomain,
} from "@/types/site";

export type {
  CartItem,
  AddressItem,
  AddressItem as Address,
  Order,
  OrderItem,
  OrderStatus,
  UserProfile,
  FavoriteItem,
  AuthState,
  StorageDomain,
};

export const STORAGE_KEYS = {
  CART: "tarkhineh_cart",
  FAVORITES: "tarkhineh_favorites",
  PROFILE: "tarkhineh_profile",
  ADDRESSES: "tarkhineh_addresses",
  ORDERS: "tarkhineh_orders",
  AUTH: "tarkhineh_auth",
} as const;

export type StorageKeyDomain = "cart" | "favorites" | "profile" | "addresses" | "orders" | "auth";
const STORAGE_EVENT = "tarkhineh_storage_change";

export const INITIAL_PROFILE: UserProfile = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: "",
  displayName: "کاربر ترخینه",
};

export const INITIAL_AUTH: AuthState = { isLoggedIn: false, phone: null };

const INITIAL_FAVORITES_DEFAULT: FavoriteItem[] = [];

const INITIAL_ADDRESSES_DEFAULT: AddressItem[] = [];

const INITIAL_ORDERS_DEFAULT: Order[] = [];

const cache: Record<string, any> = {};

function getStorage<T>(key: string, fallback: T, domain: StorageKeyDomain): T {
  if (cache[domain] !== undefined) return cache[domain];
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    let parsed = raw ? JSON.parse(raw) : fallback;

    if (domain === "auth" && parsed?.phone === "۰۹۱۴ ۸۶۴ ۳۳۵۰") {
      parsed = fallback;
      localStorage.setItem(key, JSON.stringify(fallback));
    }
    if (domain === "cart" && Array.isArray(parsed) && (parsed.length === 4 || parsed.some((i: any) => i.id === "pasta-sabzijat" || i.id === "pizza-esfenaj"))) {
      parsed = fallback;
      localStorage.setItem(key, JSON.stringify(fallback));
    }
    if (domain === "profile" && parsed?.phone === "۰۹۱۴ ۸۶۴ ۳۳۵۰") {
      parsed = fallback;
      localStorage.setItem(key, JSON.stringify(fallback));
    }
    if (domain === "addresses" && Array.isArray(parsed) && parsed.some((a: any) => a.phone === "۰۹۱۴ ۸۶۴ ۳۳۵۰")) {
      parsed = fallback;
      localStorage.setItem(key, JSON.stringify(fallback));
    }
    if (domain === "orders" && Array.isArray(parsed) && parsed.some((o: any) => o.id === "ord-1" || o.id === "ord-2")) {
      parsed = fallback;
      localStorage.setItem(key, JSON.stringify(fallback));
    }

    cache[domain] = parsed;
    if (!raw) localStorage.setItem(key, JSON.stringify(fallback));
  } catch {
    cache[domain] = fallback;
  }
  return cache[domain];
}

function setStorage<T>(key: string, value: T, domain: StorageKeyDomain) {
  cache[domain] = value;
  if (typeof window !== "undefined") {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { domain } }));
  }
}

export function notifyStorageChange(domain: StorageKeyDomain) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { domain } }));
  }
}

export function parseNumericPrice(price: string | number): number {
  if (typeof price === "number") return price;
  if (!price) return 0;
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return Number(String(price).replace(/[۰-۹]/g, (d) => String(persianDigits.indexOf(d))).replace(/[^\d]/g, "")) || 0;
}

export const getStoredCart = (): CartItem[] => getStorage(STORAGE_KEYS.CART, INITIAL_CART_ITEMS, "cart");
export const saveStoredCart = (items: CartItem[]) => setStorage(STORAGE_KEYS.CART, items, "cart");

export const getStoredFavorites = (): FavoriteItem[] => getStorage(STORAGE_KEYS.FAVORITES, INITIAL_FAVORITES_DEFAULT, "favorites");
export const saveStoredFavorites = (items: FavoriteItem[]) => setStorage(STORAGE_KEYS.FAVORITES, items, "favorites");

export const getStoredProfile = (): UserProfile => getStorage(STORAGE_KEYS.PROFILE, INITIAL_PROFILE, "profile");
export const saveStoredProfile = (profile: UserProfile) => setStorage(STORAGE_KEYS.PROFILE, profile, "profile");

export const getStoredAddresses = (): AddressItem[] => getStorage(STORAGE_KEYS.ADDRESSES, INITIAL_ADDRESSES_DEFAULT, "addresses");
export const saveStoredAddresses = (addresses: AddressItem[]) => setStorage(STORAGE_KEYS.ADDRESSES, addresses, "addresses");

export const getStoredOrders = (): Order[] => getStorage(STORAGE_KEYS.ORDERS, INITIAL_ORDERS_DEFAULT, "orders");
export const saveStoredOrders = (orders: Order[]) => setStorage(STORAGE_KEYS.ORDERS, orders, "orders");

export const getStoredAuth = (): AuthState => getStorage(STORAGE_KEYS.AUTH, INITIAL_AUTH, "auth");
export const saveStoredAuth = (auth: AuthState) => setStorage(STORAGE_KEYS.AUTH, auth, "auth");

export function addToCart(
  item: { id: string; name: string; price: number | string; image: string; description?: string; discount?: number; rating?: number },
  quantity = 1
) {
  const current = [...getStoredCart()];
  const idx = current.findIndex((i) => i.id === item.id);
  const numPrice = parseNumericPrice(item.price);
  if (idx >= 0) {
    current[idx] = { ...current[idx], quantity: current[idx].quantity + quantity };
  } else {
    current.push({
      id: item.id,
      name: item.name,
      price: numPrice,
      image: item.image,
      description: item.description || "",
      discountPercent: item.discount,
      rating: item.rating || 5,
      quantity: Math.max(1, quantity),
    });
  }
  saveStoredCart(current);
}

export const updateCartQuantity = (id: string, delta: number) =>
  saveStoredCart(getStoredCart().map((i) => i.id === id ? { ...i, quantity: i.quantity + delta } : i).filter((i) => i.quantity > 0));

export const removeFromCart = (id: string) => saveStoredCart(getStoredCart().filter((i) => i.id !== id));
export const clearCart = () => saveStoredCart([]);

export function getCartTotals(cartItems?: CartItem[]) {
  const items = cartItems || getStoredCart();
  let totalCount = 0;
  let rawTotalPrice = 0;
  let payableAmount = 0;
  for (const item of items) {
    totalCount += item.quantity;
    rawTotalPrice += (item.oldPrice && item.oldPrice > item.price ? item.oldPrice : item.price) * item.quantity;
    payableAmount += item.price * item.quantity;
  }
  return { totalCount, rawTotalPrice, totalDiscount: Math.max(0, rawTotalPrice - payableAmount), payableAmount };
}

export const isItemFavorite = (id: string) => getStoredFavorites().some((i) => i.id === id);

export function toggleFavorite(item: { id: string; name: string; price?: string | number; image: string; rating?: number; category?: string }): boolean {
  const current = getStoredFavorites();
  const exists = current.some((i) => i.id === item.id);
  if (exists) {
    saveStoredFavorites(current.filter((i) => i.id !== item.id));
    return false;
  }
  const cleanPrice = typeof item.price === "number" ? `${item.price.toLocaleString("fa-IR")} تومان` : (item.price || "۱۵۰,۰۰۰ تومان");
  saveStoredFavorites([{ id: item.id, name: item.name, price: cleanPrice, image: item.image, rating: item.rating || 5, category: (item.category as any) || "main" }, ...current]);
  return true;
}

export const removeFavorite = (id: string) => saveStoredFavorites(getStoredFavorites().filter((i) => i.id !== id));

export function loginUser(phone: string) {
  saveStoredAuth({ isLoggedIn: true, phone });
  const profile = getStoredProfile();
  if (!profile.phone || profile.phone !== phone) {
    saveStoredProfile({ ...profile, phone });
  }
}

export const logoutUser = () => saveStoredAuth({ isLoggedIn: false, phone: null });

export function upsertAddress(address: AddressItem) {
  const current = getStoredAddresses().filter((a) => a.id !== address.id);
  saveStoredAddresses([address, ...current]);
}

export const deleteAddress = (id: string) => saveStoredAddresses(getStoredAddresses().filter((a) => a.id !== id));

export function createOrderFromCart({
  branch = "شعبه اکباتان",
  deliveryType = "ارسال توسط پیک",
  address = "ولیعصر، خیابان بزرگمهر، کوچه نسیم",
  trackingCode,
  items,
  totalPrice,
  discount,
}: {
  branch?: string;
  deliveryType?: "تحویل حضوری" | "ارسال توسط پیک";
  address?: string;
  trackingCode?: string;
  items: CartItem[];
  totalPrice: number;
  discount: number;
}): Order {
  const id = trackingCode || `ord-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const now = new Date();
  const newOrder: Order = {
    id,
    branch,
    status: "current",
    deliveryType,
    date: `امروز، ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`,
    deliveryTimeRemaining: "۳۵:۰۰",
    address,
    totalPrice: `${totalPrice.toLocaleString("fa-IR")} تومان`,
    discount: `${discount.toLocaleString("fa-IR")} تومان`,
    items: items.map((i) => ({ id: i.id, name: i.name, price: `${i.price.toLocaleString("fa-IR")} تومان`, quantity: i.quantity, image: i.image })),
  };
  saveStoredOrders([newOrder, ...getStoredOrders()]);
  clearCart();
  return newOrder;
}

export const cancelOrder = (id: string) =>
  saveStoredOrders(getStoredOrders().map((o) => (o.id === id ? { ...o, status: "cancelled" } : o)));

export function useStorageListener(domains: StorageKeyDomain[], onUpdate: () => void) {
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (e.type === "storage") {
        Object.keys(cache).forEach((k) => delete cache[k]);
      }
      if (!detail?.domain || domains.includes(detail.domain)) {
        onUpdate();
      }
    };
    window.addEventListener(STORAGE_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(STORAGE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, [domains, onUpdate]);
}

function useDomainState<T>(domain: StorageKeyDomain, getter: () => T, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  useEffect(() => { setData(getter()); }, [getter]);
  useStorageListener([domain], () => setData(getter()));
  return data;
}

export function useCart() {
  const items = useDomainState("cart", getStoredCart, []);
  const totals = useMemo(() => getCartTotals(items), [items]);
  return {
    items,
    ...totals,
    addItem: addToCart,
    updateQuantity: updateCartQuantity,
    removeItem: removeFromCart,
    clearCart,
  };
}

export function useFavorites() {
  const favorites = useDomainState("favorites", getStoredFavorites, INITIAL_FAVORITES_DEFAULT);
  const isFavorite = useCallback((id: string) => favorites.some((f) => f.id === id), [favorites]);
  return { favorites, isFavorite, toggleFavorite, removeFavorite };
}

export function useAddresses() {
  return { addresses: useDomainState("addresses", getStoredAddresses, INITIAL_ADDRESSES_DEFAULT), upsertAddress, deleteAddress };
}

export function useOrders() {
  return { orders: useDomainState("orders", getStoredOrders, INITIAL_ORDERS_DEFAULT), createOrder: createOrderFromCart, cancelOrder };
}

export function useProfile() {
  return { profile: useDomainState("profile", getStoredProfile, INITIAL_PROFILE), updateProfile: saveStoredProfile };
}

export function useAuth() {
  return { auth: useDomainState("auth", getStoredAuth, INITIAL_AUTH), login: loginUser, logout: logoutUser };
}
