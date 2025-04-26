import Image from 'next/image'

interface ProductCardProps {
  title: string
  price: number
  imageUrl: string
  description?: string
  onView: () => void
}

export default function ProductCard({ title, price, imageUrl, description, onView }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <Image src={imageUrl} alt={title} width={100} height={100} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm mb-2 truncate">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">${price.toFixed(2)}</span>
          <button
            onClick={onView}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            View
          </button>
        </div>
      </div>
    </div>
  )
}
