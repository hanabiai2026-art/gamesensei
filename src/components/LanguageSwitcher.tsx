'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/language';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-xs font-medium transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
        {language === 'en' ? 'EN' : 'JA'}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-surface-elevated border border-border rounded-lg shadow-lg py-1 min-w-[70px]">
          <button onClick={() => { setLanguage('en'); setOpen(false); }} className={`w-full text-left px-3 py-1.5 text-xs hover:bg-surface transition-colors ${language === 'en' ? 'text-accent' : 'text-text-secondary'}`}>EN</button>
          <button onClick={() => { setLanguage('ja'); setOpen(false); }} className={`w-full text-left px-3 py-1.5 text-xs hover:bg-surface transition-colors ${language === 'ja' ? 'text-accent' : 'text-text-secondary'}`}>JA</button>
        </div>
      )}
    </div>
  );
}
