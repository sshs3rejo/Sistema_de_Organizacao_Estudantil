"use client"

import { useState, useEffect } from "react"
import { CalendarWidget } from "@/components/calendar/calendar-widget"
import { AcademicNotifications } from "@/components/calendar/academic-notifications"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Bell, Calendar, Info } from "lucide-react"
import Link from "next/link"
import { academicCalendar2026_1, getUpcomingEvents } from "@/lib/academic-calendar-data"
import { AcademicEvent } from "@/types/calendar"

export default function CalendarioPage() {
  const [today, setToday] = useState<Date>(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setToday(new Date())
    setMounted(true)
  }, [])

  // Get upcoming events (next 30 days)
  const upcomingEvents = getUpcomingEvents(30)


  const getEventTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      feriado: "Feriado",
      recesso: "Recesso",
      avaliacao: "Avaliação",
      prazo: "Prazo",
      evento: "Evento",
      aula: "Aula",
    }
    return labels[type] || type
  }

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      feriado: "bg-red-500/20 text-red-400 border-red-500/30",
      recesso: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      avaliacao: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      prazo: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      evento: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      aula: "bg-primary/20 text-primary border-primary/30",
    }
    return colors[type] || "bg-muted text-muted-foreground border-border"
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(date)
  }

  // Avoid hydration mismatch by rendering a placeholder or the same initial state until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Calendar className="h-12 w-12 text-primary animate-pulse" />
          <p className="text-muted-foreground">Carregando calendário...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Calendário Acadêmico</h1>
                <p className="text-sm text-muted-foreground">Semestre 2026.1 - Campus Caxias</p>
              </div>
            </div>
          </div>
          <AcademicNotifications />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] items-start">
          {/* Calendar Widget */}
          <div className="mx-auto w-full lg:mx-0 lg:max-w-[700px]">
            <CalendarWidget />
          </div>

          {/* Upcoming Events List */}
          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="h-5 w-5 text-primary" />
                  Próximos 30 Dias
                </CardTitle>
                <CardDescription>
                  {upcomingEvents.length} eventos programados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    Nenhum evento nos próximos 30 dias
                  </p>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {upcomingEvents.map((event, index) => {
                      const eventDate = new Date(event.date)
                      const isToday = eventDate.toDateString() === today.toDateString() || 
                                     (event.endDate && today >= eventDate && today <= new Date(event.endDate))
                      
                      return (
                        <div
                          key={index}
                          className={`rounded-lg border p-3 transition-colors ${
                            isToday
                              ? "border-primary bg-primary/5"
                              : "border-border bg-secondary/30 hover:bg-secondary/50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm leading-tight">
                                {event.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1 capitalize">
                                {formatDate(eventDate)}
                                {event.endDate && ` - ${formatDate(new Date(event.endDate))}`}
                              </p>
                            </div>
                            <span
                              className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${getEventTypeColor(
                                event.type
                              )}`}
                            >
                              {getEventTypeLabel(event.type)}
                            </span>
                          </div>
                          {isToday && (
                            <div className="mt-2 flex items-center gap-1 text-xs text-primary">
                              <Info className="h-3 w-3" />
                              Hoje
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Legenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: "feriado", label: "Feriado" },
                    { type: "recesso", label: "Recesso" },
                    { type: "avaliacao", label: "Avaliação" },
                    { type: "prazo", label: "Prazo" },
                    { type: "evento", label: "Evento" },
                    { type: "aula", label: "Aula" },
                  ].map(({ type, label }) => (
                    <div key={type} className="flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full ${getEventTypeColor(type).split(" ")[0]}`}
                      />
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

