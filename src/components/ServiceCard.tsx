'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language';
import { useCurrency } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import type { Game, Service } from '@/lib/data';

interface ServiceCardProps {
  service: Service;
  game: Game;
}

export default function ServiceCard({ service, game }: ServiceCardProps) {
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAdd = () => {
    addItem({
      gameId: game.id,
      serviceId: service.id,
      gameName: game.name,
      gameNameJa: game.nameJa,
      serviceName: service.name,
      serviceNameJa: service.nameJa,
      priceUSD: service.priceUSD,
      image: game.image,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-5 flex flex-col hover:border-accent/40 transition-colors relative">
      <h3 className="text-lg font-bold text-text-primary mb-2">
        {language === 'ja' ? service.nameJa : service.name}
      </h3>
      <p className="text-text-secondary text-sm mb-4 flex-1">
        {language === 'ja' ? service.descriptionJa : service.description}
      </p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-accent text-xl font-bold">{formatPrice(service.priceUSD)}</span>
        <span className="text-text-muted text-xs">
          {t.service.delivery}: {language === 'ja' ? service.deliveryJa : service.delivery}
        </span>
      </div>
      <button
        onClick={handleAdd}
        className="w-full bg-accent text-white font-bold py-2.5 rounded-lg hover:brightness-110 transition-all text-sm"
      >
        {t.service.addToCart}
      </button>

      {/* Toast */}
      {showToast && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-accent-secondary text-black text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg animate-pulse">
          {t.service.addedToCart}
        </div>
      )}
    </div>
  );
}
