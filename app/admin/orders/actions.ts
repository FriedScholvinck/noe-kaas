"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { sendOrderStatusEmail, sendCustomOrderEmail } from "@/lib/email"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function updateOrderStatus(orderId: string, status: string) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized")
  }

  const order = await db.order.update({
    where: { id: orderId },
    data: { status },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  await sendOrderStatusEmail({
    customerEmail: order.user.email,
    customerName: order.user.name,
    orderNumber: order.id.slice(0, 8).toUpperCase(),
    status,
    items: order.items.map((item) => ({
      productName: item.product.name,
      quantity: item.quantity,
      unit: item.product.unit,
    })),
  })

  revalidatePath("/admin/orders")
  return order
}

export async function sendOrderEmail(orderId: string, subject: string, message: string) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized")
  }

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!order) {
    throw new Error("Order not found")
  }

  await sendCustomOrderEmail({
    customerEmail: order.user.email,
    customerName: order.user.name,
    orderNumber: order.id.slice(0, 8).toUpperCase(),
    subject,
    message,
    items: order.items.map((item) => ({
      productName: item.product.name,
      quantity: item.quantity,
      unit: item.product.unit,
    })),
  })

  revalidatePath("/admin/orders")
}

