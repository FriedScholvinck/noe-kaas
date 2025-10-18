export type ProductFilters = {
  search?: string
  type?: string
  region?: string
  ripeningMin?: number
  ripeningMax?: number
  sortBy?: "name" | "ripening-asc" | "ripening-desc"
}

export function applyProductFilters(products: any[], filters: ProductFilters) {
  let filtered = [...products]

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower)) ||
        p.region?.toLowerCase().includes(searchLower)
    )
  }

  if (filters.type) {
    filtered = filtered.filter((p) => p.type === filters.type)
  }

  if (filters.region) {
    filtered = filtered.filter((p) => p.region === filters.region)
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
  }

  return filtered
}

export const CHEESE_TYPES = [
  { value: "hard", label: "Hard" },
  { value: "soft", label: "Zacht" },
  { value: "semi-hard", label: "Semi-hard" },
  { value: "blue", label: "Schimmel" },
]

export const DUTCH_REGIONS = [
  "Noord-Holland",
  "Zuid-Holland",
  "Friesland",
  "Overijssel",
  "Utrecht",
]

