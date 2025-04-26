interface ProductModalProps {
  product: {
    title: string
    price: number
    imageUrl: string
    description?: string
  }
  onClose: () => void
  onAddToCart: () => void
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover rounded-lg mb-4" />
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="text-blue-600 text-xl font-bold">${product.price.toFixed(2)}</div>
        <button
          onClick={onAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
