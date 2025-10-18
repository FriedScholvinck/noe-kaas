import { Suspense } from "react"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Nav } from "@/components/layout/nav"
import { Footer } from "@/components/layout/footer"
import { CatalogFilters } from "@/components/catalog/catalog-filters"
import { ProductGrid } from "@/components/catalog/product-grid"

export default async function PortaalPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const session = await getServerSession(authOptions)
  
  const products = await db.product.findMany({
    include: {
      image: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cheese-cream">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2 text-cheese-navy">
              Ons assortiment
            </h1>
            <p className="text-muted-foreground">
              {session && "Klik op een product om te bestellen"}
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <Suspense fallback={<div>Filters laden...</div>}>
                <CatalogFilters />
              </Suspense>
            </aside>

            <div className="lg:col-span-3">
              <Suspense fallback={<div>Producten laden...</div>}>
                <ProductGrid 
                  products={products} 
                  searchParams={searchParams}
                  isLoggedIn={!!session}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

