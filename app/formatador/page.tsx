import { CoverGenerator } from "@/components/cover/cover-generator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, GraduationCap } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Formatador de Capas - Sistema de Eventos Acadêmicos",
  description: "Gere capas e folhas de rosto para trabalhos acadêmicos seguindo o padrão do UniFacema",
}

export default function FormatadorPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Formatador de Capas</h1>
                <p className="text-sm text-muted-foreground">
                  Gere capas e folhas de rosto padronizadas
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <CoverGenerator />
      </main>
    </div>
  )
}
