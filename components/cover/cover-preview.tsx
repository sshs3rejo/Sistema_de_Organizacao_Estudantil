"use client"

import { forwardRef } from "react"
import type { CoverData } from "@/types/cover"
import { workTypeLabels } from "@/types/cover"

interface CoverPreviewProps {
  data: CoverData
  type: "cover" | "titlePage"
}

export const CoverPreview = forwardRef<HTMLDivElement, CoverPreviewProps>(
  function CoverPreview({ data, type }, ref) {
    const isTCC = data.workType === "tcc"

    return (
      <div
        ref={ref}
        className="mx-auto aspect-[210/297] w-full max-w-[595px] bg-white text-black shadow-2xl"
        style={{
          fontFamily: "Times New Roman, serif",
        }}
      >
        {/* A4 Page Container */}
        <div className="relative flex h-full w-full flex-col px-[72px] py-[72px]">
          {/* Header with Institution Logo Area */}
          <div className="mb-8 text-center">

            <p
              className="text-sm font-bold uppercase tracking-wide text-[#1e3a5f]"
              style={{ fontSize: "14px", lineHeight: "1.4" }}
            >
              {data.institutionName}
            </p>
            <p
              className="mt-1 text-sm uppercase text-gray-700"
              style={{ fontSize: "12px" }}
            >
              {data.courseName}
            </p>
          </div>

          {/* Authors Section */}
          <div className="mb-auto text-center">
            {data.authors.filter(Boolean).map((author, index) => (
              <p
                key={index}
                className="font-bold uppercase"
                style={{ fontSize: "14px", lineHeight: "1.6" }}
              >
                {author}
              </p>
            ))}
          </div>

          {/* Title Section - Centered */}
          <div className="my-auto text-center">
            <h1
              className="font-bold uppercase"
              style={{ fontSize: "16px", lineHeight: "1.5" }}
            >
              {data.title || "TÍTULO DO TRABALHO"}
            </h1>
            {data.subtitle && (
              <h2
                className="mt-2 font-normal"
                style={{ fontSize: "14px", lineHeight: "1.5" }}
              >
                {data.subtitle}
              </h2>
            )}
          </div>

          {/* Title Page specific - Work description */}
          {type === "titlePage" && (
            <div className="my-8 ml-auto w-[60%] text-justify">
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
                    {workTypeLabels[data.workType]} apresentado(a) a disciplina
                    de {data.discipline || "[Disciplina]"} do Curso de{" "}
                    {data.courseName} do {data.institutionName}, como requisito
                    parcial para obtencao de nota.
                  </>
                )}
              </p>
              {(data.advisor || data.professor) && (
                <p className="mt-4" style={{ fontSize: "12px" }}>
                  {isTCC ? (
                    <>
                      <strong>Orientador(a):</strong> {data.advisor}
                      {data.coadvisor && (
                        <>
                          <br />
                          <strong>Coorientador(a):</strong> {data.coadvisor}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <strong>Professor(a):</strong> {data.professor}
                    </>
                  )}
                </p>
              )}
            </div>
          )}

          {/* Footer - City and Year */}
          <div className="mt-auto text-center">
            <p
              className="uppercase"
              style={{ fontSize: "14px", lineHeight: "1.6" }}
            >
              {data.city}
            </p>
            <p style={{ fontSize: "14px" }}>{data.year}</p>
          </div>
        </div>
      </div>
    )
  }
)
