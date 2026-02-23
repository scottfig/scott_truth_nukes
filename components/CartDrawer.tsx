'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore, type CartItem } from '@/lib/cartStore'
import { X, Minus, Plus } from 'lucide-react'

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const total = getTotal()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-cream-50 shadow-soft-lg flex flex-col"
          >
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-sand-200">
              <h2 className="font-serif text-xl font-semibold text-stone-800">
                Your Cart
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-sand-200 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {items.length === 0 ? (
                <p className="text-stone-500 text-center py-12">
                  Your cart is empty.
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item: CartItem) => (
                    <li
                      key={item.id}
                      className="flex gap-4 p-3 rounded-xl bg-white border border-sand-200"
                    >
                      <div className="relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-sand-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-stone-800 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-stone-500">
                          {formatPrice(item.price)} each
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 rounded hover:bg-sand-200"
                            aria-label="Decrease"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 rounded hover:bg-sand-200"
                            aria-label="Increase"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="ml-2 text-sm text-rose-400 hover:text-rose-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-stone-800">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-sand-200 p-4 md:p-6 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="block w-full bg-stone-800 text-white text-center py-3.5 rounded-2xl font-medium hover:bg-stone-700 transition-colors shadow-soft"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
