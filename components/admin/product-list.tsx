"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import { EditProductDialog } from "./edit-product-dialog"
import { deleteProduct } from "@/app/admin/products/actions"
import { COUNTRIES } from "@/lib/filters"

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
  image: { id: string; url: string; alt: string } | null
}

type ImageAsset = {
  id: string
  url: string
  alt: string
}

export function ProductList({ products, images }: { products: Product[], images: ImageAsset[] }) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  async function handleDelete(id: string, name: string) {
    if (confirm(`Weet je zeker dat je "${name}" wilt verwijderen?`)) {
      await deleteProduct(id)
    }
  }

  return (
    <>
      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="w-24 h-24 relative flex-shrink-0 bg-cheese-cream rounded">
                  {product.image ? (
                    <Image
                      src={product.image.url}
                      alt={product.image.alt}
                      fill
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl">🧀</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg font-bold">{product.name}</h3>
                        {product.country && (
                          <span className="text-xl">
                            {COUNTRIES.find((c) => c.value === product.country)?.flag}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        SKU: {product.sku} · Slug: {product.slug}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setEditingProduct(product)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDelete(product.id, product.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {product.description && (
                    <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.floraType && <Badge variant="secondary">{product.floraType}</Badge>}
                    {product.packagingType && <Badge variant="outline">{product.packagingType}</Badge>}
                    {product.milkType && <Badge>{product.milkType}</Badge>}
                    {product.ripeningMonths && (
                      <Badge variant="outline">{product.ripeningMonths} mnd</Badge>
                    )}
                    <Badge>{product.unit}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          images={images}
          open={!!editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </>
  )
}

