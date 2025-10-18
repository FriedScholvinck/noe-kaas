import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const ADMIN_EMAILS = [
  "fried.scholvinck@gmail.com",
  "hein@jeroennoekaas.nl"
]

async function setAdmins() {
  console.log("Setting admin roles for specified emails...")

  for (const email of ADMIN_EMAILS) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        if (existingUser.role !== "admin") {
          await prisma.user.update({
            where: { email },
            data: { role: "admin" },
          })
          console.log(`✓ Updated ${email} to admin`)
        } else {
          console.log(`✓ ${email} is already admin`)
        }
      } else {
        await prisma.user.create({
          data: {
            email,
            role: "admin",
            name: email.split("@")[0],
          },
        })
        console.log(`✓ Created admin user for ${email}`)
      }
    } catch (error) {
      console.error(`✗ Error processing ${email}:`, error)
    }
  }

  console.log("\nAdmin setup complete!")
}

setAdmins()
  .catch((error) => {
    console.error("Fatal error:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

