import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    const lineItems = items.map(
      (item: { priceId: string; quantity: number }) => ({
        price: item.priceId,
        quantity: item.quantity,
      })
    )

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      metadata: {
        items: JSON.stringify(
          items.map((item: { productId: string; quantity: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
          }))
        ),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('Create checkout session error:', err)
    const message = err instanceof Error ? err.message : 'Checkout failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
