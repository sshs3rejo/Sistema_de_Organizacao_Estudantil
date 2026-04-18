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
  workType: "tcc" | "relatorio" | "artigo" | "projeto" | "mvp" | "atividade" | "tde"
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
  mvp: "PRODUTO MÍNIMO VIÁVEL – MVP",
  atividade: "Atividade Avaliativa",
  tde: "Trabalho Discente Efetivo (TDE)",
}

/**
 * Texto da folha de rosto (parágrafo justificado).
 * TCC usa modelo próprio; os demais tipos usam o mesmo molde genérico com curso, instituição e disciplina.
 */
export function getTitlePageDescription(data: CoverData): string {
  if (data.workType === "tcc") {
    return `Trabalho de Conclusão de Curso apresentado ao Curso de ${data.courseName} do ${data.institutionName}, como requisito parcial para obtenção do título de Tecnólogo em ${data.courseName.split(" ").slice(-2).join(" ")}.`
  }
  const typeLabel =
    data.workType === "mvp"
      ? "Produto Mínimo Viável (MVP)"
      : workTypeLabels[data.workType]
  return `${typeLabel} submetido à coordenação do curso de ${data.courseName} do ${data.institutionName} para a obtenção de nota na disciplina de ${data.discipline || "[Disciplina]"}.`
}

export const defaultCoverData: CoverData = {
  institutionName:
    "CENTRO UNIVERSITÁRIO DE CIÊNCIAS E TECNOLOGIAS DO MARANHÃO",
  courseName: "[NOME DO CURSO]",
  title: "",
  subtitle: "",
  authors: [""],
  advisor: "",
  coadvisor: "",
  discipline: "",
  professor: "",
  workType: "mvp",
  city: "Caxias - MA",
  year: new Date().getFullYear().toString(),
  semester: "2026.1",
  fontFamily: "arial",
}
