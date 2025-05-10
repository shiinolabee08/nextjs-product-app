import { Product } from '@/types/product'
import React from 'react'
import Image from 'next/image'
import { Delete, Edit } from 'lucide-react'

interface ProductRowProps {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

function ProductRow({ product, onDelete, onEdit }: ProductRowProps) {
  console.log('Rendered:', product.name);

  return (
    <tr>
      <td colSpan={2}>
        { product.imageUrl &&
          <Image 
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            width={60}
            height={60}
          />
        }
      </td>
      <td>{product.name}</td>
      <td>{product.sku}</td>
      <td>{product.price}</td>
      <td>{product.description}</td>
      <td>{product.category}</td>
      <td>
        <button onClick={() => onEdit(product)} className="text-blue-500 cursor-pointer m-2">
          <Edit />
        </button>
        <button onClick={() => onDelete(product.id)} className="text-red-500 cursor-pointer m-2">
          <Delete />
        </button>
      </td>
    </tr>
  );
}

export default React.memo(ProductRow)
