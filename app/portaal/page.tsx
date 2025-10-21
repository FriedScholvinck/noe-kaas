import { Suspense } from "react"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PortaalClient } from "@/components/catalog/portaal-client"

export default async function PortaalPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const session = await getServerSession(authOptions)
  
  // Always fetch all products for admins, or only public products for non-logged-in users
  const products = await db.product.findMany({
    where: session?.user?.role === "admin" ? {} : { isPublic: true },
    include: {
      image: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  let userOrderHistory = undefined
  if (session?.user?.id) {
    userOrderHistory = await db.order.findMany({
      where: { 
        userId: session.user.id,
        status: "placed"
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  return (
    <PortaalClient 
      products={products}
      session={session}
      searchParams={searchParams}
      userOrderHistory={userOrderHistory}
    />
  )
}

