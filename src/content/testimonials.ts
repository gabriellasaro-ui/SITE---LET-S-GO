export type Testimonial = {
  quote: string
  /** Trecho curto para cards compactos */
  highlight: string
  author?: string
  /** Festa (depoimentos do site) ou origem ("Avaliação no Google") */
  party: string
  /** Nota de 1 a 5 (avaliações do Google) */
  rating?: number
  source?: 'site' | 'google'
}

const google = (author: string, highlight: string, quote: string): Testimonial => ({
  author,
  highlight,
  quote,
  party: 'Avaliação no Google',
  rating: 5,
  source: 'google',
})

/**
 * Avaliações públicas do Perfil da Empresa no Google (selecionadas pelo cliente em 05/10/2026).
 * Texto original, só com correções mínimas de acentuação/digitação; nome reduzido a primeiro nome + inicial.
 */
export const googleReviews: Testimonial[] = [
  google(
    'Daniela C.',
    'Superou todas as expectativas.',
    'Fiz a festa do meu filho de 1 ano na última semana. Só elogios a fazer ao Let’s Go desde a contratação até o dia da festa. Todos que trabalham nesse lugar são pessoas educadas e alegres. As meninas que ficam na parte do atendimento são umas fofas, sempre que precisei fazer alguma alteração elas sempre foram prestativas. Os garçons são educadíssimos sempre estão sorrindo isso faz toda diferença para os convidados. O salão sempre impecável e limpo. Os brinquedos sempre com manutenção em dia e sempre limpos e bem cuidados (fato esse que foi o motivo da minha escolha). As comidas excepcionais, todos os convidados elogiaram a comida que é farta desde o início da festa até o final. O bolo e os doces são maravilhosos. Por indicação do Let’s Go fiz a decoração da festa com a Cris Fonseca que ficou de tirar o fôlego, ela realmente sonha junto com a gente em cada detalhe e o principal ela te deixa a vontade nas escolhas sempre respeitando a sua decisão e dando sugestões. Resumo do dia da festa: eu como mãe que sonhava com a festa de 1 ano do meu filho ao chegar na festa: Chorei kkkk superou todas as expectativas. Vocês estão de parabéns! Que trabalho incrível! Parabéns aos proprietários do Let’s Go.',
  ),
  google(
    'Adriele O.',
    'Fiquei encantada com tudo, do começo ao fim.',
    'Fui a uma festa recentemente no local e fiquei encantada com tudo, do começo ao fim. Ambiente muito bonito, acessível (estava com carrinho de bebê), pensado para crianças e adultos. Os atendentes todos uniformizados, muito simpáticos e solícitos. A decoração da festa estava impecável e as opções de salgadinhos todas muito saborosas. Várias opções de jogos e brinquedos para as crianças, todas com monitores. Adorei tudo!',
  ),
  google(
    'Marina G.',
    'Melhor casa de festas infantil!',
    'Melhor casa de festas infantil! Atenção nos mínimos detalhes, buffet, atendimento da equipe de garçons, limpeza, fraldário, decoração. A área para as crianças com brinquedos e monitores é maravilhosa, as crianças adoram e brincam demais. A equipe de atendimento do LET’S GO é incrível desde o primeiro atendimento até o pós festa. Indico sem medo para qualquer pessoa que façam sua festa com eles.',
  ),
  google(
    'Bárbara S.',
    'Nós amamos a Let’s Go!',
    'Experiência incrível… todos os profissionais são maravilhosos, atenciosos e dedicados. A decoradora Cris Dias é perfeita, colocou meu sonho fora do papel, fiquei super emocionada quando cheguei e vi tudo pronto. O buffet é perfeito, meu marido é chef de cozinha e elogiava a comida toda hora! Nós amamos a Let’s Go!',
  ),
  google(
    'Bianca T.',
    'Nunca comi tanto em uma festa.',
    'Fui a um aniversário de uma prima no local. Local limpo, organizado, buffet maravilhoso com muita opção variada de comida, salgados, doces, petiscos, nunca comi tanto em uma festa. Todos os profissionais eram excelentes, prestativos e educados.',
  ),
  google(
    'Daniela A.',
    'Lugar muito agradável, limpo e cheio de diversão.',
    'Lugar muito agradável, limpo, cheio de diversão para crianças e adolescentes. Excelente! Além de monitores gentis e atenciosos, o local oferece deliciosos salgados e doces.',
  ),
]

/** Depoimentos reais publicados no site antigo (página "Sobre"). Texto preservado. */
export const testimonials: Testimonial[] = [
  {
    highlight: 'Todos os convidados elogiaram demais a festa.',
    quote:
      'Preciso agradecer a vocês por TANTO capricho, zelo e excelência no atendimento ao cliente. Fiquei extremamente feliz com o resultado da festa, com o carinho da equipe e com a atenção que todos nos dispensaram. Vocês foram excepcionais! Todos os convidados elogiaram demais a festa e não era pra menos!!! MUITO MUITO MUITO obrigada equipe Let’s Go! Vocês arrasaram demais!',
    party: 'Festa Clara',
  },
  {
    highlight: 'Vocês realmente sabem o que fazem.',
    quote:
      'Já conhecia o trabalho de vocês através de festas que era convidada e sinceramente ameiiiiiiii ter feito a tão sonhada festa de 1 ano da minha pequena lá! Vocês realmente sabem o que fazem, entendem do assunto e não deixam absolutamente nada a desejar! Muito obrigada por ter feito esse dia mais especial do que ele já era! PARABÉNS A TODA EQUIPE! Nada do que eu colocar aqui vai conseguir expressar o quanto fiquei satisfeita com a participação e colaboração de cada um de vocês!!!',
    party: 'Festa Sophia',
  },
  {
    highlight: 'Excelente atendimento e apoio durante a festa.',
    quote:
      'Gostaria de registrar o excelente atendimento e apoio prestado durante a festa da minha filha pela coordenadora Luciana! Excelente profissional! A equipe também está de parabéns!',
    author: 'Lorena Ventura',
    party: 'Festa Larissa',
  },
  {
    highlight: 'Só alegria!',
    quote:
      'Já fizemos algumas festas com a equipe Let’s Go! Só alegria!!! Somos agradecidos por proporcionarem momentos de felicidades!!!',
    author: 'Kelly Caldeira',
    party: 'Festa Laura Pedrosa',
  },
]
