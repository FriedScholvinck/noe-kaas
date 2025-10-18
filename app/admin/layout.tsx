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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-xl font-serif font-bold text-cheese-navy">
              Noë Kaas Admin
            </Link>
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
          </div>
          <nav className="flex gap-4 flex-wrap">
            <Link 
              href="/admin" 
              className="text-sm hover:text-cheese-navy transition-colors px-3 py-1.5 rounded hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/products" 
              className="text-sm hover:text-cheese-navy transition-colors px-3 py-1.5 rounded hover:bg-gray-100"
            >
              Producten
            </Link>
            <Link 
              href="/admin/orders" 
              className="text-sm hover:text-cheese-navy transition-colors px-3 py-1.5 rounded hover:bg-gray-100"
            >
              Bestellingen
            </Link>
            <Link 
              href="/admin/clients" 
              className="text-sm hover:text-cheese-navy transition-colors px-3 py-1.5 rounded hover:bg-gray-100"
            >
              Klanten
            </Link>
            <Link 
              href="/admin/media" 
              className="text-sm hover:text-cheese-navy transition-colors px-3 py-1.5 rounded hover:bg-gray-100"
            >
              Media
            </Link>
            <Link 
              href="/portaal" 
              className="text-sm hover:text-cheese-navy transition-colors px-3 py-1.5 rounded hover:bg-gray-100"
            >
              Portaal
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

