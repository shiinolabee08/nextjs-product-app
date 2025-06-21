'use client'

import { useEffect, useState } from 'react'
import { useProductCategoryStore } from '@/stores/productCategoryStore'
import { ProductCategory } from '@/types/product-category'
import axios from 'axios'

interface ProductCategoryFormProps {
  productCategory?: ProductCategory | null;
  onSubmitSuccess?: () => void;
}

export default function ProductCategoryForm({ productCategory, onSubmitSuccess }: ProductCategoryFormProps) {
  const [form, setForm] = useState<ProductCategory>({
    name: '',
    description: '',
  })
  const { addProductCategory, editProductCategory } = useProductCategoryStore()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (productCategory) setForm(productCategory)
  }, [productCategory])

  /** Handlers */
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form , [e.target.name]: e.target.value })
  }

  const handleOnSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name) {
      setError('Product category name is required.')
    }

    setIsSubmitting(true)

    const newProductCategory = {
      name: form.name,
      description: form.description,
    }

    try {
      if (form.id) {
        // edit mode
        await axios.put(`/api/product-categories/${form.id}`, form)
        editProductCategory(form)
      } else {
        // new record mode
        const res = await axios.post('/api/product-categories/add', newProductCategory, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
    
        if (!res.data) {
          if (res.data) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const messages = res.data.map((d: any) => d.message).join(', ')
            throw new Error(messages);
          }
          throw new Error(res.data.error || 'Failed to add product category')
        }

        addProductCategory(newProductCategory)
      }

      clearForm()
      onSubmitSuccess?.() // close modal if needed
    } catch (error) {
      console.error('Error adding product category:', error);
      setError(`Error adding product category: ${error}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearForm = () => {
    setForm({
      name: '',
      description: '',
    })
  }

  return (
    <form onSubmit={handleOnSubmit} className="max-w-lg min-w-lg mx-auto p-4 bg-white shadow-md rounded-xl space-y-4">
      { error && error.length && <>
        <div className='error-messages'>{error}</div>
      </>}
      <h2 className="text-xl font-semibold">{ form.id ? 'Edit' : 'Add' } Product Category</h2>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={handleOnChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.description}
          onChange={handleOnChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          name="status"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          value={form.status}
          onChange={handleOnChange}
        >
          <option value="1">Active</option>
          <option value="0">In-active</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : `${form.id ? 'Edit' : 'Add'} Product Category`}
      </button>
    </form>
  )
}