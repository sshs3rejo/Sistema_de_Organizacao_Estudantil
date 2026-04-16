"use server"

import type { Event, CreateEventInput, UpdateEventInput } from "@/types/event"

// Helper to get dates relative to today
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
const inThreeDays = new Date(today)
inThreeDays.setDate(inThreeDays.getDate() + 3)
const nextWeek = new Date(today)
nextWeek.setDate(nextWeek.getDate() + 7)
const nextMonth = new Date(today)
nextMonth.setDate(nextMonth.getDate() + 30)

// Simulated database - Replace with Prisma when ready
let events: Event[] = [
  {
    id: "1",
    title: "Palestra: Carreira em Tecnologia",
    description: "Profissionais da área compartilham suas experiências e dão dicas para quem está iniciando na carreira de TI. Venha descobrir as melhores práticas e tendências do mercado!",
    date: tomorrow,
    startTime: "19:00",
    endTime: "21:00",
    location: "Auditório Principal - Bloco A",
    category: "palestra",
    organizer: "Prof. Carlos Silva",
    maxParticipants: 150,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Workshop de React e Next.js",
    description: "Aprenda a criar aplicações web modernas com React e Next.js. Traga seu notebook!",
    date: inThreeDays,
    startTime: "09:00",
    endTime: "12:00",
    location: "Laboratório de Informática 2",
    category: "workshop",
    organizer: "Prof. Maria Santos",
    maxParticipants: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Semana de ADS 2026",
    description: "Evento anual do curso de Análise e Desenvolvimento de Sistemas com palestras, workshops e networking.",
    date: nextMonth,
    startTime: "08:00",
    endTime: "18:00",
    location: "Bloco B - Todos os Auditórios",
    category: "semana_academica",
    organizer: "Coordenação ADS",
    maxParticipants: 500,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Hackathon: Soluções Sustentáveis",
    description: "Competição de programação focada em soluções para sustentabilidade. Forme seu time e participe!",
    date: nextWeek,
    startTime: "08:00",
    endTime: "20:00",
    location: "Centro de Convenções",
    category: "outros",
    organizer: "Empresa TechGreen",
    maxParticipants: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function getEvents(): Promise<Event[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  
  // Replace with: return await prisma.event.findMany({ orderBy: { date: 'asc' } })
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export async function getEventById(id: string): Promise<Event | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  
  // Replace with: return await prisma.event.findUnique({ where: { id } })
  return events.find((e) => e.id === id) || null
}

export async function createEvent(input: CreateEventInput): Promise<Event> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  
  const newEvent: Event = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  
  // Replace with: return await prisma.event.create({ data: input })
  events.push(newEvent)
  return newEvent
}

export async function updateEvent(input: UpdateEventInput): Promise<Event | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  
  const index = events.findIndex((e) => e.id === input.id)
  if (index === -1) return null
  
  // Replace with: return await prisma.event.update({ where: { id: input.id }, data: input })
  events[index] = {
    ...events[index],
    ...input,
    updatedAt: new Date(),
  }
  
  return events[index]
}

export async function deleteEvent(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  
  const index = events.findIndex((e) => e.id === id)
  if (index === -1) return false
  
  // Replace with: await prisma.event.delete({ where: { id } })
  events.splice(index, 1)
  return true
}
