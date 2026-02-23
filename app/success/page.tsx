import Link from 'next/link'
import { Suspense } from 'react'
import { Footer } from '@/components/Footer'
import { ClearCart } from './ClearCart'

export default function SuccessPage() {
  return (
    <>
      <Suspense fallback={null}>
        <ClearCart />
      </Suspense>
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-stone-800 mb-4">
          Thank you
        </h1>
        <p className="text-stone-600 mb-8">
          Your order has been received. We’ll send a confirmation to your email
          and prepare your bouquet with care.
        </p>
        <Link
          href="/"
          className="inline-block bg-stone-800 text-white px-8 py-3 rounded-2xl font-medium hover:bg-stone-700 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
      <Footer />
    </>
  )
}
