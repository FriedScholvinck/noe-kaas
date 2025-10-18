export function Footer() {
  return (
    <footer className="border-t bg-cheese-cream mt-20">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-lg font-bold mb-2 text-cheese-navy">Noë Kaas</h3>
            <p className="text-sm text-muted-foreground">
              Nederlandse kaasgroothandel sinds generaties.
              Weesp, Nederland.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-sm text-muted-foreground">
              Email: info@noekaas.nl<br />
              Telefoon: +31 (0)20 123 4567
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Zusterbedrijf</h4>
            <p className="text-sm text-muted-foreground">
              De Kaasbar Amsterdam
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Noë Kaas. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  )
}

