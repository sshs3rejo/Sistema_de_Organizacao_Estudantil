export interface AcademicEvent {
  id: string
  date: Date
  endDate?: Date
  title: string
  description?: string
  type: "feriado" | "prazo" | "avaliacao" | "evento" | "reuniao" | "atividade"
  course?: "medicina" | "outros" | "todos"
}

export interface CalendarMonth {
  month: number
  year: number
  events: AcademicEvent[]
  workingDays: number
}

export const eventTypeLabels: Record<AcademicEvent["type"], string> = {
  feriado: "Feriado",
  prazo: "Prazo",
  avaliacao: "Avaliação",
  evento: "Evento",
  reuniao: "Reunião",
  atividade: "Atividade",
}

export const eventTypeColors: Record<AcademicEvent["type"], string> = {
  feriado: "bg-red-500/20 text-red-400 border-red-500/30",
  prazo: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  avaliacao: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  evento: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  reuniao: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  atividade: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
}
