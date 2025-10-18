"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/portaal",
      })

      if (result?.error) {
        alert("Er is een fout opgetreden. Probeer het opnieuw.")
      } else {
        setIsEmailSent(true)
      }
    } catch (error) {
      alert("Er is een fout opgetreden. Probeer het opnieuw.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Check je email</CardTitle>
          <CardDescription>
            We hebben een magic link gestuurd naar {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6">
            <div className="text-5xl mb-4">📧</div>
            <p className="text-sm text-muted-foreground mb-4">
              Klik op de link in de email om in te loggen. De link is 24 uur geldig.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setIsEmailSent(false)}
              className="w-full"
            >
              Andere email proberen
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inloggen</CardTitle>
        <CardDescription>
          Alleen voor bestaande zakelijke klanten
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email adres</Label>
            <Input
              id="email"
              type="email"
              placeholder="jouw@email.nl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="h-12"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12"
            disabled={isLoading}
          >
            {isLoading ? "Versturen..." : "Verstuur magic link"}
          </Button>
        </form>
        
        <p className="text-xs text-center text-muted-foreground mt-4">
          Geen account? Neem contact met ons op via het contactformulier.
        </p>
      </CardContent>
    </Card>
  )
}

