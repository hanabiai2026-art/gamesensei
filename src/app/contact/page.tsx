'use client'

import { useLanguage } from '@/lib/language'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-4">{t.contact.title}</h1>
      <p className="text-text-secondary text-lg mb-10">{t.contact.subtitle}</p>

      <ContactForm />

      <div className="mt-10 bg-surface rounded-xl border border-border p-6 text-center">
        <p className="text-text-secondary mb-2">{t.contact.responseTime}</p>
        <a
          href={`mailto:${t.contact.emailAddress}`}
          className="text-accent hover:text-accent/80 font-medium transition-colors"
        >
          {t.contact.emailAddress}
        </a>
      </div>
    </div>
  )
}
