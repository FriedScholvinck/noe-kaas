"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Trash2 } from "lucide-react"
import { CartButton } from "./cart-button"

export function CartDrawer() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const { items, removeItem, clearCart, itemCount } = useCart()
  const router = useRouter()

  async function handlePlaceOrder() {
    setLoading(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      })

      if (res.ok) {
        const data = await res.json()
        setOrderNumber(data.orderNumber)
        clearCart()
      }
    } catch (error) {
      console.error("Failed to place order", error)
    } finally {
      setLoading(false)
    }
  }

  if (orderNumber) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bestelling geplaatst!</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-2">Uw bestelling is succesvol geplaatst.</p>
            <p className="text-sm text-muted-foreground">
              Bestelnummer: <strong>{orderNumber}</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              We nemen spoedig contact op voor levering en facturatie.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setOrderNumber(null)
              setOpen(false)
              router.refresh()
            }}>
              Sluiten
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <CartButton onClick={() => setOpen(true)} />
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Winkelmandje ({itemCount})</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between p-3 border rounded">
                <div className="flex-1">
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} {item.unit}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.productId)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <DialogFooter className="flex-col gap-2">
            <Button 
              onClick={handlePlaceOrder} 
              disabled={loading || items.length === 0}
              className="w-full"
            >
              {loading ? "Bestelling plaatsen..." : "Bestelling plaatsen"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Prijzen en facturatie worden later afgehandeld
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

