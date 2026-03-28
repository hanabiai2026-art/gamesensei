'use client'

import { useLanguage } from '@/lib/language'
import Link from 'next/link'

const slugTitles: Record<string, { en: string; ja: string }> = {
  faq: { en: 'FAQ', ja: 'よくある質問' },
  blog: { en: 'Blog', ja: 'ブログ' },
  careers: { en: 'Work with Us', ja: '採用情報' },
  guarantees: { en: 'Guarantees', ja: '保証' },
  'forgot-password': { en: 'Forgot Password', ja: 'パスワードをお忘れの方' },
}

export default function ComingSoonPage({
  params,
}: {
  params: { slug: string }
}) {
  const { t, language } = useLanguage()
  const titles = slugTitles[params.slug]
  const pageTitle = titles
    ? language === 'ja'
      ? titles.ja
      : titles.en
    : t.comingSoon.title

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-surface rounded-xl border border-border p-12 max-w-md w-full">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">{pageTitle}</h1>
        <p className="text-lg text-accent font-semibold mb-4">
          {t.comingSoon.title}
        </p>
        <p className="text-text-secondary mb-8">{t.comingSoon.message}</p>
        <Link
          href="/"
          className="inline-block bg-accent hover:bg-accent/90 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          {t.comingSoon.backHome}
        </Link>
      </div>
    </div>
  )
}
