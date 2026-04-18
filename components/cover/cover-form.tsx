"use client"

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
  data: CoverData
  updateField: <K extends keyof CoverData>(field: K, value: CoverData[K]) => void
  updateAuthor: (index: number, value: string) => void
  addAuthor: () => void
  removeAuthor: (index: number) => void
}

export function CoverForm({ 
  data, 
  updateField, 
  updateAuthor, 
  addAuthor, 
  removeAuthor 
}: CoverFormProps) {

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Informacoes da Instituicao</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="institutionName">Nome da Instituicao</Label>
            <Input
              id="institutionName"
              value={data.institutionName}
              onChange={(e) => updateField("institutionName", e.target.value)}
              placeholder="CENTRO UNIVERSITÁRIO DE CIÊNCIAS E TECNOLOGIAS DO MARANHÃO"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="courseName">Nome do Curso</Label>
            <Input
              id="courseName"
              value={data.courseName}
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
            <Label htmlFor="fontFamily">Fonte do Trabalho</Label>
            <Select
              value={data.fontFamily}
              onValueChange={(value: "arial" | "times") =>
                updateField("fontFamily", value)
              }
            >
              <SelectTrigger id="fontFamily">
                <SelectValue placeholder="Selecione a fonte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="times">Times New Roman</SelectItem>
                <SelectItem value="arial">Arial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workType">Tipo de Trabalho</Label>
            <Select
              value={data.workType}
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
              value={data.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Digite o título do trabalho"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitulo (opcional)</Label>
            <Input
              id="subtitle"
              value={data.subtitle || ""}
              onChange={(e) => updateField("subtitle", e.target.value)}
              placeholder="Digite o subtítulo, se houver"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discipline">Disciplina</Label>
            <Input
              id="discipline"
              value={data.discipline || ""}
              onChange={(e) => updateField("discipline", e.target.value)}
              placeholder="Ex: Engenharia de Software II"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="professor">Professor(a)</Label>
            <Input
              id="professor"
              value={data.professor || ""}
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
          {data.authors.map((author, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={author}
                onChange={(e) => updateAuthor(index, e.target.value)}
                placeholder={`Nome do autor ${index + 1}`}
                required
              />
              {data.authors.length > 1 && (
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
              value={data.advisor || ""}
              onChange={(e) => updateField("advisor", e.target.value)}
              placeholder="Nome do(a) orientador(a)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coadvisor">Coorientador(a) (opcional)</Label>
            <Input
              id="coadvisor"
              value={data.coadvisor || ""}
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
                value={data.city}
                onChange={(e) => updateField("city", e.target.value)}
                placeholder="Caxias - MA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Ano</Label>
              <Input
                id="year"
                value={data.year}
                onChange={(e) => updateField("year", e.target.value)}
                placeholder="2026"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="semester">Semestre</Label>
            <Input
              id="semester"
              value={data.semester || ""}
              onChange={(e) => updateField("semester", e.target.value)}
              placeholder="2026.1"
            />
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
