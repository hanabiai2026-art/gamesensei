'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language';
import { useCurrency } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/auth';

export default function CheckoutForm() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { items, totalPriceUSD, clearCart } = useCart();
  const { user } = useAuth();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [gameAccount, setGameAccount] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentTab, setPaymentTab] = useState<'card' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'GS-' + Date.now().toString(36).toUpperCase();
    setOrderRef(ref);
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <div className="bg-surface border border-accent/30 rounded-lg p-8 text-center">
        <svg className="w-16 h-16 text-accent mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <p className="text-text-primary text-lg font-bold mb-2">{t.checkout.success}</p>
        <p className="text-text-secondary text-sm">
          {t.checkout.orderRef}: <span className="text-accent font-mono">{orderRef}</span>
        </p>
      </div>
    );
  }

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

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setPaymentTab('card')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${paymentTab === 'card' ? 'bg-accent text-white' : 'bg-surface-elevated text-text-secondary border border-border hover:text-text-primary'}`}
          >
            {t.checkout.creditCard}
          </button>
          <button
            type="button"
            onClick={() => setPaymentTab('paypal')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${paymentTab === 'paypal' ? 'bg-accent text-white' : 'bg-surface-elevated text-text-secondary border border-border hover:text-text-primary'}`}
          >
            {t.checkout.paypal}
          </button>
        </div>

        {paymentTab === 'card' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-text-secondary text-sm mb-1">{t.checkout.cardNumber}</label>
              <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-text-secondary text-sm mb-1">{t.checkout.expiry}</label>
                <input type="text" value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="MM/YY" className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-1">{t.checkout.cvv}</label>
                <input type="text" value={cvv} onChange={e => setCvv(e.target.value)} placeholder="123" className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface-elevated border border-border rounded-lg p-6 text-center">
            <p className="text-text-secondary text-sm">{t.checkout.paypal}</p>
          </div>
        )}
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

      <button
        type="submit"
        disabled={items.length === 0}
        className="w-full bg-accent text-white font-bold py-3.5 rounded-lg text-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t.checkout.placeOrder}
      </button>
    </form>
  );
}
