import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

const CHEESE_WIKI_IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Goudse_kaas.jpg/300px-Goudse_kaas.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Edam_cheese.jpg/300px-Edam_cheese.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Aged_Gouda.jpg/300px-Aged_Gouda.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cheese_from_the_Netherlands.jpg/300px-Cheese_from_the_Netherlands.jpg",
]

export async function GET(request: NextRequest) {
  try {
    const useExternal = process.env.USE_EXTERNAL_CHEESE_IMAGES === "true"
    
    if (!useExternal) {
      return NextResponse.json({
        success: false,
        message: "External images disabled",
      })
    }

    let imported = 0
    
    for (let i = 0; i < CHEESE_WIKI_IMAGES.length; i++) {
      const url = CHEESE_WIKI_IMAGES[i]
      
      const existing = await db.imageAsset.findFirst({
        where: { url },
      })
      
      if (!existing) {
        await db.imageAsset.create({
          data: {
            provider: "external",
            key: `wiki-cheese-${i + 1}`,
            url,
            alt: `Nederlandse kaas ${i + 1}`,
          },
        })
        imported++
      }
    }

    return NextResponse.json({
      success: true,
      imported,
      total: CHEESE_WIKI_IMAGES.length,
    })
  } catch (error) {
    console.error("Cheese import error:", error)
    return NextResponse.json(
      { error: "Import failed" },
      { status: 500 }
    )
  }
}

