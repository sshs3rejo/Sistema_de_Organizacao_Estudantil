export interface CoverData {
  institutionName: string
  courseName: string
  title: string
  subtitle?: string
  authors: string[]
  advisor?: string
  coadvisor?: string
  discipline?: string
  professor?: string
  workType: "tcc" | "relatorio" | "artigo" | "projeto" | "atividade"
  city: string
  year: string
  semester?: string
}

export interface TitlePageData extends CoverData {
  abstract?: string
  keywords?: string[]
}

export const workTypeLabels: Record<CoverData["workType"], string> = {
  tcc: "Trabalho de Conclusão de Curso",
  relatorio: "Relatório",
  artigo: "Artigo Científico",
  projeto: "Projeto Integrador",
  atividade: "Atividade Avaliativa",
}

export const defaultCoverData: CoverData = {
  institutionName: "CENTRO UNIVERSITÁRIO UNIFACEMA",
  courseName: "ANÁLISE E DESENVOLVIMENTO DE SISTEMAS",
  title: "",
  subtitle: "",
  authors: [""],
  advisor: "",
  coadvisor: "",
  discipline: "",
  professor: "",
  workType: "atividade",
  city: "Caxias - MA",
  year: new Date().getFullYear().toString(),
  semester: "2026.1",
}
