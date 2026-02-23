# Bloom — Flower Ecommerce Setup

## 1. Install dependencies

```bash
npm install
```

## 2. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run the contents of `supabase/schema.sql` to create `orders` and `order_items`.
3. In Project Settings → API, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key (secret) → `SUPABASE_SERVICE_ROLE_KEY`

## 3. Stripe

We use **stripe-node v20+**, which pins API version **2026-01-28.clover**. The SDK uses this by default (no override in code). When you create your webhook endpoint in the Dashboard (or with the CLI), use the same API version so webhook event payloads match the SDK types.

1. Create a Stripe account and use **Test mode** for development.
2. In [Stripe Dashboard → API Keys](https://dashboard.stripe.com/test/apikeys), copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (optional; used if you add client-side Stripe later)
   - Secret key → `STRIPE_SECRET_KEY`
3. Create **Products** and one-time **Prices** for each bouquet in `lib/products.ts`. Copy each Price ID (e.g. `price_xxx`) into `.env.local` as:
   - `NEXT_PUBLIC_STRIPE_PRICE_CLASSIC_ROSE`
   - `NEXT_PUBLIC_STRIPE_PRICE_GARDEN_DREAMS`
   - etc., or leave placeholders for MVP.
4. **Webhook** (development):
   - Install [Stripe CLI](https://stripe.com/docs/stripe-cli) and run:
     ```bash
     stripe listen --forward-to localhost:3000/api/webhooks
     ```
   - Use the printed signing secret as `STRIPE_WEBHOOK_SECRET`.

## 4. Environment variables

Create `.env.local` in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: one per product in lib/products.ts
NEXT_PUBLIC_STRIPE_PRICE_CLASSIC_ROSE=price_...
NEXT_PUBLIC_STRIPE_PRICE_GARDEN_DREAMS=price_...
# ... etc.
```

## 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 6. Test checkout

- Use Stripe test card: `4242 4242 4242 4242`
- Any future expiry, any CVC, any US ZIP
- After payment you’re redirected to `/success` and the order is stored in Supabase.

## 7. Production (e.g. Vercel)

1. Create a Supabase project (or use the same one) and run `supabase/schema.sql` if needed.
2. In Stripe, switch to **Live** and set a production webhook URL:  
   `https://your-domain.com/api/webhooks`
3. Set all env vars in your host (no `NEXT_PUBLIC_*` in server-only secrets).
4. Deploy.

## Future extension

Placeholder API routes for agent commerce / UCP (not implemented yet):

- `GET /api/products`
- `POST /api/create-order`
- `GET /api/prices`

Email (Resend/SendGrid) for order confirmation can be added in the `checkout.session.completed` webhook handler in `app/api/webhooks/route.ts`.
