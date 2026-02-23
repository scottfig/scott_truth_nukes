import Stripe from 'stripe'

// Use the SDK’s default API version (pinned to 2026-01-28.clover in stripe-node v20+).
// Match your Stripe webhook endpoint’s API version to this in the Dashboard or when creating the endpoint.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
