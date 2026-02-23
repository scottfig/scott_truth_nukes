import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { getSupabase } from '@/lib/supabase'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    )
  }

  if (event.type === 'checkout.session.completed') {
    const sessionId = event.data.object.id
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    })

    const email =
      (session.customer_details?.email as string) || (session.customer_email as string) || ''
    const total = session.amount_total ?? 0
    const shipping = session.customer_details?.address
      ? {
          line1: session.customer_details.address.line1,
          line2: session.customer_details.address.line2,
          city: session.customer_details.address.city,
          state: session.customer_details.address.state,
          postal_code: session.customer_details.address.postal_code,
          country: session.customer_details.address.country,
        }
      : null

    const supabase = getSupabase()
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        stripe_session_id: sessionId,
        email,
        total,
        shipping_address: shipping,
      })
      .select('id')
      .single()

    if (orderError) {
      console.error('Supabase order insert error:', orderError)
      return NextResponse.json(
        { error: 'Failed to store order' },
        { status: 500 }
      )
    }

    const items = session.metadata?.items
      ? (JSON.parse(session.metadata.items) as { productId: string; quantity: number }[])
      : []

    if (order?.id && items.length > 0) {
      await supabase.from('order_items').insert(
        items.map((item) => ({
          order_id: order.id,
          product_id: item.productId,
          quantity: item.quantity,
        }))
      )
    }
  }

  return NextResponse.json({ received: true })
}
