"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavProps {
  session?: {
    user: {
      email: string
      role: string
    }
  } | null
}

export function Nav({ session }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-2 sm:py-4 px-4">
        <Link href="/" className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-cheese-navy">
          Noë Kaas
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
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

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-8 w-8 sm:h-10 sm:w-10"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
        </Button>
      </div>

      <div className={`md:hidden border-t bg-white transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="container mx-auto px-4 py-3 space-y-3">
          <Link 
            href="/portaal" 
            className="block text-sm hover:text-cheese-navy py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Assortiment
          </Link>
          <Link 
            href="/old-friends" 
            className="block text-sm hover:text-cheese-navy py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Old Friends
          </Link>
          <Link 
            href="/partners" 
            className="block text-sm hover:text-cheese-navy py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Partners
          </Link>
          <Link 
            href="/contact" 
            className="block text-sm hover:text-cheese-navy py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          
          {session ? (
            <div className="pt-3 border-t space-y-2">
              {session.user.role === "admin" && (
                <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Admin</Button>
                </Link>
              )}
              <div className="text-sm text-muted-foreground">
                {session.user.email}
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full">Login</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

