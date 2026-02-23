'use client'

import { useState } from 'react'
import { Navbar } from './Navbar'
import { CartDrawer } from './CartDrawer'

export function NavbarWithCart() {
  const [cartOpen, setCartOpen] = useState(false)
  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
