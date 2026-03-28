'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { useLanguage } from '@/lib/language'

export default function AccountPage() {
  const { user, isSignedIn, signOut } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/account/signin')
    }
  }, [isSignedIn, router])

  if (!isSignedIn || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-secondary">{t.common.loading}</p>
      </div>
    )
  }

  const welcomeText = t.auth.welcome.replace('{name}', user.name)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">{welcomeText}</h1>

      {/* Profile Section */}
      <div className="bg-surface rounded-xl border border-border p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">{t.auth.profile}</h2>
        <div className="space-y-3">
          <div>
            <label className="text-text-muted text-sm">{t.auth.name}</label>
            <p className="text-white">{user.name}</p>
          </div>
          <div>
            <label className="text-text-muted text-sm">{t.auth.email}</label>
            <p className="text-white">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Order History Section */}
      <div className="bg-surface rounded-xl border border-border p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">{t.auth.myOrders}</h2>
        <p className="text-text-secondary">{t.errors.noOrders}</p>
      </div>

      {/* Sign Out */}
      <button
        onClick={() => {
          signOut()
          router.push('/')
        }}
        className="bg-surface-elevated hover:bg-red-600/20 border border-border hover:border-red-500/50 text-text-secondary hover:text-red-400 px-6 py-3 rounded-lg transition-colors"
      >
        {t.auth.signOut}
      </button>
    </div>
  )
}
