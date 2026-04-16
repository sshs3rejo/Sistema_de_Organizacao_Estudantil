"use client"

import { Calendar, Clock, MapPin, User, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Event } from "@/types/event"
import { categoryLabels, categoryColors } from "@/types/event"

interface EventCardProps {
  event: Event
  onEdit: (event: Event) => void
  onDelete: (event: Event) => void
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <Card className="group relative overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Badge className={`${categoryColors[event.category]} mb-2`}>
              {categoryLabels[event.category]}
            </Badge>
            <h3 className="font-semibold text-lg leading-tight text-balance line-clamp-2">
              {event.title}
            </h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                aria-label="Abrir menu de ações"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(event)}>
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(event)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {event.description}
        </p>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0 text-primary" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">{event.organizer}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
