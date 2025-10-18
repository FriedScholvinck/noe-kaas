"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OrderDetailsDialog } from "@/components/admin/order-details-dialog"
import { Eye } from "lucide-react"

type Order = {
  id: string
  status: string
  createdAt: Date
  user: {
    id: string
    name: string | null
    email: string
  }
  items: Array<{
    id: string
    quantity: number
    product: {
      name: string
      unit: string
    }
  }>
}

async function getOrders(): Promise<Order[]> {
  const res = await fetch("/api/orders", { cache: "no-store" })
  return res.json()
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    setLoading(true)
    try {
      const data = await getOrders()
      setOrders(data)
    } catch (error) {
      console.error("Failed to load orders:", error)
    } finally {
      setLoading(false)
    }
  }

  function handleCloseDialog() {
    setSelectedOrder(null)
    loadOrders()
  }

  if (loading) {
    return <div>Laden...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-6">Bestellingen</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    Bestelling #{order.id.slice(0, 8).toUpperCase()}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground mt-1">
                    {order.user.name || order.user.email} · {new Date(order.createdAt).toLocaleDateString("nl-NL")} {new Date(order.createdAt).toLocaleTimeString("nl-NL")}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={order.status === "placed" ? "default" : "secondary"}>
                    {order.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Beheer
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product.name}</span>
                    <span className="text-muted-foreground">
                      {item.quantity} {item.product.unit}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {orders.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Nog geen bestellingen
          </p>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          open={!!selectedOrder}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  )
}

