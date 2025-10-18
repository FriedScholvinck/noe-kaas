"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FLORA_TYPES, PACKAGING_TYPES, MILK_TYPES, COUNTRIES } from "@/lib/filters"

export function CatalogFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
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
            placeholder="Naam, beschrijving, tags..."
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => updateFilter("search", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="floraType">Flora type</Label>
          <Select
            defaultValue={searchParams.get("floraType") || "all"}
            onValueChange={(value) => updateFilter("floraType", value)}
          >
            <SelectTrigger id="floraType">
              <SelectValue placeholder="Alle typen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle typen</SelectItem>
              {FLORA_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="packagingType">Verpakking</Label>
          <Select
            defaultValue={searchParams.get("packagingType") || "all"}
            onValueChange={(value) => updateFilter("packagingType", value)}
          >
            <SelectTrigger id="packagingType">
              <SelectValue placeholder="Alle verpakkingen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle verpakkingen</SelectItem>
              {PACKAGING_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="milkType">Melksoort</Label>
          <Select
            defaultValue={searchParams.get("milkType") || "all"}
            onValueChange={(value) => updateFilter("milkType", value)}
          >
            <SelectTrigger id="milkType">
              <SelectValue placeholder="Alle melksoorten" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle melksoorten</SelectItem>
              {MILK_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="country">Land van herkomst</Label>
          <Select
            defaultValue={searchParams.get("country") || "all"}
            onValueChange={(value) => updateFilter("country", value)}
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="Alle landen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle landen</SelectItem>
              {COUNTRIES.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.flag} {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

