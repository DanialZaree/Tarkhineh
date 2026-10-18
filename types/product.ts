export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  createdAt: string;
}

export type FoodItem = Product;
export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc';
