'use client'

import { useLanguage } from '@/lib/language'

export default function AboutPage() {
  const { t } = useLanguage()

  const stats = [
    t.about.stats.founded,
    t.about.stats.players,
    t.about.stats.boosts,
    t.about.stats.rate,
  ]

  const values = [
    {
      title: t.about.values.speed,
      desc: t.about.values.speedDesc,
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: t.about.values.security,
      desc: t.about.values.securityDesc,
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: t.about.values.pros,
      desc: t.about.values.prosDesc,
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: t.about.values.support,
      desc: t.about.values.supportDesc,
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Title & Intro */}
      <h1 className="text-4xl font-bold text-white mb-6">{t.about.title}</h1>
      <p className="text-text-secondary text-lg leading-relaxed mb-12">
        {t.about.intro}
      </p>

      {/* Mission Section */}
      <div className="bg-surface rounded-xl border border-border p-8 mb-12">
        <h2 className="text-2xl font-bold text-accent mb-4">{t.about.mission}</h2>
        <p className="text-text-secondary leading-relaxed">{t.about.missionText}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-surface-elevated rounded-xl border border-border p-6 text-center"
          >
            <p className="text-accent font-bold text-lg">{stat}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        {t.about.whyChooseUs}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((value, i) => (
          <div
            key={i}
            className="bg-surface rounded-xl border border-border p-6 hover:border-accent/30 transition-colors"
          >
            <div className="mb-4">{value.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {value.title}
            </h3>
            <p className="text-text-secondary">{value.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
