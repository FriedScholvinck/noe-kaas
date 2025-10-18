import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github"
import { db } from "./db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
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

