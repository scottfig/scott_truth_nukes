import { Header } from '@/components/Header'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/lib/products'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Scott&apos;s Truth Nukes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover powerful insights into the world with our collection of 
            transformative PDFs. Each Truth Nuke contains revelations that will 
            change your perspective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}
