import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = "hein@jeroennoekaas.nl"

export async function sendContactFormEmail(data: {
  name: string
  email: string
  message: string
}) {
  try {
    await resend.emails.send({
      from: "Noë Kaas <noreply@jeroennoekaas.nl>",
      to: ADMIN_EMAIL,
      subject: `Nieuw contactbericht van ${data.name}`,
      html: `
        <h2>Nieuw contactbericht</h2>
        <p><strong>Naam:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Bericht:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send contact email:", error)
    return { success: false, error }
  }
}

export async function sendOrderNotificationEmail(data: {
  orderNumber: string
  orderId: string
  customerName: string | null
  customerEmail: string
  items: Array<{
    productName: string
    quantity: number
    unit: string
  }>
}) {
  try {
    const itemsHtml = data.items
      .map(
        (item) =>
          `<li>${item.productName}: ${item.quantity} ${item.unit}</li>`
      )
      .join("")

    await resend.emails.send({
      from: "Noë Kaas <noreply@jeroennoekaas.nl>",
      to: ADMIN_EMAIL,
      subject: `Nieuwe bestelling #${data.orderNumber}`,
      html: `
        <h2>Nieuwe bestelling ontvangen</h2>
        <p><strong>Bestelnummer:</strong> ${data.orderNumber}</p>
        <p><strong>Klant:</strong> ${data.customerName || "Onbekend"}</p>
        <p><strong>Email:</strong> ${data.customerEmail}</p>
        <h3>Producten:</h3>
        <ul>
          ${itemsHtml}
        </ul>
        <p><a href="https://jeroennoekaas.nl/admin/orders">Bekijk in admin panel</a></p>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send order email:", error)
    return { success: false, error }
  }
}

