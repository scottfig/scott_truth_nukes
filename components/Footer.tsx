import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-sand-200/50 border-t border-sand-300 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link
            href="/"
            className="font-serif text-xl font-semibold text-stone-800"
          >
            Bloom
          </Link>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-stone-600">
            <Link href="/shop" className="hover:text-stone-900 transition-colors">
              Shop
            </Link>
            <a href="mailto:hello@bloom.example.com" className="hover:text-stone-900 transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-stone-900 transition-colors" aria-label="Instagram">
              Instagram
            </a>
            <a href="#" className="hover:text-stone-900 transition-colors" aria-label="Pinterest">
              Pinterest
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-stone-500">
          © {new Date().getFullYear()} Bloom. Fresh flowers, delivered with care.
        </p>
      </div>
    </footer>
  )
}
