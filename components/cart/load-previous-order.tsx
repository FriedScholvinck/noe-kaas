"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { History } from "lucide-react"

type OrderItem = {
  id: string
  productId: string
  quantity: number
  product: {
    id: string
    name: string
    unit: string
  }
}

type Order = {
  id: string
  createdAt: string
  items: OrderItem[]
}

export function LoadPreviousOrder() {
  const [open, setOpen] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const { loadItems } = useCart()

  useEffect(() => {
    if (open) {
      fetchOrders()
    }
  }, [open])

  async function fetchOrders() {
    setLoading(true)
    try {
      const res = await fetch("/api/orders")
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Failed to fetch orders", error)
    } finally {
      setLoading(false)
    }
  }

  function handleLoadOrder(order: Order) {
    const cartItems = order.items.map((item) => ({
      productId: item.productId,
      productName: item.product.name,
      quantity: item.quantity,
      unit: item.product.unit,
    }))
    loadItems(cartItems)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <History className="w-4 h-4 mr-2" />
          Vorige bestelling laden
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vorige bestellingen</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <p className="text-center py-8 text-muted-foreground">Laden...</p>
        ) : orders.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            Je hebt nog geen eerdere bestellingen
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium">
                      Bestelling #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("nl-NL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Button size="sm" onClick={() => handleLoadOrder(order)}>
                    In winkelmand laden
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.product.name}</span>
                      <Badge variant="outline">
                        {item.quantity} {item.product.unit}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

