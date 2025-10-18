"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CHEESE_TYPES } from "@/lib/filters"

export function CatalogFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  function clearFilters() {
    router.push("/portaal")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="search">Zoeken</Label>
          <Input
            id="search"
            placeholder="Naam of tag..."
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => updateFilter("search", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="type">Soort</Label>
          <Select
            defaultValue={searchParams.get("type") || ""}
            onValueChange={(value) => updateFilter("type", value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Alle soorten" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Alle soorten</SelectItem>
              {CHEESE_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="region">Regio</Label>
          <Input
            id="region"
            placeholder="Bijv. Noord-Holland"
            defaultValue={searchParams.get("region") || ""}
            onChange={(e) => updateFilter("region", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="sort">Sorteren</Label>
          <Select
            defaultValue={searchParams.get("sortBy") || "name"}
            onValueChange={(value) => updateFilter("sortBy", value)}
          >
            <SelectTrigger id="sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Naam A-Z</SelectItem>
              <SelectItem value="ripening-asc">Rijping oplopend</SelectItem>
              <SelectItem value="ripening-desc">Rijping aflopend</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" onClick={clearFilters} className="w-full">
          Wis filters
        </Button>
      </CardContent>
    </Card>
  )
}

