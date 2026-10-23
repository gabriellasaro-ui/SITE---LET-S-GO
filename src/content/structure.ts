import type { IconName } from '@/components/ui/Icon'

export type Feature = { title: string; text: string; icon: IconName }

/** Estrutura do salão (fonte: site antigo, página "Estrutura"). */
export const venueFeatures: Feature[] = [
  {
    title: 'Vista para a Lagoa da Pampulha',
    text: 'Área externa na orla, com vista panorâmica para um dos cartões-postais de Belo Horizonte.',
    icon: 'waves',
  },
  {
    title: 'Salão climatizado',
    text: 'Ar-condicionado em todo o salão para a festa ser confortável em qualquer estação.',
    icon: 'snowflake',
  },
  {
    title: 'Painel de LED',
    text: 'Exiba vídeos e fotos do aniversariante em um painel de LED durante a festa.',
    icon: 'monitor',
  },
  {
    title: 'Teto com luzes de LED',
    text: 'Iluminação que transforma o salão e acompanha o clima de cada momento.',
    icon: 'lightbulb',
  },
  {
    title: 'Sala VIP para anfitriões',
    text: 'Um espaço reservado para a família se preparar e receber pessoas especiais.',
    icon: 'crown',
  },
  {
    title: 'Espaço Gourmet e Lounge',
    text: 'Ambientes confortáveis para os adultos aproveitarem enquanto a criançada brinca.',
    icon: 'sofa',
  },
  {
    title: 'Fraldário completo',
    text: 'Com papinha Nestlé, fraldas e lenço umedecido à disposição dos pequenos.',
    icon: 'baby',
  },
  {
    title: 'Acessibilidade',
    text: 'Acesso adaptado para pessoas com deficiência ou mobilidade reduzida.',
    icon: 'accessibility',
  },
  {
    title: 'Estacionamento',
    text: 'Chegada prática para os convidados, sem precisar procurar vaga na orla.',
    icon: 'car',
  },
  {
    title: 'Gerador de energia',
    text: 'Gerador que contempla todo o salão: a festa não para nem se faltar luz.',
    icon: 'zap',
  },
]

/** Atrações do Espaço Diversão (fonte: site antigo, página "Estrutura"). */
export const funZone: { name: string; icon: IconName; highlight?: string }[] = [
  { name: 'Kid Play', icon: 'route', highlight: '18 m de percurso' },
  { name: 'Escorregador 360º', icon: 'rotate', highlight: 'Giro completo' },
  { name: 'Cinema 6D', icon: 'clapperboard', highlight: 'Imersão total' },
]
