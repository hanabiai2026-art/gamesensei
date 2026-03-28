'use client'

import { useLanguage } from '@/lib/language'
import { policies } from '@/lib/policies'
import Link from 'next/link'

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const { t, language } = useLanguage()
  const policy = policies[params.slug]

  if (!policy) {
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

  const langData = language === 'ja' ? policy.ja : policy.en

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-8">{langData.title}</h1>
      <div className="bg-surface rounded-xl border border-border p-8">
        <div className="prose prose-invert max-w-none">
          {langData.content.split('\n\n').map((paragraph, i) => {
            const trimmed = paragraph.trim()
            if (!trimmed) return null

            if (
              trimmed.length < 80 &&
              (trimmed === trimmed.toUpperCase() || /^\d+\./.test(trimmed))
            ) {
              return (
                <h2
                  key={i}
                  className="text-xl font-bold text-accent mt-8 mb-4 first:mt-0"
                >
                  {trimmed}
                </h2>
              )
            }

            return (
              <p key={i} className="text-text-secondary leading-relaxed mb-4">
                {trimmed}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
