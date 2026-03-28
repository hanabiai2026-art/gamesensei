'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language';
import { useCurrency } from '@/lib/currency';
import type { Game } from '@/lib/data';

interface GameCardProps {
  game: Game;
}

const TINTS: Record<string, string> = {
  'dota-2': 'rgba(124,58,237,0.55)',
  'league-of-legends': 'rgba(59,130,246,0.50)',
  'counter-strike-2': 'rgba(234,88,12,0.50)',
  'valorant': 'rgba(230,57,70,0.55)',
  'apex-legends': 'rgba(245,158,11,0.50)',
  'fortnite': 'rgba(16,185,129,0.50)',
  'rocket-league': 'rgba(6,182,212,0.50)',
  'overwatch-2': 'rgba(99,102,241,0.55)',
};

export default function GameCard({ game }: GameCardProps) {
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();

  const lowestPrice = Math.min(...game.services.map(s => s.priceUSD));
  const displayName = language === 'ja' ? game.nameJa : game.name;
  const tint = TINTS[game.slug] ?? 'rgba(100,100,120,0.45)';

  return (
    <Link href={`/${game.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '3/4' }}>
        {/* Game image */}
        {game.image ? (
          <img
            src={game.image}
            alt={displayName}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-surface" />
        )}

        {/* Color tint overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-70"
          style={{ backgroundColor: tint, mixBlendMode: 'multiply' }}
        />

        {/* Dark gradient bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-base leading-tight mb-1">{displayName}</h3>
          <p className="text-text-secondary text-xs">
            {game.services.length} {t.gameCard.services} &bull; {t.gameCard.startingFrom} {formatPrice(lowestPrice)}
          </p>
        </div>

        {/* View services overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-accent text-white text-sm font-bold px-4 py-2 rounded-lg">
            {t.gameCard.viewServices}
          </span>
        </div>
      </div>
    </Link>
  );
}
