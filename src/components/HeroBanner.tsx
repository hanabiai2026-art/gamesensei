'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/language';
import { games } from '@/lib/data';

export default function HeroBanner() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chips = [t.hero.chip1, t.hero.chip2, t.hero.chip3, t.hero.chip4];

  // Close results when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Search games and services
  const getResults = () => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const results: { type: 'game' | 'service'; game: typeof games[0]; service?: typeof games[0]['services'][0] }[] = [];

    for (const game of games) {
      const gameName = language === 'ja' ? game.nameJa : game.name;
      const gameDesc = language === 'ja' ? game.descriptionJa : game.description;

      if (gameName.toLowerCase().includes(q) || gameDesc.toLowerCase().includes(q)) {
        results.push({ type: 'game', game });
      }

      for (const service of game.services) {
        const sName = language === 'ja' ? service.nameJa : service.name;
        const sDesc = language === 'ja' ? service.descriptionJa : service.description;
        if (sName.toLowerCase().includes(q) || sDesc.toLowerCase().includes(q)) {
          results.push({ type: 'service', game, service });
        }
      }
    }

    return results.slice(0, 8);
  };

  const results = getResults();

  const handleChipClick = (chip: string) => {
    setQuery(chip);
    setShowResults(true);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowResults(true);
    }
  };

  const trustItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: t.hero.trust1,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      label: t.hero.trust2,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      label: t.hero.trust3,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      label: t.hero.trust4,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-bg flex flex-col items-center justify-center min-h-[82vh] py-16 px-4 text-center">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-accent/6 to-transparent" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/8 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[140px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-[120px]" />
      </div>

      {/* Trust badge */}
      <div className="relative mb-8 flex items-center gap-2 bg-surface-elevated border border-border rounded-full px-5 py-2 text-sm">
        <span className="text-text-secondary">{t.hero.excellent}</span>
        <span className="text-success flex gap-0.5">★★★★★</span>
        <span className="font-bold text-white">4.9</span>
        <span className="text-text-muted">{t.hero.trustBadge}</span>
      </div>

      {/* Main headline */}
      <h1 className="relative text-5xl md:text-7xl font-extrabold leading-tight mb-4 max-w-4xl">
        {t.hero.headline}
        <br />
        <span className="text-accent">{t.hero.headlineBrand}</span>
        {' '}
        <span className="text-white">{t.hero.headlineSuffix}</span>
      </h1>

      {/* Search bar */}
      <div className="relative w-full max-w-2xl mt-10 mb-6" ref={resultsRef}>
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-surface-elevated border border-accent/30 rounded-xl focus-within:border-accent transition-colors"
          style={{ boxShadow: '0 0 40px rgba(230,57,70,0.12)' }}
        >
          <svg className="ml-5 w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
            onFocus={() => { if (query.trim()) setShowResults(true); }}
            placeholder={t.hero.searchPlaceholder}
            className="flex-1 pl-4 pr-4 py-5 bg-transparent text-white placeholder-text-muted text-base md:text-lg focus:outline-none"
          />
          <button
            type="submit"
            className="mr-2 bg-accent hover:bg-accent/85 text-white p-3 rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        {/* Search results dropdown */}
        {showResults && query.trim() && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface-elevated border border-border rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              results.map((r, i) => (
                <Link
                  key={`${r.game.id}-${r.service?.id || 'game'}-${i}`}
                  href={`/${r.game.slug}`}
                  onClick={() => setShowResults(false)}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-surface transition-colors border-b border-border last:border-0"
                >
                  <div className="relative w-12 h-8 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={r.game.image}
                      alt={language === 'ja' ? r.game.nameJa : r.game.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    {r.type === 'game' ? (
                      <>
                        <div className="text-sm font-semibold text-white truncate">
                          {language === 'ja' ? r.game.nameJa : r.game.name}
                        </div>
                        <div className="text-xs text-text-muted truncate">
                          {r.game.services.length} {language === 'ja' ? 'サービス' : 'services'}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm font-semibold text-white truncate">
                          {language === 'ja' ? r.service!.nameJa : r.service!.name}
                        </div>
                        <div className="text-xs text-text-muted truncate">
                          {language === 'ja' ? r.game.nameJa : r.game.name} &middot; ${r.service!.priceUSD}
                        </div>
                      </>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))
            ) : (
              <div className="px-5 py-8 text-center">
                <p className="text-text-muted text-sm">{t.errors.noResults}</p>
                <Link
                  href="/#games"
                  onClick={() => setShowResults(false)}
                  className="text-accent text-sm hover:underline mt-2 inline-block"
                >
                  {t.common.allGames ?? 'Browse all games'}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Suggestion chips */}
      <div className="relative flex flex-wrap justify-center gap-2 mb-14">
        {chips.map((chip) => (
          <button
            key={chip}
            onClick={() => handleChipClick(chip)}
            className="px-4 py-2 bg-surface-elevated border border-border rounded-full text-sm text-text-secondary hover:text-white hover:border-accent/50 transition"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Trust icons row */}
      <div className="relative flex flex-wrap justify-center gap-8 md:gap-12 text-sm text-text-muted">
        {trustItems.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-text-secondary">
              {item.icon}
            </div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
