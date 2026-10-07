import type { IconName } from '@/components/ui/Icon'
import { site } from '@/config/site'
import { funZone } from './structure'

export type Highlight = { title: string; text: string; icon: IconName }

/** Diferenciais da Let's Go (carrossel abaixo dos heros). Só fatos confirmados. */
export const highlights: Highlight[] = [
  {
    title: `${site.yearsOfHistory} anos de festa`,
    text: 'Duas décadas transformando aniversários em memórias em BH.',
    icon: 'sparkles',
  },
  { title: 'Vista para a Lagoa', text: 'Área externa na orla da Lagoa da Pampulha.', icon: 'waves' },
  {
    title: `${funZone.length} atrações`,
    text: 'Um Espaço Diversão inteirinho para a criançada.',
    icon: 'party',
  },
  { title: 'Kid Play de 18 m', text: 'Circuito de aventura com escorregador 360º.', icon: 'route' },
  { title: 'Cinema 6D', text: 'Imersão total para a turma se divertir.', icon: 'clapperboard' },
  {
    title: 'Buffet completo',
    text: 'Infantil e adulto, com salgados sem limite na Festa Coquetel.',
    icon: 'cake',
  },
  { title: 'Equipe de monitores', text: 'Acompanhamento em cada brincadeira.', icon: 'users' },
  { title: 'Salão climatizado', text: 'Ar-condicionado e gerador em todo o salão.', icon: 'snowflake' },
  { title: 'Estacionamento', text: 'Chegada prática para todos os convidados.', icon: 'car' },
  { title: 'Fraldário completo', text: 'Com papinha, fraldas e lenço umedecido.', icon: 'baby' },
  { title: 'Acessibilidade', text: 'Acesso adaptado para todos.', icon: 'accessibility' },
  { title: 'Sala VIP', text: 'Espaço reservado para os anfitriões.', icon: 'crown' },
]
