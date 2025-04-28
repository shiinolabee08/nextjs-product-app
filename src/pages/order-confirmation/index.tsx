'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Product } from '@/types/product'
import type { NextPage } from 'next'
import DefaultLayout from '@/components/shared/DefaultLayout'

const OrderConfirmationPage: NextPage & { pageTitle?: string } = () => {
  const [order, setOrder] = useState<Product[]>([])

  /* Hooks */
  useEffect(() => {
    // Optionally you can pass order data via state or just show a "thank you" message
    const storedOrder = localStorage.getItem('cart')
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder))
      localStorage.removeItem('cart') // Clear cart after order
    }
  }, [])

  const total = order.reduce((sum, item) => sum + item.price, 0)

  return (
    <DefaultLayout>
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">🎉 Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been placed successfully. A confirmation email will be sent to you shortly.
        </p>

        {order.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg shadow mb-10 text-left">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="divide-y divide-gray-200 mb-4">
              {order.map((item, index) => (
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
          </div>
        )}

        <Link href="/">
          <span className="text-blue-600 hover:underline text-sm">← Back to Home</span>
        </Link>
      </div>
    </DefaultLayout>
  )
}

OrderConfirmationPage.pageTitle = 'Order Confirmation'

export default OrderConfirmationPage 
