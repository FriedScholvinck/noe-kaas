"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { updateOrderStatus, sendOrderEmail } from "@/app/admin/orders/actions"
import { Mail, RefreshCw } from "lucide-react"

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

export function OrderDetailsDialog({
  order,
  open,
  onClose,
}: {
  order: Order
  open: boolean
  onClose: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")

  async function handleStatusChange(newStatus: string) {
    setLoading(true)
    try {
      await updateOrderStatus(order.id, newStatus)
      onClose()
    } catch (error) {
      console.error(error)
      alert("Fout bij het updaten van de status")
    } finally {
      setLoading(false)
    }
  }

  async function handleSendEmail() {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      alert("Vul een onderwerp en bericht in")
      return
    }

    setLoading(true)
    try {
      await sendOrderEmail(order.id, emailSubject, emailMessage)
      setShowEmailForm(false)
      setEmailSubject("")
      setEmailMessage("")
      alert("Email verzonden!")
    } catch (error) {
      console.error(error)
      alert("Fout bij het verzenden van de email")
    } finally {
      setLoading(false)
    }
  }

  const orderNumber = order.id.slice(0, 8).toUpperCase()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bestelling #{orderNumber}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Klantgegevens</h3>
            <p className="text-sm">
              <strong>Naam:</strong> {order.user.name || "Onbekend"}
            </p>
            <p className="text-sm">
              <strong>Email:</strong> {order.user.email}
            </p>
            <p className="text-sm">
              <strong>Datum:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString("nl-NL")} om{" "}
              {new Date(order.createdAt).toLocaleTimeString("nl-NL")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Producten</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm border-b pb-2"
                >
                  <span>{item.product.name}</span>
                  <span className="text-muted-foreground">
                    {item.quantity} {item.product.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status wijzigen</Label>
            <div className="flex gap-2 items-center mt-2">
              <Badge variant={order.status === "placed" ? "default" : "secondary"}>
                Huidige status: {order.status}
              </Badge>
              <Select
                onValueChange={handleStatusChange}
                disabled={loading}
              >
                <SelectTrigger id="status" className="w-[200px]">
                  <SelectValue placeholder="Nieuwe status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="placed">Geplaatst</SelectItem>
                  <SelectItem value="processing">In behandeling</SelectItem>
                  <SelectItem value="ready">Klaar</SelectItem>
                  <SelectItem value="completed">Voltooid</SelectItem>
                  <SelectItem value="cancelled">Geannuleerd</SelectItem>
                </SelectContent>
              </Select>
              {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              De klant ontvangt automatisch een email bij statuswijziging
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Email naar klant</h3>
              {!showEmailForm && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEmailForm(true)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email versturen
                </Button>
              )}
            </div>

            {showEmailForm && (
              <div className="space-y-3 border rounded-lg p-4">
                <div>
                  <Label htmlFor="emailSubject">Onderwerp</Label>
                  <Input
                    id="emailSubject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Bijv. Update over je bestelling"
                  />
                </div>

                <div>
                  <Label htmlFor="emailMessage">Bericht</Label>
                  <Textarea
                    id="emailMessage"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder="Typ hier je bericht aan de klant..."
                    rows={5}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowEmailForm(false)
                      setEmailSubject("")
                      setEmailMessage("")
                    }}
                    disabled={loading}
                  >
                    Annuleren
                  </Button>
                  <Button onClick={handleSendEmail} disabled={loading}>
                    {loading ? "Verzenden..." : "Email versturen"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Sluiten
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

