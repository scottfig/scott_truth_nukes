# Scott's Truth Nukes - Ecommerce Website

An ecommerce website for selling PDFs called "Truth Nukes" with Stripe payment integration.

## Features

- 🛒 Shopping cart functionality
- 💳 Stripe payment integration
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 📄 PDF download after purchase
- ✅ Purchase verification

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Stripe

1. Create a Stripe account at https://stripe.com
2. Get your API keys from https://dashboard.stripe.com/apikeys
3. Create products and prices in the Stripe Dashboard for each PDF
4. Copy `.env.example` to `.env.local` and fill in your Stripe keys:

```bash
cp .env.example .env.local
```

Update `.env.local` with:
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Your webhook secret (see webhook setup below)
- `NEXT_PUBLIC_BASE_URL` - Your app URL (http://localhost:3000 for local dev)
- `NEXT_PUBLIC_STRIPE_PRICE_ID_1`, `NEXT_PUBLIC_STRIPE_PRICE_ID_2`, etc. - Price IDs from Stripe

### 3. Add Your PDFs

1. Create a `public/pdfs/` directory
2. Add your PDF files to this directory
3. Update the product list in `lib/products.ts` with your actual PDFs:
   - Update product names, descriptions, and prices
   - Update `pdfUrl` paths to match your PDF filenames
   - Make sure the `priceId` matches the Stripe Price IDs you created

### 4. Set Up Stripe Webhook (for production)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. For local development, run:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
   This will give you a webhook secret to add to `.env.local`

3. For production, set up a webhook endpoint in your Stripe Dashboard:
   - Go to Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhook`
   - Select event: `checkout.session.completed`

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── checkout/        # Stripe checkout session creation
│   │   ├── webhook/          # Stripe webhook handler
│   │   └── verify-session/   # Session verification
│   ├── cart/                 # Shopping cart page
│   ├── checkout/             # Checkout page
│   ├── purchases/            # User purchases page
│   ├── success/              # Payment success page
│   └── page.tsx              # Home page with products
├── components/
│   ├── CartProvider.tsx      # Cart context provider
│   ├── CheckoutForm.tsx       # Checkout form component
│   ├── Header.tsx             # Site header
│   └── ProductCard.tsx       # Product card component
├── lib/
│   └── products.ts           # Product data
├── store/
│   └── cartStore.ts          # Zustand cart store
└── types/
    └── product.ts            # Product type definitions
```

## Customization

### Adding New Products

1. Create a new product and price in Stripe Dashboard
2. Add the product to `lib/products.ts`:
   ```typescript
   {
     id: '4',
     name: 'Your Product Name',
     description: 'Product description',
     price: 1999, // in cents ($19.99)
     priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_4 || 'price_placeholder_4',
     pdfUrl: '/pdfs/your-file.pdf',
   }
   ```
3. Add the price ID to your `.env.local` file

### Styling

The site uses Tailwind CSS. Customize colors in `tailwind.config.js` and update components as needed.

## Production Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Vercel, Netlify, or your preferred hosting platform

3. Update environment variables in your hosting platform

4. Set up the Stripe webhook endpoint for production

## License

MIT
