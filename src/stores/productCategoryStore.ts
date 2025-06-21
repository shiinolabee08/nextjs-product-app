import { ProductCategory } from '@/types/product-category'
import { create } from 'zustand'

type ProductCategoryStore = {
  productCategories: ProductCategory[];
  isLoaded: boolean;
  setProductCategories:   (productCategory: ProductCategory[]) => void;
  addProductCategory:     (productCategory: Omit<ProductCategory, 'id'>) => void;
  removeProductCategory:  (id: number) => void;
  editProductCategory:    (productCategory: ProductCategory) => void;
}

export const useProductCategoryStore = create<ProductCategoryStore>((set) => ({
  productCategories: [],
  isLoaded: false,
  setProductCategories: (productCategories) => 
    set({ productCategories, isLoaded: true }),
  addProductCategory: (productCategory) => 
    set((state) => ({
      productCategories: [
        ...state.productCategories,
        { ...productCategory },
      ]
    }
  )),
  removeProductCategory: (id: number) => 
    set((state) => ({
      productCategories: state.productCategories.filter(productCategory => productCategory.id !== id)
    }
  )),
  editProductCategory: (updatedProductCategory: ProductCategory) => 
    set((state) => ({
      productCategories: state.productCategories.map((p) => 
        p.id === updatedProductCategory.id ? updatedProductCategory : p)
    }))
  })
)