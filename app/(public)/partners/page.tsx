import { UtensilsCrossed, Warehouse, Ship, Beef, Store, Truck, Map } from "lucide-react"
import Image from "next/image"

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
    logo: "/images/partners/kaasbar.png",
  },
  {
    name: "Biologische Slager Gerrit Takke",
    url: "https://biologischeslagerijgerrittakke.nl",
    logo: "/images/partners/biologische_slager.png",
  },
  {
    name: "Old Amsterdam Store",
    url: "https://oldamsterdam.com/cheese-stores-tasting-amsterdam",
    logo: "/images/partners/old_amsterdam.png",
  },
  {
    name: "De Rooij Groothandel",
    url: "https://www.derooijgroothandel.nl",
    logo: "/images/partners/rooij.png",
  },
  {
    name: "Royal A-Ware",
    url: "https://www.royal-aware.com/nl",
    logo: "/images/partners/ware.png",
  },
  {
    name: "Westland Kaas",
    url: "https://www.westlandkaas.nl",
    logo: "/images/partners/westland.png",
  },
  {
    name: "Oudwijker",
    url: "https://www.oudwijker.nl",
    logo: "/images/partners/oudwijker.png",
  },
  {
    name: "Dikhoeve",
    url: "https://www.dikhoeve.nl",
    logo: "/images/partners/dikhoeve.png",
  },
  {
    name: "Brommels",
    url: "https://brommels.nl",
    logo: "/images/partners/brommels.png",
  },
  {
    name: "Remeker",
    url: "https://www.remeker.nl",
    logo: "/images/partners/remeker.png",
  },
  {
    name: "Witte van Koning",
    url: "https://www.kaasmakerijkoning.nl",
    logo: "/images/partners/koning.png",
  },
  {
    name: "Kaasboerderij Berkhout",
    url: "https://kaasboerderijberkhout.com",
    logo: "/images/partners/berkhout.png",
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-6xl mx-auto">
            {customerTypes.map((type) => {
              const Icon = type.icon
              return (
                <div
                  key={type.name}
                  className="flex flex-col items-center justify-center group cursor-default transition-transform hover:scale-110"
                >
                  <div className="mb-3 p-3 sm:p-4 rounded-full bg-white group-hover:bg-cheese-navy transition-colors shadow-sm">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-cheese-navy group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-cheese-navy text-center leading-tight">
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
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={120}
                  height={80}
                  className="max-w-[120px] max-h-[80px] object-contain"
                />
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

