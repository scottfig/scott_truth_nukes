import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

/** Call this inside API routes/handlers so env is available. Not at module load (e.g. build). */
export function getSupabase(): SupabaseClient {
  if (_client) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase URL and service role key are required')
  _client = createClient(url, key)
  return _client
}

// Database types for orders (matches schema)
export interface DbOrder {
  id?: string
  stripe_session_id: string
  email: string
  total: number
  created_at?: string
}

export interface DbOrderItem {
  id?: string
  order_id: string
  product_id: string
  quantity: number
}
