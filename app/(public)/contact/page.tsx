import { ContactForm } from "@/components/contact/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-6 text-cheese-navy">
          Contact
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-8 text-muted-foreground">
              Vragen over ons assortiment of interesse om klant te worden? 
              Vul het formulier in of neem direct contact op.
            </p>

            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-cheese-navy mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:info@noekaas.nl" className="text-sm text-muted-foreground hover:text-cheese-navy">
                      info@noekaas.nl
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cheese-navy mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Telefoon</h3>
                    <a href="tel:+31201234567" className="text-sm text-muted-foreground hover:text-cheese-navy">
                      +31 (0)20 123 4567
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cheese-navy mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Adres</h3>
                    <p className="text-sm text-muted-foreground">
                      Weesp, Nederland<br />
                      (bezoek op afspraak)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

