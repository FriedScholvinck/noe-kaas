"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createProduct } from "@/app/admin/products/actions"
import { CHEESE_TYPES } from "@/lib/filters"

type ImageAsset = {
  id: string
  url: string
  alt: string
}

export function CreateProductDialog({ 
  images, 
  open, 
  onClose 
}: { 
  images: ImageAsset[]
  open: boolean
  onClose: () => void 
}) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      await createProduct({
        sku: formData.get("sku") as string,
        name: formData.get("name") as string,
        description: formData.get("description") as string || null,
        region: formData.get("region") as string || null,
        type: formData.get("type") as string || null,
        ripeningMonths: formData.get("ripeningMonths") ? parseInt(formData.get("ripeningMonths") as string) : null,
        tags: (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean),
        pricePerKg: formData.get("pricePerKg") ? parseFloat(formData.get("pricePerKg") as string) : null,
        unit: formData.get("unit") as string || "kg",
        imageId: formData.get("imageId") as string || null,
      })
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nieuw product toevoegen</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sku">SKU *</Label>
              <Input id="sku" name="sku" required />
            </div>
            
            <div>
              <Label htmlFor="name">Naam *</Label>
              <Input id="name" name="name" required />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Beschrijving</Label>
            <Textarea id="description" name="description" rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="region">Regio</Label>
              <Input id="region" name="region" placeholder="Noord-Holland" />
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select name="type">
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecteer type" />
                </SelectTrigger>
                <SelectContent>
                  {CHEESE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="ripeningMonths">Rijping (mnd)</Label>
              <Input id="ripeningMonths" name="ripeningMonths" type="number" min="0" />
            </div>

            <div>
              <Label htmlFor="pricePerKg">Prijs/kg (€)</Label>
              <Input id="pricePerKg" name="pricePerKg" type="number" step="0.01" min="0" />
            </div>

            <div>
              <Label htmlFor="unit">Eenheid</Label>
              <Select name="unit" defaultValue="kg">
                <SelectTrigger id="unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="piece">stuk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags (komma gescheiden)</Label>
            <Input id="tags" name="tags" placeholder="biologisch, ambachtelijk" />
          </div>

          <div>
            <Label htmlFor="imageId">Afbeelding</Label>
            <Select name="imageId">
              <SelectTrigger id="imageId">
                <SelectValue placeholder="Selecteer afbeelding" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Geen afbeelding</SelectItem>
                {images.map((img) => (
                  <SelectItem key={img.id} value={img.id}>
                    {img.alt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuleren
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Opslaan..." : "Product toevoegen"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

