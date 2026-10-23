import { site } from '@/config/site'

export type FaqItem = { question: string; answer: string; featured?: boolean }
export type FaqGroup = { title: string; items: FaqItem[] }

/**
 * Respostas no formato "answer-first": a primeira frase responde direto
 * (é o trecho que buscadores e IAs costumam citar). Só fatos confirmados.
 */
export const faqGroups: FaqGroup[] = [
  {
    title: 'Sobre a Let’s Go',
    items: [
      {
        question: 'Onde fica a Let’s Go Festas?',
        answer:
          'A Let’s Go Festas fica na Av. Otacílio Negrão de Lima, 1300, no bairro São Luiz, na Pampulha, em Belo Horizonte (MG). O espaço está na orla, com vista panorâmica para a Lagoa da Pampulha.',
        featured: true,
      },
      {
        question: 'Há quanto tempo a Let’s Go realiza festas?',
        answer:
          'A Let’s Go Festas completa 20 anos de história realizando festas infantis e eventos em Belo Horizonte.',
      },
      ...(site.rating
        ? [
            {
              question: 'Qual é a avaliação da Let’s Go no Google?',
              answer: `A Let’s Go Festas tem nota ${site.rating.value.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} de 5 no Google, com ${new Intl.NumberFormat('pt-BR').format(site.rating.count)} avaliações de famílias que já fizeram festa no espaço.`,
            },
          ]
        : []),
      {
        question: 'Que tipos de evento a Let’s Go recebe?',
        answer:
          'O foco da Let’s Go são as festas infantis, com dois formatos: Festa Coquetel e Festa Kids. A estrutura também recebe festas de 15 anos, formaturas, casamentos, aniversários adultos e eventos corporativos.',
      },
    ],
  },
  {
    title: 'Festas e pacotes',
    items: [
      {
        question: 'Qual a diferença entre a Festa Coquetel e a Festa Kids?',
        answer:
          'A Festa Coquetel é para a família toda: tem buffet infantil para as crianças e buffet adulto para os convidados. A Festa Kids é para aniversariantes a partir de 6 anos que querem reunir só a garotada, com equipe de monitores e buffet infantil.',
        featured: true,
      },
      {
        question: 'Quanto tempo dura uma festa na Let’s Go?',
        answer:
          'As festas duram 4 horas. Na Festa Coquetel, você ainda tem 30 minutos antes e 30 minutos depois do horário da festa.',
        featured: true,
      },
      {
        question: 'O que está incluso na Festa Coquetel?',
        answer:
          'A Festa Coquetel inclui equipe de profissionais completa, buffet infantil, buffet adulto com salgados sem limite de consumo, doces e bolo (cardápio a escolher), água, suco e refrigerante sem limite de consumo, decoração de balões com cenário a escolher, convites e lembrancinhas. Almoço, jantar ou rodízio de pizza são opcionais.',
      },
      {
        question: 'O que está incluso na Festa Kids?',
        answer:
          'A Festa Kids inclui equipe de monitores, cozinha, segurança e fiscal de limpeza, buffet infantil, doces e bolo, água, suco e refrigerante, decoração de balões com cenário a escolher, convites e lembrancinhas.',
      },
      {
        question: 'A partir de que idade a Festa Kids é indicada?',
        answer:
          'A Festa Kids é indicada para aniversariantes a partir de 6 anos que querem comemorar apenas com a turma de amigos.',
      },
      {
        question: 'Quanto custa uma festa na Let’s Go?',
        answer:
          'O valor depende do formato da festa, da data e do número de convidados. Envie esses dados pelo formulário ou pelo WhatsApp (31) 99255-0152 e a equipe prepara um orçamento personalizado.',
        featured: true,
      },
    ],
  },
  {
    title: 'Estrutura e diversão',
    items: [
      {
        question: 'Quais brinquedos e atrações a Let’s Go tem?',
        answer: 'O Espaço Diversão tem Kid Play com 18 metros de percurso, escorregador 360º e Cinema 6D.',
        featured: true,
      },
      {
        question: 'A Let’s Go tem estacionamento?',
        answer: 'Sim. A Let’s Go Festas tem estacionamento para os convidados.',
      },
      {
        question: 'O espaço é acessível?',
        answer: 'Sim. O espaço tem acesso adaptado para pessoas com deficiência ou mobilidade reduzida.',
      },
      {
        question: 'O salão tem ar-condicionado?',
        answer:
          'Sim. O salão é climatizado com ar-condicionado e conta com gerador de energia que contempla todo o salão.',
      },
      {
        question: 'Tem fraldário para bebês?',
        answer: 'Sim. A Let’s Go tem fraldário completo, com papinha Nestlé, fraldas e lenço umedecido.',
      },
    ],
  },
  {
    title: 'Visita e reserva',
    items: [
      {
        question: 'Posso visitar o espaço antes de fechar a festa?',
        answer:
          'Sim, e recomendamos. Agende sua visita pelo formulário do site ou pelo WhatsApp (31) 99255-0152 para conhecer o salão e o Espaço Diversão pessoalmente.',
        featured: true,
      },
      {
        question: 'Com quanta antecedência devo reservar a data?',
        answer:
          'Quanto antes, melhor: datas de fim de semana costumam ser as mais procuradas. Consulte a disponibilidade da data desejada com a equipe.',
      },
    ],
  },
]

export const allFaqs: FaqItem[] = faqGroups.flatMap((g) => g.items)
export const featuredFaqs: FaqItem[] = allFaqs.filter((f) => f.featured)
