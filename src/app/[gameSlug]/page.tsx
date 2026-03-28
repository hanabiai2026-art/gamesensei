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
    <div>
      {/* Full-width banner hero */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        {game.image ? (
          <img
            src={game.image}
            alt={gameName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/20 via-surface to-accent-secondary/20 flex items-center justify-center">
            <span className="text-5xl font-bold text-text-primary">{gameName}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />

        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{gameName}</h1>
          <p className="text-text-secondary text-sm md:text-base max-w-2xl line-clamp-2">{gameDesc}</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-accent">{coachCount}+</div>
              <div className="text-text-muted text-xs">{t.service.coachesAvailable}</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-accent-secondary">{game.services.length}</div>
              <div className="text-text-muted text-xs">{t.service.servicesOffered}</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-green-400">{formatPrice(lowestPrice)}</div>
              <div className="text-text-muted text-xs">{t.service.startingAt}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-white mb-6">{t.service.availableServices}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {game.services.map((service) => {
            const serviceName = language === 'ja' ? service.nameJa : service.name
            const serviceDesc = language === 'ja' ? service.descriptionJa : service.description
            const deliveryText = language === 'ja' ? service.deliveryJa : service.delivery

            return (
              <div
                key={service.id}
                className="relative bg-surface border border-border rounded-xl p-5 hover:border-accent/40 transition-colors flex flex-col"
              >
                <h3 className="text-lg font-bold text-text-primary mb-2">{serviceName}</h3>
                <p className="text-text-secondary text-sm mb-4 flex-1">{serviceDesc}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <div>
                    <div className="text-accent text-xl font-bold">{formatPrice(service.priceUSD)}</div>
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
