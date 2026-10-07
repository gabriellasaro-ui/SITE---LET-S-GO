/** Páginas públicas indexáveis: alimenta sitemap.xml e llms.txt. */
export const routes: {
  path: string
  title: string
  summary: string
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
}[] = [
  {
    path: '/',
    title: 'Início',
    summary: 'Visão geral do buffet infantil, festas, Espaço Diversão, depoimentos e localização.',
    priority: 1,
    changeFrequency: 'weekly',
  },
  {
    path: '/festas',
    title: 'Festas',
    summary: 'Festa Coquetel e Festa Kids: o que inclui, duração, comparativo e outras ocasiões.',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  {
    path: '/estrutura',
    title: 'Estrutura',
    summary: 'Salão, conveniências e as 14 atrações do Espaço Diversão.',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  {
    path: '/contato',
    title: 'Contato',
    summary: 'WhatsApp, telefones, e-mail, endereço e formulário de orçamento.',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  {
    path: '/perguntas-frequentes',
    title: 'Perguntas frequentes',
    summary: 'Respostas sobre pacotes, duração, atrações, estrutura e visitas.',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/galeria',
    title: 'Galeria',
    summary: 'Fotos de festas, decorações temáticas e do espaço.',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/clientes',
    title: 'Clientes',
    summary: 'Avaliação no Google e depoimentos de famílias que fizeram festa na Let’s Go.',
    priority: 0.6,
    changeFrequency: 'monthly',
  },
  { path: '/sobre', title: 'Sobre', summary: 'História, valores e equipe.', priority: 0.6, changeFrequency: 'yearly' },
  {
    path: '/trabalhe-conosco',
    title: 'Trabalhe conosco',
    summary: 'Formulário para quem quer fazer parte da equipe da Let’s Go.',
    priority: 0.5,
    changeFrequency: 'monthly',
  },
  {
    path: '/politica-de-privacidade',
    title: 'Política de privacidade',
    summary: 'Tratamento de dados pessoais (LGPD).',
    priority: 0.2,
    changeFrequency: 'yearly',
  },
]
