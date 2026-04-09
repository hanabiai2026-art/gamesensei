'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { useLanguage } from '@/lib/language'

function DeclineContent() {
  const { t } = useLanguage()
  const params = useSearchParams()
  const ref = params.get('ref') ?? ''

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-3">{t.receipt.paymentDeclined}</h1>
        <p className="text-text-secondary mb-4">{t.receipt.paymentDeclinedMessage}</p>
        {ref && (
          <p className="text-sm text-text-muted mb-8">
            {t.checkout.orderRef}: <span className="font-mono">{ref}</span>
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/checkout"
            className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-bold rounded-lg transition-colors"
          >
            {t.receipt.tryAgain}
          </Link>
          <Link
            href="/"
            className="px-8 py-3 border border-border text-text-secondary hover:text-text-primary hover:border-accent font-semibold rounded-lg transition-colors"
          >
            {t.receipt.backToHome}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function PaymentDeclinePage() {
  return (
    <Suspense>
      <DeclineContent />
    </Suspense>
  )
}
