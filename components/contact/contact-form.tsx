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
      <CardContent className="pt-6">
        {success ? (
          <div className="p-6 text-center">
            <div className="text-4xl mb-4">✓</div>
            <p className="text-lg">Bericht verstuurd</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input id="name" name="name" placeholder="Naam" required className="h-12" />
            </div>
            
            <div>
              <Input id="email" name="email" type="email" placeholder="Email" required className="h-12" />
            </div>
            
            <div>
              <Textarea id="message" name="message" rows={5} placeholder="Bericht" required />
            </div>
            
            <Button type="submit" disabled={loading} className="w-full h-12">
              {loading ? "Verzenden..." : "Verstuur"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

