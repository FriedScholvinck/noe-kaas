"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inloggen</CardTitle>
        <CardDescription>
          Alleen voor bestaande zakelijke klanten
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={() => signIn("github", { callbackUrl: "/portaal" })}
          className="w-full"
        >
          Inloggen met GitHub
        </Button>
        
        <p className="text-xs text-center text-muted-foreground">
          Geen account? Neem contact met ons op via het contactformulier.
        </p>
      </CardContent>
    </Card>
  )
}

