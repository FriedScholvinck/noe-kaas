"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateProductDialog } from "./create-product-dialog"

type ImageAsset = {
  id: string
  url: string
  alt: string
}

export function CreateProductButton({ images }: { images: ImageAsset[] }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Nieuw product
      </Button>
      
      <CreateProductDialog images={images} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

