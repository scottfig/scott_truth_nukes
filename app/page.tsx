import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { FlowerCard } from '@/components/FlowerCard'
import { Footer } from '@/components/Footer'
import { products } from '@/lib/products'

const featuredIds = ['classic-rose', 'garden-dreams', 'sunset-hues']
const featured = products.filter((p) => featuredIds.includes(p.id))

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-800 text-center mb-12">
          Featured Bouquets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {featured.map((product) => (
            <FlowerCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block text-rose-400 font-medium hover:text-rose-500 transition-colors"
          >
            View all bouquets →
          </Link>
        </div>
      </section>

      <section className="bg-sand-200/50 border-y border-sand-300 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-800 text-center mb-12 md:mb-16">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-sage-200 flex items-center justify-center text-sage-400 text-2xl mb-4">
                🌸
              </div>
              <h3 className="font-serif text-xl font-semibold text-stone-800 mb-2">
                Fresh daily
              </h3>
              <p className="text-stone-600 text-sm md:text-base">
                We source and arrange our bouquets the same day for maximum freshness and fragrance.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-200 flex items-center justify-center text-rose-400 text-2xl mb-4">
                🚗
              </div>
              <h3 className="font-serif text-xl font-semibold text-stone-800 mb-2">
                Local delivery
              </h3>
              <p className="text-stone-600 text-sm md:text-base">
                Fast, careful delivery in your area so your flowers arrive in perfect condition.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-sage-200 flex items-center justify-center text-sage-400 text-2xl mb-4">
                🌿
              </div>
              <h3 className="font-serif text-xl font-semibold text-stone-800 mb-2">
                Sustainable sourcing
              </h3>
              <p className="text-stone-600 text-sm md:text-base">
                We work with growers who prioritize eco-friendly practices and seasonal blooms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
