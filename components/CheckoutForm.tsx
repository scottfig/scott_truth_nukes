'use client'

import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'

interface CheckoutFormProps {
  sessionId: string
}

export function CheckoutForm({ sessionId }: CheckoutFormProps) {
  const router = useRouter()
  const clearCart = useCartStore(state => state.clearCart)

  const handleCheckout = async () => {
    try {
      // Redirect to Stripe Checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: useCartStore.getState().items.map(item => ({
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

      // Redirect to Stripe Checkout
      const stripe = await import('@stripe/stripe-js').then(m => m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!))
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        })
        
        if (error) {
          console.error('Stripe checkout error:', error)
          alert('Failed to redirect to checkout. Please try again.')
        }
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to process checkout. Please try again.')
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
      >
        Complete Purchase
      </button>
      <p className="mt-4 text-sm text-gray-600 text-center">
        You will be redirected to Stripe to complete your payment securely.
      </p>
    </div>
  )
}
