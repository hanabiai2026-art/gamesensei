'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language'
import { useCurrency } from '@/lib/currency'
import { games } from '@/lib/data'
import HeroBanner from '@/components/HeroBanner'
import TrustBadges from '@/components/TrustBadges'
import HowItWorks from '@/components/HowItWorks'
import GameCard from '@/components/GameCard'
import PaymentMethods from '@/components/PaymentMethods'

export default function HomePage() {
  const { t, language } = useLanguage()
  const { formatPrice } = useCurrency()

  const featuredGames = games.slice(0, 2)
  const remainingGames = games.slice(2)

  return (
    <>
      <HeroBanner />
      <TrustBadges />

      {/* Featured Games Section */}
      <section id="games" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-3 text-white">
          {t.gameCard.featuredGames}
        </h2>
        <p className="text-text-secondary text-center mb-10 max-w-2xl mx-auto">
          {t.gameCard.exploreServices}
        </p>

        {/* Featured 2-column large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featuredGames.map((game) => {
            const displayName = language === 'ja' ? game.nameJa : game.name
            const displayDesc = language === 'ja' ? game.descriptionJa : game.description
            const lowestPrice = Math.min(...game.services.map(s => s.priceUSD))
            const coachCount = Math.floor(game.services.length * 8 + 12)

            return (
              <Link
                key={game.id}
                href={`/${game.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-xl border border-border bg-surface hover:border-accent/50 transition-all h-full">
                  {/* Large image */}
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    {game.image ? (
                      <img
                        src={game.image}
                        alt={displayName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/20 via-surface to-accent-secondary/20 flex items-center justify-center">
                        <span className="text-3xl font-bold text-text-primary">{displayName}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                  </div>

                  {/* Card content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-text-primary mb-2">{displayName}</h3>
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">{displayDesc}</p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="text-text-secondary text-sm">
                          {game.services.length} {t.gameCard.services}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-text-secondary text-sm">
                          {coachCount} {t.gameCard.coaches}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-accent-secondary font-bold text-lg">
                        {t.gameCard.startingFrom} {formatPrice(lowestPrice)}
                      </span>
                      <span className="text-sm font-bold text-white bg-accent px-4 py-2 rounded-lg group-hover:brightness-110 transition-all">
                        {t.gameCard.viewServices}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Remaining games in 4-column grid */}
        {remainingGames.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {remainingGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <PaymentMethods />
    </>
  )
}
