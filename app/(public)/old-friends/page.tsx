import { Card, CardContent } from "@/components/ui/card"

export default function OldFriendsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-6 text-cheese-navy">
            Old Friends
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-muted-foreground">
            Ons eigen merk. Zorgvuldig geselecteerde kazen van producenten die we al jaren kennen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="aspect-square bg-cheese-cream rounded-lg mb-4" />
            <h3 className="font-serif text-xl font-bold">Ambachtelijk</h3>
          </div>

          <div className="text-center">
            <div className="aspect-square bg-cheese-cream rounded-lg mb-4" />
            <h3 className="font-serif text-xl font-bold">Gerijpt</h3>
          </div>

          <div className="text-center">
            <div className="aspect-square bg-cheese-cream rounded-lg mb-4" />
            <h3 className="font-serif text-xl font-bold">Dagelijks vers</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

