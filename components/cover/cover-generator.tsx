"use client"

import { useState, useRef } from "react"
import { CoverForm } from "./cover-form"
import { CoverPreview } from "./cover-preview"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, BookOpen } from "lucide-react"
import type { CoverData } from "@/types/cover"
import { defaultCoverData } from "@/types/cover"

export function CoverGenerator() {
  const [coverData, setCoverData] = useState<CoverData>(defaultCoverData)
  const [activePreview, setActivePreview] = useState<"cover" | "titlePage">("cover")
  const coverRef = useRef<HTMLDivElement>(null)
  const titlePageRef = useRef<HTMLDivElement>(null)

  const handleGenerate = (data: CoverData) => {
    setCoverData(data)
  }

  const handlePrint = async () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const coverHtml = coverRef.current?.outerHTML || ""
    const titlePageHtml = titlePageRef.current?.outerHTML || ""

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Capa e Folha de Rosto - ${coverData.title}</title>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: "Times New Roman", serif;
            }
            .page {
              width: 210mm;
              min-height: 297mm;
              padding: 25mm 30mm;
              background: white;
              display: flex;
              flex-direction: column;
              page-break-after: always;
            }
            .page:last-child {
              page-break-after: auto;
            }
            .header {
              text-align: center;
              margin-bottom: 20mm;
            }
            .logo {
              width: 20mm;
              height: 20mm;
              margin: 0 auto 5mm;
              border: 2px solid #1e3a5f;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(30, 58, 95, 0.1);
            }
            .logo span {
              font-size: 18px;
              font-weight: bold;
              color: #1e3a5f;
            }
            .institution {
              font-size: 14pt;
              font-weight: bold;
              text-transform: uppercase;
              color: #1e3a5f;
              letter-spacing: 0.5px;
            }
            .course {
              font-size: 12pt;
              text-transform: uppercase;
              color: #333;
              margin-top: 2mm;
            }
            .authors {
              text-align: center;
              margin-top: 15mm;
            }
            .authors p {
              font-size: 14pt;
              font-weight: bold;
              text-transform: uppercase;
              line-height: 1.6;
            }
            .title-section {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: center;
            }
            .title {
              font-size: 16pt;
              font-weight: bold;
              text-transform: uppercase;
              line-height: 1.5;
            }
            .subtitle {
              font-size: 14pt;
              margin-top: 5mm;
              line-height: 1.5;
            }
            .description {
              width: 60%;
              margin-left: auto;
              text-align: justify;
              font-size: 12pt;
              line-height: 1.5;
              margin-top: 20mm;
              margin-bottom: 20mm;
            }
            .description p {
              margin-bottom: 5mm;
            }
            .footer {
              text-align: center;
              margin-top: auto;
            }
            .footer p {
              font-size: 14pt;
              text-transform: uppercase;
              line-height: 1.6;
            }
            @media print {
              body { -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <!-- Capa -->
          <div class="page">
            <div class="header">
              <div class="logo"><span>UF</span></div>
              <p class="institution">${coverData.institutionName}</p>
              <p class="course">${coverData.courseName}</p>
            </div>
            <div class="authors">
              ${coverData.authors.filter(Boolean).map(a => `<p>${a}</p>`).join("")}
            </div>
            <div class="title-section">
              <h1 class="title">${coverData.title || "TÍTULO DO TRABALHO"}</h1>
              ${coverData.subtitle ? `<h2 class="subtitle">${coverData.subtitle}</h2>` : ""}
            </div>
            <div class="footer">
              <p>${coverData.city}</p>
              <p style="text-transform: none;">${coverData.year}</p>
            </div>
          </div>

          <!-- Folha de Rosto -->
          <div class="page">
            <div class="header">
              <div class="logo"><span>UF</span></div>
              <p class="institution">${coverData.institutionName}</p>
              <p class="course">${coverData.courseName}</p>
            </div>
            <div class="authors">
              ${coverData.authors.filter(Boolean).map(a => `<p>${a}</p>`).join("")}
            </div>
            <div class="title-section">
              <h1 class="title">${coverData.title || "TÍTULO DO TRABALHO"}</h1>
              ${coverData.subtitle ? `<h2 class="subtitle">${coverData.subtitle}</h2>` : ""}
            </div>
            <div class="description">
              <p>
                ${coverData.workType === "tcc" 
                  ? `Trabalho de Conclusão de Curso apresentado ao Curso de ${coverData.courseName} do ${coverData.institutionName}, como requisito parcial para obtenção do título de Tecnólogo em ${coverData.courseName.split(" ").slice(-2).join(" ")}.`
                  : `${coverData.workType === "relatorio" ? "Relatório" : coverData.workType === "artigo" ? "Artigo Científico" : coverData.workType === "projeto" ? "Projeto Integrador" : "Atividade Avaliativa"} apresentado(a) à disciplina de ${coverData.discipline || "[Disciplina]"} do Curso de ${coverData.courseName} do ${coverData.institutionName}, como requisito parcial para obtenção de nota.`
                }
              </p>
              ${coverData.workType === "tcc" && coverData.advisor 
                ? `<p><strong>Orientador(a):</strong> ${coverData.advisor}${coverData.coadvisor ? `<br><strong>Coorientador(a):</strong> ${coverData.coadvisor}` : ""}</p>`
                : coverData.professor 
                  ? `<p><strong>Professor(a):</strong> ${coverData.professor}</p>` 
                  : ""
              }
            </div>
            <div class="footer">
              <p>${coverData.city}</p>
              <p style="text-transform: none;">${coverData.year}</p>
            </div>
          </div>
        </body>
      </html>
    `)

    printWindow.document.close()
    
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Preencha os Dados</h2>
        </div>
        <CoverForm onGenerate={handleGenerate} />
      </div>

      {/* Preview Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Pre-visualizacao</h2>
          <Button onClick={handlePrint} className="gap-2">
            <Download className="h-4 w-4" />
            Baixar PDF
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
