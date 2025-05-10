import { Product } from '@/types/product'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  onView?: () => void
  onAddToCart?: () => void
}

export default function ProductCard({ product, onView, onAddToCart }: ProductCardProps) {
  const { imageUrl, name, description, price } = product
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <Image src={imageUrl || ''} alt={name} width={100} height={100} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h3 onClick={onView} className="text-lg font-semibold hover:underline hover:cursor-pointer text-gray-800">{name}</h3>
        <p className="text-gray-500 text-sm mb-2 truncate">{description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-blue-600 font-bold">${price.toFixed(2)}</span>
          { onView && (
            <button
              onClick={onView}
              className="text-sm bg-blue-500 text-white hover:cursor-pointer px-3 py-1 rounded hover:bg-blue-600"
            >
              View
            </button>
          )}
        </div>
        { onAddToCart && (
            <button
              onClick={onAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white py-2 rounded-xl transition duration-200"
            >
              Add to Cart
            </button>
          )}
      </div>
    </div>
  )
}
