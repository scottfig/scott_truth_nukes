import { Product } from '@/types/product'

// Sample products - replace these with your actual PDFs
export const products: Product[] = [
  {
    id: '1',
    name: 'How to make it big',
    description: 'A quick guide on how to make it big',
    price: 500, // $5.00
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_1 || 'price_placeholder_1',
    pdfUrl: '/pdfs/truth_nuke.pdf',
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductByPriceId(priceId: string): Product | undefined {
  return products.find(product => product.priceId === priceId)
}
