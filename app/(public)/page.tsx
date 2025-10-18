import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Award, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div>
      <section className="bg-cheese-navy text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Kwaliteitskaas voor professionals
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Nederlandse kaasgroothandel die winkels en horeca in Amsterdam bedient met vakmanschap en betrouwbaarheid.
          </p>
          <Link href="/portaal">
            <Button size="lg" variant="secondary">
              Bekijk ons assortiment
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Award className="w-12 h-12 text-cheese-gold mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">Ambacht & Kwaliteit</h3>
                <p className="text-muted-foreground">
                  Geselecteerde kazen van Nederlandse producenten met aandacht voor traditie en smaak.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Truck className="w-12 h-12 text-cheese-gold mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">Snelle levering</h3>
                <p className="text-muted-foreground">
                  Dagelijkse levering in Amsterdam en omstreken. Korte lijnen, flexibele service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-cheese-gold mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">Familiebedrijf</h3>
                <p className="text-muted-foreground">
                  Al generaties actief vanuit Huizen en nu Weesp. Persoonlijk contact en vakkennis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cheese-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4 text-cheese-navy">
            Klant worden?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Bent u een winkel of horecagelegenheid en wilt u samenwerken? Neem contact op.
          </p>
          <Link href="/contact">
            <Button size="lg">
              Contact opnemen
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

