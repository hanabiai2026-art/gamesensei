'use client';

import { useLanguage } from '@/lib/language';
import { useCurrency } from '@/lib/currency';
import { useCart, type CartItem } from '@/lib/cart';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const { updateQuantity, removeItem } = useCart();

  const displayName = language === 'ja' ? item.serviceNameJa : item.serviceName;
  const displayGame = language === 'ja' ? item.gameNameJa : item.gameName;

  return (
    <div className="flex items-center gap-4 bg-surface border border-border rounded-lg p-4">
      {/* Image */}
      {item.image ? (
        <img src={item.image} alt={displayName} className="w-16 h-12 rounded object-cover flex-shrink-0" />
      ) : (
        <div className="w-16 h-12 rounded bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex-shrink-0" />
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-text-primary font-medium text-sm truncate">{displayName}</h4>
        <p className="text-text-muted text-xs">{displayGame}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.serviceId, item.quantity - 1)}
          className="w-7 h-7 rounded bg-surface-elevated border border-border text-text-secondary hover:text-text-primary hover:border-accent/50 flex items-center justify-center text-sm transition-colors"
        >
          -
        </button>
        <span className="text-text-primary text-sm w-6 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.serviceId, item.quantity + 1)}
          className="w-7 h-7 rounded bg-surface-elevated border border-border text-text-secondary hover:text-text-primary hover:border-accent/50 flex items-center justify-center text-sm transition-colors"
        >
          +
        </button>
      </div>

      {/* Price */}
      <span className="text-accent font-bold text-sm w-24 text-right">
        {formatPrice(item.priceUSD * item.quantity)}
      </span>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.serviceId)}
        className="text-text-muted hover:text-red-400 transition-colors text-xs"
      >
        {t.cart.remove}
      </button>
    </div>
  );
}
