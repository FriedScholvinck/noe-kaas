"use client"

import { useMemo } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { applyProductFilters, type ProductFilters } from "@/lib/filters"
import { AddToCartButton } from "./add-to-cart-button"

type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  region: string | null
  type: string | null
  ripeningMonths: number | null
  tags: string
  pricePerKg: number | null
  unit: string
  image: { url: string; alt: string } | null
}

export function ProductGrid({
  products,
  searchParams,
  isLoggedIn,
}: {
  products: Product[]
  searchParams: { [key: string]: string | undefined }
  isLoggedIn: boolean
}) {
  const filters: ProductFilters = {
    search: searchParams.search,
    type: searchParams.type,
    region: searchParams.region,
    sortBy: searchParams.sortBy as any,
  }

  const filteredProducts = useMemo(() => {
    return applyProductFilters(products, filters)
  }, [products, filters])

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Geen producten gevonden met deze filters.</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="aspect-square relative bg-white">
            {product.image ? (
              <Image
                src={product.image.url}
                alt={product.image.alt}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-cheese-cream">
                <span className="text-4xl">🧀</span>
              </div>
            )}
          </div>
          
          <CardContent className="pt-4">
            <h3 className="font-serif text-xl font-bold mb-2">{product.name}</h3>
            
            {product.region && (
              <p className="text-sm text-muted-foreground mb-2">📍 {product.region}</p>
            )}
            
            {product.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {product.type && (
                <Badge variant="secondary">{product.type}</Badge>
              )}
              {product.ripeningMonths && (
                <Badge variant="outline">{product.ripeningMonths} mnd rijping</Badge>
              )}
            </div>

            {product.tags && (
              <div className="flex flex-wrap gap-1">
                {product.tags.split(',').map((tag) => (
                  <span key={tag} className="text-xs text-muted-foreground">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter>
            {isLoggedIn ? (
              <AddToCartButton productId={product.id} productName={product.name} unit={product.unit} />
            ) : (
              <Badge variant="outline" className="w-full justify-center py-2">
                Login om te bestellen
              </Badge>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

