"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getEventsForMonth } from "@/lib/academic-calendar-data"
import type { AcademicEvent } from "@/types/calendar"
import { eventTypeColors } from "@/types/calendar"

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
]

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(month: number, year: number): number {
  return new Date(year, month, 1).getDay()
}

export function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(2026)

  const events = getEventsForMonth(currentMonth, currentYear)
  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const getEventsForDay = (day: number): AcademicEvent[] => {
    return events.filter((event) => {
      const eventDay = event.date.getDate()
      const endDay = event.endDate?.getDate() || eventDay
      return day >= eventDay && day <= endDay
    })
  }

  const today = new Date()
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    )
  }

  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            Calendario 2026.1
          </CardTitle>
        </div>
        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold">
            {MONTHS[currentMonth]} {currentYear}
          </span>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((day) => (
            <div key={day} className="py-2 text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          <TooltipProvider>
            {days.map((day, index) => {
              const dayEvents = day ? getEventsForDay(day) : []
              const hasEvents = dayEvents.length > 0
              const hasHoliday = dayEvents.some((e) => e.type === "feriado")
              const hasAssessment = dayEvents.some((e) => e.type === "avaliacao")
              const hasDeadline = dayEvents.some((e) => e.type === "prazo")

              return (
                <div key={index} className="aspect-square p-0.5">
                  {day !== null ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className={`
                            flex h-full w-full flex-col items-center justify-center rounded-md text-sm transition-colors
                            ${isToday(day) ? "bg-primary text-primary-foreground font-bold" : ""}
                            ${hasHoliday && !isToday(day) ? "bg-red-500/20 text-red-400" : ""}
                            ${hasAssessment && !hasHoliday && !isToday(day) ? "bg-purple-500/20 text-purple-400" : ""}
                            ${hasDeadline && !hasAssessment && !hasHoliday && !isToday(day) ? "bg-amber-500/20 text-amber-400" : ""}
                            ${hasEvents && !hasHoliday && !hasAssessment && !hasDeadline && !isToday(day) ? "bg-blue-500/10" : ""}
                            ${!hasEvents && !isToday(day) ? "hover:bg-muted" : ""}
                          `}
                        >
                          {day}
                          {hasEvents && (
                            <div className="flex gap-0.5 mt-0.5">
                              {dayEvents.slice(0, 3).map((e, i) => (
                                <div
                                  key={i}
                                  className={`h-1 w-1 rounded-full ${
                                    e.type === "feriado"
                                      ? "bg-red-400"
                                      : e.type === "avaliacao"
                                      ? "bg-purple-400"
                                      : e.type === "prazo"
                                      ? "bg-amber-400"
                                      : "bg-blue-400"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </button>
                      </TooltipTrigger>
                      {hasEvents && (
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="space-y-1">
                            {dayEvents.map((event, i) => (
                              <div key={i} className="text-xs">
                                <Badge
                                  variant="outline"
                                  className={`mr-1 text-[10px] ${eventTypeColors[event.type]}`}
                                >
                                  {event.type}
                                </Badge>
                                {event.title}
                              </div>
                            ))}
                          </div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  ) : (
                    <div />
                  )}
                </div>
              )
            })}
          </TooltipProvider>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-red-400" />
            <span className="text-muted-foreground">Feriado</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-purple-400" />
            <span className="text-muted-foreground">Avaliacao</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-muted-foreground">Prazo</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-blue-400" />
            <span className="text-muted-foreground">Evento</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
