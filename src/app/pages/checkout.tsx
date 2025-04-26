import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any[]>([])

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    alert('✅ Order placed successfully!')
    localStorage.removeItem('cart')
    router.push('/order-confirmation')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Shipping & Payment */}
        <form onSubmit={handlePlaceOrder} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
            <div className="space-y-4">
              <input type="text" required placeholder="Full Name" className="w-full input" />
              <input type="text" required placeholder="Address" className="w-full input" />
              <input type="text" required placeholder="City" className="w-full input" />
              <input type="text" required placeholder="Postal Code" className="w-full input" />
              <input type="text" required placeholder="Country" className="w-full input" />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Payment Information</h2>
            <div className="space-y-4">
              <input type="text" required placeholder="Cardholder Name" className="w-full input" />
              <input type="text" required placeholder="Card Number" className="w-full input" />
              <div className="flex gap-4">
                <input type="text" required placeholder="MM/YY" className="w-1/2 input" />
                <input type="text" required placeholder="CVC" className="w-1/2 input" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Place Order
          </button>
        </form>

        {/* RIGHT: Order Summary */}
        <div className="bg-gray-50 rounded-lg shadow-sm p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200 mb-4">
                {cart.map((item, index) => (
                  <li key={index} className="py-2 flex justify-between">
                    <span>{item.title}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .input {
          @apply border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
        }
      `}</style>
    </div>
  )
}
