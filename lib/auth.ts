import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email"
import { db } from "./db"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  providers: [
    EmailProvider({
      server: "",
      from: process.env.EMAIL_FROM || "noreply@noekaas.nl",
      sendVerificationRequest: async ({ identifier: email, url }) => {
        try {
          await resend.emails.send({
            from: process.env.EMAIL_FROM || "onboarding@resend.dev",
            to: email,
            subject: "Inloggen bij Noë Kaas",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #1e3a5f; font-family: serif;">Noë Kaas</h1>
                <p>Klik op de knop hieronder om in te loggen:</p>
                <a href="${url}" style="display: inline-block; background-color: #1e3a5f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">
                  Inloggen
                </a>
                <p style="color: #666; font-size: 14px;">
                  Deze link is 24 uur geldig. Als je deze email niet hebt aangevraagd, kun je deze negeren.
                </p>
              </div>
            `,
          })
        } catch (error) {
          console.error("Failed to send email:", error)
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { id: true, role: true, email: true, name: true },
        })
        session.user.id = user.id
        session.user.role = dbUser?.role || "client"
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
}

