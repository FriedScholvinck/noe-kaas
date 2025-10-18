import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect("/portaal")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cheese-cream">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-cheese-navy mb-2">
            Noë Kaas
          </h1>
          <p className="text-muted-foreground">
            Login om te bestellen
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  )
}

