'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useProductStore } from '@/stores/productStore'
import ProductImagePicker from './ProductImagePicker'
import { Product } from '@/types/product'
import axios from 'axios'
import { useProductCategoryStore } from '@/stores/productCategoryStore'
import { ProductCategory } from '@/types/product-category'

interface ProductFormProps {
  product?: Product | null;
  onSubmitSuccess?: () => void;
}

export default function ProductForm({ product, onSubmitSuccess }: ProductFormProps) {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState<Product>({
    name: '',
    price: 0,
    sku: '',
    category: '',
    imageUrl: '',
  })
  const { addProduct, editProduct } = useProductStore()
  const { productCategories } = useProductCategoryStore()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<ProductCategory[]>([])

  useEffect(() => {
    if (product) setForm(product)

    if (productCategories) {
      setCategories(productCategories)
    }
  }, [product, productCategories])

  useLayoutEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [])

  /** Handlers */
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form , [e.target.name]: e.target.value })
  }

  const handleOnSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.price || form.sku) {
      setError('Name, Product SKU, and price are required.')
    }

    setIsSubmitting(true)

    const newProduct = {
      name: form.name,
      imageUrl: form.imageUrl,
      sku: form.sku,
      price: form.price,
      description: form.description,
      category: form.category,
    }

    try {
      if (form.id) {
        // edit mode
        await axios.put(`/api/products/${form.id}`, form)
        editProduct(form)
      } else {
        // new record mode
        const res = await axios.post('/api/products/add', newProduct, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
    
        if (!res.data) {
          if (res.data) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const messages = res.data.map((d: any) => d.message).join(', ');
            throw new Error(messages);
          }
          throw new Error(res.data.error || 'Failed to add product');
        }

        addProduct(newProduct)
      }

      clearForm()
      onSubmitSuccess?.() // close modal if needed
    } catch (error) {
      console.error('Error adding product:', error);
      setError(`Error adding product: ${error}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearForm = () => {
    setForm({
      id: 0,
      name: '',
      price: 0,
      sku: '',
      category: '',
      imageUrl: '',
    })
  }

  const handleOnSelectImage = (url: string) => {
    setForm({ ...form, imageUrl: url })
  }

  return (
    <form onSubmit={handleOnSubmit} className="max-w-lg min-w-lg mx-auto p-4 bg-white shadow-md rounded-xl space-y-4">
      { error && error.length && <>
        <div className='error-messages'>{error}</div>
      </>}
      <h2 className="text-xl font-semibold">{ form.id ? 'Edit' : 'Add' } Product</h2>

      <div>
        <label className="block text-sm font-medium">Select Product Image</label>
        <ProductImagePicker onSelectedImage={handleOnSelectImage} selectedImage={form.imageUrl}/>
      </div>     

      <div className="grid grid-cols-2 gap-2 mt-4">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            ref={nameInputRef}
            type="text"
            name="name"
            className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={handleOnChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Product SKU(e.g Model #GJ200)</label>
          <input
            type="text"
            name="sku"
            className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.sku}
            onChange={handleOnChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            step="0.01"
            className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.price}
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
      </div>

      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          name="category"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          value={form.category}
          onChange={handleOnChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : `${form.id ? 'Edit' : 'Add'} Product`}
      </button>
    </form>
  )
}