import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Award, Users, MapPin, Phone } from "lucide-react"

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
              <Users className="w-16 h-16 text-cheese-gold mb-4 mx-auto" />
              <h3 className="font-serif text-2xl font-bold">Betrouwbaar</h3>
            </div>
            
            <div className="text-center">
              <Truck className="w-16 h-16 text-cheese-gold mb-4 mx-auto" />
              <h3 className="font-serif text-2xl font-bold">Kwaliteit</h3>
            </div>


            <div className="text-center">
              <Award className="w-16 h-16 text-cheese-gold mb-4 mx-auto" />
              <h3 className="font-serif text-2xl font-bold">Snel</h3>
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

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold mb-12 text-center text-cheese-navy">
            Bezoek onze winkel
          </h2>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-cheese-gold mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-serif text-xl font-bold mb-2">Adres</h3>
                        <p className="text-lg">Flevolaan 62G</p>
                        <p className="text-lg">1382JZ Weesp</p>
                        <p className="text-lg">Nederland</p>
                        <a 
                          href="https://www.google.com/maps/search/?api=1&query=Flevolaan+62G+1382JZ+Weesp+Nederland" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-3 text-cheese-navy hover:text-cheese-gold underline"
                        >
                          Open in Google Maps
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-cheese-gold mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-serif text-xl font-bold mb-2">Telefoon</h3>
                        <a 
                          href="tel:+31618973628" 
                          className="text-lg hover:text-cheese-navy"
                        >
                          06 18 97 36 28
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.8159738424447!2d5.043052!3d52.304167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c60d0c8b0e1d1d%3A0x1!2sFlevolaan%2062G%2C%201382%20JZ%20Weesp!5e0!3m2!1sen!2snl!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

