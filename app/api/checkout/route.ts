import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { products, getProductByPriceId } from '@/lib/products'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Validate items and get Stripe price IDs
    const lineItems = items.map((item: { priceId: string; quantity: number }) => {
      const product = getProductByPriceId(item.priceId)
      if (!product) {
        throw new Error(`Invalid product price ID: ${item.priceId}`)
      }
      return {
        price: item.priceId,
        quantity: item.quantity,
      }
    })

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/cart`,
      metadata: {
        items: JSON.stringify(items.map((item: { id: string; quantity: number }) => ({
          productId: item.id,
          quantity: item.quantity,
        }))),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
