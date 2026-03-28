'use client'

import { LanguageProvider } from '@/lib/language'
import { CurrencyProvider } from '@/lib/currency'
import { AuthProvider } from '@/lib/auth'
import { CartProvider } from '@/lib/cart'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ChatWidget />
          </CartProvider>
        </AuthProvider>
      </CurrencyProvider>
    </LanguageProvider>
  )
}
