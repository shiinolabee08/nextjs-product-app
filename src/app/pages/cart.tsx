import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])

  /* Hooks */
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  /* Handlers */
  const handleRemove = (indexToRemove: number) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          Your cart is empty.
          <div className="mt-4">
            <Link href="/">
              <span className="text-blue-600 hover:underline">← Continue Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6 flex justify-between items-center text-lg font-medium">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="mt-6 flex justify-between">
            <Link href="/">
              <span className="text-blue-600 hover:underline text-sm">← Continue Shopping</span>
            </Link>
            <button
              onClick={() => alert('Proceeding to checkout...')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}
