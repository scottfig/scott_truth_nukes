'use client'

import { Header } from '@/components/Header'
import Link from 'next/link'

export default function PurchasesPage() {
  // In a real app, you would fetch this from a database
  // For now, we'll show a placeholder
  const purchases: any[] = []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Purchases</h1>
          
          {purchases.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No purchases yet</h2>
              <p className="text-gray-600 mb-6">Your purchased Truth Nukes will appear here.</p>
              <Link
                href="/"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{purchase.name}</h3>
                    <p className="text-sm text-gray-600">Purchased on {purchase.date}</p>
                  </div>
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
