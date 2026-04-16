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
    title: "Aula: Algoritmos e Estrutura de Dados",
    description: "Revisão de listas ligadas e árvores binárias para a próxima prova. Bloco C - Sala 102.",
    date: tomorrow,
    startTime: "19:00",
    endTime: "21:00",
    location: "Campus Central",
    category: "aula",
    organizer: "Prof. Ricardo Lima",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Entrega: Trabalho de Banco de Dados",
    description: "Finalizar o modelo ER e implementar o script SQL de criação das tabelas.",
    date: inThreeDays,
    startTime: "23:59",
    endTime: "23:59",
    location: "Online (AVA)",
    category: "trabalho",
    organizer: "Felipe (Eu)",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "P2: Engenharia de Software",
    description: "Estudar padrões de projeto (GoF) e diagramas UML. Conteúdo acumulado do semestre.",
    date: nextWeek,
    startTime: "19:00",
    endTime: "22:00",
    location: "Auditório B",
    category: "prova",
    organizer: "Coordenação ADS",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function getEvents(): Promise<Event[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export async function getEventById(id: string): Promise<Event | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  
  return events.find((e) => e.id === id) || null
}

export async function createEvent(input: CreateEventInput): Promise<Event> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  
  const newEvent: Event = {
    ...input,
    id: crypto.randomUUID(),
    status: input.status || "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  
  events.push(newEvent)
  return newEvent
}

export async function updateEvent(input: UpdateEventInput): Promise<Event | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  
  const index = events.findIndex((e) => e.id === input.id)
  if (index === -1) return null
  
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
  
  events.splice(index, 1)
  return true
}
