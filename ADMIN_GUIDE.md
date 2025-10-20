# Admin Beheer Gids - Noë Kaas

## Overzicht

Het admin systeem van Noë Kaas biedt volledige controle over producten, bestellingen, klanten en media. Deze gids beschrijft alle beschikbare functionaliteit.

## Admin Toegang

### Admin Gebruikers

De volgende gebruikers hebben admin rechten:
- fried.scholvinck@gmail.com
- hein@jeroennoekaas.nl

### Inloggen

1. Ga naar `/login`
2. Voer je admin email in
3. Voer het admin wachtwoord in
4. Je wordt automatisch doorgestuurd naar `/portaal`
5. Ga naar `/admin` voor het admin dashboard

**Wachtwoord:** 
- Ingesteld via `ADMIN_PASSWORD` environment variable op Vercel
- Vraag de beheerder om het wachtwoord

## Admin Functionaliteit

### 1. Dashboard (`/admin`)

Het dashboard biedt snelle toegang tot alle admin functies:
- Producten beheer
- Media bibliotheek
- Klanten overzicht
- Bestellingen beheer

### 2. Producten Beheer (`/admin/products`)

**Bekijken:**
- Lijst van alle producten met afbeeldingen
- Product details: naam, SKU, slug, beschrijving
- Metadata: land, flora type, verpakking, melksoort, rijping
- Prijs en bestelgrootte informatie

**Toevoegen:**
1. Klik op "Nieuw product toevoegen"
2. Vul verplichte velden in:
   - SKU (unieke code)
   - Naam
3. Optionele velden:
   - Beschrijving
   - Land van herkomst
   - Flora type
   - Verpakking type
   - Melksoort
   - Rijping (maanden)
   - Prijs per kg
   - Bestelgrootte (kg/stuk/wiel)
   - Tags (komma gescheiden)
   - Afbeelding

**Bewerken:**
1. Klik op het potlood icoon bij een product
2. Wijzig de gewenste velden
3. Klik "Wijzigingen opslaan"

**Verwijderen:**
1. Klik op het prullenbak icoon
2. Bevestig de verwijdering

### 3. Bestellingen Beheer (`/admin/orders`)

**Bekijken:**
- Chronologisch overzicht van alle bestellingen
- Klantinformatie per bestelling
- Bestelde producten en hoeveelheden
- Huidige status

**Beheren:**
1. Klik op "Beheer" bij een bestelling
2. Zie volledige bestelling details

**Status Wijzigen:**
- Draft: Concept bestelling
- Placed: Geplaatste bestelling
- Processing: In behandeling
- Ready: Klaar voor ophalen/verzenden
- Completed: Voltooid
- Cancelled: Geannuleerd

Bij statuswijziging wordt automatisch een email naar de klant gestuurd met:
- Bestelnummer
- Nieuwe status
- Overzicht van bestelde producten
- Passend bericht bij de status

**Aangepaste Email Versturen:**
1. Open een bestelling
2. Klik "Email versturen"
3. Voer onderwerp en bericht in
4. Klik "Email versturen"

De klant ontvangt een email met:
- Je aangepaste bericht
- Bestelnummer
- Overzicht van de bestelling

### 4. Klanten Beheer (`/admin/clients`)

**Bekijken:**
- Lijst van alle geregistreerde gebruikers
- Email en naam per klant
- Registratiedatum
- Aantal bestellingen
- Rol (admin/client)

**Informatie:**
- Klantgegevens zijn alleen-lezen voor admins
- Klanten registreren zichzelf via de website

### 5. Media Beheer (`/admin/media`)

**Uploaden:**
1. Klik "Upload afbeelding"
2. Selecteer een afbeelding
3. Voer alt tekst in (voor toegankelijkheid)
4. Klik "Upload"

Afbeeldingen worden opgeslagen in Vercel Blob storage.

**Verwijderen:**
1. Klik "Verwijder" onder een afbeelding
2. Bevestig de verwijdering

**Let op:**
- Verwijderde afbeeldingen worden ook verwijderd van producten die ze gebruiken
- Controleer gebruik voordat je verwijdert

## Email Systeem

Het admin systeem gebruikt Resend voor email verzending:

### Automatische Emails

**Order Notificatie (naar admin):**
- Verzonden bij nieuwe bestelling
- Bevat klantgegevens en bestelling details
- Ontvangers: hein@jeroennoekaas.nl

**Status Update (naar klant):**
- Verzonden bij statuswijziging
- Aangepast bericht per status
- Van: noreply@jeroennoekaas.nl

**Aangepaste Emails (naar klant):**
- Handmatig verzonden door admin
- Flexibel onderwerp en bericht
- Inclusief bestelling context

## Technische Details

### Architectuur

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL via Prisma (Neon)
- **Authenticatie:** NextAuth.js met credentials (email + password)
- **Email:** Resend
- **Storage:** Vercel Blob
- **UI:** Tailwind CSS + shadcn/ui
- **Sessions:** JWT-based (stateless)

### Database Schema

**User:**
- role: "admin" | "client"
- Admin toegang gebaseerd op role field

**Product:**
- Alle product metadata
- Relatie met ImageAsset
- Relatie met OrderItem

**Order:**
- Status tracking
- Relatie met User
- Relatie met OrderItem

### Beveiliging

- Admin routes beschermd via middleware (`/admin/*`)
- Role check in admin layout
- Server actions verifiëren admin rol
- Alleen admins kunnen orders van andere gebruikers zien
- Password-based authentication voor admin toegang
- JWT sessions (signed tokens, geen database lookups)

## Troubleshooting

### "Unauthorized" bij admin toegang

1. Verifieer dat je email in de database bestaat met role="admin"
2. Controleer dat je het juiste wachtwoord gebruikt
3. Log uit en opnieuw in met de juiste credentials

### Afbeeldingen laden niet

1. Controleer Vercel Blob configuratie
2. Verifieer BLOB_READ_WRITE_TOKEN env variabele

### Emails worden niet verzonden

1. Controleer RESEND_API_KEY env variabele
2. In development: emails worden gelogd naar console
3. Verifieer EMAIL_FROM is correct ingesteld

### Database wijzigingen

Na schema wijzigingen:
```bash
pnpm run prisma:push
```

## Best Practices

1. **Producten:**
   - Gebruik duidelijke SKU codes
   - Voeg altijd een beschrijving toe
   - Upload hoogwaardige product afbeeldingen
   - Tag producten consistent voor betere filtering

2. **Bestellingen:**
   - Update status tijdig
   - Gebruik aangepaste emails voor persoonlijke communicatie
   - Markeer voltooide bestellingen als "completed"

3. **Media:**
   - Gebruik beschrijvende alt teksten
   - Optimaliseer afbeeldingen voor web
   - Verwijder ongebruikte afbeeldingen regelmatig

4. **Klanten:**
   - Respecteer privacy
   - Gebruik order emails voor communicatie
   - Bewaar klantgegevens veilig

## Support

Voor technische vragen of problemen, neem contact op met:
- fried.scholvinck@gmail.com

Voor inhoudelijke vragen over producten:
- hein@jeroennoekaas.nl

