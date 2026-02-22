import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/CartProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Scott's Truth Nukes - Insightful PDFs",
  description: 'Discover powerful insights into the world with Scott\'s Truth Nukes PDF collection',
  verification: {
    google: 'G7Ptldk4QQ8Ylc_o8A0drzjnB4ePGTY-LxRbXQWlzSA',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
