import { Product } from '@/types/product'
import { create } from 'zustand'

type ProductStore = {
  products: Product[];
  isLoaded: boolean;
  setProducts: (product: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  removeProduct: (id: number) => void;
  editProduct: (product: Product) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoaded: false,
  setProducts: (products) => set({ products, isLoaded: true }),
  addProduct: (product) => set((state) => ({
    products: [
      ...state.products,
      { ...product },
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