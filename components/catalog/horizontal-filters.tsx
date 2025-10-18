"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FLORA_TYPES, PACKAGING_TYPES, MILK_TYPES, COUNTRIES } from "@/lib/filters"
import { Search, X, ArrowUpDown, Filter } from "lucide-react"
import { useState } from "react"

export function HorizontalFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  function toggleFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    const currentValue = params.get(key)
    
    if (currentValue === value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`?${params.toString()}`)
  }

  function removeSpecificFilter(key: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    router.push(`?${params.toString()}`)
  }

  function clearFilters() {
    router.push("/portaal")
  }

  const activeFilters = [
    { key: "floraType", value: searchParams.get("floraType") },
    { key: "packagingType", value: searchParams.get("packagingType") },
    { key: "milkType", value: searchParams.get("milkType") },
    { key: "country", value: searchParams.get("country") }
  ].filter(filter => filter.value)

  const sortBy = searchParams.get("sortBy") || "popular"

  const FilterSection = ({ title, items, filterKey }: { title: string, items: any[], filterKey: string }) => (
    <div className="space-y-2">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</h3>
      <div className="flex flex-wrap gap-1">
        {items.map((item) => (
          <Button
            key={item.value}
            variant={searchParams.get(filterKey) === item.value ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFilter(filterKey, item.value)}
            className="text-xs h-7 px-2"
          >
            {item.flag && <span className="mr-1">{item.flag}</span>}
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Zoek in ons assortiment..."
                defaultValue={searchParams.get("search") || ""}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10 h-9"
              />
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button
              variant={sortBy === "popular" ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("sortBy", "popular")}
              className="flex items-center gap-1 h-9 px-3"
            >
              <ArrowUpDown className="h-3 w-3" />
              <span className="hidden sm:inline">Populair</span>
            </Button>
            <Button
              variant={sortBy === "name" ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("sortBy", "name")}
              className="h-9 px-3"
            >
              A-Z
            </Button>
            <Button
              variant={sortBy === "ripening-asc" ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("sortBy", "ripening-asc")}
              className="h-9 px-2 text-xs"
            >
              Rijping ↑
            </Button>
            <Button
              variant={sortBy === "ripening-desc" ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("sortBy", "ripening-desc")}
              className="h-9 px-2 text-xs"
            >
              Rijping ↓
            </Button>
          </div>
        </div>

        <div className="lg:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </Button>
        </div>

        <div className={`space-y-4 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FilterSection title="Flora type" items={FLORA_TYPES} filterKey="floraType" />
            <FilterSection title="Verpakking" items={PACKAGING_TYPES} filterKey="packagingType" />
            <FilterSection title="Melksoort" items={MILK_TYPES} filterKey="milkType" />
            <FilterSection title="Land" items={COUNTRIES} filterKey="country" />
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 pt-3 border-t">
            <span className="text-xs text-muted-foreground">Actieve filters:</span>
            <div className="flex flex-wrap gap-1">
              {activeFilters.map((filter) => (
                <Badge key={`${filter.key}-${filter.value}`} variant="secondary" className="flex items-center gap-1 text-xs">
                  {filter.value}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeSpecificFilter(filter.key)}
                  />
                </Badge>
              ))}
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-6 px-2">
              Wis alle
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
