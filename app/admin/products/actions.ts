"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { slugify } from "@/lib/utils"

type ProductInput = {
  sku: string
  name: string
  description: string | null
  region: string | null
  type: string | null
  ripeningMonths: number | null
  tags: string
  pricePerKg: number | null
  unit: string
  imageId: string | null
}

export async function createProduct(data: ProductInput) {
  const slug = slugify(data.name)
  
  await db.product.create({
    data: {
      ...data,
      slug,
      imageId: data.imageId || undefined,
    },
  })

  revalidatePath("/admin/products")
  revalidatePath("/portaal")
}

export async function updateProduct(id: string, data: ProductInput) {
  const slug = slugify(data.name)
  
  await db.product.update({
    where: { id },
    data: {
      ...data,
      slug,
      imageId: data.imageId || undefined,
    },
  })

  revalidatePath("/admin/products")
  revalidatePath("/portaal")
}

export async function deleteProduct(id: string) {
  await db.product.delete({
    where: { id },
  })

  revalidatePath("/admin/products")
  revalidatePath("/portaal")
}

