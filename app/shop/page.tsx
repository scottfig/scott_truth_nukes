import { FlowerCard } from '@/components/FlowerCard'
import { Footer } from '@/components/Footer'
import { products } from '@/lib/products'

export default function ShopPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-stone-800 mb-2">
          All Bouquets
        </h1>
        <p className="text-stone-600 mb-10 md:mb-14">
          Handcrafted arrangements for every occasion.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <FlowerCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
