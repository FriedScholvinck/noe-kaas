"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      source: "contact-form",
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSuccess(true)
        ;(e.target as HTMLFormElement).reset()
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error("Failed to submit form", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stuur een bericht</CardTitle>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="p-4 bg-green-50 text-green-800 rounded">
            Bedankt voor uw bericht! We nemen spoedig contact op.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Naam</Label>
              <Input id="name" name="name" required />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            
            <div>
              <Label htmlFor="message">Bericht</Label>
              <Textarea id="message" name="message" rows={5} required />
            </div>
            
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Verzenden..." : "Verstuur bericht"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

