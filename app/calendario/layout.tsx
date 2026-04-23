import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calendário Acadêmico - Organização Estudantil",
  description: "Acompanhe as datas importantes do seu semestre.",
}

export default function CalendarioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
