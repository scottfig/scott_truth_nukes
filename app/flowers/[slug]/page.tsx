import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById } from '@/lib/products'
import { AddToCartButton } from './AddToCartButton'
import { Footer } from '@/components/Footer'

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

export default async function FlowerProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductById(slug)
  if (!product) notFound()

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-sand-200 shadow-soft">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-stone-800">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl text-rose-400 font-medium">
              {formatPrice(product.price)}
            </p>
            <p className="mt-6 text-stone-600 leading-relaxed">
              {product.description}
            </p>

            <AddToCartButton product={product} />

            <p className="mt-8 text-sm text-stone-500">
              US delivery only. We’ll collect your shipping address at checkout.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
