# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Stripe

1. **Create a Stripe Account**
   - Go to https://stripe.com and sign up
   - Use test mode for development

2. **Get Your API Keys**
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy your "Publishable key" and "Secret key"

3. **Create Products in Stripe**
   - Go to Products in Stripe Dashboard
   - Create a product for each PDF you want to sell
   - For each product, create a one-time payment price
   - Copy the Price ID (starts with `price_`)

4. **Set Up Webhook (for local development)**
   - Install Stripe CLI: https://stripe.com/docs/stripe-cli
   - Run: `stripe listen --forward-to localhost:3000/api/webhook`
   - Copy the webhook signing secret (starts with `whsec_`)

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Stripe Price IDs (one for each product)
NEXT_PUBLIC_STRIPE_PRICE_ID_1=price_your_price_id_1
NEXT_PUBLIC_STRIPE_PRICE_ID_2=price_your_price_id_2
NEXT_PUBLIC_STRIPE_PRICE_ID_3=price_your_price_id_3
```

## Step 4: Add Your PDFs

1. Place your PDF files in the `public/pdfs/` directory
2. Update `lib/products.ts` with your actual products:
   - Change product names and descriptions
   - Update prices (in cents, e.g., 999 = $9.99)
   - Update `pdfUrl` to match your PDF filenames
   - Make sure `priceId` matches the Stripe Price IDs

## Step 5: Run the Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your store!

## Testing Payments

Use Stripe's test card numbers:
- Success: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC
- Any ZIP code

## Production Deployment

1. Switch Stripe to live mode
2. Get live API keys
3. Set up production webhook endpoint
4. Update environment variables in your hosting platform
5. Deploy!
