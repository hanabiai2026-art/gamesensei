'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language';
import { useAuth } from '@/lib/auth';
import { games } from '@/lib/data';
import CartIcon from './CartIcon';
import CurrencyDropdown from './CurrencyDropdown';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t, language } = useLanguage();
  const { user, isSignedIn } = useAuth();
  const [gamesOpen, setGamesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const gamesRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (gamesRef.current && !gamesRef.current.contains(e.target as Node)) setGamesOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) { setSearchOpen(false); setSearchQuery(''); }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filteredGames = games.filter(g => {
    const q = searchQuery.toLowerCase();
    return g.name.toLowerCase().includes(q) || g.nameJa.includes(q);
  });

  return (
    <header className="sticky top-0 z-50 bg-surface-elevated border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 text-xl font-bold tracking-tight">
          <span className="text-text-primary">Game</span>
          <span className="text-accent-secondary">Sensei</span>
        </Link>

        {/* Games Dropdown */}
        <div className="relative hidden md:block" ref={gamesRef}>
          <button
            onClick={() => setGamesOpen(!gamesOpen)}
            className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
          >
            {t.header.games}
            <svg className={`w-4 h-4 transition-transform ${gamesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {gamesOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-surface-elevated border border-border rounded-lg shadow-xl py-2 max-h-96 overflow-y-auto">
              {games.map(game => (
                <Link
                  key={game.id}
                  href={`/${game.slug}`}
                  onClick={() => setGamesOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface transition-colors"
                >
                  {game.image ? (
                    <img src={game.image} alt={language === 'ja' ? game.nameJa : game.name} className="w-10 h-7 rounded object-cover" />
                  ) : (
                    <div className="w-10 h-7 rounded bg-gradient-to-br from-accent/30 to-accent-secondary/30" />
                  )}
                  <span className="text-sm text-text-primary">{language === 'ja' ? game.nameJa : game.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs hidden md:block" ref={searchRef}>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder={t.header.searchPlaceholder}
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              className="w-full pl-10 pr-4 py-1.5 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          {searchOpen && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-surface-elevated border border-border rounded-lg shadow-xl py-2 max-h-64 overflow-y-auto">
              {filteredGames.length > 0 ? filteredGames.map(game => (
                <Link
                  key={game.id}
                  href={`/${game.slug}`}
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-surface transition-colors"
                >
                  {game.image ? (
                    <img src={game.image} alt={language === 'ja' ? game.nameJa : game.name} className="w-8 h-5 rounded object-cover" />
                  ) : (
                    <div className="w-8 h-5 rounded bg-gradient-to-br from-accent/30 to-accent-secondary/30" />
                  )}
                  <span className="text-sm text-text-primary">{language === 'ja' ? game.nameJa : game.name}</span>
                </Link>
              )) : (
                <div className="px-4 py-2 text-sm text-text-muted">{t.errors.noResults}</div>
              )}
            </div>
          )}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3 ml-auto">
          <CartIcon />
          <LanguageSwitcher />
          <CurrencyDropdown />

          {isSignedIn ? (
            <Link
              href="/account"
              className="w-8 h-8 rounded-full bg-accent-secondary text-black flex items-center justify-center font-bold text-sm"
            >
              {user?.name.charAt(0).toUpperCase()}
            </Link>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/account/signin" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                {t.header.logIn}
              </Link>
              <Link href="/account/signup" className="text-sm font-bold bg-accent text-white px-4 py-1.5 rounded-lg hover:brightness-110 transition-all">
                {t.header.signUp}
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-elevated border-t border-border px-4 py-4 space-y-3">
          {games.map(game => (
            <Link
              key={game.id}
              href={`/${game.slug}`}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-text-secondary hover:text-accent transition-colors"
            >
              {language === 'ja' ? game.nameJa : game.name}
            </Link>
          ))}
          {!isSignedIn && (
            <div className="flex gap-3 pt-3 border-t border-border">
              <Link href="/account/signin" onClick={() => setMobileOpen(false)} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                {t.header.logIn}
              </Link>
              <Link href="/account/signup" onClick={() => setMobileOpen(false)} className="text-sm font-bold bg-accent text-white px-4 py-1.5 rounded-lg hover:brightness-110 transition-all">
                {t.header.signUp}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
