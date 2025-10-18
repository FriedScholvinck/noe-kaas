import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Award, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div>
      <section className="bg-cheese-navy text-white py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-8">
            Kwaliteitskaas<br/>voor professionals
          </h1>
          <Link href="/portaal">
            <Button size="lg" variant="secondary" className="text-lg px-12 py-6">
              Bekijk assortiment
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <Award className="w-16 h-16 text-cheese-gold mb-4 mx-auto" />
              <h3 className="font-serif text-2xl font-bold">Ambacht</h3>
            </div>

            <div className="text-center">
              <Truck className="w-16 h-16 text-cheese-gold mb-4 mx-auto" />
              <h3 className="font-serif text-2xl font-bold">Dagelijks vers</h3>
            </div>

            <div className="text-center">
              <Users className="w-16 h-16 text-cheese-gold mb-4 mx-auto" />
              <h3 className="font-serif text-2xl font-bold">Familiebedrijf</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-cheese-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-8 text-cheese-navy">
            Samenwerken?
          </h2>
          <Link href="/contact">
            <Button size="lg" className="text-lg px-12 py-6">
              Neem contact op
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

