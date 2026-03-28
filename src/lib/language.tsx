'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { translations } from './translations'

type Language = 'en' | 'ja'
type TranslationSet = typeof translations.en

interface LanguageContextType {
  language: Language
  setLanguage: (l: Language) => void
  t: TranslationSet
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const t = translations[language] as TranslationSet
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
