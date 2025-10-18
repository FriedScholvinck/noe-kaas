"use client"

import { useMemo } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { applyProductFilters, type ProductFilters, COUNTRIES } from "@/lib/filters"
import { AddToCartButton } from "./add-to-cart-button"

type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  country: string | null
  floraType: string | null
  packagingType: string | null
  milkType: string | null
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
  userOrderHistory,
}: {
  products: Product[]
  searchParams: { [key: string]: string | undefined }
  isLoggedIn: boolean
  userOrderHistory?: any[]
}) {
  const filteredProducts = useMemo(() => {
    const filters: ProductFilters = {
      search: searchParams.search,
      floraType: searchParams.floraType,
      packagingType: searchParams.packagingType,
      milkType: searchParams.milkType,
      country: searchParams.country,
      sortBy: searchParams.sortBy as any,
    }
    return applyProductFilters(products, filters, userOrderHistory)
  }, [products, searchParams.search, searchParams.floraType, searchParams.packagingType, searchParams.milkType, searchParams.country, searchParams.sortBy, userOrderHistory])

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Geen producten gevonden met deze filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="aspect-square relative bg-white">
            {product.image ? (
              <Image
                src={product.image.url}
                alt={product.image.alt}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
                unoptimized={product.image.url.includes('wikimedia')}
              />
            ) : null}
            {(!product.image || product.image.url.includes('wikimedia')) && (
              <div className="w-full h-full flex items-center justify-center bg-cheese-cream">
                <span className="text-4xl">🧀</span>
              </div>
            )}
          </div>
          
          <CardContent className="pt-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-serif text-xl font-bold">{product.name}</h3>
              {product.country && (
                <span className="text-2xl">
                  {COUNTRIES.find((c) => c.value === product.country)?.flag}
                </span>
              )}
            </div>
            
            {product.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {product.floraType && (
                <Badge variant="secondary">{product.floraType}</Badge>
              )}
              {product.packagingType && (
                <Badge variant="outline">{product.packagingType}</Badge>
              )}
              {product.milkType && (
                <Badge>{product.milkType}</Badge>
              )}
              {product.ripeningMonths && (
                <Badge variant="outline">{product.ripeningMonths} mnd</Badge>
              )}
            </div>

            {product.tags && (
              <div className="flex flex-wrap gap-1">
                {product.tags.split(',').map((tag: string) => (
                  <span key={tag} className="text-xs text-muted-foreground">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter>
            {isLoggedIn && (
              <AddToCartButton productId={product.id} productName={product.name} unit={product.unit} />
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

