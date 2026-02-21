'use client'

import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Header } from '@/components/Header'
import { useCartStore } from '@/store/cartStore'
import { CheckoutForm } from '@/components/CheckoutForm'
import { useRouter } from 'next/navigation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
      return
    }

    const createCheckoutSession = async () => {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: items.map(item => ({
              id: item.id,
              priceId: item.priceId,
              quantity: item.quantity,
            })),
          }),
        })

        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session')
        }

        setClientSecret(data.sessionId)
      } catch (error) {
        console.error('Error creating checkout session:', error)
        alert('Failed to initialize checkout. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    createCheckoutSession()
  }, [items, router])

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`
  }

  const total = getTotal()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading checkout...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-red-600">Failed to initialize checkout. Please try again.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-700">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary-600">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm sessionId={clientSecret} />
            </Elements>
          </div>
        </div>
      </main>
    </div>
  )
}
