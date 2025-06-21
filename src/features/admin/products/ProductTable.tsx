'use client'

import { useCallback, useState } from 'react'
import ProductRow from './ProductRow'
import { Product } from '@/types/product'
import { LoaderCircle, Table } from 'lucide-react'
import Modal from '@/components/shared/Modal'
import Image from 'next/image'
import { useProductData } from '@/hooks/useProductData'
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Paper } from '@mui/material'

interface ProductTableProps {
  onEditProduct: (product: Product) => void;
}

export default function ProductTable({ onEditProduct }: ProductTableProps) {
  const { 
    products, 
    loadingProduct: loading, 
    errorProduct: error,
    refetchProduct: refetch,
    removeProduct 
  } = useProductData()

  const [openPreview, setOpenPreview] = useState<boolean>(false)
  const [preview, setPreview] = useState<Product>()

  // Prevent unnecessary re-renders of ProductRow
  const handleOnDelete = useCallback(
    (id?: number) => {
      if (id) {
        removeProduct(id)
      }  
    },
    [removeProduct]
  )

  const handleOnPreview = (product: Product) => {
    if (product?.imageUrl) {
      setOpenPreview(true)
      setPreview(product)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>

  return (
    <div className="relative overflow-x-auto mt-8">
      {/* <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Product SKU</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center py-6 text-gray-400">
                  No product categories found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onDelete={handleOnDelete}
                  onEdit={onEditProduct}
                  onPreview={handleOnPreview}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer> */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Image</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Product SKU</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {products.length === 0 ? (
            <tr>
              <td colSpan={12} className="text-center py-6 text-gray-400">
                No product categories found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onDelete={handleOnDelete}
                onEdit={onEditProduct}
                onPreview={handleOnPreview}
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

      { /** Preview Modal */}
      { preview && (
        <Modal isOpen={openPreview} onClose={() => setOpenPreview(false)}>
          <Image 
            src={preview.imageUrl || ''}
            alt={preview.name}
            width={600}
            height={600}
          />
        </Modal>
      )}
    </div>
  )
}