import React from 'react'
import { Delete, Edit } from 'lucide-react'
import { ProductCategory } from '@/types/product-category'

interface ProductCategoryRowProps {
  productCategory: ProductCategory;
  onDelete: (id?: number) => void;
  onEdit: (productCategory: ProductCategory) => void;
}

function ProductCategoryRow({ productCategory, onDelete, onEdit }: ProductCategoryRowProps) {
  return (
    <tr>
      <td>{productCategory.name}</td>
      <td>{productCategory.description}</td>
      <td>{productCategory.status ? 'Active' : 'In-active'}</td>
      <td>
        <button onClick={() => onEdit(productCategory)} className="text-blue-500 cursor-pointer m-2">
          <Edit />
        </button>
        <button onClick={() => onDelete(productCategory.id)} className="text-red-500 cursor-pointer m-2">
          <Delete />
        </button>
      </td>
    </tr>
  );
}

export default React.memo(ProductCategoryRow)
