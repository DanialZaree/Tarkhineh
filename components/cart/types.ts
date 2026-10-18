export type {
  CartItem,
  Address,
  AddressItem,
  DeliveryMethod,
  PaymentMethod,
  PaymentGateway,
} from "@/types/site";

import type { CartItem } from "@/types/site";

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "pasta-sabzijat",
    name: "پاستا سبزیجات",
    description: "پاستا، قارچ، گوجه، کدوی خرد شده، پیاز خلال‌شده",
    image: "/food/pasta.png",
    price: 140000,
    oldPrice: 175000,
    discountPercent: 20,
    quantity: 1,
    rating: 4,
  },
  {
    id: "pizza-esfenaj",
    name: "پیتزا اسفناج",
    description: "اسفناج تازه، پیاز، سیر، پنیر پیتزا، قارچ",
    image: "/food/mushroom-pizza.png",
    price: 252000,
    oldPrice: 280000,
    discountPercent: 10,
    quantity: 1,
    rating: 4,
  },
  {
    id: "pizza-bademjan-zeytoon",
    name: "پیتزا بادمجان و زیتون",
    description: "بادمجان کوچک، روغن زیتون، پنیر موزارلا، پنیر پارمزان، برگ ریحان، گوجه فرنگی، سس گوجه فرنگی",
    image: "/food/mushroom-pizza.png",
    price: 150000,
    quantity: 1,
    rating: 4,
  },
  {
    id: "ratatui",
    name: "راتاتویی",
    description: "بادمجان ورقی، کدو سبز، گوجه فرنگی، روغن زیتون و ریحان",
    image: "/food/ratatui.png",
    price: 95000,
    oldPrice: 180000,
    discountPercent: 45,
    quantity: 1,
    rating: 4,
  },
];
