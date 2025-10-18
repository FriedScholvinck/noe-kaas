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
              <a href="mailto:hein@jeroennoekaas.nl" className="text-lg hover:text-cheese-navy">
                hein@jeroennoekaas.nl
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-cheese-gold" />
              <a href="tel:+31618973628" className="text-lg hover:text-cheese-navy">
                06 18 97 36 28
              </a>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-cheese-gold mt-1" />
              <div>
                <p className="text-lg">Flevolaan 62G</p>
                <p className="text-lg">1382JZ Weesp</p>
                <p className="text-lg">Nederland</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Flevolaan+62G+1382JZ+Weesp+Nederland" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-cheese-navy hover:text-cheese-gold underline"
                >
                  Open in Google Maps
                </a>
              </div>
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

