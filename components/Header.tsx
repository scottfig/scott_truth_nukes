'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart } from 'lucide-react'

export function Header() {
  const itemCount = useCartStore(state => state.getItemCount())

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">💣</span>
            <span className="text-xl font-bold text-gray-900">Scott's Truth Nukes</span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
              Products
            </Link>
            <Link href="/purchases" className="text-gray-700 hover:text-primary-600 transition">
              My Purchases
            </Link>
            <Link 
              href="/cart" 
              className="relative flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
