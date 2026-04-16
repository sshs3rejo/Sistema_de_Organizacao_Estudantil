"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { EventCategory } from "@/types/event"
import { categoryLabels } from "@/types/event"

interface EventFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  categoryFilter: EventCategory | "all"
  onCategoryChange: (value: EventCategory | "all") => void
}

export function EventFilters({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
}: EventFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar eventos por título..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
          aria-label="Buscar eventos"
        />
      </div>
      <Select
        value={categoryFilter}
        onValueChange={(value) => onCategoryChange(value as EventCategory | "all")}
      >
        <SelectTrigger className="w-full sm:w-[200px]" aria-label="Filtrar por categoria">
          <SelectValue placeholder="Todas as categorias" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          {(Object.keys(categoryLabels) as EventCategory[]).map((category) => (
            <SelectItem key={category} value={category}>
              {categoryLabels[category]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
