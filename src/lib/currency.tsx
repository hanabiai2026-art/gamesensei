'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Currency = 'USD' | 'JPY'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (c: Currency) => void
  formatPrice: (usdPrice: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')
  const formatPrice = (usdPrice: number) => {
    if (currency === 'JPY') return `¥${Math.round(usdPrice * 150).toLocaleString()}`
    return `$${usdPrice.toFixed(2)}`
  }
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}
