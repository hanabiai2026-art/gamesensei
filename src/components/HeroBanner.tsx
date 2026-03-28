'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language';

export default function HeroBanner() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bg via-surface to-bg">
      {/* Decorative coaching-themed accents */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-accent rotate-12" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-accent-secondary -rotate-12" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full bg-accent/10 blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-accent-secondary/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight tracking-tight">
          {t.hero.headline}
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-secondary mx-auto mb-6" />
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
          {t.hero.subtitle}
        </p>
        <Link
          href="/#games"
          className="inline-block bg-accent text-white font-bold px-8 py-3.5 rounded-lg text-lg hover:brightness-110 transition-all transform hover:scale-105"
        >
          {t.hero.cta}
        </Link>
        <p className="mt-8 text-text-muted text-sm flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-accent-secondary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          {t.hero.trustBadge}
        </p>
      </div>
    </section>
  );
}
