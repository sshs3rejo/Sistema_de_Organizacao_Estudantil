import type { AcademicEvent } from "@/types/calendar"

// Dados extraídos do Calendário Acadêmico 2026.1 - Campus Caxias
export const academicCalendar2026_1: AcademicEvent[] = [
  // JANEIRO 2026
  { id: "jan-01", date: new Date(2026, 0, 1), title: "Dia da Confraternização Universal", type: "feriado" },
  { id: "jan-02", date: new Date(2026, 0, 2), title: "Dia não letivo", type: "feriado" },
  { id: "jan-05", date: new Date(2026, 0, 5), title: "Retorno das atividades acadêmicas e técnico-administrativas", type: "evento" },
  { id: "jan-05b", date: new Date(2026, 0, 5), title: "Início do período para renovação de matrícula", type: "prazo" },
  { id: "jan-18", date: new Date(2026, 0, 18), title: "Dia do profissional de Estética e Cosmética", type: "evento" },
  { id: "jan-20", date: new Date(2026, 0, 20), title: "Dia do Farmacêutico", type: "evento" },
  { id: "jan-23", date: new Date(2026, 0, 23), title: "Aniversário do UniFacema", type: "evento" },
  { id: "jan-23b", date: new Date(2026, 0, 23), title: "Liberação do acesso ao Portal Acadêmico", type: "prazo" },
  { id: "jan-26", date: new Date(2026, 0, 26), title: "Publicação da Portaria de projetos aprovados 2026.1", type: "prazo" },
  { id: "jan-26-29", date: new Date(2026, 0, 26), endDate: new Date(2026, 0, 29), title: "Cerimônias de Descerramento de Placa", type: "evento" },
  { id: "jan-28-30", date: new Date(2026, 0, 28), endDate: new Date(2026, 0, 30), title: "Semana Pedagógica Única", type: "evento" },

  // FEVEREIRO 2026
  { id: "fev-03-05", date: new Date(2026, 1, 3), endDate: new Date(2026, 1, 5), title: "Período para Colação de Grau 2025.2", type: "evento" },
  { id: "fev-07", date: new Date(2026, 1, 7), title: "Término do período de renovação de matrícula", type: "prazo" },
  { id: "fev-09", date: new Date(2026, 1, 9), title: "Início do Semestre 2026.1 - Alunos Novos", type: "evento" },
  { id: "fev-10", date: new Date(2026, 1, 10), title: "Início do Período Letivo 2026.1 - Alunos Veteranos", type: "evento" },
  { id: "fev-09-13", date: new Date(2026, 1, 9), endDate: new Date(2026, 1, 13), title: "Ação de Acolhimento dos Alunos", type: "evento" },
  { id: "fev-11a", date: new Date(2026, 1, 11), title: "Início do período para Aproveitamento de Estudos", type: "prazo" },
  { id: "fev-11b", date: new Date(2026, 1, 11), title: "Início do período para Trancamento de Curso", type: "prazo" },
  { id: "fev-11c", date: new Date(2026, 1, 11), title: "Publicação do Edital de Monitoria 2026.1", type: "prazo" },
  { id: "fev-14-17", date: new Date(2026, 1, 14), endDate: new Date(2026, 1, 17), title: "Carnaval", type: "feriado" },
  { id: "fev-18", date: new Date(2026, 1, 18), title: "Quarta-feira de Cinzas - Dia não letivo", type: "feriado" },
  { id: "fev-19-25", date: new Date(2026, 1, 19), endDate: new Date(2026, 1, 25), title: "Período para inscrições de Monitoria", type: "prazo" },
  { id: "fev-23", date: new Date(2026, 1, 23), title: "Início das aulas práticas 2026.1", type: "evento" },
  { id: "fev-23b", date: new Date(2026, 1, 23), title: "Entrega da Avaliação PR1 (Medicina) e NP1 (demais)", type: "avaliacao" },
  { id: "fev-23-27", date: new Date(2026, 1, 23), endDate: new Date(2026, 1, 27), title: "Escolha dos Representantes de Turma", type: "prazo" },
  { id: "fev-26", date: new Date(2026, 1, 26), title: "Reunião NDE", type: "reuniao" },
  { id: "fev-27a", date: new Date(2026, 1, 27), title: "Reunião CPA", type: "reuniao" },
  { id: "fev-27b", date: new Date(2026, 1, 27), title: "Homologação das inscrições de Monitoria", type: "prazo" },

  // MARÇO 2026
  { id: "mar-02a", date: new Date(2026, 2, 2), title: "Publicação da Portaria de Colegiado", type: "prazo" },
  { id: "mar-02b", date: new Date(2026, 2, 2), title: "Prova de Monitoria - Teórica", type: "avaliacao" },
  { id: "mar-02-06", date: new Date(2026, 2, 2), endDate: new Date(2026, 2, 6), title: "1ª Reunião Ordinária do Colegiado de Curso", type: "reuniao" },
  { id: "mar-03", date: new Date(2026, 2, 3), title: "Prova de Monitoria - Prática", type: "avaliacao" },
  { id: "mar-06", date: new Date(2026, 2, 6), title: "Resultado final da Seleção de Monitoria", type: "prazo" },
  { id: "mar-07", date: new Date(2026, 2, 7), title: "Sábado com Atividades de Responsabilidade Social", type: "atividade" },
  { id: "mar-08", date: new Date(2026, 2, 8), title: "Dia Internacional da Mulher", type: "evento" },
  { id: "mar-09-13", date: new Date(2026, 2, 9), endDate: new Date(2026, 2, 13), title: "Elaboração do Plano de Trabalho das Monitorias", type: "prazo" },
  { id: "mar-10a", date: new Date(2026, 2, 10), title: "Término do período para Aproveitamento de Estudos", type: "prazo" },
  { id: "mar-10b", date: new Date(2026, 2, 10), title: "Término do período para Trancamento de Curso", type: "prazo" },
  { id: "mar-11-18", date: new Date(2026, 2, 11), endDate: new Date(2026, 2, 18), title: "1ª Semana de Avaliações Teóricas - Medicina (PR1)", type: "avaliacao", course: "medicina" },
  { id: "mar-14", date: new Date(2026, 2, 14), title: "Sábado com Atividades de Responsabilidade Social", type: "atividade" },
  { id: "mar-16-20", date: new Date(2026, 2, 16), endDate: new Date(2026, 2, 20), title: "Semana de Combate à Violência contra a Mulher", type: "evento" },
  { id: "mar-18", date: new Date(2026, 2, 18), title: "Publicação do Resultado de Aproveitamento de Estudos", type: "prazo" },
  { id: "mar-19", date: new Date(2026, 2, 19), title: "Dia de São José - Feriado Municipal", type: "feriado" },
  { id: "mar-21", date: new Date(2026, 2, 21), title: "Sábado com Atividades de Responsabilidade Social", type: "atividade" },
  { id: "mar-23-28", date: new Date(2026, 2, 23), endDate: new Date(2026, 2, 28), title: "1ª Semana de Avaliações Práticas - Medicina (PR1)", type: "avaliacao", course: "medicina" },
  { id: "mar-30", date: new Date(2026, 2, 30), title: "Início do período para 2ª chamada PR1 - Medicina", type: "prazo", course: "medicina" },
  { id: "mar-30b", date: new Date(2026, 2, 30), title: "Reunião NDE", type: "reuniao" },
  { id: "mar-31", date: new Date(2026, 2, 31), title: "Reunião CPA", type: "reuniao" },

  // ABRIL 2026
  { id: "abr-01", date: new Date(2026, 3, 1), title: "Término do período para 2ª chamada PR1", type: "prazo", course: "medicina" },
  { id: "abr-02-05", date: new Date(2026, 3, 2), endDate: new Date(2026, 3, 5), title: "Semana Santa", type: "feriado" },
  { id: "abr-06", date: new Date(2026, 3, 6), title: "Entrega da Avaliação PR2 - Medicina", type: "avaliacao", course: "medicina" },
  { id: "abr-06-11", date: new Date(2026, 3, 6), endDate: new Date(2026, 3, 11), title: "1ª Semana de Avaliações Teóricas - Demais cursos (NP1)", type: "avaliacao", course: "outros" },
  { id: "abr-10-11", date: new Date(2026, 3, 10), endDate: new Date(2026, 3, 11), title: "Prova de 2ª chamada PR1 - Medicina", type: "avaliacao", course: "medicina" },
  { id: "abr-13-17", date: new Date(2026, 3, 13), endDate: new Date(2026, 3, 17), title: "1ª Semana de Avaliações Práticas - Demais cursos (NP1)", type: "avaliacao", course: "outros" },
  { id: "abr-18", date: new Date(2026, 3, 18), title: "Sábado com Atividades de Responsabilidade Social", type: "atividade" },
  { id: "abr-20-23", date: new Date(2026, 3, 20), endDate: new Date(2026, 3, 23), title: "Período para 2ª chamada NP1 - Demais cursos", type: "prazo", course: "outros" },
  { id: "abr-21", date: new Date(2026, 3, 21), title: "Tiradentes - Feriado Nacional", type: "feriado" },
  { id: "abr-24-25", date: new Date(2026, 3, 24), endDate: new Date(2026, 3, 25), title: "Prova de 2ª chamada NP1 - Demais cursos", type: "avaliacao", course: "outros" },
  { id: "abr-25", date: new Date(2026, 3, 25), title: "Sábado com Atividades de Responsabilidade Social", type: "atividade" },
  { id: "abr-27", date: new Date(2026, 3, 27), title: "Publicação do Edital do Vestibular 2026.2", type: "prazo" },
  { id: "abr-27-30", date: new Date(2026, 3, 27), endDate: new Date(2026, 3, 30), title: "Reunião com Representantes de Turma", type: "reuniao" },
  { id: "abr-29", date: new Date(2026, 3, 29), title: "Reunião NDE", type: "reuniao" },
  { id: "abr-30a", date: new Date(2026, 3, 30), title: "Reunião CPA", type: "reuniao" },
  { id: "abr-30b", date: new Date(2026, 3, 30), title: "Início das Inscrições do Vestibular 2026.2", type: "prazo" },

  // MAIO 2026
  { id: "mai-01", date: new Date(2026, 4, 1), title: "Dia do Trabalho - Feriado", type: "feriado" },
  { id: "mai-02", date: new Date(2026, 4, 2), title: "Dia não letivo", type: "feriado" },
  { id: "mai-04", date: new Date(2026, 4, 4), title: "Entrega da Avaliação PR3 (Medicina) e NP3 (demais)", type: "avaliacao" },
  { id: "mai-04-09", date: new Date(2026, 4, 4), endDate: new Date(2026, 4, 9), title: "2ª Semana de Avaliações Teóricas - Medicina (PR2)", type: "avaliacao", course: "medicina" },
  { id: "mai-09", date: new Date(2026, 4, 9), title: "Sábado com Atividades de Responsabilidade Social", type: "atividade" },
  { id: "mai-11-16", date: new Date(2026, 4, 11), endDate: new Date(2026, 4, 16), title: "2ª Semana de Avaliações Práticas - Medicina (PR2)", type: "avaliacao", course: "medicina" },
  { id: "mai-12", date: new Date(2026, 4, 12), title: "Dia do Enfermeiro", type: "evento" },
  { id: "mai-16", date: new Date(2026, 4, 16), title: "Sábado com Atividades de Responsabilidade Social", type: "atividade" },
  { id: "mai-18-20", date: new Date(2026, 4, 18), endDate: new Date(2026, 4, 20), title: "Período para 2ª chamada PR2 - Medicina", type: "prazo", course: "medicina" },
  { id: "mai-20", date: new Date(2026, 4, 20), title: "Dia do Pedagogo", type: "evento" },
  { id: "mai-22-23", date: new Date(2026, 4, 22), endDate: new Date(2026, 4, 23), title: "Prova de 2ª chamada PR2 - Medicina", type: "avaliacao", course: "medicina" },
  { id: "mai-23", date: new Date(2026, 4, 23), title: "Sábado com Atividades de Responsabilidade Social", type: "atividade" },
  { id: "mai-25", date: new Date(2026, 4, 25), title: "Início do protocolo de Atividades Complementares", type: "prazo" },
  { id: "mai-25-29", date: new Date(2026, 4, 25), endDate: new Date(2026, 4, 29), title: "Reunião com Representantes de Turma", type: "reuniao" },
  { id: "mai-28", date: new Date(2026, 4, 28), title: "Reunião NDE", type: "reuniao" },
  { id: "mai-29", date: new Date(2026, 4, 29), title: "Reunião CPA", type: "reuniao" },
  { id: "mai-30", date: new Date(2026, 4, 30), title: "Sábado com Atividades de Responsabilidade Social", type: "atividade" },

  // JUNHO 2026
  { id: "jun-04", date: new Date(2026, 5, 4), title: "Corpus Christi - Feriado Nacional", type: "feriado" },
  { id: "jun-05-11", date: new Date(2026, 5, 5), endDate: new Date(2026, 5, 11), title: "3ª Semana de Avaliações Teóricas - Medicina (PR3) e 2ª Avaliações Teóricas - Demais (NP3)", type: "avaliacao" },
  { id: "jun-12-18", date: new Date(2026, 5, 12), endDate: new Date(2026, 5, 18), title: "3ª Semana de Avaliações Práticas - Medicina (PR3) e 2ª Avaliações Práticas - Demais (NP3)", type: "avaliacao" },
  { id: "jun-19-20", date: new Date(2026, 5, 19), endDate: new Date(2026, 5, 20), title: "Período para 2ª chamada PR3/NP3", type: "prazo" },
  { id: "jun-22-23", date: new Date(2026, 5, 22), endDate: new Date(2026, 5, 23), title: "Prova de 2ª chamada PR3/NP3", type: "avaliacao" },
  { id: "jun-24", date: new Date(2026, 5, 24), title: "Reunião Conselho de Desempenho Acadêmico", type: "reuniao" },
  { id: "jun-25a", date: new Date(2026, 5, 25), title: "Resultado da Média do Semestre", type: "prazo" },
  { id: "jun-25b", date: new Date(2026, 5, 25), title: "Reunião NDE", type: "reuniao" },
  { id: "jun-26", date: new Date(2026, 5, 26), title: "Reunião CPA", type: "reuniao" },
  { id: "jun-29", date: new Date(2026, 5, 29), title: "Dia de São Pedro - Feriado Municipal", type: "feriado" },
  { id: "jun-30", date: new Date(2026, 5, 30), title: "Término do protocolo de Atividades Complementares", type: "prazo" },

  // JULHO 2026
  { id: "jul-01-02", date: new Date(2026, 6, 1), endDate: new Date(2026, 6, 2), title: "Provas Finais", type: "avaliacao" },
  { id: "jul-03", date: new Date(2026, 6, 3), title: "Resultado Final do Semestre 2026.1", type: "prazo" },
  { id: "jul-28", date: new Date(2026, 6, 28), title: "Adesão do Estado à Independência - Feriado Estadual", type: "feriado" },
]

export function getUpcomingEvents(days: number = 7): AcademicEvent[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const futureDate = new Date(today)
  futureDate.setDate(futureDate.getDate() + days)
  futureDate.setHours(23, 59, 59, 999)
  
  return academicCalendar2026_1
    .filter(event => {
      const eventDate = new Date(event.date)
      eventDate.setHours(0, 0, 0, 0)
      
      const eventEndDate = event.endDate ? new Date(event.endDate) : eventDate
      eventEndDate.setHours(23, 59, 59, 999)
      
      // Um evento é relevante se:
      // 1. Ainda não terminou (endDate >= hoje)
      // 2. Começa dentro do período solicitado (eventDate <= futureDate)
      const isStillHappening = eventEndDate >= today
      const startsInPeriod = eventDate <= futureDate
      
      return isStillHappening && startsInPeriod
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}


export function getTodayEvents(): AcademicEvent[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return academicCalendar2026_1.filter(event => {
    const eventDate = new Date(event.date)
    eventDate.setHours(0, 0, 0, 0)
    
    if (event.endDate) {
      const endDate = new Date(event.endDate)
      endDate.setHours(0, 0, 0, 0)
      return today >= eventDate && today <= endDate
    }
    
    return eventDate.getTime() === today.getTime()
  })
}

export function getEventsForMonth(month: number, year: number): AcademicEvent[] {
  return academicCalendar2026_1.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.getMonth() === month && eventDate.getFullYear() === year
  })
}
