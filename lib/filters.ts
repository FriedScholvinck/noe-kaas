export type ProductFilters = {
  search?: string
  floraType?: string
  packagingType?: string
  milkType?: string
  country?: string
  ripeningMin?: number
  ripeningMax?: number
  sortBy?: "name" | "ripening-asc" | "ripening-desc" | "popular"
}

export function applyProductFilters(products: any[], filters: ProductFilters, userOrderHistory?: any[]) {
  let filtered = [...products]

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        (typeof p.tags === 'string' ? p.tags.toLowerCase().includes(searchLower) : false) ||
        p.floraType?.toLowerCase().includes(searchLower) ||
        p.packagingType?.toLowerCase().includes(searchLower) ||
        p.milkType?.toLowerCase().includes(searchLower) ||
        p.sku?.toLowerCase().includes(searchLower)
    )
  }

  if (filters.floraType) {
    filtered = filtered.filter((p) => p.floraType === filters.floraType)
  }

  if (filters.packagingType) {
    filtered = filtered.filter((p) => p.packagingType === filters.packagingType)
  }

  if (filters.milkType) {
    filtered = filtered.filter((p) => p.milkType === filters.milkType)
  }

  if (filters.country) {
    filtered = filtered.filter((p) => p.country === filters.country)
  }

  if (filters.ripeningMin !== undefined) {
    filtered = filtered.filter(
      (p) => p.ripeningMonths && p.ripeningMonths >= filters.ripeningMin!
    )
  }

  if (filters.ripeningMax !== undefined) {
    filtered = filtered.filter(
      (p) => p.ripeningMonths && p.ripeningMonths <= filters.ripeningMax!
    )
  }

  if (filters.sortBy === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name))
  } else if (filters.sortBy === "ripening-asc") {
    filtered.sort((a, b) => (a.ripeningMonths || 0) - (b.ripeningMonths || 0))
  } else if (filters.sortBy === "ripening-desc") {
    filtered.sort((a, b) => (b.ripeningMonths || 0) - (a.ripeningMonths || 0))
  } else if (filters.sortBy === "popular") {
    filtered = sortByPopularity(filtered, userOrderHistory)
  }

  return filtered
}

function sortByPopularity(products: any[], userOrderHistory?: any[]) {
  const productOrderCounts = new Map<string, number>()
  
  if (userOrderHistory) {
    userOrderHistory.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        const count = productOrderCounts.get(item.productId) || 0
        productOrderCounts.set(item.productId, count + item.quantity)
      })
    })
  }

  return products.sort((a, b) => {
    const aIsOwnBrand = isOwnBrand(a.name)
    const bIsOwnBrand = isOwnBrand(b.name)
    
    if (aIsOwnBrand && !bIsOwnBrand) return -1
    if (!aIsOwnBrand && bIsOwnBrand) return 1
    
    const aOrderCount = productOrderCounts.get(a.id) || 0
    const bOrderCount = productOrderCounts.get(b.id) || 0
    
    if (aOrderCount !== bOrderCount) {
      return bOrderCount - aOrderCount
    }
    
    return a.name.localeCompare(b.name)
  })
}

function isOwnBrand(productName: string): boolean {
  const name = productName.toLowerCase()
  return name.includes('old friends') || name.includes('best friends')
}

export const FLORA_TYPES = [
  { value: "witflora", label: "Witflora (zacht)" },
  { value: "roodflora", label: "Roodflora" },
  { value: "hard", label: "Hard" },
  { value: "blauwader", label: "Blauwader" },
]

export const PACKAGING_TYPES = [
  { value: "wiel", label: "Wiel" },
  { value: "stuk", label: "Stuk" },
  { value: "plakken", label: "Plakken" },
  { value: "geraspt", label: "Geraspt" },
  { value: "hotelblok", label: "Hotelblok" },
  { value: "blokjes", label: "Blokjes" },
  { value: "smeerkaas", label: "Smeerkaas" },
  { value: "zuivel", label: "Zuivel" },
  { value: "kaasfondue", label: "Kaasfondue" },
]

export const MILK_TYPES = [
  { value: "buffel", label: "Buffel" },
  { value: "geit", label: "Geit" },
  { value: "koe", label: "Koe" },
  { value: "schaap", label: "Schaap" },
]

export const COUNTRIES = [
  { value: "NL", label: "Nederland", flag: "🇳🇱" },
  { value: "FR", label: "Frankrijk", flag: "🇫🇷" },
  { value: "IT", label: "Italië", flag: "🇮🇹" },
  { value: "ES", label: "Spanje", flag: "🇪🇸" },
  { value: "BE", label: "België", flag: "🇧🇪" },
  { value: "CH", label: "Zwitserland", flag: "🇨🇭" },
  { value: "DE", label: "Duitsland", flag: "🇩🇪" },
]

