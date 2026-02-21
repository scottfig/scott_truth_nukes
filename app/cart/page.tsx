'use client'

import { Header } from '@/components/Header'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`
  }

  const total = getTotal()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some Truth Nukes to get started!</p>
            <Link
              href="/"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear Cart
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{formatPrice(item.price)} each</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                  <div className="w-24 text-right font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-primary-600">
                {formatPrice(total)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-primary-600 text-white text-center py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
