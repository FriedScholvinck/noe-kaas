import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Award, Users, MapPin, Phone, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div>
      <section className="bg-cheese-navy text-white py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-8">
            Kaasgroothandel<br/>voor horeca en bedrijven
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
              <Award className="w-16 h-16 text-cheese-gold mb-4 mx-auto" />
              <h3 className="font-serif text-2xl font-bold">Hoge Kwaliteit</h3>
            </div>


            <div className="text-center">
              <Truck className="w-16 h-16 text-cheese-gold mb-4 mx-auto" />
              <h3 className="font-serif text-2xl font-bold">Snel</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-cheese-cream via-orange-50 to-cheese-cream relative overflow-hidden">
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block relative">
                <div className="absolute -inset-4 bg-cheese-gold/20 rounded-full blur-xl"></div>
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-cheese-navy relative z-10">
                  Ons verhaal
                </h2>
              </div>
              <div className="w-24 h-1 bg-cheese-gold mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className="relative rounded-lg overflow-hidden">
                    <Image
                      src="/images/jeroen-cheese-story.jpg"
                      alt="Jeroen Noë en collega bij kaaswielen - 47 jaar ervaring in de kaasindustrie"
                      width={500}
                      height={400}
                      className="w-full h-auto object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 italic">
                      47 jaar ervaring in de kaasindustrie
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cheese-gold to-orange-400 rounded-full"></div>
                  <div className="pl-8">
                    <h3 className="text-2xl font-serif font-bold text-cheese-navy mb-4">Sinds 1996</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Jeroen Noë werkt al 47 jaar in de kaasindustrie. In 1996 is hij voor zichzelf begonnen in Huizen.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cheese-gold to-orange-400 rounded-full"></div>
                  <div className="pl-8">
                    <h3 className="text-2xl font-serif font-bold text-cheese-navy mb-4">Uitbreiding</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Na 5 jaar in de groothandel, richt zijn zoon Mark in 2020 de <a href="https://kaasbar.amsterdam/" target="_blank" rel="noopener noreferrer" className="text-cheese-gold hover:text-cheese-navy underline font-semibold transition-colors">Kaasbar Amsterdam</a> op. Inmiddels werken Hein en Job ook in het familiebedrijf.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cheese-gold to-orange-400 rounded-full"></div>
                  <div className="pl-8">
                    <h3 className="text-2xl font-serif font-bold text-cheese-navy mb-4">Onze klanten</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Wij leveren aan kaas delicatessenzaken, horeca, toerisme, marktliederen en groothandels. 
                      Onze eigen merken zijn <span className="font-semibold text-cheese-navy">Old Friends & Best Friends</span>.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cheese-gold to-orange-400 rounded-full"></div>
                  <div className="pl-8">
                    <h3 className="text-2xl font-serif font-bold text-cheese-navy mb-4">Nieuwe generatie</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Sinds 2025 zijn wij gevestigd in Weesp, om dichter bij onze klanten te zijn. In 2026 hebben Hein en Job het bedrijf overgenomen. Jeroen is nog nauw betrokken bij de dagelijkse gang van zaken.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-cheese-gold/10 to-orange-400/10 rounded-2xl p-8 border border-cheese-gold/20">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-cheese-gold rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">30</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-cheese-navy">Jaar kwaliteit</h3>
                </div>
                <p className="text-xl text-gray-700 font-medium">
                  Wij leveren al 30 jaar kazen van hoge kwaliteit met een snelle en betrouwbare service.
                </p>
              </div>
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
                    
                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-cheese-gold mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-serif text-xl font-bold mb-2">Openingstijden</h3>
                        <div className="space-y-1">
                          <p className="text-lg">Maandag - Donderdag: 08:00 - 17:00</p>
                          <p className="text-lg">Vrijdag: 08:00 - 13:00</p>
                          <p className="text-lg">Weekend: Gesloten</p>
                        </div>
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

