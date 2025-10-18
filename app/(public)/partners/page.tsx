import { Card, CardContent } from "@/components/ui/card"

const partners = [
  {
    name: "De Kaasbar Amsterdam",
    description: "Ons zusterbedrijf in het hart van Amsterdam",
  },
  {
    name: "Restaurant Greetje",
    description: "Authentiek Nederlands restaurant",
  },
  {
    name: "Café Modern",
    description: "Iconische bruine kroeg sinds 1900",
  },
  {
    name: "Stach Food",
    description: "Delicatessenwinkels in Amsterdam",
  },
  {
    name: "De Biertuin",
    description: "Terras en biercafé",
  },
  {
    name: "Marqt",
    description: "Biologische supermarkten",
  },
]

export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-6 text-cheese-navy">
          Onze partners
        </h1>
        
        <p className="text-lg mb-12 text-muted-foreground">
          We zijn trots om samen te werken met gerenommeerde zaken in Amsterdam en omstreken. 
          Van restaurants tot delicatessenwinkels en koffiehuizen.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {partners.map((partner) => (
            <Card key={partner.name}>
              <CardContent className="pt-6">
                <div className="h-24 bg-cheese-cream rounded flex items-center justify-center mb-4">
                  <span className="text-2xl font-serif font-bold text-cheese-navy">
                    {partner.name.split(' ').map(w => w[0]).join('')}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold mb-1">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">{partner.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-8 bg-cheese-cream rounded-lg">
          <h2 className="text-2xl font-serif font-bold mb-4 text-cheese-navy">
            Ook partner worden?
          </h2>
          <p className="text-muted-foreground mb-4">
            We werken graag samen met horecagelegenheden en winkels die waarde hechten 
            aan kwaliteit en persoonlijke service.
          </p>
          <a href="/contact" className="text-cheese-navy font-semibold hover:underline">
            Neem contact op →
          </a>
        </div>
      </div>
    </div>
  )
}

