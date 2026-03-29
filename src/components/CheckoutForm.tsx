'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language';
import { useCurrency } from '@/lib/currency';
import { useCart, CartItem } from '@/lib/cart';
import { useAuth } from '@/lib/auth';
import Receipt from './Receipt';

const TEST_CARD_SUCCESS = '4242424242424242';
const TEST_CARD_DECLINE = '4000000000000002';

export default function CheckoutForm({ onOrderComplete }: { onOrderComplete?: () => void }) {
  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { items, totalPriceUSD, clearCart } = useCart();
  const { user } = useAuth();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [savedTotal, setSavedTotal] = useState(0);

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [gameAccount, setGameAccount] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentTab, setPaymentTab] = useState<'card' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const strippedCard = cardNumber.replace(/\s/g, '');

    if (strippedCard === TEST_CARD_DECLINE) {
      setPaymentFailed(true);
      return;
    }

    const ref = 'GS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const date = new Date().toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    setSavedItems([...items]);
    setSavedTotal(totalPriceUSD);
    setOrderRef(ref);
    setOrderDate(date);
    setOrderPlaced(true);
    onOrderComplete?.();
    clearCart();
  };

  if (orderPlaced) {
    return (
      <Receipt
        orderRef={orderRef}
        orderDate={orderDate}
        customerName={name}
        customerEmail={email}
        items={savedItems.map(item => ({
          name: language === 'ja' ? item.serviceNameJa : item.serviceName,
          gameName: language === 'ja' ? item.gameNameJa : item.gameName,
          quantity: item.quantity,
          unitPriceUSD: item.priceUSD,
        }))}
        totalUSD={savedTotal}
        paymentMethod={paymentTab}
        siteName="Game Sensei"
      />
    );
  }

  if (paymentFailed) {
    return (
      <div className="text-center py-16 max-w-lg mx-auto">
        <span className="text-5xl mb-4 block">❌</span>
        <h2 className="text-2xl font-bold text-red-400 mb-2">{t.receipt.paymentDeclined}</h2>
        <p className="text-text-secondary mb-6">{t.receipt.paymentDeclinedMessage}</p>
        <button
          onClick={() => setPaymentFailed(false)}
          className="px-6 py-3 bg-accent hover:bg-accent/90 text-white font-bold rounded-lg transition-colors"
        >
          {t.receipt.tryAgain}
        </button>
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
              <p className="text-xs text-text-muted mt-1">{t.receipt.testCards}</p>
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
