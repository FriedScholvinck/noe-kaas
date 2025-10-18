import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export async function Nav() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="text-2xl font-serif font-bold text-cheese-navy">
          Noë Kaas
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/portaal" className="text-sm hover:text-cheese-navy">
            Assortiment
          </Link>
          <Link href="/old-friends" className="text-sm hover:text-cheese-navy">
            Old Friends
          </Link>
          <Link href="/partners" className="text-sm hover:text-cheese-navy">
            Partners
          </Link>
          <Link href="/contact" className="text-sm hover:text-cheese-navy">
            Contact
          </Link>
          
          {session ? (
            <>
              {session.user.role === "admin" && (
                <Link href="/admin">
                  <Button variant="outline" size="sm">Admin</Button>
                </Link>
              )}
              <span className="text-sm text-muted-foreground">
                {session.user.email}
              </span>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

