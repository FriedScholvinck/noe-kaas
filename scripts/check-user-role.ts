import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function checkUserRole() {
  const email = "fried.scholvinck@gmail.com"
  
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  })

  if (user) {
    console.log("\n✓ User found:")
    console.log(JSON.stringify(user, null, 2))
    
    if (user.role !== "admin") {
      console.log("\n⚠️  Role is NOT admin, updating...")
      await prisma.user.update({
        where: { email },
        data: { role: "admin" },
      })
      console.log("✓ Role updated to admin!")
    } else {
      console.log("\n✓ Role is already admin")
    }
  } else {
    console.log("\n✗ User not found!")
  }

  const allSessions = await prisma.session.findMany({
    where: { user: { email } },
    select: {
      id: true,
      expires: true,
      userId: true,
    },
  })

  console.log(`\n✓ Found ${allSessions.length} active session(s)`)
  if (allSessions.length > 0) {
    console.log("\n⚠️  To see the admin role changes, you need to:")
    console.log("1. Log out from the website")
    console.log("2. Log back in with your email")
    console.log("3. Click the magic link")
  }
}

checkUserRole()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

