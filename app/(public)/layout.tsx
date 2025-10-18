import { Nav } from "@/components/layout/nav"
import { Footer } from "@/components/layout/footer"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <Nav session={session} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}

