import type { SiteConfig } from './types'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://letsgofestas.com.br').replace(/\/$/, '')

const addressQuery = encodeURIComponent(
  "Let's Go Festas, Av. Otacílio Negrão de Lima, 1300 - São Luiz, Belo Horizonte - MG",
)
// Perfil da Empresa no Google (GMN): link direto pelo CID, abre o perfil exato com avaliações
const googleProfileUrl = 'https://maps.google.com/?cid=4684423617487733984'

const casteloQuery = encodeURIComponent(
  "Let's Go Festas Castelo, Av. Miguel Perrela, 300 - Castelo, Belo Horizonte - MG",
)

export const site: SiteConfig = {
  name: "Let's Go Festas",
  tagline: 'Buffet infantil na Pampulha, em Belo Horizonte',
  description:
    "Let's Go Festas: buffet infantil na orla da Lagoa da Pampulha, em Belo Horizonte. Festa Coquetel e Festa Kids com buffet completo, decoração, monitores e um Espaço Diversão com Kid Play de 18 m, Cinema 6D e escorregador 360º.",
  url: siteUrl,
  locale: 'pt_BR',
  schemaType: ['LocalBusiness', 'EventVenue'],
  category: 'Buffet infantil e espaço para festas',
  yearsOfHistory: 20,
  logo: {
    src: '/images/marca/logo-lets-go-festas.png',
    width: 191,
    height: 130,
    alt: "Logo Let's Go Festas",
  },
  seal: {
    src: '/images/marca/selo-20-anos.png',
    width: 400,
    height: 464,
    alt: "Selo comemorativo de 20 anos da Let's Go Festas",
  },
  ogImage: '/images/og/og-home.jpg',
  contact: {
    phones: [
      { label: 'Telefone', display: '(31) 2523-0101', e164: '+553125230101' },
      { label: 'Telefone', display: '(31) 2523-0202', e164: '+553125230202' },
    ],
    whatsapp: {
      label: 'WhatsApp',
      display: '(31) 99255-0152',
      e164: '+5531992550152',
      defaultMessage: "Olá! Vim pelo site da Let's Go Festas e gostaria de saber mais sobre as festas.",
    },
    email: 'divirtase@letsgofestas.com.br',
  },
  address: {
    street: 'Av. Otacílio Negrão de Lima, 1300',
    neighborhood: 'São Luiz',
    region: 'Pampulha',
    city: 'Belo Horizonte',
    state: 'Minas Gerais',
    stateCode: 'MG',
    postalCode: '31310-021',
    country: 'BR',
    // Coordenadas do pin no Perfil da Empresa no Google (conferidas em 05/10/2026)
    geo: { lat: -19.85509, lng: -43.9750629 },
    mapsUrl: googleProfileUrl,
    mapsEmbedUrl: `https://www.google.com/maps?q=${addressQuery}&output=embed`,
    landmark: 'na orla da Lagoa da Pampulha',
  },
  // TODO: confirmar horário de atendimento comercial com o cliente antes de preencher
  openingHours: undefined,
  extraUnits: [
    {
      name: "Let's Go Castelo",
      street: 'Av. Miguel Perrela, 300',
      neighborhood: 'Castelo',
      region: 'Pampulha',
      postalCode: '31330-290',
      phones: [{ label: 'Telefone', display: '(31) 2511-2626', e164: '+553125112626' }],
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${casteloQuery}`,
      mapsEmbedUrl: `https://www.google.com/maps?q=${casteloQuery}&output=embed`,
      // TODO: unidade encontrada em guias antigos (Yelp, belohorizontemais, semchoro). Confirmar com o cliente
      // se ainda funciona e quais os telefones atuais; então trocar para `confirmed: true`.
      confirmed: false,
      note: 'Não citada no site atual nem no subsite de 15 anos.',
    },
  ],
  // Avaliação no Google Business Profile (informada pelo cliente em 02/10/2026; atualizar periodicamente)
  rating: {
    value: 4.8,
    count: 1346,
    platform: 'Google',
    url: googleProfileUrl,
  },
  // TODO: preencher razão social e CNPJ com o cliente (aparecem na política de privacidade)
  legal: {
    companyName: undefined,
    cnpj: undefined,
    privacyEmail: 'divirtase@letsgofestas.com.br',
    policyUpdatedAt: '2026-10-05',
  },
  areaServed: ['Belo Horizonte', 'Pampulha', 'Região Metropolitana de Belo Horizonte'],
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/letsgofestas/' },
    { label: 'Facebook', href: 'https://www.facebook.com/letsgofestas/' },
  ],
  nav: [
    { label: 'Festas', href: '/festas' },
    { label: 'Estrutura', href: '/estrutura' },
    { label: 'Galeria', href: '/galeria' },
    { label: 'Clientes', href: '/clientes' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Dúvidas', href: '/perguntas-frequentes' },
    { label: 'Trabalhe conosco', href: '/trabalhe-conosco' },
    { label: 'Contato', href: '/contato' },
  ],
  cta: { label: 'Agende uma visita', href: '/contato' },
  keywords: [
    'buffet infantil BH',
    'buffet infantil em Belo Horizonte',
    'buffet infantil Pampulha',
    'festa infantil BH',
    'festa kids BH',
    'aniversário infantil Belo Horizonte',
    'espaço para festa infantil BH',
    "Let's Go Festas",
  ],
}

export const fullAddress = `${site.address.street} – ${site.address.neighborhood} (${site.address.region}), ${site.address.city} – ${site.address.stateCode}, ${site.address.postalCode}`

/** Unidades exibidas no site: a principal + as extras confirmadas. */
export const units = [
  {
    name: `${site.name} Pampulha`,
    street: site.address.street,
    neighborhood: site.address.neighborhood,
    region: site.address.region,
    postalCode: site.address.postalCode,
    phones: site.contact.phones,
    mapsUrl: site.address.mapsUrl,
    mapsEmbedUrl: site.address.mapsEmbedUrl,
    confirmed: true,
  },
  ...(site.extraUnits ?? []).filter((u) => u.confirmed),
]

export function whatsappUrl(message: string = site.contact.whatsapp.defaultMessage) {
  return `https://wa.me/${site.contact.whatsapp.e164.replace('+', '')}?text=${encodeURIComponent(message)}`
}

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}

/** Abre o Google Maps já com a rota até o endereço principal. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${addressQuery}`
