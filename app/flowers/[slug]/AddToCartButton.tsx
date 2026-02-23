'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/cartStore'
import { motion } from 'framer-motion'
import { Product } from '@/types/product'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = () => {
    addItem(product, quantity)
    setQuantity(1)
  }

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <div className="flex items-center border border-sand-300 rounded-2xl overflow-hidden bg-white">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-4 py-3 text-stone-600 hover:bg-sand-100 transition-colors"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-12 text-center font-medium">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="px-4 py-3 text-stone-600 hover:bg-sand-100 transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <motion.button
        type="button"
        onClick={handleAdd}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="bg-stone-800 text-white px-8 py-3 rounded-2xl font-medium shadow-soft hover:shadow-soft-lg transition-shadow"
      >
        Add to Cart
      </motion.button>
    </div>
  )
}
