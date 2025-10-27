export function Footer() {
  return (
    <footer className="border-t bg-cheese-cream mt-32">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h3 className="font-serif text-2xl font-bold mb-8 text-cheese-navy">Noë Kaas</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-8 text-sm">
            <div>info@noekaas.nl</div>
            <div>Weesp</div>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Noë Kaas
          </p>
        </div>
      </div>
    </footer>
  )
}

