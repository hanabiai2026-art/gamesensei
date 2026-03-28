'use client';

import { useLanguage } from '@/lib/language';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { num: 1, title: t.howItWorks.step1, desc: t.howItWorks.step1Desc },
    { num: 2, title: t.howItWorks.step2, desc: t.howItWorks.step2Desc },
    { num: 3, title: t.howItWorks.step3, desc: t.howItWorks.step3Desc },
    { num: 4, title: t.howItWorks.step4, desc: t.howItWorks.step4Desc },
  ];

  return (
    <section id="how-it-works" className="bg-bg py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          {t.howItWorks.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(step => (
            <div key={step.num} className="bg-surface border border-border rounded-lg p-6 relative">
              <span className="text-4xl font-black text-accent opacity-80 mb-3 block">
                {step.num}
              </span>
              <h3 className="text-lg font-bold text-text-primary mb-2">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
