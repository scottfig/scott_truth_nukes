'use client'

import { createContext, useContext, ReactNode } from 'react'

const CartContext = createContext({})

export function CartProvider({ children }: { children: ReactNode }) {
  return <CartContext.Provider value={{}}>{children}</CartContext.Provider>
}

export function useCartContext() {
  return useContext(CartContext)
}
