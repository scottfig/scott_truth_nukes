'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/types/product'

interface FlowerCardProps {
  product: Product
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

export function FlowerCard({ product }: FlowerCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={`/flowers/${product.id}`} className="block">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-sand-200 shadow-soft">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="mt-4">
          <h3 className="font-serif text-xl font-semibold text-stone-800">
            {product.name}
          </h3>
          <p className="mt-1 text-lg text-rose-400 font-medium">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}
