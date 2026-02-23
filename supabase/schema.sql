-- Run this in your Supabase SQL editor to create the orders tables.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  email text not null,
  total bigint not null,
  shipping_address jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  quantity integer not null
);

create index if not exists order_items_order_id on public.order_items(order_id);

-- Optional: enable RLS and allow service role full access (default with service_role key)
-- alter table public.orders enable row level security;
-- alter table public.order_items enable row level security;
