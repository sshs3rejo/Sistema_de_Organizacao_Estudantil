"use client"

import { forwardRef, useCallback, useLayoutEffect, useRef, useState } from "react"
import type { CoverData } from "@/types/cover"
import { workTypeLabels } from "@/types/cover"

/** Largura de referência da prévia (A4 ~96dpi); o conteúdo escala para caber no container. */
const DESIGN_W = 595
const DESIGN_H = (DESIGN_W * 297) / 210

interface CoverPreviewProps {
  data: CoverData
  type: "cover" | "titlePage"
}

export const CoverPreview = forwardRef<HTMLDivElement, CoverPreviewProps>(
  function CoverPreview({ data, type }, ref) {
    const isTCC = data.workType === "tcc"
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [scale, setScale] = useState(1)

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      },
      [ref]
    )

    useLayoutEffect(() => {
      const el = containerRef.current
      if (!el) return
      const update = () => {
        const w = el.getBoundingClientRect().width
        if (w > 0) setScale(w / DESIGN_W)
      }
      update()
      requestAnimationFrame(() => requestAnimationFrame(update))
      const ro = new ResizeObserver(update)
      ro.observe(el)
      return () => ro.disconnect()
    }, [])

    return (
      <div
        ref={setRefs}
        className="relative mx-auto aspect-[210/297] w-full min-w-0 max-w-[min(100%,595px)] overflow-hidden bg-white text-black shadow-2xl"
      >
        <div
          className="absolute left-0 top-0 origin-top-left bg-white text-black shadow-none"
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `scale(${scale})`,
            fontFamily:
              data.fontFamily === "arial" ? "Arial, sans-serif" : "Times New Roman, serif",
            backgroundImage: "url('/assets/timbre.png')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
        {/* A4 Page Container */}
        <div 
          className="relative flex h-full w-full flex-col"
          style={{
            padding: "3cm 2cm 2cm 3cm", // ABNT: Top 3, Right 2, Bottom 2, Left 3
          }}
        >
          {/* Header with Institution Logo Area */}
          {/* Layout for COVER */}
          {type === "cover" && (
            <>
              {/* Header: Institution + Course */}
              <div className="mb-20 text-center">
                <p className="text-sm font-bold uppercase tracking-wide text-[#1e3a5f]" style={{ fontSize: "14px", lineHeight: "1.4" }}>
                  {data.institutionName}
                </p>
                <p className="mt-1 text-sm uppercase text-gray-700" style={{ fontSize: "12px" }}>
                  {data.courseName}
                </p>
              </div>

              {/* Middle Section: Work Type + Title + Authors */}
              <div className="my-auto flex flex-col gap-12 text-center">
                <div className="space-y-2">
                  <p className="uppercase tracking-widest text-gray-600" style={{ fontSize: "14px" }}>
                    {workTypeLabels[data.workType] || "PRODUTO MÍNIMO VIÁVEL - MVP"}
                  </p>
                </div>

                <div className="space-y-4">
                  <h1 className="font-bold uppercase" style={{ fontSize: "16px", lineHeight: "1.5" }}>
                    {data.title || "TÍTULO DO TRABALHO"}
                  </h1>
                  {data.subtitle && (
                    <h2 className="font-normal" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                      {data.subtitle}
                    </h2>
                  )}
                </div>

                <div className="space-y-2">
                  {data.authors.filter(Boolean).map((author, index) => (
                    <p key={index} className="font-bold uppercase" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                      {author}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Layout for TITLE PAGE */}
          {type === "titlePage" && (
            <>
              {/* Top: Authors */}
              <div className="mb-20 text-center">
                {data.authors.filter(Boolean).map((author, index) => (
                  <p key={index} className="font-bold uppercase" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                    {author}
                  </p>
                ))}
              </div>

              {/* Middle: Title */}
              <div className="my-auto text-center">
                <h1 className="font-bold uppercase" style={{ fontSize: "16px", lineHeight: "1.5" }}>
                  {data.title || "TÍTULO DO TRABALHO"}
                </h1>
                {data.subtitle && (
                  <h2 className="mt-2 font-normal" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                    {data.subtitle}
                  </h2>
                )}
              </div>

              {/* Description Block */}
              <div className="my-8 ml-auto w-[65%] text-justify">
                <p style={{ fontSize: "12px", lineHeight: "1.5" }}>
                  {isTCC ? (
                    <>
                      Trabalho de Conclusao de Curso apresentado ao Curso de{" "}
                      {data.courseName} do {data.institutionName}, como requisito
                      parcial para obtencao do titulo de Tecnologo em{" "}
                      {data.courseName.split(" ").slice(-2).join(" ")}.
                    </>
                  ) : (
                    <>
                      {workTypeLabels[data.workType]} submetido à coordenação do curso de{" "}
                      {data.courseName} do {data.institutionName} para a obtenção de nota na disciplina de{" "}
                      {data.discipline || "[Disciplina]"}.
                    </>
                  )}
                </p>
                {(data.advisor || data.professor || data.coadvisor) && (
                  <div className="mt-4 space-y-1" style={{ fontSize: "12px" }}>
                    {isTCC ? (
                      <>
                        <p><strong>Orientador(a):</strong> {data.advisor}</p>
                        {data.coadvisor && <p><strong>Coorientador(a):</strong> {data.coadvisor}</p>}
                      </>
                    ) : (
                      <p><strong>Professor(a):</strong> {data.professor}</p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Bottom: City and Year (Shared) */}
          <div className="mt-auto text-center">
            <p className="uppercase" style={{ fontSize: "14px", lineHeight: "1.6" }}>
              {data.city}
            </p>
            <p style={{ fontSize: "14px" }}>{data.year}</p>
          </div>
        </div>
        </div>
      </div>
    )
  }
)
