/** Opções do campo "tipo de festa" do formulário de orçamento. */
export const eventTypes = [
  'Festa Coquetel',
  'Festa Kids',
  'Festa de 15 anos',
  'Evento social',
  'Evento corporativo',
  'Ainda não sei',
] as const

/** Mapeia o ?festa=slug vindo dos cards para a opção do formulário. */
export const eventTypeBySlug: Record<string, (typeof eventTypes)[number]> = {
  'festa-coquetel': 'Festa Coquetel',
  'festa-kids': 'Festa Kids',
}

/** Áreas do formulário "Trabalhe conosco". */
export const careerAreas = [
  'Monitor(a) de recreação',
  'Garçom / Garçonete',
  'Cozinha',
  'Limpeza',
  'Decoração',
  'Recepção',
  'Atendimento comercial',
  'Outra área',
] as const

/** Disponibilidade de horário (festas acontecem principalmente aos fins de semana). */
export const careerAvailability = [
  'Fins de semana',
  'Dias de semana',
  'Qualquer dia',
  'Só para eventos pontuais (freelancer)',
] as const
