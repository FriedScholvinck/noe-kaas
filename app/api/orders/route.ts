import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendOrderNotificationEmail } from "@/lib/email"
import { z } from "zod"

const orderItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  quantity: z.number().positive(),
  unit: z.string(),
})

const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { items } = orderSchema.parse(body)

    const order = await db.order.create({
      data: {
        userId: session.user.id,
        status: "placed",
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    const orderNumber = order.id.slice(0, 8).toUpperCase()

    await sendOrderNotificationEmail({
      orderNumber,
      orderId: order.id,
      customerName: order.user.name,
      customerEmail: order.user.email,
      items: items.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        unit: item.unit,
      })),
    })

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: order.id,
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const isAdmin = session.user.role === "admin"

    const orders = await db.order.findMany({
      where: isAdmin ? {} : { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Order fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}

