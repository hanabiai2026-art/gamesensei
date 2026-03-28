'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export interface CartItem {
  gameId: string
  serviceId: string
  gameName: string
  gameNameJa: string
  serviceName: string
  serviceNameJa: string
  priceUSD: number
  quantity: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (serviceId: string) => void
  updateQuantity: (serviceId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPriceUSD: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.serviceId === item.serviceId)
      if (existing) {
        return prev.map(i => i.serviceId === item.serviceId ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (serviceId: string) => {
    setItems(prev => prev.filter(i => i.serviceId !== serviceId))
  }

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) { removeItem(serviceId); return }
    setItems(prev => prev.map(i => i.serviceId === serviceId ? { ...i, quantity } : i))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPriceUSD = items.reduce((sum, i) => sum + i.priceUSD * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPriceUSD }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
