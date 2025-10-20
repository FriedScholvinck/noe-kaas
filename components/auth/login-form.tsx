"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Onjuiste email of wachtwoord")
      } else if (result?.ok) {
        router.push("/portaal")
        router.refresh()
      }
    } catch (error) {
      setError("Er is een fout opgetreden. Probeer het opnieuw.")
    } finally {
      setIsLoading(false)
    }
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

          <div>
            <Label htmlFor="password">Wachtwoord</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="h-12"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-12"
            disabled={isLoading}
          >
            {isLoading ? "Inloggen..." : "Inloggen"}
          </Button>
        </form>
        
        <p className="text-xs text-center text-muted-foreground mt-4">
          Geen account? Neem contact met ons op via het contactformulier.
        </p>
      </CardContent>
    </Card>
  )
}

