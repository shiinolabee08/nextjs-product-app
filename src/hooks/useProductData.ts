import { useProductCategoryStore } from '@/stores/productCategoryStore'
import { useProductStore } from '@/stores/productStore'
import { Product } from '@/types/product'
import { ProductCategory } from '@/types/product-category'
import { useEffect } from 'react'
import { useFetch } from './useFetch'

export function useProductData() {

  const { 
    products, isLoaded: productsIsLoaded, 
    setProducts, removeProduct 
  } = useProductStore()
  const { 
    isLoaded: productCategoriesIsLoaded, 
    setProductCategories 
  } = useProductCategoryStore()

  const { 
    data: productData, loading, error, refetch 
  } = useFetch<Product[]>('/api/products', 'GET', !productsIsLoaded)
  const { 
    data: productCategoryData 
  } = useFetch<ProductCategory[]>('/api/product-categories', 'GET', !productCategoriesIsLoaded)

  // Populate Zustand store after fetch
  useEffect(() => {
    if (productData && !productsIsLoaded) {
      setProducts(productData)
    }

    if (productCategoryData && !productCategoriesIsLoaded) {
      setProductCategories(productCategoryData)
    }
  }, [
    productData, productsIsLoaded, setProducts, 
    productCategoryData, productCategoriesIsLoaded, setProductCategories
  ])

  return {
    products,
    loadingProduct: loading,
    errorProduct: error,
    removeProduct,
    refetchProduct: refetch,
  }
}