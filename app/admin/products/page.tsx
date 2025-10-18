import { db } from "@/lib/db"
import { ProductList } from "@/components/admin/product-list"
import { CreateProductButton } from "@/components/admin/create-product-button"

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    include: {
      image: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  const images = await db.imageAsset.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif font-bold">Producten beheer</h1>
        <CreateProductButton images={images} />
      </div>
      
      <ProductList products={products} images={images} />
    </div>
  )
}

