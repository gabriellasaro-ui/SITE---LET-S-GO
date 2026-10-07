# Site Let's Go Festas

Site institucional da **Let's Go Festas**, buffet infantil na Pampulha (BH). Ele também é a **base** dos sites das outras empresas do grupo: tudo que é específico da marca fica isolado em poucos arquivos.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Motion (animações) · Server Actions.

## Rodando

```bash
npm install
cp .env.example .env.local   # ajuste as variáveis
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção
npm run lint | npm run typecheck | npm run format
```

## Publicar na hospedagem (Docker)

Arquivos: `Dockerfile` (build em 3 etapas, Node 22 Alpine, Next.js `standalone`, usuário sem root, healthcheck), `docker-compose.yml` e `.dockerignore`. Serve para VPS com Docker ou painéis como Coolify, EasyPanel e Portainer.

1. Envie esta pasta para o servidor (sem `node_modules` e `.next`; o `.dockerignore` já tira isso do build).
2. Crie o `.env` a partir do exemplo e preencha: `cp .env.example .env`
   - `NEXT_PUBLIC_SITE_URL=https://letsgofestas.com.br` (sem barra no final)
   - `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (opcionais)
   - `LEAD_WEBHOOK_URL`, `CAREERS_WEBHOOK_URL` (opcionais; vazios = formulários seguem pelo WhatsApp)
   - `HOST_PORT=3000` (porta do servidor onde o site fica exposto)
3. Suba: `docker compose up -d --build`
4. Aponte o domínio para `http://127.0.0.1:3000` com HTTPS, pelo painel da hospedagem ou por um proxy reverso. Exemplo com Caddy (gera o certificado sozinho):

   ```
   letsgofestas.com.br, www.letsgofestas.com.br {
       reverse_proxy 127.0.0.1:3000
   }
   ```

Dia a dia:

- Atualizar o site: envie os arquivos novos e rode `docker compose up -d --build` de novo.
- Logs: `docker compose logs -f` · Status: `docker compose ps` (mostra `healthy` quando o site responde).
- As variáveis `NEXT_PUBLIC_*` são gravadas **no build**: se mudar, rode com `--build`. Os webhooks são lidos ao iniciar: basta `docker compose up -d`.
- O build precisa de internet (instala os pacotes do npm e baixa as fontes do Google).
- As fotos otimizadas ficam em cache no volume `letsgo-festas_next-cache`, que sobrevive às atualizações.
- Os 3 sites do grupo podem rodar no mesmo servidor: Let's Go na porta 3000, Liac na 3001 e Lanai na 3002 (cada um com o próprio `docker compose`).

## Estrutura

```
src/
  app/                      rotas (cada pasta = uma página)
    actions/lead.ts         Server Action do formulário de orçamento
    actions/career.ts       Server Action do "Trabalhe conosco"
    llms.txt/route.ts       /llms.txt gerado do conteúdo (GEO)
    sitemap.ts, robots.ts, manifest.ts, icon.png, apple-icon.png
    globals.css             TOKENS DE COR DA MARCA + utilitários visuais
  config/
    site.ts                 DADOS DA MARCA (nome, NAP, contatos, redes, menu, SEO)
    routes.ts               páginas indexáveis (sitemap + llms.txt)
    types.ts                contrato que todo site do grupo segue
  content/                  TEXTOS E DADOS (festas, estrutura, FAQ, depoimentos, fotos)
  components/
    layout/                 Header (some/volta ao rolar), Footer, PageHero, menu mobile, WhatsApp
    sections/               seções reutilizáveis (Hero, Festas, FAQ, Galeria, CTA…)
    ui/                     primitivos (Button, Icon, Sticker, PhotoTile, Balloon…)
    motion/                 animações: Reveal/Stagger, Parallax, TiltCard, CountUp,
                            SplitWords, fitas que reagem à rolagem, túnel de anéis
    forms/LeadForm.tsx      formulário de orçamento (client)
    forms/CareerForm.tsx    formulário de candidatura (client)
    seo/JsonLd.tsx
  lib/
    seo.ts                  pageMetadata(): title, description, canonical, OG/Twitter
    schema.ts               builders de JSON-LD (LocalBusiness, FAQPage, Breadcrumb…)
public/images/
  marca/                    logo, selo 20 anos, ícones PWA
  fotos/                    fotos em WebP com nomes descritivos (SEO de imagem)
  og/                       imagem de compartilhamento 1200×630
statics/, ID VISUAL/, referência/   materiais originais (não são servidos)
```

## Criando o site de outra empresa do grupo

1. Copie o projeto inteiro.
2. **`src/config/site.ts`**: nome, descrição, endereço (CEP oficial pelos Correios), telefones, WhatsApp, redes, menu, palavras-chave, `schemaType` e `extraUnits` (outras unidades; só aparecem com `confirmed: true`).
3. **`src/app/globals.css`**, bloco `@theme`: troque as escalas `primary`, `accent`, `ink`, `paper` e os gradientes `--metal-*`. Os componentes usam só nomes semânticos. Fontes ficam em `src/app/layout.tsx` (aqui: Lilita One + Nunito).
4. **`src/content/*`**: festas/serviços, estrutura, FAQ (formato answer-first), depoimentos reais, fotos.
5. **`public/images`**: logo, fotos (WebP), OG 1200×630; **`src/app/icon.png`** e **`apple-icon.png`**.
6. Revise os textos de cada `src/app/**/page.tsx` (títulos e descriptions de SEO ficam no topo de cada página).
7. Ajuste `.env` e rode `npm run build`.

## SEO e GEO implementados

- Metadata por página (title ≤ 60 e description ≤ 160 caracteres, canonical, Open Graph, Twitter), `metadataBase`, `lang="pt-BR"`.
- **Imagem de compartilhamento por página** (`public/images/og/og-<página>.jpg`, 1200x630: foto do topo + selo de 20 anos). Mapeadas em `ogImageFor()` (`src/lib/seo.ts`); para gerar de novo, recorte o banner novo em 1200x630 com o selo à esquerda.
- JSON-LD: `LocalBusiness + EventVenue` (NAP, mapa, áreas atendidas, comodidades), `WebSite`, `WebPage`/`AboutPage`/`ContactPage`/`CollectionPage`, `BreadcrumbList`, `FAQPage`, `ItemList` de `Service`, `ImageGallery`; `primaryImageOfPage` em cada página e ações "pedir orçamento pelo WhatsApp" / "como chegar" na empresa.
- `sitemap.xml` (com a foto do topo de cada página e as fotos da galeria), `robots.txt` liberando crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Amazonbot, DuckAssistBot…), `manifest.webmanifest`.
- **GEO (Generative Engine Optimization):** `/llms.txt` gerado do conteúdo (fatos, nota no Google, como contratar, como chegar, páginas e FAQ); blocos "em resumo" com fatos objetivos; FAQ answer-first; tabela comparativa de festas; NAP idêntico em todo o site; meta `geo.region`/`geo.placename`.
- 1 H1 por página, hierarquia de headings, alt descritivo em todas as imagens, FAQ com `<details>` (funciona sem JS).
- Todas as páginas são estáticas (SSG). Lighthouse mobile (out/2026): Performance 87–94, Acessibilidade/Boas práticas/SEO 100 em todas as páginas, CLS 0, TBT ≤ 150 ms. LCP real ~0,3 s (o simulado de 3–4 s é o 4G lento do Lighthouse baixando o JS do React/Next).
- Performance: recursos do Motion carregados com `LazyMotion` (componentes `m.*`, nunca `motion.*`: o modo `strict` dá erro); `sizes` das fotos com 100vw no celular (o dobro só no desktop); subtítulo do topo visível já no 1º paint (`<Rise visible>`) para contar como LCP, porque o Chrome ignora a foto de fundo em tela cheia.

## Privacidade e cookies (LGPD)

- `/politica-de-privacidade`: controlador, dados coletados (orçamento, trabalhe conosco, navegação), finalidades, bases legais, cookies, compartilhamento, retenção, segurança, dados de crianças, direitos (art. 18) e canal do encarregado. Dados do controlador em `site.legal` (`src/config/site.ts`); ao revisar a política, atualize `policyUpdatedAt`.
- **Aviso de cookies** (`CookieConsent.tsx`, sempre visível até a pessoa escolher) com Google Consent Mode v2: tudo começa negado, a pessoa aceita, recusa ou escolhe por categoria (medição / marketing) e pode mudar depois pelo link "Preferências de cookies" no rodapé. No GTM, configure as tags para respeitar o consentimento (`analytics_storage`, `ad_storage`); o evento `consent_update` vai para o `dataLayer`.

## Formulário de orçamento

`src/app/actions/lead.ts` valida no servidor (honeypot anti-spam, consentimento LGPD) e:

- com `LEAD_WEBHOOK_URL` configurado, envia o lead em JSON (CRM, n8n, Zapier, Make, RD…) e oferece seguir no WhatsApp;
- sem webhook (ou se ele falhar), entrega o pedido pelo WhatsApp com a mensagem já preenchida, então nenhum lead se perde.

Os cards de festa linkam para `/contato?festa=festa-kids` e o tipo de festa já vem selecionado.

O formulário de `/trabalhe-conosco` (`src/app/actions/career.ts`) segue a mesma lógica, com o campo `tipo: "trabalhe-conosco"` no JSON. Ele usa `CAREERS_WEBHOOK_URL` (ou, se vazio, o `LEAD_WEBHOOK_URL`); sem webhook, a candidatura vai pelo WhatsApp comercial.

A nota do Google (`site.rating`) aparece em `/clientes`, `/contato` e na home, mas **não** entra no JSON-LD (política do Google para avaliações de terceiros). Atualize nota e total periodicamente.

## Animações

Todas com [Motion](https://motion.dev) e respeitando "reduzir movimento" do sistema (`MotionProvider`). Entrada em cascata ao rolar, parallax nas fotos (`ParallaxImage`) e em camadas (`Parallax`), colagem do hero que reage ao mouse, fitas cruzadas que aceleram/invertem com a velocidade da rolagem, números que contam, cards com tilt 3D, túnel de anéis no CTA, header que some ao descer, barra de progresso de leitura e filtro/lightbox animados na galeria. O texto continua no HTML do servidor (H1 em `sr-only`, números com valor final), então SEO e GEO não são afetados.

**Fotos:** as de ~860px (site antigo) nunca devem passar de ~430px de largura na tela; as em alta (≥1080px, do subsite de 15 anos) ficam nos destaques.

## Pendências com o cliente

- [ ] **Unidade Castelo** (Av. Miguel Perrela, 300, CEP 31330-290, tel. antigo (31) 2511-2626): aparece em guias antigos, mas não no site atual. Confirmar se funciona e trocar `confirmed` para `true` em `site.ts`.
- [ ] Fotos novas em alta resolução (principalmente decorações de festa) e vídeo curto para o hero.

- [ ] Horário de atendimento comercial (`site.openingHours`).
- [ ] **Google Business Profile parece estar com o CEP 31365-450**; o CEP oficial do nº 1300 (São Luiz) é **31310-021**. Corrigir no perfil para manter o NAP consistente.
- [ ] Revisão jurídica da política de privacidade: preencher razão social e CNPJ em `site.legal`, confirmar o e-mail do encarregado e os prazos de guarda (2 anos para orçamentos, 12 meses para candidaturas).
- [ ] Definir `LEAD_WEBHOOK_URL` (e `CAREERS_WEBHOOK_URL`, se o RH usar outro destino) e `NEXT_PUBLIC_GTM_ID` (o site antigo usava GTM-P42HGPGN).
- [ ] Mais avaliações do Google: copie o texto em `googleReviews` (`src/content/testimonials.ts`); o carrossel se ajusta sozinho.
- [ ] Após publicar: enviar o sitemap no Search Console e no Bing Webmaster Tools.
