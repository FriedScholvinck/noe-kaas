"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { Plus } from "lucide-react"

export function AddToCartButton({
  productId,
  productName,
  unit,
}: {
  productId: string
  productName: string
  unit: string
}) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  function handleAdd() {
    addItem({ productId, productName, quantity, unit })
    setQuantity(1)
  }

  return (
    <div className="flex gap-2 w-full">
      <Input
        type="number"
        min="0.1"
        step={unit === "kg" ? "0.5" : "1"}
        value={quantity}
        onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
        className="w-24"
      />
      <Button onClick={handleAdd} className="flex-1">
        <Plus className="w-4 h-4 mr-1" />
        ({unit})
      </Button>
    </div>
  )
}

