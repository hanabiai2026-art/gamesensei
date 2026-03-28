'use client'

import { useLanguage } from '@/lib/language'
import { games } from '@/lib/data'
import HeroBanner from '@/components/HeroBanner'
import TrustBadges from '@/components/TrustBadges'
import HowItWorks from '@/components/HowItWorks'
import GameCard from '@/components/GameCard'
import WhySensei from '@/components/WhySensei'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      <HeroBanner />
      <TrustBadges />

      {/* Choose your game */}
      <section id="games" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-extrabold text-white mb-2">{t.gameCard.featuredGames}</h2>
        <p className="text-text-secondary mb-8">{t.gameCard.exploreServices}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <WhySensei />

      <section id="how-it-works">
        <HowItWorks />
      </section>
    </>
  )
}
