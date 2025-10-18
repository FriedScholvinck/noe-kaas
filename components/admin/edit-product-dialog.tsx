"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateProduct } from "@/app/admin/products/actions"
import { FLORA_TYPES, PACKAGING_TYPES, MILK_TYPES, COUNTRIES } from "@/lib/filters"

type Product = {
  id: string
  name: string
  slug: string
  sku: string
  description: string | null
  country: string | null
  floraType: string | null
  packagingType: string | null
  milkType: string | null
  ripeningMonths: number | null
  tags: string
  pricePerKg: number | null
  unit: string
  image: { id: string } | null
}

type ImageAsset = {
  id: string
  url: string
  alt: string
}

export function EditProductDialog({ 
  product, 
  images, 
  open, 
  onClose 
}: { 
  product: Product
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
      await updateProduct(product.id, {
        sku: formData.get("sku") as string,
        name: formData.get("name") as string,
        description: formData.get("description") as string || null,
        country: formData.get("country") as string || null,
        floraType: formData.get("floraType") as string || null,
        packagingType: formData.get("packagingType") as string || null,
        milkType: formData.get("milkType") as string || null,
        ripeningMonths: formData.get("ripeningMonths") ? parseInt(formData.get("ripeningMonths") as string) : null,
        tags: (formData.get("tags") as string) || "",
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
          <DialogTitle>Product bewerken</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sku">SKU *</Label>
              <Input id="sku" name="sku" defaultValue={product.sku} required />
            </div>
            
            <div>
              <Label htmlFor="name">Naam *</Label>
              <Input id="name" name="name" defaultValue={product.name} required />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Beschrijving</Label>
            <Textarea id="description" name="description" defaultValue={product.description || ""} rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="country">Land van herkomst</Label>
              <Select name="country" defaultValue={product.country || ""}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Selecteer land" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Geen land</SelectItem>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.flag} {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="floraType">Flora type</Label>
              <Select name="floraType" defaultValue={product.floraType || ""}>
                <SelectTrigger id="floraType">
                  <SelectValue placeholder="Selecteer flora type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Geen type</SelectItem>
                  {FLORA_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="packagingType">Verpakking</Label>
              <Select name="packagingType" defaultValue={product.packagingType || ""}>
                <SelectTrigger id="packagingType">
                  <SelectValue placeholder="Selecteer verpakking" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Geen verpakking</SelectItem>
                  {PACKAGING_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="milkType">Melksoort</Label>
              <Select name="milkType" defaultValue={product.milkType || ""}>
                <SelectTrigger id="milkType">
                  <SelectValue placeholder="Selecteer melksoort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Geen melksoort</SelectItem>
                  {MILK_TYPES.map((type) => (
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
              <Input 
                id="ripeningMonths" 
                name="ripeningMonths" 
                type="number" 
                min="0"
                defaultValue={product.ripeningMonths || ""} 
              />
            </div>

            <div>
              <Label htmlFor="pricePerKg">Prijs/kg (€)</Label>
              <Input 
                id="pricePerKg" 
                name="pricePerKg" 
                type="number" 
                step="0.01" 
                min="0"
                defaultValue={product.pricePerKg || ""} 
              />
            </div>

            <div>
              <Label htmlFor="unit">Bestelgrootte</Label>
              <Select name="unit" defaultValue={product.unit}>
                <SelectTrigger id="unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">per kg</SelectItem>
                  <SelectItem value="piece">per stuk</SelectItem>
                  <SelectItem value="wheel">per wiel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags (komma gescheiden)</Label>
            <Input id="tags" name="tags" defaultValue={product.tags} />
          </div>

          <div>
            <Label htmlFor="imageId">Afbeelding</Label>
            <Select name="imageId" defaultValue={product.image?.id || ""}>
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
              {loading ? "Opslaan..." : "Wijzigingen opslaan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

