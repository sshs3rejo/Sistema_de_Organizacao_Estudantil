"use client"

import { useState, useMemo, useTransition } from "react"
import { Plus, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventFilters } from "./event-filters"
import { EventsGrid } from "./events-grid"
import { UpcomingBanner } from "./upcoming-banner"
import { EventForm } from "./event-form"
import { DeleteDialog } from "./delete-dialog"
import { AcademicNotifications } from "@/components/calendar/academic-notifications"
import Link from "next/link"
import { createEvent, updateEvent, deleteEvent } from "@/app/actions/events"
import type { Event, EventCategory, CreateEventInput } from "@/types/event"

interface EventsDashboardProps {
  initialEvents: Event[]
}

export function EventsDashboard({ initialEvents }: EventsDashboardProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | "all">("all")
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isPending, startTransition] = useTransition()

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesCategory =
        categoryFilter === "all" || event.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [events, searchQuery, categoryFilter])

  const handleEdit = (event: Event) => {
    setSelectedEvent(event)
    setFormOpen(true)
  }

  const handleDelete = (event: Event) => {
    setSelectedEvent(event)
    setDeleteDialogOpen(true)
  }

  const handleFormSubmit = async (data: CreateEventInput & { date: Date }) => {
    startTransition(async () => {
      if (selectedEvent) {
        const updated = await updateEvent({ ...data, id: selectedEvent.id })
        if (updated) {
          setEvents((prev) =>
            prev.map((e) => (e.id === updated.id ? updated : e))
          )
        }
      } else {
        const created = await createEvent(data)
        setEvents((prev) => [...prev, created])
      }
      setFormOpen(false)
      setSelectedEvent(null)
    })
  }

  const handleDeleteConfirm = async () => {
    if (!selectedEvent) return
    startTransition(async () => {
      const success = await deleteEvent(selectedEvent.id)
      if (success) {
        setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id))
      }
      setDeleteDialogOpen(false)
      setSelectedEvent(null)
    })
  }

  const handleOpenNewEvent = () => {
    setSelectedEvent(null)
    setFormOpen(true)
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Organização Estudantil</h1>
                <p className="text-sm text-muted-foreground">
                  Meu Espaço Acadêmico
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AcademicNotifications />
              <Link href="/calendario">
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Calendário Acadêmico</span>
                </Button>
              </Link>
              <Link href="/formatador">
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Formatador</span>
                </Button>
              </Link>
              <Button onClick={handleOpenNewEvent}>
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Novo Registro</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <UpcomingBanner events={events} onViewEvent={handleEdit} />

        <div className="space-y-6">
          <div>
            <EventFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredEvents.length}{" "}
              {filteredEvents.length === 1 ? "registro encontrado" : "registros encontrados"}
            </p>
          </div>

          <EventsGrid
            events={filteredEvents}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={false}
          />
        </div>
      </main>

      <EventForm
        open={formOpen}
        onOpenChange={setFormOpen}
        event={selectedEvent}
        onSubmit={handleFormSubmit}
        isLoading={isPending}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        event={selectedEvent}
        onConfirm={handleDeleteConfirm}
        isLoading={isPending}
      />
    </div>
  )
}
