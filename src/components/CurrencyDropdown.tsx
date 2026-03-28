'use client';

import { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/lib/currency';

export default function CurrencyDropdown() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const label = currency === 'USD' ? '$ USD' : '\u00A5 JPY';

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-xs font-medium transition-colors"
      >
        {label}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-surface-elevated border border-border rounded-lg shadow-lg py-1 min-w-[80px]">
          <button onClick={() => { setCurrency('USD'); setOpen(false); }} className={`w-full text-left px-3 py-1.5 text-xs hover:bg-surface transition-colors ${currency === 'USD' ? 'text-accent' : 'text-text-secondary'}`}>$ USD</button>
          <button onClick={() => { setCurrency('JPY'); setOpen(false); }} className={`w-full text-left px-3 py-1.5 text-xs hover:bg-surface transition-colors ${currency === 'JPY' ? 'text-accent' : 'text-text-secondary'}`}>{'\u00A5'} JPY</button>
        </div>
      )}
    </div>
  );
}
