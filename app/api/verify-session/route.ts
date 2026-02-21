import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    )
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Parse metadata to get purchased items
    const items = session.metadata?.items 
      ? JSON.parse(session.metadata.items)
      : []

    return NextResponse.json({ items, session })
  } catch (error: any) {
    console.error('Error verifying session:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to verify session' },
      { status: 500 }
    )
  }
}
