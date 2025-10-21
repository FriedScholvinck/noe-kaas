"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ImageIcon, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { createProduct } from "@/app/admin/products/actions"
import { uploadImage } from "@/app/admin/media/actions"
import { FLORA_TYPES, PACKAGING_TYPES, MILK_TYPES, COUNTRIES } from "@/lib/filters"

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
  const [uploadingImage, setUploadingImage] = useState(false)
  const [selectedImageId, setSelectedImageId] = useState<string>("none")
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [isPublic, setIsPublic] = useState(false)

  async function handleImageUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setUploadingImage(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      await uploadImage(formData)
      setShowUploadForm(false)
      ;(e.target as HTMLFormElement).reset()
      window.location.reload()
    } catch (error) {
      console.error(error)
      alert("Upload mislukt")
    } finally {
      setUploadingImage(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      await createProduct({
        sku: formData.get("sku") as string,
        name: formData.get("name") as string,
        description: formData.get("description") as string || null,
        country: (formData.get("country") as string) === "none" ? null : (formData.get("country") as string) || null,
        floraType: (formData.get("floraType") as string) === "none" ? null : (formData.get("floraType") as string) || null,
        packagingType: (formData.get("packagingType") as string) === "none" ? null : (formData.get("packagingType") as string) || null,
        milkType: (formData.get("milkType") as string) === "none" ? null : (formData.get("milkType") as string) || null,
        ripeningMonths: formData.get("ripeningMonths") ? parseInt(formData.get("ripeningMonths") as string) : null,
        tags: (formData.get("tags") as string) || "",
        pricePerKg: formData.get("pricePerKg") ? parseFloat(formData.get("pricePerKg") as string) : null,
        unit: formData.get("unit") as string || "kg",
        imageId: selectedImageId === "none" ? null : selectedImageId,
        isPublic: isPublic,
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
              <Label htmlFor="country">Land van herkomst</Label>
              <Select name="country">
                <SelectTrigger id="country">
                  <SelectValue placeholder="Selecteer land" />
                </SelectTrigger>
                <SelectContent>
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
              <Select name="floraType">
                <SelectTrigger id="floraType">
                  <SelectValue placeholder="Selecteer flora type" />
                </SelectTrigger>
                <SelectContent>
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
              <Select name="packagingType">
                <SelectTrigger id="packagingType">
                  <SelectValue placeholder="Selecteer verpakking" />
                </SelectTrigger>
                <SelectContent>
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
              <Select name="milkType">
                <SelectTrigger id="milkType">
                  <SelectValue placeholder="Selecteer melksoort" />
                </SelectTrigger>
                <SelectContent>
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
              <Input id="ripeningMonths" name="ripeningMonths" type="number" min="0" />
            </div>

            <div>
              <Label htmlFor="pricePerKg">Prijs/kg (€)</Label>
              <Input id="pricePerKg" name="pricePerKg" type="number" step="0.01" min="0" />
            </div>

            <div>
              <Label htmlFor="unit">Bestelgrootte</Label>
              <Select name="unit" defaultValue="kg">
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
            <Input id="tags" name="tags" placeholder="biologisch, ambachtelijk" />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="isPublic" 
              checked={isPublic} 
              onCheckedChange={(checked) => setIsPublic(checked as boolean)}
            />
            <Label htmlFor="isPublic" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Publiek zichtbaar (toon aan iedereen)
            </Label>
          </div>

          <div>
            <Label htmlFor="imageId">Afbeelding</Label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Select 
                  name="imageId" 
                  value={selectedImageId} 
                  onValueChange={setSelectedImageId}
                >
                  <SelectTrigger id="imageId" className="flex-1">
                    <SelectValue placeholder="Selecteer afbeelding" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Geen afbeelding</SelectItem>
                    {images.map((img) => (
                      <SelectItem key={img.id} value={img.id}>
                        {img.alt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUploadForm(!showUploadForm)}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>

              {showUploadForm && (
                <div className="border rounded-lg p-4 bg-muted/50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Nieuwe afbeelding uploaden</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowUploadForm(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <form onSubmit={handleImageUpload} className="space-y-3">
                    <div>
                      <Label htmlFor="file">Bestand *</Label>
                      <Input 
                        id="file" 
                        name="file" 
                        type="file" 
                        accept="image/*"
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="alt">Alt tekst *</Label>
                      <Input 
                        id="alt" 
                        name="alt" 
                        placeholder="Beschrijving van de afbeelding"
                        required 
                      />
                    </div>
                    <Button type="submit" disabled={uploadingImage} size="sm">
                      {uploadingImage ? "Uploaden..." : "Upload"}
                    </Button>
                  </form>
                </div>
              )}

              {selectedImageId !== "none" && (
                <div className="mt-3">
                  <Label>Voorvertoning</Label>
                  <div className="w-32 h-32 relative bg-cheese-cream rounded-lg overflow-hidden mt-2">
                    {(() => {
                      const selectedImage = images.find(img => img.id === selectedImageId)
                      return selectedImage ? (
                        <Image
                          src={selectedImage.url}
                          alt={selectedImage.alt}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )
                    })()}
                  </div>
                </div>
              )}
            </div>
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

