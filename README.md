# Noë Kaas

Nederlandse kaasgroothandel. Online visitekaartje en invite-only bestelportaal voor zakelijke klanten.

## Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Prisma + Vercel Postgres
- **Auth**: NextAuth.js (Auth.js) met Prisma Adapter
- **Storage**: Vercel Blob
- **Deployment**: Vercel

## Features

### Publiek toegankelijk
- **Home**: Hero, USP's, CTA naar assortiment
- **Old Friends**: Verhaal eigen merk
- **Partners**: Logo's en referenties
- **Portaal**: Volledige catalogus met filters, zoeken en sorteren (geen login vereist)
- **Contact**: Lead formulier

### Voor ingelogde klanten
- Producten toevoegen aan winkelmandje
- Bestellingen plaatsen (zonder betaling)
- Orderhistorie bekijken

### Admin dashboard
- **Producten**: CRUD voor kaasassortiment
- **Media**: Upload en beheer afbeeldingen (Vercel Blob)
- **Klanten**: Overzicht users en hun bestellingen
- **Bestellingen**: Alle orders bekijken en verwerken

## Lokaal draaien

### 1. Prerequisites

- Node.js 18+
- pnpm (of npm/yarn)
- Vercel account (voor Postgres en Blob)

### 2. Project clonen en dependencies installeren

```bash
git clone <repository-url>
cd noe-kaas
pnpm install
```

### 3. Database en storage opzetten via Vercel

#### Optie A: Automatisch via Vercel MCP (aanbevolen)

Als je Vercel MCP hebt geconfigureerd:

```bash
# Project aanmaken en services provisionen gebeurt automatisch
vercel link
vercel env pull .env.local
```

#### Optie B: Handmatig via Vercel Dashboard

1. Ga naar [vercel.com/new](https://vercel.com/new)
2. Maak een nieuw project aan: `noe-kaas`
3. Koppel je GitHub repository
4. Voeg **Vercel Postgres** toe:
   - Ga naar Storage → Create Database → Postgres
   - Kopieer de environment variabelen
5. Voeg **Vercel Blob** toe:
   - Ga naar Storage → Create Store → Blob
   - Kopieer `BLOB_READ_WRITE_TOKEN`
6. Download environment variabelen:
   ```bash
   vercel env pull .env.local
   ```

### 4. Extra environment variabelen toevoegen

Bewerk `.env.local` en voeg toe:

```env
# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genereer-een-random-string"

# GitHub OAuth (of andere provider)
GITHUB_ID="jouw-github-oauth-id"
GITHUB_SECRET="jouw-github-oauth-secret"

# Admin user voor seed
SEED_ADMIN_EMAIL="admin@noekaas.nl"

# Optioneel: externe afbeeldingen
USE_EXTERNAL_CHEESE_IMAGES="true"
```

**GitHub OAuth instellen:**
1. Ga naar [github.com/settings/developers](https://github.com/settings/developers)
2. New OAuth App
3. **Homepage URL**: `http://localhost:3000`
4. **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
5. Kopieer Client ID en Client Secret

### 5. Database schema en seed

```bash
pnpm prisma generate
pnpm prisma db push
pnpm prisma:seed
```

Dit creëert:
- 1 admin user (met email uit `SEED_ADMIN_EMAIL`)
- 10 demo producten (Nederlandse kazen)
- 3 demo afbeeldingen (Wikipedia)
- 1 demo lead

### 6. Development server starten

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment naar Vercel

### Automatisch (via GitHub)

Elke push naar `main` triggert automatisch een deployment.

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Handmatig via CLI

```bash
vercel --prod
```

## Database management

### Prisma Studio (GUI)

```bash
pnpm prisma studio
```

### Migrations

Voor productie met migrations:

```bash
pnpm prisma migrate dev --name init
pnpm prisma migrate deploy
```

## User rollen

- **client**: Standaard rol voor nieuwe users. Kan portaal bekijken en bestellen.
- **admin**: Volledige toegang tot admin dashboard.

### Admin maken van bestaande user

Via Prisma Studio of SQL:

```sql
UPDATE "User" SET role = 'admin' WHERE email = 'user@example.com';
```

## Project structuur

```
noe-kaas/
├── app/
│   ├── (public)/          # Publieke pages met nav/footer
│   │   ├── page.tsx       # Home
│   │   ├── old-friends/
│   │   ├── partners/
│   │   └── contact/
│   ├── portaal/           # Catalogus (open voor iedereen)
│   ├── admin/             # Admin dashboard (protected)
│   │   ├── products/
│   │   ├── media/
│   │   ├── clients/
│   │   └── orders/
│   ├── login/
│   └── api/
│       ├── auth/
│       ├── leads/
│       ├── orders/
│       └── cheese/
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Nav, Footer
│   ├── catalog/           # Filters, ProductGrid, Cart
│   ├── admin/             # Admin CRUD components
│   └── contact/
├── lib/
│   ├── db.ts             # Prisma client
│   ├── auth.ts           # NextAuth config
│   ├── blob.ts           # Vercel Blob helpers
│   ├── filters.ts        # Product filter logic
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── README.md
```

## Environment variabelen (productie)

Zet deze via Vercel dashboard of CLI:

```bash
vercel env add NEXTAUTH_SECRET production
vercel env add GITHUB_ID production
vercel env add GITHUB_SECRET production
vercel env add SEED_ADMIN_EMAIL production
```

Postgres en Blob variabelen worden automatisch toegevoegd bij provisioning.

## Troubleshooting

### "Prisma Client did not initialize yet"

```bash
pnpm prisma generate
```

### Auth redirect errors

Check `NEXTAUTH_URL` in `.env.local`:
- Lokaal: `http://localhost:3000`
- Productie: `https://jouw-domein.vercel.app`

### Blob upload fails

Controleer `BLOB_READ_WRITE_TOKEN` en zorg dat Vercel Blob is geprovisioned.

## License

Private project - © Noë Kaas

