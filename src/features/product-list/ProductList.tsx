'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import ProductCartDrawer from '../product-cart/ProductCartDrawer'
import { Product } from '@/types/product'
import Modal from '@/components/shared/Modal'

const products: Product[] = [
  { title: 'Wireless Headphones', price: 129.99, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/picsum/400/300', description: 'Noise-cancelling over-ear headphones with long battery life.' },
  { title: 'Smart Watch', price: 89.99, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/picsum/400/300', description: 'Track your fitness and get notifications on your wrist.' },
  { title: 'Bluetooth Speaker', price: 59.99, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/picsum/400/300', description: 'Compact, loud, and waterproof – take it anywhere.' },
  { title: 'Running Shoes', price: 99.99, category: 'Fashion', imageUrl: 'https://picsum.photos/seed/picsum/400/300', description: 'Comfortable and stylish running shoes for daily workouts.' },
  { title: 'Leather Wallet', price: 49.99, category: 'Fashion', imageUrl: 'https://picsum.photos/seed/picsum/400/300', description: 'Premium leather wallet with multiple compartments.' },
  { title: 'Coffee Maker', price: 79.99, category: 'Home', imageUrl: 'https://picsum.photos/seed/picsum/400/300', description: 'Brew fresh coffee at home with ease.' },
]

const categories = ['All', 'Electronics', 'Fashion', 'Home']

const PRODUCTS_PER_PAGE = 4

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  /* Product Cart */
  const [cart, setCart] = useState<Product[]>([])
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)

  const toggleCartDrawer = () => setCartDrawerOpen(!cartDrawerOpen)

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  /* Hooks */
  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  /* Handlers */
  const handleClearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
    setCartDrawerOpen(false)
  }
  
  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product])
    alert(`${product.title} added to cart!`)
    setSelectedProduct(null)
  }
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1) // Reset page when category changes
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset page when search changes
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 text-gray-600 rounded-md px-4 py-2 w-full md:w-1/3"
        />

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={toggleCartDrawer}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          View Cart ({cart.length})
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedProducts.map((product, index) => (
          <ProductCard
            key={index}
            {...product}
            onView={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={selectedProduct !== null} onClose={() => setSelectedProduct(null)}>
        {
          selectedProduct && (
            <ProductCard 
              {...selectedProduct}
              onAddToCart={() => handleAddToCart(selectedProduct)}
            />
          )
        }
      </Modal>
      
      <ProductCartDrawer
        isOpen={cartDrawerOpen}
        cart={cart}
        onClose={() => setCartDrawerOpen(false)}
        onClearCart={handleClearCart}
      />
    </div>
  )
}
