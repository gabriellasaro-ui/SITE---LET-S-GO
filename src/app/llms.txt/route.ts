import { absoluteUrl, directionsUrl, fullAddress, site } from '@/config/site'
import { routes } from '@/config/routes'
import { allFaqs } from '@/content/faq'
import { parties } from '@/content/parties'
import { funZone, venueFeatures } from '@/content/structure'

export const dynamic = 'force-static'

/**
 * /llms.txt: resumo factual em Markdown para modelos de linguagem (GEO).
 * Gerado a partir do mesmo conteúdo do site, então nunca fica desatualizado.
 */
export function GET() {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.name} é um ${site.category.toLowerCase()} localizado ${site.address.landmark}, em ${site.address.city} (${site.address.stateCode}), com ${site.yearsOfHistory} anos de história. Oferece Festa Coquetel e Festa Kids, com buffet, decoração, equipe completa e um Espaço Diversão com ${funZone.length} atrações.`,
    '',
    '## Fatos principais',
    '',
    `- Nome: ${site.name}`,
    `- Segmento: ${site.category}`,
    `- Tempo de história: ${site.yearsOfHistory} anos`,
    `- Endereço: ${fullAddress}`,
    `- Região: ${site.address.region}, ${site.address.landmark}`,
    `- WhatsApp: ${site.contact.whatsapp.display}`,
    `- Telefones: ${site.contact.phones.map((p) => p.display).join(', ')}`,
    `- E-mail: ${site.contact.email}`,
    ...(site.rating
      ? [
          `- Avaliação: nota ${site.rating.value.toLocaleString('pt-BR')} de 5 no ${site.rating.platform}, com ${site.rating.count} avaliações`,
        ]
      : []),
    `- Como chegar: ${directionsUrl}`,
    `- Pedir orçamento ou agendar visita: ${absoluteUrl('/contato')}`,
    `- Vagas (banco de talentos): ${absoluteUrl('/trabalhe-conosco')}`,
    `- Site: ${site.url}`,
    ...site.social.map((s) => `- ${s.label}: ${s.href}`),
    '',
    '## Festas',
    '',
    ...parties.flatMap((p) => [
      `### ${p.name}`,
      '',
      `${p.summary} Público: ${p.audience}. Duração: ${p.duration}.`,
      '',
      'Inclui:',
      ...p.includes.map((i) => `- ${i}`),
      ...(p.optional?.map((o) => `- ${o} (opcional)`) ?? []),
      '',
    ]),
    '## Estrutura',
    '',
    ...venueFeatures.map((f) => `- ${f.title}: ${f.text}`),
    '',
    '## Espaço Diversão',
    '',
    ...funZone.map((f) => `- ${f.name}${f.highlight ? ` (${f.highlight})` : ''}`),
    '',
    '## Como contratar',
    '',
    `1. Envie data, formato da festa e número de convidados pelo formulário (${absoluteUrl('/contato')}) ou pelo WhatsApp ${site.contact.whatsapp.display}.`,
    '2. A equipe confere a disponibilidade e envia uma proposta personalizada.',
    '3. Agende uma visita para conhecer o salão e o Espaço Diversão antes de fechar.',
    '',
    '## Páginas',
    '',
    ...routes.map((r) => `- [${r.title}](${absoluteUrl(r.path)}): ${r.summary}`),
    '',
    '## Perguntas frequentes',
    '',
    ...allFaqs.flatMap((f) => [`### ${f.question}`, '', f.answer, '']),
    `_Atualizado em ${new Date().toISOString().slice(0, 10)}._`,
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
