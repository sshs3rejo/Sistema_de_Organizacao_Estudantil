"use client"

import { useState, useRef } from "react"
import { CoverForm } from "./cover-form"
import { CoverPreview } from "./cover-preview"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, BookOpen } from "lucide-react"
import type { CoverData } from "@/types/cover"
import { defaultCoverData } from "@/types/cover"
import { generateDocx } from "@/lib/generate-docx"

export function CoverGenerator() {
  const [coverData, setCoverData] = useState<CoverData>(defaultCoverData)
  const [activePreview, setActivePreview] = useState<"cover" | "titlePage">("cover")
  const coverRef = useRef<HTMLDivElement>(null)
  const titlePageRef = useRef<HTMLDivElement>(null)

  const updateField = <K extends keyof CoverData>(
    field: K,
    value: CoverData[K]
  ) => {
    setCoverData((prev) => ({ ...prev, [field]: value }))
  }

  const updateAuthor = (index: number, value: string) => {
    setCoverData((prev) => ({
      ...prev,
      authors: prev.authors.map((author, i) => (i === index ? value : author)),
    }))
  }

  const addAuthor = () => {
    setCoverData((prev) => ({ ...prev, authors: [...prev.authors, ""] }))
  }

  const removeAuthor = (index: number) => {
    if (coverData.authors.length > 1) {
      setCoverData((prev) => ({
        ...prev,
        authors: prev.authors.filter((_, i) => i !== index),
      }))
    }
  }

  const handleDownload = async () => {
    try {
      await generateDocx(coverData)
    } catch (error) {
      console.error("Erro ao gerar documento:", error)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Preencha os Dados</h2>
        </div>
        <CoverForm 
          data={coverData} 
          updateField={updateField} 
          updateAuthor={updateAuthor}
          addAuthor={addAuthor}
          removeAuthor={removeAuthor}
        />
      </div>

      {/* Preview Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Pre-visualizacao</h2>
          <Button onClick={handleDownload} className="gap-2">
            <FileText className="h-4 w-4" />
            Baixar DOCX
          </Button>
        </div>

        <Tabs value={activePreview} onValueChange={(v) => setActivePreview(v as "cover" | "titlePage")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cover" className="gap-2">
              <FileText className="h-4 w-4" />
              Capa
            </TabsTrigger>
            <TabsTrigger value="titlePage" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Folha de Rosto
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cover" className="mt-4">
            <div className="overflow-hidden rounded-lg border border-border/50 bg-muted/20 p-4">
              <CoverPreview ref={coverRef} data={coverData} type="cover" />
            </div>
          </TabsContent>

          <TabsContent value="titlePage" className="mt-4">
            <div className="overflow-hidden rounded-lg border border-border/50 bg-muted/20 p-4">
              <CoverPreview ref={titlePageRef} data={coverData} type="titlePage" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
