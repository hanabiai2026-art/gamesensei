'use client'
import { useLanguage } from '@/lib/language'
import { useCurrency } from '@/lib/currency'
import Link from 'next/link'

interface ReceiptItem {
  name: string
  gameName: string
  quantity: number
  unitPriceUSD: number
}

interface ReceiptProps {
  orderRef: string
  orderDate: string
  customerName: string
  customerEmail: string
  items: ReceiptItem[]
  totalUSD: number
  paymentMethod: string
  siteName: string
}

export default function Receipt({
  orderRef,
  orderDate,
  customerName,
  customerEmail,
  items,
  totalUSD,
  paymentMethod,
  siteName,
}: ReceiptProps) {
  const { t } = useLanguage()
  const { formatPrice } = useCurrency()

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div id="receipt" className="bg-surface border border-border rounded-xl p-8 receipt-content">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary receipt-title">{siteName}</h1>
            <p className="text-xs text-text-muted mt-1 receipt-company">{t.receipt.companyName}</p>
            <p className="text-xs text-text-muted receipt-address max-w-[240px]">{t.receipt.companyAddress}</p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-bold text-accent-secondary receipt-heading">{t.receipt.title}</h2>
            <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full receipt-badge">
              {t.receipt.paid}
            </span>
          </div>
        </div>

        {/* Order Info + Bill To */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{t.receipt.orderRef}</p>
            <p className="text-text-primary font-bold receipt-text">{orderRef}</p>
            <p className="text-xs text-text-muted uppercase tracking-wider mt-3 mb-1">{t.receipt.orderDate}</p>
            <p className="text-text-primary text-sm receipt-text">{orderDate}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{t.receipt.billTo}</p>
            <p className="text-text-primary font-semibold receipt-text">{customerName}</p>
            <p className="text-text-secondary text-sm receipt-text">{customerEmail}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <div className="grid grid-cols-12 gap-2 text-xs text-text-muted uppercase tracking-wider pb-2 border-b border-border">
            <div className="col-span-5">{t.receipt.item}</div>
            <div className="col-span-3">{t.receipt.game}</div>
            <div className="col-span-1 text-center">{t.receipt.qty}</div>
            <div className="col-span-1 text-right">{t.receipt.unitPrice}</div>
            <div className="col-span-2 text-right">{t.receipt.lineTotal}</div>
          </div>
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 py-3 border-b border-border/50 text-sm">
              <div className="col-span-5 text-text-primary receipt-text">{item.name}</div>
              <div className="col-span-3 text-text-secondary receipt-text">{item.gameName}</div>
              <div className="col-span-1 text-center text-text-secondary receipt-text">{item.quantity}</div>
              <div className="col-span-1 text-right text-text-secondary receipt-text">{formatPrice(item.unitPriceUSD)}</div>
              <div className="col-span-2 text-right text-text-primary font-medium receipt-text">{formatPrice(item.unitPriceUSD * item.quantity)}</div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-4 border-t-2 border-border mb-6">
          <span className="text-lg font-bold text-text-primary receipt-text">{t.receipt.total}</span>
          <span className="text-2xl font-extrabold text-accent-secondary receipt-total">{formatPrice(totalUSD)}</span>
        </div>

        {/* Payment Method */}
        <div className="mb-8">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{t.receipt.paymentMethod}</p>
          <p className="text-text-primary text-sm receipt-text">{paymentMethod === 'card' ? '💳 Credit Card' : '🅿️ PayPal'}</p>
        </div>

        {/* Thank You */}
        <div className="text-center border-t border-border pt-6">
          <p className="text-text-secondary text-sm receipt-text">{t.receipt.thankYou}</p>
        </div>
      </div>

      {/* Actions (hidden in print) */}
      <div className="flex gap-4 justify-center mt-6 no-print">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-accent hover:bg-accent/90 text-white font-bold rounded-lg transition-colors"
        >
          🖨️ {t.receipt.printReceipt}
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-surface-elevated border border-border text-text-secondary hover:text-text-primary font-semibold rounded-lg transition-colors"
        >
          {t.receipt.backToHome}
        </Link>
      </div>
    </div>
  )
}
