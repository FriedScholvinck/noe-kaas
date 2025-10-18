import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-6">Bestellingen</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Bestelling #{order.id.slice(0, 8).toUpperCase()}
                </CardTitle>
                <Badge variant={order.status === "placed" ? "default" : "secondary"}>
                  {order.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {order.user.name || order.user.email} · {new Date(order.createdAt).toLocaleDateString("nl-NL")} {new Date(order.createdAt).toLocaleTimeString("nl-NL")}
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
    </div>
  )
}

