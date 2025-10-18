# Productie Database Synchronisatie Guide

## 📋 Overzicht

De database schema is geüpdatet en lokaal gevuld met 47+ kaasproducten. Nu moeten we de productie database (Vercel Neon Postgres) synchroniseren.

## 🚀 Stappen

### Optie 1: Via Vercel Dashboard (Aanbevolen voor eerste keer)

#### 1. Database Schema Migreren

**Via Vercel CLI:**
```bash
# Installeer Vercel CLI als je dat nog niet hebt
npm i -g vercel

# Login bij Vercel
vercel login

# Link project (als nog niet gedaan)
vercel link

# Pull productie environment variables
vercel env pull .env.production

# Push database schema naar productie
npx dotenv -e .env.production -- npx prisma db push --accept-data-loss
```

**Of via Prisma Studio verbinding:**
```bash
# Genereer migration files
npx prisma migrate dev --name production_schema_update

# Deploy migrations naar productie
npx dotenv -e .env.production -- npx prisma migrate deploy
```

#### 2. Database Seeden

**Optie A: Direct seeden (vervang alle data):**
```bash
# WAARSCHUWING: Dit wist huidige producten!
npx dotenv -e .env.production -- npx tsx prisma/seed.ts
```

**Optie B: Handmatig via Admin Dashboard (aanbevolen voor productie):**
1. Log in op https://noe-kaas.vercel.app/admin
2. Ga naar Producten beheer
3. Voeg de kazen handmatig toe via "Nieuw product"
4. Upload eigen productfoto's via Media beheer

**Optie C: Selectieve import (behoud bestaande data):**
```typescript
// Maak een custom migration script: prisma/sync-production.ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Check welke producten al bestaan
  const existing = await prisma.product.findMany()
  console.log(`Gevonden ${existing.length} bestaande producten`)
  
  // Voeg alleen nieuwe producten toe
  // (pas dit aan naar je behoeften)
}

main()
```

### Optie 2: Via Neon Console (Direct database toegang)

#### 1. Open Neon Console
1. Ga naar https://console.neon.tech
2. Selecteer je database project
3. Ga naar "SQL Editor"

#### 2. Voer Schema Wijzigingen uit
```sql
-- Verwijder oude kolommen
ALTER TABLE "Product" DROP COLUMN IF EXISTS "region";
ALTER TABLE "Product" DROP COLUMN IF EXISTS "type";

-- Voeg nieuwe kolommen toe
ALTER TABLE "Product" ADD COLUMN "country" TEXT;
ALTER TABLE "Product" ADD COLUMN "floraType" TEXT;
ALTER TABLE "Product" ADD COLUMN "packagingType" TEXT;
ALTER TABLE "Product" ADD COLUMN "milkType" TEXT;
```

#### 3. Seed Data Invoeren
Via SQL Editor kun je de producten één voor één toevoegen, maar dit is tijdrovend. Gebruik liever de Admin Dashboard.

## 🔍 Verificatie

Na migratie/seeding:

1. **Check schema:**
```bash
npx dotenv -e .env.production -- npx prisma db pull
# Bekijk prisma/schema.prisma om te verifiëren
```

2. **Test de website:**
- Ga naar https://noe-kaas.vercel.app/portaal
- Check of producten laden
- Test de filters (flora type, land, melksoort)
- Check of vlaggen worden getoond

3. **Test admin:**
- Login op /admin
- Voeg een testproduct toe
- Wijzig een product
- Verwijder het testproduct

## ⚠️ Belangrijke Notities

### Data Verlies Waarschuwing
- `--accept-data-loss` is nodig omdat `region` en `type` kolommen worden verwijderd
- **MAAK EERST EEN BACKUP** via Neon Console:
  1. Neon Console → Branches → Create branch (snapshot van huidige data)
  2. Of export via `pg_dump` als je lokale toegang hebt

### Environment Variables Check
Zorg dat deze in Vercel staan:
- `POSTGRES_PRISMA_URL` - Prisma connection string (pooling)
- `POSTGRES_URL` - Direct connection string
- `POSTGRES_URL_NON_POOLING` - Non-pooling connection
- `NEXTAUTH_SECRET` - Voor authenticatie
- `NEXTAUTH_URL` - Production URL
- `BLOB_READ_WRITE_TOKEN` - Voor image uploads

## 🎯 Aanbevolen Aanpak voor Productie

**Voor veiligheid en controle:**

1. ✅ **Backup maken** via Neon branch
2. ✅ **Schema migreren** via Prisma
3. ✅ **Data handmatig toevoegen** via Admin Dashboard
4. ✅ **Eigen foto's uploaden** via Media beheer
5. ✅ **Testen** voordat live gaat

**Voordelen van handmatig toevoegen:**
- Volledige controle over welke kazen live gaan
- Eigen productfoto's van echte wielen
- Prijzen aanpassen voor jouw marges
- Stapsgewijs uitrollen

## 📊 Product Data Template

Als je producten wilt bulken, hier is de data structuur:

```typescript
{
  sku: "BRIE-FDP-3KG",           // Uniek
  name: "Brie Fleur de Pré 60+", // Display naam
  description: "Franse brie...",  // Optioneel
  country: "FR",                  // NL, FR, IT, ES, BE, CH, DE
  floraType: "witflora",          // witflora, roodflora, hard, blauwader
  packagingType: "wiel",          // wiel, stuk, plakken, geraspt, hotelblok, blokjes, smeerkaas, zuivel, kaasfondue
  milkType: "koe",                // buffel, geit, koe, schaap
  ripeningMonths: 1,              // Optioneel
  tags: "brie,romig,français",    // Komma gescheiden
  pricePerKg: 19.00,              // Optioneel (voor interne referentie)
  unit: "kg",                     // kg of piece
  imageId: "...",                 // Link naar uploaded image
}
```

## 🆘 Troubleshooting

### Migration Errors
```bash
# Reset Prisma Client
npx prisma generate

# Check connection
npx dotenv -e .env.production -- npx prisma db pull
```

### Vercel Build Fails
- Check dat alle images in next.config.js staan
- Verifieer environment variables in Vercel dashboard
- Check build logs in Vercel deployment

### Products Niet Zichtbaar
- Check of data echt in database staat via Neon SQL Editor
- Verifieer dat `floraType`, `country`, etc. valid values hebben
- Check browser console voor errors

## 📞 Support

Als je hulp nodig hebt:
1. Check de Vercel deployment logs
2. Check Neon database metrics
3. Test lokaal eerst met productie env vars

## ✅ Checklist

- [ ] Neon database backup gemaakt
- [ ] Schema gemigreerd naar productie
- [ ] Environment variables geverifieerd
- [ ] Test producten toegevoegd
- [ ] Filters getest
- [ ] Admin functionaliteit getest
- [ ] Vorige bestelling laden getest
- [ ] Mobile responsive checked
- [ ] Performance checked

🎉 Succes met de productie deployment!

