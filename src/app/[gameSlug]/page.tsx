'use client'

import { useLanguage } from '@/lib/language'
import { games } from '@/lib/data'
import ServiceCard from '@/components/ServiceCard'
import Link from 'next/link'

export default function GamePage({ params }: { params: { gameSlug: string } }) {
  const { t, language } = useLanguage()
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Game Banner */}
      <div className="relative rounded-xl overflow-hidden mb-10 h-64 md:h-80">
        {game.image ? (
          <img
            src={game.image}
            alt={gameName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-accent/20 to-accent-secondary/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-bold text-white">{gameName}</h1>
          {game.description && (
            <p className="text-text-secondary mt-2 max-w-2xl">
              {language === 'ja' ? game.descriptionJa : game.description}
            </p>
          )}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {game.services.map((service) => (
          <ServiceCard key={service.id} service={service} game={game} />
        ))}
      </div>
    </div>
  )
}
