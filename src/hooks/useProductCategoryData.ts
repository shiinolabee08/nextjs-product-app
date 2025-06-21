import { useProductCategoryStore } from '@/stores/productCategoryStore'
import { ProductCategory } from '@/types/product-category'
import { useEffect } from 'react'
import { useFetch } from './useFetch'

export function useProductCategoryData () {
  const { 
    productCategories, 
    isLoaded, 
    setProductCategories, 
    removeProductCategory 
  } = useProductCategoryStore()
  const { 
    data, 
    loading, 
    error, 
    refetch 
  } = useFetch<ProductCategory[]>('/api/product-categories', 'GET', !isLoaded)

  useEffect(() => {
    if (data && !isLoaded) {
      setProductCategories(data)
    }
  }, [data, isLoaded, setProductCategories])

  return {
    productCategories,
    loading,
    error,
    refetch,
    removeProductCategory,
  }
}