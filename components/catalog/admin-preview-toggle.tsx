"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AdminPreviewToggleProps {
  isAdmin: boolean
  previewMode: boolean
  onTogglePreview: (enabled: boolean) => void
}

export function AdminPreviewToggle({ isAdmin, previewMode, onTogglePreview }: AdminPreviewToggleProps) {
  if (!isAdmin) return null

  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {previewMode ? (
              <Eye className="w-5 h-5 text-blue-600" />
            ) : (
              <EyeOff className="w-5 h-5 text-gray-600" />
            )}
            <span className="font-medium text-gray-900">
              {previewMode ? "Preview modus actief" : "Admin modus"}
            </span>
          </div>
          <Badge variant={previewMode ? "default" : "secondary"} className={previewMode ? "bg-blue-100 text-blue-800 border-blue-200" : ""}>
            {previewMode ? "Zie wat bezoekers zien" : "Zie alle producten"}
          </Badge>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onTogglePreview(!previewMode)}
          className={previewMode ? "border-blue-300 text-blue-700 hover:bg-blue-100" : ""}
        >
          {previewMode ? "Terug naar admin modus" : "Preview bezoekers weergave"}
        </Button>
      </div>
      
      {previewMode && (
        <p className="text-sm text-blue-700 mt-2">
          Je ziet nu alleen de producten die publiek zichtbaar zijn voor bezoekers zonder account.
        </p>
      )}
    </div>
  )
}
