import { Product } from '@/types/product'
import React, { useState } from 'react'
import Image from 'next/image'
import { Delete, Edit } from 'lucide-react'
import { TableCell, TableRow } from '@mui/material'

interface ProductRowProps {
  product: Product;
  onDelete: (id?: number) => void;
  onEdit: (product: Product) => void;
  onPreview: (product: Product) => void;
}

function ProductRow({ product, onDelete, onEdit, onPreview }: ProductRowProps) {
  return (
    <TableRow>
      <TableCell scope="row">
        { product.imageUrl &&
          <Image 
            src={product.imageUrl}
            alt={product.name}
            width={60}
            height={60}
            onClick={() => onPreview(product)}
            className="hover:cursor pointer"
          />
        }
      </TableCell>
      <TableCell scope="row">
        <a href="javascript:void()" 
          onClick={() => onEdit(product)} 
          className='hover:cursor-pointer'>
            {product.name}
        </a>
      </TableCell>
      <TableCell scope="row">{product.sku}</TableCell>
      <TableCell scope="row">${product.price}</TableCell>
      <TableCell scope="row">{product.description}</TableCell>
      <TableCell scope="row">{product.category}</TableCell>
      <TableCell scope="row">
        <button onClick={() => onEdit(product)} className="text-blue-500 cursor-pointer m-2">
          <Edit />
        </button>
      </TableCell>
      <TableCell scope="row">
        <button onClick={() => onDelete(product.id)} className="text-red-500 cursor-pointer m-2">
          <Delete />
        </button>
      </TableCell>
    </TableRow>
  )
}

export default React.memo(ProductRow)
