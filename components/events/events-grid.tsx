"use client"

import { CalendarX } from "lucide-react"
import { EventCard } from "./event-card"
import type { Event } from "@/types/event"

interface EventsGridProps {
  events: Event[]
  onEdit: (event: Event) => void
  onDelete: (event: Event) => void
  isLoading?: boolean
}

export function EventsGrid({ events, onEdit, onDelete, isLoading }: EventsGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-72 rounded-lg bg-card animate-pulse border border-border"
          />
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <CalendarX className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Nenhum evento encontrado</h3>
        <p className="text-muted-foreground max-w-sm">
          Não há eventos que correspondam aos filtros selecionados. Tente ajustar
          sua busca ou criar um novo evento.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
