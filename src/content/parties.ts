import type { IconName } from '@/components/ui/Icon'
import { photos, type Photo } from './photos'

export type Party = {
  slug: string
  name: string
  badge: string
  audience: string
  summary: string
  description: string
  duration: string
  includes: string[]
  optional?: string[]
  photo: Photo
  tone: 'pink' | 'teal'
}

export const parties: Party[] = [
  {
    slug: 'festa-coquetel',
    name: 'Festa Coquetel',
    badge: 'Família inteira',
    audience: 'Para a família toda: crianças, pais, avós e amigos',
    summary:
      'Atendimento impecável, buffet delicioso e decoração estilizada. Cada detalhe é pensado para que a festa do seu filho seja um momento mágico.',
    description:
      'A festa completa para reunir crianças e adultos: brincadeiras, gostosuras e muita fantasia, com buffet infantil para a criançada e buffet adulto para os convidados, tudo em um só lugar, na Pampulha.',
    duration: '4 horas de festa (+30 minutos antes e depois)',
    includes: [
      'Equipe de profissionais completa',
      'Buffet infantil para as crianças',
      'Buffet adulto: salgados sem limite de consumo, doces e bolo (cardápio a escolher)',
      'Bebidas: água, suco e refrigerante sem limite de consumo',
      'Decoração de balões com cenário a escolher',
      'Convites e lembrancinhas',
    ],
    optional: ['Almoço, jantar ou rodízio de pizza'],
    photo: photos.circo1Ano,
    tone: 'pink',
  },
  {
    slug: 'festa-kids',
    name: 'Festa Kids',
    badge: 'A partir de 6 anos',
    audience: 'Para aniversariantes a partir de 6 anos que querem reunir só a garotada',
    summary:
      'A festa da criançada: indicada para aniversariantes a partir de 6 anos que querem reunir apenas a turma, com toda a estrutura e segurança da Let’s Go.',
    description:
      'Na Festa Kids, a turma toma conta do Espaço Diversão com uma equipe de monitores acompanhando cada brincadeira, do Kid Play ao Cinema 6D.',
    duration: '4 horas de festa',
    includes: [
      'Equipe de monitores, cozinha, segurança e fiscal de limpeza',
      'Buffet infantil, doces e bolo',
      'Bebidas: água, suco e refrigerante',
      'Decoração de balões com cenário a escolher',
      'Convites e lembrancinhas',
    ],
    photo: photos.vila,
    tone: 'teal',
  },
]

export type Occasion = { title: string; text: string; icon: IconName }

/** Outras ocasiões que o espaço recebe (informadas no site antigo). */
export const occasions: Occasion[] = [
  {
    title: 'Aniversários infantis',
    text: 'Do primeiro aninho à festa da turma: temas, cenários e diversão para cada fase.',
    icon: 'cake',
  },
  {
    title: '15 anos',
    text: 'Um salão climatizado com painel de LED e teto iluminado para uma noite inesquecível.',
    icon: 'sparkles',
  },
  {
    title: 'Formaturas',
    text: 'Celebrações de conclusão de curso com estrutura completa para reunir formandos, familiares e amigos.',
    icon: 'graduation',
  },
  {
    title: 'Eventos sociais',
    text: 'Casamentos, aniversários adultos e celebrações em família com vista para a lagoa.',
    icon: 'party',
  },
  {
    title: 'Eventos corporativos',
    text: 'Confraternizações e encontros de empresas com estrutura completa e estacionamento.',
    icon: 'users',
  },
]
