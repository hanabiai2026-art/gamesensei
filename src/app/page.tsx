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

  const featuredGame = games[0]
  const remainingGames = games.slice(1)

  const featuredName = language === 'ja' ? featuredGame.nameJa : featuredGame.name
  const featuredDesc = language === 'ja' ? featuredGame.descriptionJa : featuredGame.description
  const featuredLowest = Math.min(...featuredGame.services.map(s => s.priceUSD))
  const featuredCoaches = Math.floor(featuredGame.services.length * 8 + 12)

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

        {/* Hero-style featured game (side-by-side layout) */}
        <Link href={`/${featuredGame.slug}`} className="group block mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-border bg-surface hover:border-accent/50 transition-all">
            {/* Left: Large image */}
            <div className="relative h-64 md:h-80 lg:h-full overflow-hidden">
              {featuredGame.image ? (
                <img
                  src={featuredGame.image}
                  alt={featuredName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/20 via-surface to-accent-secondary/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-text-primary">{featuredName}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/30 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:hidden" />
            </div>

            {/* Right: Info & stats */}
            <div className="flex flex-col justify-center p-6 md:p-8">
              <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">{featuredName}</h3>
              <p className="text-text-secondary text-base leading-relaxed mb-6 line-clamp-3">{featuredDesc}</p>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-bg border border-border rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-accent mb-0.5">{featuredCoaches}+</div>
                  <div className="text-text-muted text-xs">{t.gameCard.coaches}</div>
                </div>
                <div className="bg-bg border border-border rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-accent-secondary mb-0.5">{featuredGame.services.length}</div>
                  <div className="text-text-muted text-xs">{t.gameCard.services}</div>
                </div>
                <div className="bg-bg border border-border rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-green-400 mb-0.5">{formatPrice(featuredLowest)}</div>
                  <div className="text-text-muted text-xs">{t.gameCard.startingFrom}</div>
                </div>
              </div>

              <span className="inline-flex items-center justify-center bg-accent text-white font-bold py-3 px-6 rounded-lg group-hover:brightness-110 transition-all text-sm w-fit">
                {t.gameCard.viewServices}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </Link>

        {/* Remaining games in grid */}
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
