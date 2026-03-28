'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language'
import { useCurrency } from '@/lib/currency'
import { useCart } from '@/lib/cart'
import { games } from '@/lib/data'
import Link from 'next/link'

export default function GamePage({ params }: { params: { gameSlug: string } }) {
  const { t, language } = useLanguage()
  const { formatPrice } = useCurrency()
  const { addItem } = useCart()
  const [toastId, setToastId] = useState<string | null>(null)

  const game = games.find((g) => g.slug === params.gameSlug)

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-white mb-4">{t.errors.notFound}</h1>
        <Link
          href="/"
          className="text-accent hover:text-accent/80 transition-colors"
        >
          {t.common.backToHome}
        </Link>
      </div>
    )
  }

  const gameName = language === 'ja' ? game.nameJa : game.name
  const gameDesc = language === 'ja' ? game.descriptionJa : game.description
  const lowestPrice = Math.min(...game.services.map(s => s.priceUSD))
  const coachCount = Math.floor(game.services.length * 8 + 12)

  const handleAdd = (serviceId: string) => {
    const service = game.services.find(s => s.id === serviceId)
    if (!service) return
    addItem({
      gameId: game.id,
      serviceId: service.id,
      gameName: game.name,
      gameNameJa: game.nameJa,
      serviceName: service.name,
      serviceNameJa: service.nameJa,
      priceUSD: service.priceUSD,
      image: game.image,
    })
    setToastId(serviceId)
    setTimeout(() => setToastId(null), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Side-by-side Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left: Game image */}
        <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-surface border border-border">
          {game.image ? (
            <img
              src={game.image}
              alt={gameName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/20 via-surface to-accent-secondary/20 flex items-center justify-center">
              <span className="text-4xl font-bold text-text-primary">{gameName}</span>
            </div>
          )}
        </div>

        {/* Right: Game info & stats */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">{gameName}</h1>
          <p className="text-text-secondary text-base leading-relaxed mb-8">{gameDesc}</p>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent mb-1">{coachCount}+</div>
              <div className="text-text-muted text-xs">{t.service.coachesAvailable}</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent-secondary mb-1">{game.services.length}</div>
              <div className="text-text-muted text-xs">{t.service.servicesOffered}</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">{formatPrice(lowestPrice)}</div>
              <div className="text-text-muted text-xs">{t.service.startingAt}</div>
            </div>
          </div>

          <Link
            href="#services"
            className="inline-flex items-center justify-center bg-accent text-white font-bold py-3 px-6 rounded-lg hover:brightness-110 transition-all text-sm w-fit"
          >
            {t.service.availableServices}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Service Listing - Table/Row style */}
      <div id="services">
        <h2 className="text-2xl font-bold text-white mb-6">{t.service.availableServices}</h2>

        <div className="space-y-3">
          {game.services.map((service) => {
            const serviceName = language === 'ja' ? service.nameJa : service.name
            const serviceDesc = language === 'ja' ? service.descriptionJa : service.description
            const deliveryText = language === 'ja' ? service.deliveryJa : service.delivery

            return (
              <div
                key={service.id}
                className="relative bg-surface border border-border rounded-lg p-4 md:p-5 hover:border-accent/40 transition-colors flex flex-col md:flex-row md:items-center gap-4"
              >
                {/* Left: Name & description */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-text-primary mb-1">{serviceName}</h3>
                  <p className="text-text-secondary text-sm line-clamp-2">{serviceDesc}</p>
                </div>

                {/* Right: Price, delivery, CTA */}
                <div className="flex items-center gap-4 md:gap-6 shrink-0">
                  <div className="text-right">
                    <div className="text-accent text-lg font-bold">{formatPrice(service.priceUSD)}</div>
                    <div className="text-text-muted text-xs">{deliveryText}</div>
                  </div>
                  <button
                    onClick={() => handleAdd(service.id)}
                    className="bg-accent text-white font-bold py-2.5 px-5 rounded-lg hover:brightness-110 transition-all text-sm whitespace-nowrap"
                  >
                    {t.service.addToCart}
                  </button>
                </div>

                {/* Toast */}
                {toastId === service.id && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-accent-secondary text-black text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg animate-pulse z-10">
                    {t.service.addedToCart}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
