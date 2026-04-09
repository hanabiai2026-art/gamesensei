'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language';
import { useCurrency } from '@/lib/currency';
import { useCart, CartItem } from '@/lib/cart';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const COUNTRY_OPTIONS = [
  { code: 'US', label: 'United States' },
  { code: 'JP', label: 'Japan' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'AU', label: 'Australia' },
  { code: 'CA', label: 'Canada' },
  { code: 'DE', label: 'Germany' },
  { code: 'FR', label: 'France' },
  { code: 'SG', label: 'Singapore' },
  { code: 'KR', label: 'South Korea' },
  { code: 'TW', label: 'Taiwan' },
  { code: 'HK', label: 'Hong Kong' },
  { code: 'NZ', label: 'New Zealand' },
  { code: 'SE', label: 'Sweden' },
  { code: 'NO', label: 'Norway' },
  { code: 'DK', label: 'Denmark' },
  { code: 'NL', label: 'Netherlands' },
  { code: 'BR', label: 'Brazil' },
  { code: 'MX', label: 'Mexico' },
  { code: 'PH', label: 'Philippines' },
  { code: 'TH', label: 'Thailand' },
]

export default function CheckoutForm({ onOrderComplete }: { onOrderComplete?: () => void }) {
  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { items, totalPriceUSD, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [gameAccount, setGameAccount] = useState('');
  const [notes, setNotes] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [country, setCountry] = useState('US');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Format card number with spaces every 4 digits
  const handleCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    const formatted = digits.replace(/(.{4})/g, '$1 ').trim()
    setCardNumber(formatted)
  }

  // Format expiry as MM/YY
  const handleExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) {
      setExpiry(digits.slice(0, 2) + '/' + digits.slice(2))
    } else {
      setExpiry(digits)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/payments/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          gameAccount,
          notes,
          cardNumber,
          expiry,
          cvv,
          country,
          amountUSD: totalPriceUSD,
        }),
      });

      const data = await res.json();

      // 3DS redirect
      if (data.redirect) {
        clearCart();
        onOrderComplete?.();
        window.location.href = data.redirect;
        return;
      }

      if (data.success === true) {
        clearCart();
        onOrderComplete?.();
        router.push(`/payment/success?ref=${data.ref}`);
        return;
      }

      setError(data.message || data.error || t.payment.errorGeneric);
    } catch {
      setError(t.payment.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Info */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-text-primary mb-6">{t.checkout.customerInfo}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm mb-1">{t.checkout.name}</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1">{t.checkout.email}</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1">{t.checkout.gameAccount}</label>
            <input type="text" value={gameAccount} onChange={e => setGameAccount(e.target.value)} required className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1">{t.checkout.notes}</label>
            <input type="text" value={notes} onChange={e => setNotes(e.target.value)} className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-text-primary mb-6">{t.checkout.paymentMethod}</h2>

        <div className="space-y-4">
          {/* Country */}
          <div>
            <label className="block text-text-secondary text-sm mb-1">{t.checkout.billingCountry}</label>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
            >
              {COUNTRY_OPTIONS.map(c => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-text-secondary text-sm mb-1">{t.checkout.cardNumber}</label>
            <input
              type="text"
              value={cardNumber}
              onChange={e => handleCardNumber(e.target.value)}
              placeholder="4242 4242 4242 4242"
              required
              inputMode="numeric"
              className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors font-mono tracking-wider"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm mb-1">{t.checkout.expiry}</label>
              <input
                type="text"
                value={expiry}
                onChange={e => handleExpiry(e.target.value)}
                placeholder="MM/YY"
                required
                inputMode="numeric"
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors font-mono"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm mb-1">{t.checkout.cvv}</label>
              <input
                type="text"
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                required
                inputMode="numeric"
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-text-primary mb-4">{t.checkout.orderSummary}</h2>
        <div className="border-t border-border pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-text-primary">{t.checkout.total}</span>
            <span className="text-accent">{formatPrice(totalPriceUSD)}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={items.length === 0 || loading}
        className="w-full bg-accent text-white font-bold py-3.5 rounded-lg text-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            {t.payment.processing}
          </>
        ) : (
          t.checkout.placeOrder
        )}
      </button>
    </form>
  );
}
