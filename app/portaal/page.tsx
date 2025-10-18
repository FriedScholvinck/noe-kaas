import { Suspense } from "react"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Nav } from "@/components/layout/nav"
import { Footer } from "@/components/layout/footer"
import { HorizontalFilters } from "@/components/catalog/horizontal-filters"
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

  let userOrderHistory = undefined
  if (session?.user?.id) {
    userOrderHistory = await db.order.findMany({
      where: { 
        userId: session.user.id,
        status: "placed"
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

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

          <Suspense fallback={<div>Filters laden...</div>}>
            <HorizontalFilters />
          </Suspense>

          <Suspense fallback={<div>Producten laden...</div>}>
            <ProductGrid 
              products={products} 
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

