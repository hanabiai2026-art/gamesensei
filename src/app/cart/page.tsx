'use client'

import { useCart } from '@/lib/cart'
import { useCurrency } from '@/lib/currency'
import { useLanguage } from '@/lib/language'
import CartItemRow from '@/components/CartItemRow'
import Link from 'next/link'

export default function CartPage() {
  const { items, totalPriceUSD } = useCart()
  const { formatPrice } = useCurrency()
  const { t } = useLanguage()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-white mb-4">{t.cart.title}</h1>
        <p className="text-text-secondary mb-6">{t.cart.empty}</p>
        <Link
          href="/"
          className="bg-accent hover:bg-accent/90 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          {t.cart.browseServices}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">{t.cart.title}</h1>

      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="divide-y divide-border">
          {items.map((item) => (
            <CartItemRow key={item.serviceId} item={item} />
          ))}
        </div>

        <div className="p-6 bg-surface-elevated border-t border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-text-secondary">{t.cart.subtotal}</span>
            <span className="text-white font-semibold">
              {formatPrice(totalPriceUSD)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold text-white">{t.cart.total}</span>
            <span className="text-lg font-bold text-accent">
              {formatPrice(totalPriceUSD)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 text-center border border-border text-text-secondary hover:text-white hover:border-accent/50 px-6 py-3 rounded-lg transition-colors"
            >
              {t.cart.continueShopping}
            </Link>
            <Link
              href="/checkout"
              className="flex-1 text-center bg-accent hover:bg-accent/90 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {t.cart.proceedToCheckout}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
