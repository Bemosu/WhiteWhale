import { type ClassValue, clsx } from 'clsx';
import { Timestamp } from 'firebase/firestore';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface User {
  nickname: string;
  isSeller: boolean;
}

export interface Product {
  id: string;
  productName: string;
  description: string;
  imageLink: string;
  cartegory_id: number;
  price: number;
  created_at: Date;
}

export interface CarouselProps {
  products: Product[];
}

export interface ProductCard {
  id: string;
  productCategory: string;
  productName: string;
  productPrice: number;
  imageUrl: string;
  productQuantity?: number;
  updatedAt?: Timestamp;
}

export interface FetchProductsResult {
  products: Product[];
  nextPage: any;
}
export interface CartProduct extends ProductCard {
  quantity: number;
}

export interface postInfo {
  postcodeData: string;
}
