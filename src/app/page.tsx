'use client'

import { useLanguage } from '@/lib/language'
import { games } from '@/lib/data'
import HeroBanner from '@/components/HeroBanner'
import TrustBadges from '@/components/TrustBadges'
import HowItWorks from '@/components/HowItWorks'
import GameCard from '@/components/GameCard'
import PaymentMethods from '@/components/PaymentMethods'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      <HeroBanner />
      <TrustBadges />

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          {t.common.allGames}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <PaymentMethods />
    </>
  )
}
