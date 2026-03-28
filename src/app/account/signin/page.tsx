'use client'

import { useLanguage } from '@/lib/language'
import AuthForm from '@/components/AuthForm'

export default function SignInPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">{t.auth.logIn}</h1>
      <AuthForm mode="signin" />
    </div>
  )
}
