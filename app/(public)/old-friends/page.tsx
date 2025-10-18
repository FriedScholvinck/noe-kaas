import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function OldFriendsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-6 text-cheese-navy">
            Onze eigen merken
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-muted-foreground">
            Zorgvuldig geselecteerde kazen van producenten die we al jaren kennen.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-4xl font-serif font-bold mb-12 text-cheese-navy text-center">
            Old Friends
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <Card className="bg-white p-6 shadow-xl">
              <Image
                src="/images/oldfriendsheel_1.png"
                alt="Old Friends hele kaas"
                width={500}
                height={500}
                className="w-full h-auto"
              />
              <p className="text-center mt-4 font-serif text-lg text-gray-600">Hele kaas</p>
            </Card>
            <Card className="bg-white p-6 shadow-xl">
              <Image
                src="/images/oldfriendshalf_1.png"
                alt="Old Friends halve kaas"
                width={500}
                height={500}
                className="w-full h-auto"
              />
              <p className="text-center mt-4 font-serif text-lg text-gray-600">Halve kaas</p>
            </Card>
          </div>

          <div className="mb-12">
            <Card className="bg-white p-6 shadow-xl">
              <Image
                src="/images/old_friends_cozy_scene.png"
                alt="Old Friends kaas sfeerbeeld"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-cheese-cream to-orange-50 border-cheese-gold/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold mb-4 text-cheese-navy">
                Typisch Old Friends kaas
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Old Friends is een kaas als geen ander, speciaal door de toegevoegde zoutkristallen. 
                Deze oude kaas is romig en lekker pittig van smaak en daarom een echte delicatesse.
              </p>
              <Link href="/portaal">
                <Button size="lg" className="text-lg px-8 py-6">
                  Bekijk Old Friends in ons assortiment
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-serif font-bold mb-12 text-cheese-navy text-center">
            Best Friends
          </h2>
          
          <div className="mb-12">
            <Card className="bg-white p-6 shadow-xl">
              <Image
                src="/images/best_friends_scene.png"
                alt="Best Friends kaas sfeerbeeld"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-cheese-cream to-orange-50 border-cheese-gold/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold mb-4 text-cheese-navy">
                Typisch Best Friends kaas
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Best Friends is ons tweede eigen merk, met dezelfde zorg en kwaliteit geselecteerd.
              </p>
              <Link href="/portaal">
                <Button size="lg" className="text-lg px-8 py-6">
                  Bekijk Best Friends in ons assortiment
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

