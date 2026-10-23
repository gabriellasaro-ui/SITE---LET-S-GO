import { absoluteUrl, directionsUrl, site, units } from '@/config/site'
import { ogImageFor } from '@/lib/seo'
import type { FaqItem } from '@/content/faq'
import type { Party } from '@/content/parties'
import { venueFeatures, funZone } from '@/content/structure'

/**
 * Builders de dados estruturados (schema.org / JSON-LD).
 * Base do SEO técnico e do GEO: dão às buscas e às IAs fatos inequívocos
 * sobre a entidade (quem é, onde fica, o que oferece, como contatar).
 */

const ORG_ID = `${site.url}/#organizacao`
const WEBSITE_ID = `${site.url}/#website`

export function businessSchema() {
  const { address, contact } = site
  return {
    '@context': 'https://schema.org',
    '@type': site.schemaType,
    '@id': ORG_ID,
    name: site.name,
    description: site.description,
    slogan: site.tagline,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(site.logo.src),
      width: site.logo.width,
      height: site.logo.height,
    },
    image: [
      absoluteUrl(site.ogImage),
      absoluteUrl('/images/fotos/banner-fachada-lets-go-pampulha.webp'),
      absoluteUrl('/images/fotos/fachada-lets-go-tunel-neon-noite.webp'),
    ],
    telephone: contact.phones[0]?.e164,
    email: contact.email,
    currenciesAccepted: 'BRL',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.stateCode,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    ...(address.geo
      ? { geo: { '@type': 'GeoCoordinates', latitude: address.geo.lat, longitude: address.geo.lng } }
      : {}),
    hasMap: address.mapsUrl,
    // Ações que buscadores e assistentes podem oferecer direto no resultado
    potentialAction: [
      {
        '@type': 'CommunicateAction',
        name: 'Pedir orçamento pelo WhatsApp',
        target: `https://wa.me/${contact.whatsapp.e164.replace('+', '')}`,
      },
      { '@type': 'ViewAction', name: 'Como chegar', target: directionsUrl },
    ],
    areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
    containedInPlace: { '@type': 'Place', name: `${address.region}, ${address.city}` },
    sameAs: site.social.map((s) => s.href),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: contact.whatsapp.e164,
        availableLanguage: 'Portuguese',
        areaServed: 'BR',
      },
      ...contact.phones.map((p) => ({
        '@type': 'ContactPoint',
        contactType: 'reservations',
        telephone: p.e164,
        availableLanguage: 'Portuguese',
      })),
    ],
    amenityFeature: [
      ...venueFeatures.map((f) => ({ '@type': 'LocationFeatureSpecification', name: f.title, value: true })),
      ...funZone.map((f) => ({ '@type': 'LocationFeatureSpecification', name: f.name, value: true })),
    ],
    isAccessibleForFree: false,
    publicAccess: false,
    ...(site.openingHours
      ? {
          openingHoursSpecification: site.openingHours.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.schema.split(',').map((d) => `https://schema.org/${d.trim()}`),
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    // Unidades extras confirmadas viram "department" (filiais) da organização
    ...(units.length > 1
      ? {
          department: units.slice(1).map((u) => ({
            '@type': site.schemaType,
            name: u.name,
            telephone: u.phones?.[0]?.e164,
            hasMap: u.mapsUrl,
            address: {
              '@type': 'PostalAddress',
              streetAddress: u.street,
              addressLocality: site.address.city,
              addressRegion: site.address.stateCode,
              postalCode: u.postalCode,
              addressCountry: site.address.country,
            },
          })),
        }
      : {}),
    knowsAbout: [
      'Festa infantil',
      'Buffet infantil',
      'Aniversário infantil',
      'Festa de 15 anos',
      'Formatura',
      'Eventos corporativos',
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: 'pt-BR',
    publisher: { '@id': ORG_ID },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function partiesSchema(parties: Party[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Festas da ${site.name}`,
    itemListElement: parties.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        '@id': absoluteUrl(`/festas#${p.slug}`),
        name: p.name,
        serviceType: 'Buffet infantil',
        description: `${p.summary} Inclui: ${p.includes.join('; ')}.`,
        audience: { '@type': 'Audience', audienceType: p.audience },
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'City', name: site.address.city },
        url: absoluteUrl(`/festas#${p.slug}`),
      },
    })),
  }
}

export function webPageSchema({
  path,
  name,
  description,
  type = 'WebPage',
}: {
  path: string
  name: string
  description: string
  type?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${absoluteUrl(path)}#pagina`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(ogImageFor(path)), width: 1200, height: 630 },
  }
}
