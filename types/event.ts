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
  status: "pending" | "completed"
  createdAt: Date
  updatedAt: Date
}

export type EventCategory = "aula" | "trabalho" | "prova" | "estudo" | "outros"

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
  status?: "pending" | "completed"
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: string
}

export const categoryLabels: Record<EventCategory, string> = {
  aula: "Aula",
  trabalho: "Trabalho",
  prova: "Prova",
  estudo: "Estudo",
  outros: "Outros",
}

export const categoryColors: Record<EventCategory, string> = {
  aula: "bg-blue-500 text-white",
  trabalho: "bg-orange-500 text-white",
  prova: "bg-red-500 text-white",
  estudo: "bg-green-500 text-white",
  outros: "bg-gray-500 text-white",
}
