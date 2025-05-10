import { Product } from '@/types/product'
import { create } from 'zustand'

type ProductStore = {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  removeProduct: (id: number) => void;
  editProduct: (product: Product) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  addProduct: (product) => set((state) => ({
    products: [
      ...state.products,
      {  ...product, id: Date.now() }, // simple unique ID for now
    ]
  })),
  removeProduct: (id: number) => set((state) => ({
    products: state.products.filter(product => product.id !== id)
  })),
  editProduct: (updatedProduct: Product) => set((state) => ({
    products: state.products.map((p) => 
      p.id === updatedProduct.id ? updatedProduct : p)
  }))
}))