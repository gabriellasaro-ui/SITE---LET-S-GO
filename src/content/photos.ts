export type PhotoCategory = 'Decoração' | 'Espaço' | 'Diversão'

export type Photo = {
  src: string
  alt: string
  width: number
  height: number
  category: PhotoCategory
  caption: string
}

const p = (
  file: string,
  width: number,
  height: number,
  category: PhotoCategory,
  caption: string,
  alt: string,
): Photo => ({
  src: `/images/fotos/${file}.webp`,
  width,
  height,
  category,
  caption,
  alt,
})

/**
 * Fotos reais do espaço (site antigo + subsite de 15 anos).
 * As de maior resolução (≥1080px) vão nos lugares de destaque; as de ~860px
 * nunca devem ser exibidas acima de ~430px de largura para não perder nitidez.
 */
export const photos = {
  // ---- alta resolução ----
  bannerTrabalhe: p(
    'banner-trabalhe-conosco-equipe',
    2560,
    1441,
    'Espaço',
    'Equipe Let’s Go',
    'Equipe da Let’s Go Festas uniformizada aplaudindo no salão decorado',
  ),
  bannerContato: p(
    'banner-contato-espaco-diversao',
    2560,
    1441,
    'Diversão',
    'Espaço Diversão',
    'Espaço Diversão com Petshop, Carrossel de Cupcake e Kid Play colorido na Let’s Go Festas',
  ),
  bannerDuvidas: p(
    'banner-duvidas-espaco-baby',
    2560,
    1441,
    'Diversão',
    'Espaço baby',
    'Espaço baby tematizado com painel de doces, piscina de bolinhas, pufes coloridos e brinquedos para os pequenos',
  ),
  bannerSobre: p(
    'banner-sobre-tema-circo',
    2560,
    1441,
    'Decoração',
    'Tema Circo',
    'Centro de mesa em forma de cartola com cartas de baralho, em festa com tema circo e letreiro iluminado ao fundo',
  ),
  bannerDepoimentos: p(
    'banner-depoimentos-festa-1-ano',
    2560,
    1441,
    'Decoração',
    'Festa de 1 ano • Floral',
    'Festa de 1 ano com balanço de flores, lua, estrelas douradas e a aniversariante no centro do cenário',
  ),
  bannerGaleria: p(
    'banner-galeria-piscina-de-bolinhas',
    2560,
    1441,
    'Diversão',
    'Piscina de bolinhas',
    'Bebê sorrindo na piscina de bolinhas rosa e azul do Espaço Diversão da Let’s Go Festas',
  ),
  bannerEstrutura: p(
    'banner-espaco-diversao-playground',
    2560,
    1441,
    'Diversão',
    'Espaço Diversão',
    'Espaço Diversão da Let’s Go Festas com Kid Play, escorregador em espiral amarelo e roxo, e mesa de air hockey',
  ),
  banner: p(
    'banner-fachada-lets-go-pampulha',
    2560,
    1441,
    'Espaço',
    'Fachada iluminada',
    "Fachada da Let's Go Festas iluminada com faixas de neon e túnel de arcos coloridos ao entardecer, na Pampulha",
  ),
  tunel: p(
    'tunel-neon-entrada-lets-go',
    1280,
    1707,
    'Espaço',
    'Túnel de neon na entrada',
    "Túnel de arcos de neon coloridos na entrada da Let's Go Festas, buffet infantil na Pampulha",
  ),
  areaExterna: p(
    'area-externa-mesas-pampulha',
    2000,
    1500,
    'Espaço',
    'Área externa',
    'Área externa com ombrelones, mesas e balões, com vista para a Lagoa da Pampulha',
  ),
  lounge: p(
    'espaco-gourmet-lounge',
    1800,
    1198,
    'Espaço',
    'Espaço Gourmet e Lounge',
    'Espaço gourmet e lounge para adultos com sofás, bancada e iluminação aconchegante',
  ),
  salao: p(
    'salao-festas-climatizado',
    1280,
    1707,
    'Espaço',
    'Salão climatizado',
    'Salão de festas climatizado com mesas decoradas, iluminação em LED e colunas de balões',
  ),
  vila: p(
    'espaco-diversao-vila-lets-go',
    1920,
    1280,
    'Diversão',
    'Vila Let’s Go',
    'Vila Let’s Go com casinhas temáticas coloridas no Espaço Diversão do buffet infantil',
  ),
  playground: p(
    'espaco-diversao-playground-panoramico',
    2400,
    800,
    'Diversão',
    'Kid Play e escorregadores',
    'Vista panorâmica do Espaço Diversão com Kid Play, escorregadores coloridos e mesa de air hockey',
  ),
  // ---- resolução média (~860px) ----
  fachadaNoite: p(
    'fachada-lets-go-tunel-neon-noite',
    1600,
    1067,
    'Espaço',
    'Entrada iluminada',
    "Entrada da Let's Go Festas à noite, com túnel de arcos de neon, na Pampulha em Belo Horizonte",
  ),
  fachadaDia: p(
    'fachada-lets-go-tunel-arco-iris-dia',
    1600,
    1067,
    'Espaço',
    'Fachada com jardim',
    "Fachada da Let's Go Festas de dia, com túnel arco-íris e jardim, na orla da Lagoa da Pampulha",
  ),
  fachadaOnda: p(
    'fachada-lets-go-onda-neon-noite',
    1600,
    1041,
    'Espaço',
    'Fachada iluminada',
    "Fachada da Let's Go Festas iluminada com faixas de neon em formato de onda",
  ),
  games: p(
    'espaco-diversao-games-e-autorama',
    1600,
    1041,
    'Diversão',
    'Games e autorama',
    'Sala de games com fliperamas e pista de autorama no Espaço Diversão do buffet infantil',
  ),
  circo1Ano: p(
    'decoracao-festa-1-ano-tema-circo',
    1600,
    1065,
    'Decoração',
    'Festa de 1 ano • Circo',
    'Decoração de festa infantil de 1 ano com tema circo, cortinas vermelhas e mesa de doces',
  ),
  circoMesa: p(
    'mesa-de-convidados-tema-circo',
    1600,
    1065,
    'Decoração',
    'Mesa dos convidados',
    'Mesa de convidados com centro de mesa em formato de cartola, em festa com tema circo',
  ),
  brancaDeNeve: p(
    'festa-infantil-tema-branca-de-neve',
    1600,
    1067,
    'Decoração',
    'Tema Branca de Neve',
    'Salão decorado com tema Branca de Neve, mesas com toalhas vermelhas e painel ilustrado',
  ),
  internet: p(
    'decoracao-festa-tema-internet',
    1600,
    1067,
    'Decoração',
    'Tema Mundo da Internet',
    'Decoração de festa infantil colorida com personagens de animação e balões',
  ),
  balancoFloral: p(
    'decoracao-festa-1-ano-balanco-floral',
    1600,
    983,
    'Decoração',
    'Festa de 1 ano • Floral',
    'Decoração delicada de festa de 1 ano com balanço de flores, nuvens e estrelas',
  ),
  superHerois: p(
    'decoracao-festa-tema-super-herois',
    1600,
    1067,
    'Decoração',
    'Tema Super-heróis',
    'Mesa de doces e painel com tema de super-heróis em festa infantil',
  ),
  tropical: p(
    'salao-festa-tema-tropical',
    1600,
    1067,
    'Decoração',
    'Tema Tropical',
    'Salão climatizado com decoração tropical, colunas de balões e mesas para convidados',
  ),
} satisfies Record<string, Photo>

/** Galeria: só fotos em paisagem para o grid ficar uniforme. */
export const galleryPhotos: Photo[] = [
  photos.areaExterna,
  photos.circo1Ano,
  photos.vila,
  photos.balancoFloral,
  photos.superHerois,
  photos.lounge,
  photos.internet,
  photos.fachadaNoite,
  photos.brancaDeNeve,
  photos.tropical,
  photos.circoMesa,
  photos.fachadaDia,
]

/** Banner em carrossel da página Festas (marcas d'água removidas, 16:9, 1920px). */
const carousel = (n: number, caption: string, alt: string): Photo => ({
  src: `/images/fotos/festas-carrossel-${n}.webp`,
  width: 1920,
  height: 1080,
  category: 'Decoração',
  caption,
  alt,
})

export const festasCarousel: Photo[] = [
  carousel(
    1,
    'Tema Mundo da Internet',
    'Festa infantil com tema de animação e redes sociais, mesas decoradas e balões',
  ),
  carousel(
    2,
    'Festa de 1 ano • Circo',
    'Decoração de festa de 1 ano com tema circo, cortinas vermelhas e letreiro iluminado',
  ),
  carousel(3, 'Tema Super-heróis', 'Mesa de doces com painel de super-heróis em festa infantil na Let’s Go'),
  carousel(4, 'Tema Tropical', 'Salão decorado com tema tropical, colunas de balões e mesas para os convidados'),
]
