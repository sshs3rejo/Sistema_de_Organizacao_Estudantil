"use client"

import { useState, useEffect } from "react"
import { Bell, Calendar, ChevronRight, X, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getTodayEvents, getUpcomingEvents } from "@/lib/academic-calendar-data"
import type { AcademicEvent } from "@/types/calendar"
import { eventTypeLabels, eventTypeColors } from "@/types/calendar"

function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}

function getDaysUntil(date: Date): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDate = new Date(date)
  eventDate.setHours(0, 0, 0, 0)
  return Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function EventItem({ event }: { event: AcademicEvent }) {
  const daysUntil = getDaysUntil(event.date)
  
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/50 p-3 transition-colors hover:bg-card">
      <div className={`mt-0.5 rounded-md border p-2 ${eventTypeColors[event.type]}`}>
        <Calendar className="h-4 w-4" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium leading-tight">{event.title}</p>
          <Badge variant="outline" className={`shrink-0 text-xs ${eventTypeColors[event.type]}`}>
            {eventTypeLabels[event.type]}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{formatDate(event.date)}</span>
          {event.endDate && (
            <>
              <span>-</span>
              <span>{formatDate(event.endDate)}</span>
            </>
          )}
        </div>
        {daysUntil === 0 && (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            Hoje
          </Badge>
        )}
        {daysUntil === 1 && (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            Amanha
          </Badge>
        )}
        {daysUntil > 1 && daysUntil <= 3 && (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Em {daysUntil} dias
          </Badge>
        )}
      </div>
    </div>
  )
}

export function AcademicNotifications() {
  const [isOpen, setIsOpen] = useState(false)
  const [todayEvents, setTodayEvents] = useState<AcademicEvent[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<AcademicEvent[]>([])

  useEffect(() => {
    setTodayEvents(getTodayEvents())
    setUpcomingEvents(getUpcomingEvents(7))
  }, [])

  const totalNotifications = todayEvents.length + upcomingEvents.filter(e => getDaysUntil(e.date) > 0).length

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {totalNotifications > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {totalNotifications > 9 ? "9+" : totalNotifications}
            </span>
          )}
          <span className="sr-only">Notificacoes do Calendario Academico</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full p-6 sm:max-w-md">
        <SheetHeader className="px-0">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Calendar className="h-5 w-5 text-primary" />
            Calendário Acadêmico 2026.1
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="mt-8 h-[calc(100vh-120px)]">
          <div className="space-y-6 pr-4 pb-8">
            {/* Today's Events */}
            {todayEvents.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <h3 className="font-semibold text-red-400">Hoje</h3>
                  <Badge variant="destructive" className="ml-auto">
                    {todayEvents.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {todayEvents.map((event) => (
                    <EventItem key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-400" />
                  <h3 className="font-semibold text-amber-400">Proximos 7 dias</h3>
                  <Badge variant="outline" className="ml-auto border-amber-500/30 text-amber-400">
                    {upcomingEvents.filter(e => getDaysUntil(e.date) > 0).length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {upcomingEvents
                    .filter((e) => getDaysUntil(e.date) > 0)
                    .map((event) => (
                      <EventItem key={event.id} event={event} />
                    ))}
                </div>
              </div>
            )}

            {todayEvents.length === 0 && upcomingEvents.filter(e => getDaysUntil(e.date) > 0).length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">Nenhum evento nos proximos 7 dias</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
