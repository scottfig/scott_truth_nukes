export interface Product {
  id: string
  name: string
  description: string
  price: number // in cents
  priceId: string // Stripe Price ID
  image?: string
  pdfUrl: string // Path to PDF file
}
