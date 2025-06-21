export interface Product {
  id?: number;
  name: string;
  price: number;
  sku: string;
  imageUrl?: string;
  description?: string;
  category: string;
  status?: number;
}