# Deployment Guide - Noë Kaas

## Vercel MCP Deployment (Geautomatiseerd)

Deze app is ontworpen om naadloos te werken met Vercel MCP (Model Context Protocol).

### Stap 1: Vercel project aanmaken

Via Vercel MCP of CLI:

```bash
vercel link
```

Of handmatig via dashboard: https://vercel.com/new

### Stap 2: Services provisionen

#### Vercel Postgres

1. Ga naar project → Storage → Create Database
2. Selecteer **Postgres**
3. Regio: EU West (Amsterdam) voor beste performance
4. Plan: Hobby (gratis) of Pro
5. Klik **Create**

Environment variabelen worden automatisch toegevoegd:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

#### Vercel Blob

1. Ga naar project → Storage → Create Store
2. Selecteer **Blob**
3. Klik **Create**

Environment variabele wordt automatisch toegevoegd:
- `BLOB_READ_WRITE_TOKEN`

### Stap 3: Auth configureren

#### GitHub OAuth

1. Ga naar https://github.com/settings/developers
2. **New OAuth App**
3. Settings:
   - **Application name**: Noë Kaas
   - **Homepage URL**: `https://jouw-domein.vercel.app`
   - **Authorization callback URL**: `https://jouw-domein.vercel.app/api/auth/callback/github`
4. Kopieer **Client ID** en **Client Secret**

#### Environment variabelen toevoegen

Via Vercel Dashboard of CLI:

```bash
vercel env add NEXTAUTH_URL production
# Waarde: https://jouw-domein.vercel.app

vercel env add NEXTAUTH_SECRET production
# Genereer met: openssl rand -base64 32

vercel env add GITHUB_ID production
# Jouw GitHub OAuth Client ID

vercel env add GITHUB_SECRET production
# Jouw GitHub OAuth Client Secret

vercel env add SEED_ADMIN_EMAIL production
# Email voor admin user (bijv. admin@noekaas.nl)

vercel env add USE_EXTERNAL_CHEESE_IMAGES production
# Optioneel: true
```

### Stap 4: Database initialiseren

Vanaf je lokale machine met juiste credentials:

```bash
vercel env pull .env.local
pnpm prisma db push
pnpm prisma db seed
```

Of voeg een build command toe in `package.json`:

```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma db push && next build"
  }
}
```

### Stap 5: Deploy

Push naar GitHub (als gekoppeld):

```bash
git push origin main
```

Of handmatig:

```bash
vercel --prod
```

## Post-deployment

### Admin toegang

Standaard wordt een admin user aangemaakt met email uit `SEED_ADMIN_EMAIL`.

Om jezelf admin te maken:

1. Login via GitHub OAuth op je site
2. Ga naar Vercel → project → Storage → Postgres → Query
3. Run:
   ```sql
   UPDATE "User" SET role = 'admin' WHERE email = 'jouw@email.com';
   ```

Of via Prisma Studio lokaal:

```bash
vercel env pull .env.local
pnpm prisma studio
```

### Domein koppelen

1. Vercel Dashboard → Project Settings → Domains
2. Voeg custom domain toe (bijv. `noekaas.nl`)
3. Update DNS records volgens instructies
4. Update `NEXTAUTH_URL` environment variabele naar nieuwe domein

### Monitoring

- **Performance**: Vercel Analytics (automatisch enabled)
- **Errors**: Vercel Logs → Runtime Logs
- **Database**: Vercel Storage → Postgres → Insights

## Environment variabelen overzicht

| Variabele | Automatisch? | Beschrijving |
|-----------|--------------|--------------|
| `POSTGRES_URL` | ✅ Via Postgres | Database connection |
| `POSTGRES_PRISMA_URL` | ✅ Via Postgres | Prisma connection pooling |
| `POSTGRES_URL_NON_POOLING` | ✅ Via Postgres | Direct connection |
| `BLOB_READ_WRITE_TOKEN` | ✅ Via Blob | Blob storage access |
| `NEXTAUTH_URL` | ❌ Handmatig | Site URL |
| `NEXTAUTH_SECRET` | ❌ Handmatig | Random secret |
| `GITHUB_ID` | ❌ Handmatig | OAuth Client ID |
| `GITHUB_SECRET` | ❌ Handmatig | OAuth Client Secret |
| `SEED_ADMIN_EMAIL` | ❌ Handmatig | Admin email |
| `USE_EXTERNAL_CHEESE_IMAGES` | ⚠️ Optioneel | External images |

## Troubleshooting

### Build fails met Prisma error

Zorg dat build command Prisma genereert:

```json
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}
```

### Auth redirect loop

Check `NEXTAUTH_URL`:
- Moet exact je production URL zijn (met https://)
- Geen trailing slash
- Match met GitHub OAuth callback URL

### Database connection errors

Verifieer dat:
1. Postgres database is provisioned
2. Environment variabelen zijn gezet
3. `prisma db push` is succesvol uitgevoerd

### Blob upload fails

Check:
1. Blob store is provisioned
2. `BLOB_READ_WRITE_TOKEN` is gezet
3. File size < 500MB (Vercel limit)

## CI/CD

Voor automatische deployments bij elke push:

1. Koppel GitHub repository aan Vercel project
2. Elke push naar `main` triggert automatisch een build en deploy
3. Pull Requests krijgen automatisch preview deployments

## Backup & Recovery

### Database backup

Via Vercel CLI:

```bash
vercel env pull
pnpm prisma db pull
```

Dit genereert een lokale kopie van je schema.

### Manual backup via SQL

```bash
pg_dump $POSTGRES_URL > backup.sql
```

### Restore

```bash
psql $POSTGRES_URL < backup.sql
```

## Performance optimizations

- ✅ Next.js Image optimization enabled
- ✅ Server Components voor statische content
- ✅ Client Components alleen waar nodig
- ✅ Prisma connection pooling
- ✅ Vercel Edge Network CDN
- ⚠️ Consider: Redis voor session storage bij hoge load

## Security checklist

- ✅ NextAuth.js voor auth
- ✅ Role-based access (admin/client)
- ✅ Server Actions met auth checks
- ✅ Zod validation op API routes
- ✅ HTTPS enforced (via Vercel)
- ✅ Secure session storage in DB
- ⚠️ Consider: Rate limiting op `/api/leads`
- ⚠️ Consider: CORS headers waar nodig

