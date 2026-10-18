export interface CartItem {
  id: string;
  name: string;
  description?: string;
  image: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  quantity: number;
  rating?: number;
}

export interface AddressItem {
  id: string;
  title: string;
  detail: string;
  phone?: string;
  recipientName?: string;
  isSelf?: boolean;
}

export type Address = AddressItem;

export type DeliveryMethod = "courier" | "pickup";
export type PaymentMethod = "online" | "offline";
export type PaymentGateway = "saman" | "mellat" | "parsian";

export type OrderStatus = "current" | "delivered" | "cancelled";
export type FilterType = "all" | OrderStatus;

export interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  branch: string;
  status: OrderStatus;
  deliveryType: "تحویل حضوری" | "ارسال توسط پیک";
  date: string;
  deliveryTimeRemaining?: string;
  address: string;
  totalPrice: string;
  discount: string;
  items: OrderItem[];
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  displayName: string;
}

export type FavoriteCategory = "all" | "main" | "appetizer" | "dessert" | "drink";

export interface FavoriteItem {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  category: "main" | "appetizer" | "dessert" | "drink";
}

export interface AuthState {
  isLoggedIn: boolean;
  phone: string | null;
}

export type StorageDomain = "cart" | "favorites" | "profile" | "addresses" | "orders" | "auth";
