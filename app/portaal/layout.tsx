"use client"

import { CartProvider } from "@/lib/cart-context"
import { CartDrawer } from "@/components/cart/cart-drawer"

export default function PortaalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  )
}

