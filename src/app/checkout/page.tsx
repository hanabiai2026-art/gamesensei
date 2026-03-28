'use client'

import { useCart } from '@/lib/cart'
import { useCurrency } from '@/lib/currency'
import { useLanguage } from '@/lib/language'
import CheckoutForm from '@/components/CheckoutForm'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, totalPriceUSD } = useCart()
  const { formatPrice } = useCurrency()
  const { t, language } = useLanguage()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-white mb-4">{t.checkout.title}</h1>
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">{t.checkout.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Order Summary - Left */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="bg-surface rounded-xl border border-border p-6 sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {t.checkout.orderSummary}
              </h2>
              <Link
                href="/cart"
                className="text-accent text-sm hover:text-accent/80 transition-colors"
              >
                {t.cart.editCart}
              </Link>
            </div>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  key={item.serviceId}
                  className="flex justify-between items-start gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {language === 'ja' ? item.serviceNameJa : item.serviceName}
                    </p>
                    <p className="text-text-muted text-xs">
                      {language === 'ja' ? item.gameNameJa : item.gameName} &times;{' '}
                      {item.quantity}
                    </p>
                  </div>
                  <span className="text-white text-sm font-medium whitespace-nowrap">
                    {formatPrice(item.priceUSD * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">
                  {t.checkout.total}
                </span>
                <span className="text-lg font-bold text-accent">
                  {formatPrice(totalPriceUSD)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form - Right */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <CheckoutForm />
        </div>
      </div>
    </div>
  )
}
