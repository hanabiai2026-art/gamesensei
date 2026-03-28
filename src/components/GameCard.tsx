'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language';
import { useCurrency } from '@/lib/currency';
import type { Game } from '@/lib/data';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();

  const lowestPrice = Math.min(...game.services.map(s => s.priceUSD));
  const displayName = language === 'ja' ? game.nameJa : game.name;

  return (
    <Link href={`/${game.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg border border-border bg-surface hover:border-accent/50 transition-all">
        {/* Image or gradient fallback */}
        {game.image ? (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={game.image}
              alt={displayName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="relative aspect-video bg-gradient-to-br from-accent/20 via-surface to-accent-secondary/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-text-primary">{displayName}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        )}

        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-text-primary mb-1">{displayName}</h3>
          <div className="flex items-center justify-between">
            <span className="text-accent-secondary text-sm font-medium">
              {t.gameCard.startingFrom} {formatPrice(lowestPrice)}
            </span>
            <span className="text-xs font-bold text-white bg-accent px-3 py-1 rounded group-hover:brightness-110 transition-all">
              {t.gameCard.viewServices}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
