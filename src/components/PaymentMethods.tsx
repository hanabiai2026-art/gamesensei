'use client';

const methods = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'];

export default function PaymentMethods() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {methods.map(m => (
        <span key={m} className="text-text-muted text-xs border border-border rounded px-2 py-1">
          {m}
        </span>
      ))}
    </div>
  );
}
