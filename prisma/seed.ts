import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const DEMO_IMAGES = [
  {
    provider: "external",
    key: "demo-gouda",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Goudse_kaas.jpg/300px-Goudse_kaas.jpg",
    alt: "Goudse kaas",
  },
  {
    provider: "external",
    key: "demo-edam",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Edam_cheese.jpg/300px-Edam_cheese.jpg",
    alt: "Edammer kaas",
  },
  {
    provider: "external",
    key: "demo-aged",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Aged_Gouda.jpg/300px-Aged_Gouda.jpg",
    alt: "Oude kaas",
  },
]

const DEMO_PRODUCTS = [
  {
    sku: "OLD-GOUDA-48",
    name: "Oude Gouda 48+ Biologisch",
    slug: "oude-gouda-48-biologisch",
    description: "Rijke, volle smaak met kristallen. Gerijpt op traditionele houten planken.",
    region: "Zuid-Holland",
    type: "hard",
    ripeningMonths: 24,
    tags: "biologisch,ambachtelijk,oude-kaas",
    pricePerKg: 18.50,
    unit: "kg",
  },
  {
    sku: "JONG-GOUDA-48",
    name: "Jonge Gouda 48+",
    slug: "jonge-gouda-48",
    description: "Zachte, romige jonge kaas. Perfect voor kaasplanken.",
    region: "Zuid-Holland",
    type: "semi-hard",
    ripeningMonths: 4,
    tags: "jong,mild",
    pricePerKg: 12.00,
    unit: "kg",
  },
  {
    sku: "EDAM-40",
    name: "Edammer 40+",
    slug: "edammer-40",
    description: "Klassieke Noord-Hollandse kaas met lichte, frisse smaak.",
    region: "Noord-Holland",
    type: "hard",
    ripeningMonths: 8,
    tags: "klassiek,edam",
    pricePerKg: 11.50,
    unit: "kg",
  },
  {
    sku: "BELEG-48",
    name: "Belegen Gouda 48+",
    slug: "belegen-gouda-48",
    description: "Evenwichtige smaak tussen jong en oud. Veelzijdig toepasbaar.",
    region: "Zuid-Holland",
    type: "semi-hard",
    ripeningMonths: 10,
    tags: "belegen,veelzijdig",
    pricePerKg: 14.00,
    unit: "kg",
  },
  {
    sku: "KOMIJN-48",
    name: "Komijnekaas 48+",
    slug: "komijnekaas-48",
    description: "Belegen kaas met komijn en nagelkruid. Typisch Nederlandse smaak.",
    region: "Friesland",
    type: "semi-hard",
    ripeningMonths: 10,
    tags: "komijn,kruiden,traditioneel",
    pricePerKg: 14.50,
    unit: "kg",
  },
  {
    sku: "GEIT-BELEGEN",
    name: "Belegen Geitenkaas",
    slug: "belegen-geitenkaas",
    description: "Romige geitenkaas met milde, licht zoete smaak.",
    region: "Utrecht",
    type: "semi-hard",
    ripeningMonths: 8,
    tags: "geit,belegen,mild",
    pricePerKg: 16.00,
    unit: "kg",
  },
  {
    sku: "BOERENKAAS-OLD",
    name: "Boerenkaas Extra Belegen",
    slug: "boerenkaas-extra-belegen",
    description: "Karaktervolle boerenkaas met intense smaak. Gemaakt van rauwe melk.",
    region: "Overijssel",
    type: "hard",
    ripeningMonths: 18,
    tags: "boerenkaas,rauw,karakter",
    pricePerKg: 19.00,
    unit: "kg",
  },
  {
    sku: "ROOKKAAS",
    name: "Gerookte Kaas",
    slug: "gerookte-kaas",
    description: "Belegen kaas met natuurlijke rooksmaak. Ideaal voor salades.",
    region: "Noord-Holland",
    type: "semi-hard",
    ripeningMonths: 8,
    tags: "gerookt,bijzonder",
    pricePerKg: 13.50,
    unit: "kg",
  },
  {
    sku: "MOSTERDZAAD",
    name: "Kaas met Mosterdzaad",
    slug: "kaas-met-mosterdzaad",
    description: "Jong-belegen kaas met grove mosterdzaden. Pittig karakter.",
    region: "Zuid-Holland",
    type: "semi-hard",
    ripeningMonths: 6,
    tags: "mosterd,pittig,kruiden",
    pricePerKg: 13.00,
    unit: "kg",
  },
  {
    sku: "SCHAPENKAAS",
    name: "Belegen Schapenkaas",
    slug: "belegen-schapenkaas",
    description: "Volle, zoete smaak. Gemaakt van 100% schapenmelk.",
    region: "Friesland",
    type: "hard",
    ripeningMonths: 12,
    tags: "schaap,belegen,vol",
    pricePerKg: 22.00,
    unit: "kg",
  },
]

async function main() {
  console.log("🌱 Starting seed...")

  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@noekaas.nl"
  
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin",
      role: "admin",
    },
  })
  console.log(`✅ Admin user: ${admin.email}`)

  for (const imgData of DEMO_IMAGES) {
    await prisma.imageAsset.upsert({
      where: { key: imgData.key },
      update: {},
      create: imgData,
    })
  }
  console.log(`✅ Created ${DEMO_IMAGES.length} demo images`)

  const images = await prisma.imageAsset.findMany()
  
  for (let i = 0; i < DEMO_PRODUCTS.length; i++) {
    const product = DEMO_PRODUCTS[i]
    const image = images[i % images.length]
    
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: {
        ...product,
        imageId: image.id,
      },
    })
  }
  console.log(`✅ Created ${DEMO_PRODUCTS.length} demo products`)

  await prisma.lead.create({
    data: {
      name: "Jan de Vries",
      email: "jan@example.com",
      message: "Geïnteresseerd in samenwerking voor mijn restaurant in Amsterdam.",
      source: "contact-form",
    },
  })
  console.log("✅ Created demo lead")

  console.log("🎉 Seed completed!")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

