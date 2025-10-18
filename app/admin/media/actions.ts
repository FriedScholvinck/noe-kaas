"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { put, del } from "@vercel/blob"

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File
  const alt = formData.get("alt") as string

  if (!file) {
    throw new Error("No file provided")
  }

  const blob = await put(file.name, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  })

  await db.imageAsset.create({
    data: {
      provider: "blob",
      key: blob.pathname,
      url: blob.url,
      alt,
    },
  })

  revalidatePath("/admin/media")
  revalidatePath("/admin/products")
}

export async function deleteImage(id: string, url: string, provider: string) {
  if (provider === "blob") {
    try {
      await del(url, {
        token: process.env.BLOB_READ_WRITE_TOKEN!,
      })
    } catch (error) {
      console.error("Blob deletion failed:", error)
    }
  }

  await db.imageAsset.delete({
    where: { id },
  })

  revalidatePath("/admin/media")
  revalidatePath("/admin/products")
}

