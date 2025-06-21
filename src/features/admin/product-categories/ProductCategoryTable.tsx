'use client'

import { useCallback } from 'react'
import ProductCategoryRow from './ProductCategoryRow'
import { ProductCategory } from '@/types/product-category'
import { LoaderCircle } from 'lucide-react'
import { useProductCategoryData } from '@/hooks/useProductCategoryData'

interface ProductCategoryTableProps {
  onEditProductCategory: (productCategory: ProductCategory) => void;
}

export default function ProductCategoryTable({ onEditProductCategory }: ProductCategoryTableProps) {
  const { 
    productCategories,
    loading,
    error,
    refetch,
    removeProductCategory,
  } = useProductCategoryData()

  // Prevent unnecessary re-renders of ProductRow
  const handleOnDelete = useCallback(
    (id?: number) => {
      if (id) {
        removeProductCategory(id)
      }
    },
    [removeProductCategory]
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="text-left text-sm uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3 border-b">Name</th>
            <th className="px-4 py-3 border-b">Description</th>
            <th className="px-4 py-3 border-b">Status</th>
            <th colSpan={4} className="px-4 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {productCategories.length === 0 ? (
            <tr>
              <td colSpan={12} className="text-center py-6 text-gray-400">
                No product categories found.
              </td>
            </tr>
          ) : (
            productCategories.map((productCategory) => (
              <ProductCategoryRow
                key={productCategory.id}
                productCategory={productCategory}
                onDelete={handleOnDelete}
                onEdit={onEditProductCategory}
              />
            ))
          )}
        </tbody>
      </table>
      <button 
        onClick={refetch} 
        className="mt-4 text-blue-500 underline cursor-pointer">
        <LoaderCircle className="inline-block mr-1"/>Reload
      </button>
    </div>
  )
}