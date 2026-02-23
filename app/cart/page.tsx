'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/cartStore'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Footer } from '@/components/Footer'

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const total = getTotal()

  if (items.length === 0) {
    return (
      <>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
          <p className="font-serif text-2xl text-stone-800 mb-4">
            Your cart is empty
          </p>
          <p className="text-stone-600 mb-8">
            Add a bouquet to get started.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-stone-800 text-white px-8 py-3 rounded-2xl font-medium hover:bg-stone-700 transition-colors"
          >
            Shop Flowers
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl font-semibold text-stone-800">
            Shopping Cart
          </h1>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-rose-400 hover:text-rose-500"
          >
            Clear cart
          </button>
        </div>

        <ul className="space-y-6 mb-8">
          {items.map((item) => (
            <motion.li
              key={item.id}
              layout
              className="flex gap-4 md:gap-6 p-4 rounded-2xl bg-white border border-sand-200 shadow-soft"
            >
              <div className="relative w-24 h-28 md:w-28 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-sand-200">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-stone-800">{item.name}</h2>
                <p className="text-sm text-stone-500 mt-0.5">
                  {formatPrice(item.price)} each
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 rounded-lg hover:bg-sand-100 transition-colors"
                    aria-label="Decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 rounded-lg hover:bg-sand-100 transition-colors"
                    aria-label="Increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-stone-800">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="mt-2 p-2 text-rose-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  aria-label="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="border-t border-sand-200 pt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-stone-800">
              Subtotal
            </span>
            <span className="text-xl font-semibold text-stone-800">
              {formatPrice(total)}
            </span>
          </div>
          <CheckoutButton />
        </div>
      </div>
      <Footer />
    </>
  )
}

function CheckoutButton() {
  const { items, getTotal } = useCartStore()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            priceId: i.stripePriceId,
            quantity: i.quantity,
            productId: i.id,
          })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      if (data.url) window.location.href = data.url
    } catch (e) {
      console.error(e)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-stone-800 text-white py-4 rounded-2xl font-medium shadow-soft hover:bg-stone-700 disabled:opacity-70 transition-all"
    >
      {loading ? 'Redirecting…' : 'Proceed to Checkout'}
    </button>
  )
}
