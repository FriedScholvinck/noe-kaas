"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { deleteImage } from "@/app/admin/media/actions"

type ImageAsset = {
  id: string
  provider: string
  key: string
  url: string
  alt: string
  createdAt: Date
}

export function MediaList({ images }: { images: ImageAsset[] }) {
  async function handleDelete(id: string, url: string, provider: string) {
    if (confirm("Weet je zeker dat je deze afbeelding wilt verwijderen?")) {
      await deleteImage(id, url, provider)
    }
  }

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <Card key={image.id}>
          <CardContent className="p-4">
            <div className="aspect-square relative bg-cheese-cream rounded mb-3">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover rounded"
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium truncate">{image.alt}</p>
              <Badge variant="secondary" className="text-xs">
                {image.provider}
              </Badge>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleDelete(image.id, image.url, image.provider)}
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Verwijder
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

