"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export function CartButton({ onClick }: { onClick: () => void }) {
  const { itemCount } = useCart()

  if (itemCount === 0) return null

  return (
    <Button 
      onClick={onClick}
      className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg"
      size="icon"
    >
      <ShoppingCart className="w-6 h-6" />
      <span className="absolute -top-1 -right-1 bg-cheese-red text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
        {itemCount}
      </span>
    </Button>
  )
}

