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
  workType: "tcc" | "relatorio" | "artigo" | "projeto" | "atividade" | "tde"
  city: string
  year: string
  semester?: string
  fontFamily: "arial" | "times"
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
  tde: "Trabalho Discente Efetivo (TDE)",
}

export const defaultCoverData: CoverData = {
  institutionName: "CENTRO UNIVERSITÁRIO UNIFACEMA",
  courseName: "[NOME DO CURSO]",
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
  fontFamily: "times",
}
