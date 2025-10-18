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
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-cheese-navy">
            Partners
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {partners.map((partner) => (
            <div key={partner.name} className="text-center">
              <div className="h-32 bg-cheese-cream rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl font-serif font-bold text-cheese-navy">
                  {partner.name.split(' ').map(w => w[0]).join('')}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold">{partner.name}</h3>
            </div>
          ))}
        </div>

        <div className="text-center bg-cheese-cream rounded-lg py-12 px-8">
          <h2 className="text-3xl font-serif font-bold mb-6 text-cheese-navy">
            Ook partner worden?
          </h2>
          <a href="/contact" className="text-cheese-navy text-lg font-semibold hover:underline">
            Neem contact op →
          </a>
        </div>
      </div>
    </div>
  )
}

