'use client'

import { Product } from '@/types/product'
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem)

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="text-4xl mb-4">💣</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}
