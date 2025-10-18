import { db } from "@/lib/db"
import { MediaList } from "@/components/admin/media-list"
import { UploadButton } from "@/components/admin/upload-button"

export default async function AdminMediaPage() {
  const images = await db.imageAsset.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif font-bold">Media beheer</h1>
        <UploadButton />
      </div>
      
      <MediaList images={images} />
    </div>
  )
}

