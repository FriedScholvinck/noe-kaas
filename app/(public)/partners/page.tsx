import { UtensilsCrossed, Warehouse, Ship, Beef, Store, Truck, Map } from "lucide-react"

const customerTypes = [
  { name: "Horeca", icon: UtensilsCrossed },
  { name: "Groothandel", icon: Warehouse },
  { name: "Rederijen", icon: Ship },
  { name: "Vleeshouwerijen", icon: Beef },
  { name: "Kaasspeciaalzaken", icon: Store },
  { name: "Ambulante handelaren", icon: Truck },
  { name: "Toerisme", icon: Map },
]

const partners = [
  {
    name: "Kaasbar Amsterdam",
    url: "https://kaasbar.amsterdam",
  },
  {
    name: "Biologische Slager Gerrit Takke",
    url: "https://biologischeslagerijgerrittakke.nl",
  },
  {
    name: "Old Amsterdam Store",
    url: "https://oldamsterdam.com/cheese-stores-tasting-amsterdam",
  },
  {
    name: "De Rooij Groothandel",
    url: "https://www.derooijgroothandel.nl",
  },
  {
    name: "Royal A-Ware",
    url: "https://www.royal-aware.com/nl",
  },
  {
    name: "Westland Kaas",
    url: "https://www.westlandkaas.nl",
  },
  {
    name: "Oudwijker",
    url: "https://www.oudwijker.nl",
  },
  {
    name: "Dikhoeve",
    url: "https://www.dikhoeve.nl",
  },
  {
    name: "Brommels",
    url: "https://brommels.nl",
  },
  {
    name: "Remeker",
    url: "https://www.remeker.nl",
  },
  {
    name: "Witte van Koning",
    url: "https://www.kaasmakerijkoning.nl",
  },
  {
    name: "Kaasboerderij Berkhout",
    url: "https://kaasboerderijberkhout.com",
  },
]

export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-cheese-navy">
            Partners
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Wij leveren aan diverse klanten in heel Nederland
          </p>
        </div>

        <div className="mb-20 bg-cheese-cream/30 rounded-2xl py-12 px-4">
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {customerTypes.map((type) => {
              const Icon = type.icon
              return (
                <div
                  key={type.name}
                  className="flex flex-col items-center justify-center group cursor-default transition-transform hover:scale-110"
                >
                  <div className="mb-3 p-4 rounded-full bg-white group-hover:bg-cheese-navy transition-colors shadow-sm">
                    <Icon className="w-12 h-12 text-cheese-navy group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold text-cheese-navy whitespace-nowrap">
                    {type.name}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center group transition-transform hover:scale-105"
            >
              <div className="h-32 bg-cheese-cream rounded-lg flex items-center justify-center mb-4 group-hover:bg-cheese-navy transition-colors">
                <span className="text-3xl font-serif font-bold text-cheese-navy group-hover:text-cheese-cream transition-colors">
                  {partner.name.split(' ').map(w => w[0]).join('')}
                </span>
              </div>
              <h3 className="font-serif text-base font-bold text-cheese-navy group-hover:text-cheese-navy/80">
                {partner.name}
              </h3>
            </a>
          ))}
        </div>

        <div className="text-center bg-cheese-cream rounded-lg py-12 px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-6 text-cheese-navy">
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

