"use client"

import { useMemo } from "react"
import { CalendarDays, Clock, MapPin, Sparkles, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Event } from "@/types/event"
import { categoryLabels, categoryColors } from "@/types/event"

interface UpcomingBannerProps {
  events: Event[]
  onViewEvent?: (event: Event) => void
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date)
}

function getDaysUntil(date: Date): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDate = new Date(date)
  eventDate.setHours(0, 0, 0, 0)
  const diffTime = eventDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function getUrgencyLabel(days: number): { text: string; className: string } {
  if (days === 0) return { text: "Hoje!", className: "bg-destructive text-destructive-foreground animate-pulse" }
  if (days === 1) return { text: "Amanhã!", className: "bg-chart-3 text-primary-foreground" }
  if (days <= 3) return { text: `Em ${days} dias`, className: "bg-chart-5 text-primary-foreground" }
  if (days <= 7) return { text: `Em ${days} dias`, className: "bg-primary text-primary-foreground" }
  return { text: `Em ${days} dias`, className: "bg-secondary text-secondary-foreground" }
}

export function UpcomingBanner({ events, onViewEvent }: UpcomingBannerProps) {
  const upcomingEvent = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const futureEvents = events
      .filter((event) => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)
        return eventDate >= today
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Return the closest event within 7 days
    const closest = futureEvents[0]
    if (closest) {
      const days = getDaysUntil(new Date(closest.date))
      if (days <= 7) return closest
    }
    return null
  }, [events])

  if (!upcomingEvent) return null

  const daysUntil = getDaysUntil(new Date(upcomingEvent.date))
  const urgency = getUrgencyLabel(daysUntil)

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 mb-8">
      {/* Background decoration */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-chart-2/10 blur-2xl" />
      
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={urgency.className}>
              <Sparkles className="mr-1 h-3 w-3" />
              {urgency.text}
            </Badge>
            <Badge className={categoryColors[upcomingEvent.category]}>
              {categoryLabels[upcomingEvent.category]}
            </Badge>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-primary mb-1">
              Próximo Evento
            </p>
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl text-balance">
              {upcomingEvent.title}
            </h2>
          </div>

          <p className="text-muted-foreground line-clamp-2 max-w-2xl">
            {upcomingEvent.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span className="capitalize">{formatDate(new Date(upcomingEvent.date))}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              <span>{upcomingEvent.startTime} - {upcomingEvent.endTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{upcomingEvent.location}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:flex-col lg:items-end">
          <div className="hidden lg:flex flex-col items-center rounded-lg bg-background/80 backdrop-blur px-6 py-3 border border-border">
            <span className="text-4xl font-bold text-primary">{daysUntil}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {daysUntil === 1 ? "dia" : "dias"}
            </span>
          </div>
          {onViewEvent && (
            <Button 
              onClick={() => onViewEvent(upcomingEvent)}
              variant="default"
              className="w-full lg:w-auto"
            >
              Ver Detalhes
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
