'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language';

export default function FAQPage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">
            {t.faq.title}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            {t.faq.subtitle}
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-3">
            {t.faq.items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-lg border transition-colors duration-200 ${
                    isOpen
                      ? 'bg-surface-elevated border-accent/30'
                      : 'bg-surface border-border hover:border-accent/20'
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  >
                    <span
                      className={`text-base md:text-lg font-semibold transition-colors duration-200 ${
                        isOpen ? 'text-accent' : 'text-text-primary'
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isOpen
                          ? 'bg-accent/20 text-accent rotate-180'
                          : 'bg-surface-elevated text-text-secondary'
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-5 text-text-secondary leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
