import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  if (session.user.role !== "admin") {
    redirect("/portaal")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-serif font-bold text-cheese-navy">
              Noë Kaas Admin
            </Link>
            <nav className="flex gap-4">
              <Link href="/admin" className="text-sm hover:text-cheese-navy">
                Dashboard
              </Link>
              <Link href="/portaal" className="text-sm hover:text-cheese-navy">
                Portaal
              </Link>
            </nav>
          </div>
          <span className="text-sm text-muted-foreground">
            {session.user.email}
          </span>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

