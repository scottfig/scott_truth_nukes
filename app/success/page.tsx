'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import { getProductById } from '@/lib/products'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  const [purchasedItems, setPurchasedItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const clearCart = useCartStore(state => state.clearCart)

  useEffect(() => {
    if (sessionId) {
      // Verify the session and get purchased items
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.items) {
            setPurchasedItems(data.items)
            clearCart() // Clear cart after successful purchase
          }
          setLoading(false)
        })
        .catch(err => {
          console.error('Error verifying session:', err)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [sessionId, clearCart])

  const handleDownload = (pdfUrl: string, productName: string) => {
    // Create a temporary link to download the PDF
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${productName}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Verifying your purchase...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your Truth Nukes are ready to download.
          </p>

          {purchasedItems.length > 0 && (
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Downloads</h2>
              {purchasedItems.map((item: any) => {
                const product = getProductById(item.productId)
                if (!product) return null
                
                return (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    </div>
                    <button
                      onClick={() => handleDownload(product.pdfUrl, product.name)}
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Download PDF
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          <div className="mt-8 space-x-4">
            <Link
              href="/purchases"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              View All Purchases
            </Link>
            <Link
              href="/"
              className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </main>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
