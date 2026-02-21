import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProductByPriceId } from '@/lib/products'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    // With Clover (thin events), fetch the full session for complete data
    const sessionId = event.data.object.id
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items']
    })
    
    // Here you would typically:
    // 1. Store the purchase in a database
    // 2. Grant access to the PDFs
    // 3. Send a confirmation email
    
    console.log('Payment successful for session:', session.id)
    console.log('Customer email:', session.customer_details?.email)
    console.log('Metadata:', session.metadata)
  }

  return NextResponse.json({ received: true })
}
