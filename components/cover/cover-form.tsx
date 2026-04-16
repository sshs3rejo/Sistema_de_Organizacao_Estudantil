"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { CoverData } from "@/types/cover"
import { defaultCoverData, workTypeLabels } from "@/types/cover"

interface CoverFormProps {
  onGenerate: (data: CoverData) => void
}

export function CoverForm({ onGenerate }: CoverFormProps) {
  const [formData, setFormData] = useState<CoverData>(defaultCoverData)

  const updateField = <K extends keyof CoverData>(
    field: K,
    value: CoverData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addAuthor = () => {
    setFormData((prev) => ({ ...prev, authors: [...prev.authors, ""] }))
  }

  const removeAuthor = (index: number) => {
    if (formData.authors.length > 1) {
      setFormData((prev) => ({
        ...prev,
        authors: prev.authors.filter((_, i) => i !== index),
      }))
    }
  }

  const updateAuthor = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.map((author, i) => (i === index ? value : author)),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Informacoes da Instituicao</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="institutionName">Nome da Instituicao</Label>
            <Input
              id="institutionName"
              value={formData.institutionName}
              onChange={(e) => updateField("institutionName", e.target.value)}
              placeholder="CENTRO UNIVERSITÁRIO UNIFACEMA"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="courseName">Nome do Curso</Label>
            <Input
              id="courseName"
              value={formData.courseName}
              onChange={(e) => updateField("courseName", e.target.value)}
              placeholder="ANÁLISE E DESENVOLVIMENTO DE SISTEMAS"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Informacoes do Trabalho</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workType">Tipo de Trabalho</Label>
            <Select
              value={formData.workType}
              onValueChange={(value: CoverData["workType"]) =>
                updateField("workType", value)
              }
            >
              <SelectTrigger id="workType">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(workTypeLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Titulo do Trabalho</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Digite o título do trabalho"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitulo (opcional)</Label>
            <Input
              id="subtitle"
              value={formData.subtitle || ""}
              onChange={(e) => updateField("subtitle", e.target.value)}
              placeholder="Digite o subtítulo, se houver"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discipline">Disciplina</Label>
            <Input
              id="discipline"
              value={formData.discipline || ""}
              onChange={(e) => updateField("discipline", e.target.value)}
              placeholder="Ex: Engenharia de Software II"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="professor">Professor(a)</Label>
            <Input
              id="professor"
              value={formData.professor || ""}
              onChange={(e) => updateField("professor", e.target.value)}
              placeholder="Nome do(a) professor(a)"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Autores</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addAuthor}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Adicionar
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {formData.authors.map((author, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={author}
                onChange={(e) => updateAuthor(index, e.target.value)}
                placeholder={`Nome do autor ${index + 1}`}
                required
              />
              {formData.authors.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAuthor(index)}
                  className="shrink-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Orientacao (TCC)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="advisor">Orientador(a)</Label>
            <Input
              id="advisor"
              value={formData.advisor || ""}
              onChange={(e) => updateField("advisor", e.target.value)}
              placeholder="Nome do(a) orientador(a)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coadvisor">Coorientador(a) (opcional)</Label>
            <Input
              id="coadvisor"
              value={formData.coadvisor || ""}
              onChange={(e) => updateField("coadvisor", e.target.value)}
              placeholder="Nome do(a) coorientador(a)"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Local e Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateField("city", e.target.value)}
                placeholder="Caxias - MA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Ano</Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) => updateField("year", e.target.value)}
                placeholder="2026"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="semester">Semestre</Label>
            <Input
              id="semester"
              value={formData.semester || ""}
              onChange={(e) => updateField("semester", e.target.value)}
              placeholder="2026.1"
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" size="lg">
        Gerar Capa e Folha de Rosto
      </Button>
    </form>
  )
}
