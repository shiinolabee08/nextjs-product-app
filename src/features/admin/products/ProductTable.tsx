'use client'

import { useProductStore } from '@/stores/productStore'
import { useCallback } from 'react'
import ProductRow from './ProductRow'
import { Product } from '@/types/product'

interface ProductTableProps {
  onEditProduct: (product: Product) => void;
}

export default function ProductTable({ onEditProduct }: ProductTableProps) {
  const { products, removeProduct } = useProductStore()

  // Prevent unnecessary re-renders of ProductRow
  const handleOnDelete = useCallback(
    (id: number) => {
      removeProduct(id)
    },
    [removeProduct]
  )

  return (
    <div className="overflow-x-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm uppercase text-gray-600">
          <tr>
            <th colSpan={2}></th>
            <th className="px-4 py-3 border-b">Name</th>
            <th className="px-4 py-3 border-b">Product SKU</th>
            <th className="px-4 py-3 border-b">Price</th>
            <th className="px-4 py-3 border-b">Description</th>
            <th className="px-4 py-3 border-b">Category</th>
            <th colSpan={4} className="px-4 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {products.length === 0 ? (
            <tr>
              <td colSpan={12} className="text-center py-6 text-gray-400">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onDelete={handleOnDelete}
                onEdit={onEditProduct}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}