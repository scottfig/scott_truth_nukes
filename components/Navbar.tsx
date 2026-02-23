'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/cartStore'
import { ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavbarProps {
  onCartClick?: () => void
}

export function Navbar({ onCartClick }: NavbarProps) {
  const itemCount = useCartStore((s) => s.getItemCount())

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-cream-50/95 backdrop-blur-sm border-b border-sand-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link
            href="/"
            className="font-serif text-2xl md:text-3xl font-semibold text-foreground tracking-tight hover:opacity-80 transition-opacity"
          >
            Bloom
          </Link>

          <nav className="flex items-center gap-6 md:gap-10">
            <Link
              href="/shop"
              className="text-sm md:text-base text-stone-600 hover:text-stone-900 transition-colors"
            >
              Shop
            </Link>
            <button
              type="button"
              onClick={onCartClick}
              className="relative p-2 text-stone-600 hover:text-stone-900 transition-colors rounded-full hover:bg-sand-200/60"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-rose-400 text-white text-xs font-medium min-w-[1.25rem] h-5 flex items-center justify-center rounded-full"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
