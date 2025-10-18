import { Card, CardContent } from "@/components/ui/card"

export default function OldFriendsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-6 text-cheese-navy">
          Old Friends
        </h1>
        
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Old Friends is ons eigen merk: zorgvuldig geselecteerde kazen die we al jaren kennen 
            en vertrouwen. Producenten waar we een persoonlijke band mee hebben opgebouwd. 
            Kazen die wij zelf dagelijks verkopen in onze zusteronderneming De Kaasbar in Amsterdam. 
            Het assortiment bestaat uit klassieke Nederlandse kazen en bijzondere vondsten. 
            We laten ze rijpen tot het juiste moment en leveren ze vers aan onze klanten. 
            Elk stuk kaas heeft zijn eigen verhaal en smaakprofiel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="aspect-square bg-cheese-cream rounded mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2">Ambachtelijk gerijpt</h3>
              <p className="text-sm text-muted-foreground">
                Onze kazen krijgen de tijd om hun volle smaak te ontwikkelen.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="aspect-square bg-cheese-cream rounded mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2">Persoonlijke selectie</h3>
              <p className="text-sm text-muted-foreground">
                Direct contact met producenten die we al jaren kennen.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="aspect-square bg-cheese-cream rounded mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2">Dagelijks vers</h3>
              <p className="text-sm text-muted-foreground">
                Van onze opslag direct naar uw zaak, altijd op temperatuur.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

