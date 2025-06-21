import { ProductImage } from '@/types/product-image'
import { create } from 'zustand'

type ProductImageSelectorStore = {
  productImages: ProductImage[];
  isLoaded: boolean;
  setProductImages: (productImages: ProductImage[]) => void;
}

export const ProductImageSelectorStore = create<ProductImageSelectorStore>((set) => ({
  productImages: [],
  isLoaded: false,
  setProductImages: (productImages) => set({ productImages, isLoaded: true }),
}))
