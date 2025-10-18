import { ContactForm } from "@/components/contact/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4 text-cheese-navy">
            Contact
          </h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-cheese-gold" />
              <a href="mailto:info@noekaas.nl" className="text-lg hover:text-cheese-navy">
                info@noekaas.nl
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-cheese-gold" />
              <a href="tel:+31201234567" className="text-lg hover:text-cheese-navy">
                +31 (0)20 123 4567
              </a>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-cheese-gold" />
              <span className="text-lg">Weesp, Nederland</span>
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

