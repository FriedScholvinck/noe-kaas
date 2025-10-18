import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Image as ImageIcon, Users, ShoppingBag } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/products">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Package className="w-10 h-10 text-cheese-gold mb-2" />
              <CardTitle>Producten</CardTitle>
              <CardDescription>Beheer kaas assortiment</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/media">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <ImageIcon className="w-10 h-10 text-cheese-gold mb-2" />
              <CardTitle>Media</CardTitle>
              <CardDescription>Upload en beheer afbeeldingen</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/clients">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Users className="w-10 h-10 text-cheese-gold mb-2" />
              <CardTitle>Klanten</CardTitle>
              <CardDescription>Beheer klantaccounts</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/orders">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <ShoppingBag className="w-10 h-10 text-cheese-gold mb-2" />
              <CardTitle>Bestellingen</CardTitle>
              <CardDescription>Bekijk en verwerk orders</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}

