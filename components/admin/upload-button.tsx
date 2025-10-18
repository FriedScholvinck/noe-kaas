"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { uploadImage } from "@/app/admin/media/actions"

export function UploadButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      await uploadImage(formData)
      setOpen(false)
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error(error)
      alert("Upload mislukt")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Upload className="w-4 h-4 mr-2" />
        Upload afbeelding
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Afbeelding uploaden</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="file">Bestand *</Label>
              <Input 
                id="file" 
                name="file" 
                type="file" 
                accept="image/*"
                required 
              />
            </div>

            <div>
              <Label htmlFor="alt">Alt tekst *</Label>
              <Input 
                id="alt" 
                name="alt" 
                placeholder="Beschrijving van de afbeelding"
                required 
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuleren
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Uploaden..." : "Upload"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

