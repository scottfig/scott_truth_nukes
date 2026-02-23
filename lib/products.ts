import { Product } from '@/types/product'

const IMAGE_BASE = '/images/flowers'

export const products: Product[] = [
  {
    id: 'classic-rose',
    name: 'Classic Rose Bouquet',
    description: 'A timeless arrangement of deep red roses, hand-tied and wrapped. Perfect for anniversaries, apologies, or simply saying I love you.',
    price: 8500, // $85.00
    image: `${IMAGE_BASE}/classic-rose.jpg`,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CLASSIC_ROSE || 'price_placeholder_1',
  },
  {
    id: 'garden-dreams',
    name: 'Garden Dreams',
    description: 'A lush mix of peonies, ranunculus, and eucalyptus. Soft pinks and creams for a romantic, garden-fresh look.',
    price: 12000, // $120.00
    image: `${IMAGE_BASE}/garden-dreams.jpg`,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_GARDEN_DREAMS || 'price_placeholder_2',
  },
  {
    id: 'sunset-hues',
    name: 'Sunset Hues',
    description: 'Warm coral, peach, and golden blooms that bring the glow of dusk indoors. Ideal for housewarmings and celebrations.',
    price: 9500, // $95.00
    image: `${IMAGE_BASE}/sunset-hues.jpg`,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SUNSET_HUES || 'price_placeholder_3',
  },
  {
    id: 'white-serenity',
    name: 'White Serenity',
    description: 'Pure white roses and hydrangeas with delicate greenery. Elegant and calming—suited for sympathy or minimalist aesthetics.',
    price: 7800, // $78.00
    image: `${IMAGE_BASE}/white-serenity.jpg`,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WHITE_SERENITY || 'price_placeholder_4',
  },
  {
    id: 'wild-meadow',
    name: 'Wild Meadow',
    description: 'An organic blend of seasonal wildflowers and dried grasses. Rustic, free-spirited, and full of texture.',
    price: 6500, // $65.00
    image: `${IMAGE_BASE}/wild-meadow.jpg`,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WILD_MEADOW || 'price_placeholder_5',
  },
  {
    id: 'lavender-mist',
    name: 'Lavender Mist',
    description: 'Soft purple and lilac tones with eucalyptus and lavender stems. Calming and fragrant.',
    price: 7200, // $72.00
    image: `${IMAGE_BASE}/lavender-mist.jpg`,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_LAVENDER_MIST || 'price_placeholder_6',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductByStripePriceId(stripePriceId: string): Product | undefined {
  return products.find((p) => p.stripePriceId === stripePriceId)
}
