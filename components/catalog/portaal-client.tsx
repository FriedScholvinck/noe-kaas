"use client"

import { useState, Suspense } from "react"
import { Nav } from "@/components/layout/nav"
import { Footer } from "@/components/layout/footer"
import { HorizontalFilters } from "@/components/catalog/horizontal-filters"
import { ProductGrid } from "@/components/catalog/product-grid"
import { AdminPreviewToggle } from "@/components/catalog/admin-preview-toggle"

type Product = {
  id: string
  sku: string
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
  imageId: string | null
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  image: { url: string; alt: string } | null
}

interface PortaalClientProps {
  products: Product[]
  session: any
  searchParams: { [key: string]: string | undefined }
  userOrderHistory?: any[]
}

export function PortaalClient({ products, session, searchParams, userOrderHistory }: PortaalClientProps) {
  const [previewMode, setPreviewMode] = useState(false)
  
  // Filter products based on preview mode
  const filteredProducts = previewMode 
    ? products.filter(product => product.isPublic)
    : products

  const isAdmin = session?.user?.role === "admin"

  return (
    <>
      <Nav session={session} />
      <main className="min-h-screen bg-cheese-cream">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2 text-cheese-navy">
              Ons assortiment
            </h1>
            <p className="text-muted-foreground">
              {session && "Klik op een product om te bestellen"}
            </p>
          </div>

          <AdminPreviewToggle 
            isAdmin={isAdmin}
            previewMode={previewMode}
            onTogglePreview={setPreviewMode}
          />

          <Suspense fallback={<div>Filters laden...</div>}>
            <HorizontalFilters />
          </Suspense>

          <Suspense fallback={<div>Producten laden...</div>}>
            <ProductGrid 
              products={filteredProducts} 
              searchParams={searchParams}
              isLoggedIn={!!session}
              userOrderHistory={userOrderHistory}
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
