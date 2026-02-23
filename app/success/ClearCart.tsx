'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCartStore } from '@/lib/cartStore'

export function ClearCart() {
  const searchParams = useSearchParams()
  const clearCart = useCartStore((s) => s.clearCart)

  useEffect(() => {
    if (searchParams.get('session_id')) {
      clearCart()
    }
  }, [searchParams, clearCart])

  return null
}
