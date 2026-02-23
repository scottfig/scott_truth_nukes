'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const heroImage = '/images/hero/hero.jpg'

export function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Beautiful flower arrangement"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-stone-900/40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight"
        >
          Flowers that speak
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="mt-4 md:mt-6 text-lg md:text-xl text-white/90 max-w-xl mx-auto"
        >
          Handcrafted bouquets, fresh daily. For every moment that matters.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 md:mt-10"
        >
          <Link
            href="/shop"
            className="inline-block bg-white text-stone-800 font-medium px-8 py-4 rounded-2xl shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Shop Flowers
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
