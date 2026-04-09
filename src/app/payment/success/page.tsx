'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { useLanguage } from '@/lib/language'

function SuccessContent() {
  const { t } = useLanguage()
  const params = useSearchParams()
  const ref = params.get('ref') ?? ''

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-3">{t.payment.successTitle}</h1>
        <p className="text-text-secondary mb-4">{t.payment.successMessage}</p>
        {ref && (
          <p className="text-sm text-text-muted mb-8">
            {t.checkout.orderRef}: <span className="text-accent font-mono font-semibold">{ref}</span>
          </p>
        )}
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-accent hover:bg-accent/90 text-white font-bold rounded-lg transition-colors"
        >
          {t.receipt.backToHome}
        </Link>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}
