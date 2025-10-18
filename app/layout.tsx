import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Noë Kaas - Nederlandse Kaasgroothandel",
  description: "Familiebedrijf uit Weesp. Leveren kwaliteitskaas aan winkels en horeca in Amsterdam en omstreken.",
  openGraph: {
    title: "Noë Kaas",
    description: "Nederlandse kaasgroothandel - ambacht, kwaliteit, betrouwbaarheid",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

