// Prisma-compatible TypeScript interface for the Event model
export interface Event {
  id: string
  title: string
  description: string
  date: Date
  startTime: string
  endTime: string
  location: string
  category: EventCategory
  organizer: string
  maxParticipants?: number
  createdAt: Date
  updatedAt: Date
}

export type EventCategory = "palestra" | "workshop" | "semana_academica" | "outros"

export interface CreateEventInput {
  title: string
  description: string
  date: Date
  startTime: string
  endTime: string
  location: string
  category: EventCategory
  organizer: string
  maxParticipants?: number
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: string
}

export const categoryLabels: Record<EventCategory, string> = {
  palestra: "Palestra",
  workshop: "Workshop",
  semana_academica: "Semana Acadêmica",
  outros: "Outros",
}

export const categoryColors: Record<EventCategory, string> = {
  palestra: "bg-chart-1 text-primary-foreground",
  workshop: "bg-chart-2 text-primary-foreground",
  semana_academica: "bg-chart-3 text-primary-foreground",
  outros: "bg-chart-4 text-primary-foreground",
}
