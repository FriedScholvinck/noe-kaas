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

export async function sendOrderStatusEmail(data: {
  customerEmail: string
  customerName: string | null
  orderNumber: string
  status: string
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

    const statusMessages: Record<string, { title: string; message: string }> = {
      placed: {
        title: "Bestelling ontvangen",
        message: "We hebben je bestelling goed ontvangen en gaan deze voor je klaarmaken.",
      },
      processing: {
        title: "Bestelling in behandeling",
        message: "Je bestelling wordt op dit moment verwerkt.",
      },
      ready: {
        title: "Bestelling klaar",
        message: "Je bestelling is klaar! Je kunt deze ophalen of we sturen deze binnenkort op.",
      },
      completed: {
        title: "Bestelling voltooid",
        message: "Je bestelling is afgerond. Bedankt voor je aankoop!",
      },
      cancelled: {
        title: "Bestelling geannuleerd",
        message: "Je bestelling is geannuleerd. Neem contact met ons op als je vragen hebt.",
      },
    }

    const statusInfo = statusMessages[data.status] || {
      title: "Status update",
      message: `De status van je bestelling is gewijzigd naar: ${data.status}`,
    }

    await resend.emails.send({
      from: "Noë Kaas <noreply@jeroennoekaas.nl>",
      to: data.customerEmail,
      subject: `${statusInfo.title} - Bestelling #${data.orderNumber}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e3a5f; font-family: serif;">Noë Kaas</h1>
          <h2>${statusInfo.title}</h2>
          <p>Beste ${data.customerName || "klant"},</p>
          <p>${statusInfo.message}</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Bestelnummer:</strong> ${data.orderNumber}</p>
            <h3>Je bestelling:</h3>
            <ul>
              ${itemsHtml}
            </ul>
          </div>
          <p>Heb je vragen? Neem gerust contact met ons op.</p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Met vriendelijke groet,<br>
            Jeroen Noë Kaas
          </p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send status email:", error)
    return { success: false, error }
  }
}

export async function sendCustomOrderEmail(data: {
  customerEmail: string
  customerName: string | null
  orderNumber: string
  subject: string
  message: string
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
      to: data.customerEmail,
      subject: `${data.subject} - Bestelling #${data.orderNumber}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e3a5f; font-family: serif;">Noë Kaas</h1>
          <p>Beste ${data.customerName || "klant"},</p>
          <p>${data.message.replace(/\n/g, "<br>")}</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Bestelnummer:</strong> ${data.orderNumber}</p>
            <h3>Je bestelling:</h3>
            <ul>
              ${itemsHtml}
            </ul>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Met vriendelijke groet,<br>
            Jeroen Noë Kaas
          </p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send custom email:", error)
    return { success: false, error }
  }
}

