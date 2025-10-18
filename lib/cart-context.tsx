"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type CartItem = {
  productId: string
  productName: string
  quantity: number
  unit: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  function addItem(newItem: CartItem) {
    setItems((current) => {
      const existing = current.find((i) => i.productId === newItem.productId)
      if (existing) {
        return current.map((i) =>
          i.productId === newItem.productId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        )
      }
      return [...current, newItem]
    })
  }

  function removeItem(productId: string) {
    setItems((current) => current.filter((i) => i.productId !== productId))
  }

  function clearCart() {
    setItems([])
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}

