import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articleDepthFor } from './article-depth.mjs';
import { contactForm, advisorSection, siteFooter, renderLeadPages } from './lead-pages.mjs';

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = 'https://www.consultoriavr.com.br';
const contentDir = path.join(projectDir, 'content');
const scheduledPath = path.join(contentDir, 'scheduled-posts.json');
const publishedPath = path.join(contentDir, 'published-scheduled-posts.json');
const operatorsPath = path.join(contentDir, 'operators.json');
const publishedAssetsDir = path.join(contentDir, 'published-assets', 'blog');
const publicScheduledAssetsDir = path.join(projectDir, 'assets', 'blog', 'scheduled');
const baseSiteLastmod = '2026-10-05';

const basePosts = [
  {
    source: 'base',
    slug: 'como-escolher-cartao-beneficios-corporativos',
    title: 'Como escolher um cartão de benefícios corporativos sem gerar retrabalho no RH',
    shortTitle: 'Como escolher um cartão',
    category: 'Escolha de fornecedor',
    description: 'Um guia para comparar operadoras com base em implantação, rede, governança e aderência ao perfil da empresa.',
    image: '/assets/blog/base/escolha-fornecedor.jpg',
    imageAlt: 'Consultoria em cartões corporativos para empresas',
    readTime: 6,
    publishAt: '2026-08-03T12:00:00.000Z',
    keywords: ['cartão de benefícios corporativos', 'comparação de operadoras', 'RH', 'gestão de benefícios', 'VR', 'Flash', 'Caju', 'Pluxee']
  },
  {
    source: 'base',
    slug: 'pat-e-gestao-de-beneficios-corporativos',
    title: 'PAT e gestão de benefícios corporativos: o que avaliar antes de implantar ou migrar',
    shortTitle: 'PAT e gestão',
    category: 'PAT e gestão',
    description: 'Os principais pontos de política interna, compliance e operação que influenciam a escolha do benefício.',
    image: '/assets/blog/base/pat-gestao.jpg',
    imageAlt: 'Gestão de benefícios corporativos e PAT',
    readTime: 5,
    publishAt: '2026-08-03T12:00:00.000Z',
    keywords: ['PAT', 'benefícios corporativos', 'gestão de RH', 'vale refeição', 'vale alimentação', 'política de benefícios']
  },
  {
    source: 'base',
    slug: 'comparativo-vr-flash-caju-pluxee',
    title: 'Comparativo entre VR, Flash, Caju e Pluxee para empresas com rotina operacional intensa',
    shortTitle: 'Comparativo',
    category: 'Comparativo',
    description: 'Uma leitura prática sobre diferenças de rede, experiência do colaborador, governança e suporte ao RH.',
    image: '/assets/blog/base/comparativo-operadoras.jpg',
    imageAlt: 'Comparativo entre cartões de benefícios corporativos',
    readTime: 7,
    publishAt: '2026-08-03T12:00:00.000Z',
    keywords: ['comparativo VR Flash Caju Pluxee', 'benefícios corporativos', 'cartão alimentação', 'cartão refeição', 'consultoria RH']
  }
];

const basePostContent = {
  'como-escolher-cartao-beneficios-corporativos': {
    intro: [
      'A troca de operadora quase nunca falha na negociação comercial. O problema costuma aparecer depois, quando a implantação gera retrabalho, a rede não atende os colaboradores ou a gestão fica mais pesada do que antes.',
      'A comparação precisa começar no contexto da empresa: onde o time está, como usa o benefício e quanto esforço o RH consegue absorver sem perder o controle.'
    ],
    sections: [
      { heading: 'Rede é critério operacional', paragraphs: ['Uma rede ampla só tem valor quando atende os lugares que fazem parte da rotina do time. A validação deve usar cidades, bairros, turnos e estabelecimentos reais, não apenas uma apresentação comercial.'] },
      { heading: 'A rotina do RH entra na conta', paragraphs: ['Pedidos, saldos, segunda via, suporte e fechamento mensal continuam depois da assinatura. Portal, relatórios e tempo de resposta precisam ser experimentados antes de qualquer decisão.'] },
      { heading: 'Checklist para uma comparação justa', bullets: ['Mapear os locais de uso mais relevantes para o quadro atual.', 'Simular admissões, desligamentos, ajustes e ocorrências.', 'Comparar relatórios, permissões e conciliação financeira.', 'Documentar custos, prazos, rede e responsabilidades.', 'Planejar implantação e comunicação antes da assinatura.'] },
      { heading: 'A escolha precisa caber no cenário', paragraphs: ['Não existe um cartão universalmente melhor. Existe a alternativa que responde melhor às prioridades documentadas pela empresa e cria menos atrito para quem administra e para quem utiliza.'] }
    ],
    faq: [
      { question: 'Qual deve ser o primeiro critério da comparação?', answer: 'A dor que motivou a revisão. Rede, operação, suporte e experiência devem receber pesos coerentes com o cenário real.' },
      { question: 'Preço menor significa melhor escolha?', answer: 'Não necessariamente. O custo total também inclui implantação, horas do RH, retrabalho e qualidade do suporte.' }
    ]
  },
  'pat-e-gestao-de-beneficios-corporativos': {
    intro: [
      'Quando o benefício é tratado apenas como cartão, a conversa fica presa a preço, taxa e prazo. Quando é tratado como política corporativa, entram governança, aderência ao PAT e clareza operacional.',
      'Revisar essas regras antes da cotação evita que a tecnologia apenas digitalize uma política confusa.'
    ],
    sections: [
      { heading: 'Política interna antes da plataforma', paragraphs: ['Elegibilidade, datas de crédito, admitidos, desligados, afastamentos e exceções precisam estar claros. A operadora deve sustentar essa política, não obrigar a empresa a improvisar uma nova.'] },
      { heading: 'PAT como parte da governança', paragraphs: ['A empresa precisa manter coerência entre documentação, concessão, operação e comunicação. Pontos regulatórios devem ser confirmados com os profissionais responsáveis e com informações oficiais vigentes.'] },
      { heading: 'O que revisar antes de implantar', bullets: ['Critérios de elegibilidade e valores por público.', 'Tratamento de admissões, férias, afastamentos e desligamentos.', 'Separação de saldos e regras de utilização.', 'Documentos, relatórios e trilha de aprovação.', 'Responsáveis pela implantação e pelas exceções.'] },
      { heading: 'Implantação é um projeto', paragraphs: ['Migração de benefício mexe com pessoas e rotina. Um cronograma com responsáveis, testes, janela de transição e comunicação reduz a chance de a primeira carga virar uma corrida de correções.'] }
    ],
    faq: [
      { question: 'O PAT deve ser analisado apenas pelo RH?', answer: 'Não. RH, financeiro e responsáveis por compliance ou assessoria especializada devem alinhar política, documentação e operação.' },
      { question: 'A troca de operadora resolve uma política confusa?', answer: 'Não sozinha. Primeiro é preciso revisar regras e responsabilidades; depois, verificar qual solução consegue executá-las.' }
    ]
  },
  'comparativo-vr-flash-caju-pluxee': {
    intro: [
      'Comparar marcas conhecidas sem um roteiro comum produz apresentações interessantes, mas pouca clareza para decidir. O objetivo não é montar um ranking universal.',
      'A análise útil coloca VR, Flash, Caju e Pluxee diante das mesmas situações reais de rede, operação, suporte, governança e experiência.'
    ],
    sections: [
      { heading: 'Comece pelo perfil da empresa', paragraphs: ['Porte, localidades, política, capacidade do RH e comportamento de uso mudam o peso de cada critério. Antes das demonstrações, transforme essas variáveis em uma lista curta de prioridades.'] },
      { heading: 'Teste a operação, não só a promessa', paragraphs: ['Peça para cada fornecedor mostrar tarefas reais: cadastrar pessoas, ajustar saldos, separar acessos, gerar relatórios e resolver ocorrências. Isso revela diferenças que uma tabela comercial não mostra.'] },
      { heading: 'Matriz para comparar com equilíbrio', bullets: ['Rede validada com uma amostra de CEPs e estabelecimentos.', 'Fluxos mensais do RH e do financeiro.', 'Canais de suporte, prazos e escalonamento.', 'Experiência do colaborador em situações comuns.', 'Custo total, implantação e condições documentadas.'] },
      { heading: 'Decisão sem vencedor automático', paragraphs: ['Uma alternativa pode ter ótima aderência para uma empresa e criar atrito em outra. A conclusão responsável registra por que cada critério recebeu determinado peso e quais premissas ainda precisam ser confirmadas.'] }
    ],
    faq: [
      { question: 'Qual é a melhor entre VR, Flash, Caju e Pluxee?', answer: 'Não há uma resposta universal. A aderência depende da rede necessária, da política, da operação e das condições atuais de cada proposta.' },
      { question: 'Como evitar que o comparativo vire apenas uma disputa de preço?', answer: 'Use uma matriz com critérios e evidências, atribua pesos antes das propostas finais e calcule também o esforço operacional.' }
    ]
  }
};

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath, fallback) {
  if (!(await exists(filePath))) return fallback;
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function safeJson(data) {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

function routeFor(post) {
  return `/conteudo/${post.slug}/`;
}

function operatorRoute(operator) {
  return `/operadoras/${operator.slug}/`;
}

function operatorFormName(operator) {
  return operator.name === 'iFood Benefícios' ? operator.name : operator.name.replace(' Benefícios', '');
}

function absoluteUrl(value) {
  if (!value) return `${siteUrl}/hero-reuniao-empresarial.jpg`;
  if (value.startsWith('http')) return value;
  return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
}

function imageFor(post) {
  if (post.image?.startsWith('/')) return post.image;
  if (post.source === 'scheduled' && post.image) return `/assets/blog/scheduled/${post.image}`;
  return '/hero-reuniao-empresarial.jpg';
}

function formatDate(iso) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo'
  }).format(new Date(iso));
}

function googleTagManagerHead() {
  return `    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-T636X4P7');</script>
    <!-- End Google Tag Manager -->`;
}

function googleTagManagerBody() {
  return `    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T636X4P7"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`;
}

function editorialNav(current = '') {
  return `    <nav class="operator-page__nav" aria-label="Navegação principal">
      <a class="operator-page__brand" href="/">Consultoria<span>VR</span><small class="brand-signature">by Hirayama Corretora &amp; Consultoria</small></a>
      <div>
        <a href="/#operadoras"${current === 'operators' ? ' aria-current="page"' : ''}>Operadoras</a>
        <a href="/conteudo/"${current === 'content' ? ' aria-current="page"' : ''}>Conteúdos</a>
        <a class="operator-page__contact" href="/contato/">Falar com um consultor</a>
      </div>
    </nav>`;
}

function head({ title, description, keywords = [], canonical, type = 'website', image = '/hero-reuniao-empresarial.jpg', structuredData = [], noindex = false }) {
  const imageUrl = absoluteUrl(image);
  return `<head>
${googleTagManagerHead()}
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" type="image/svg+xml" href="/favicon.svg" />
    <title>${escapeHtml(title)}</title>
${noindex ? '    <meta name="robots" content="noindex, follow" />\n' : ''}    <meta name="title" content="${escapeHtml(title)}" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="author" content="Consultoria VR" />
    <meta name="keywords" content="${escapeHtml(keywords.join(', '))}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:type" content="${escapeHtml(type)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:site_name" content="Consultoria VR" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:alt" content="${escapeHtml(title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
    <meta name="theme-color" content="#103F3B" />
    <link rel="stylesheet" href="/seo-fallback-hirayama.css" />
    <link rel="stylesheet" href="/lead-flow.css" />
    <link rel="stylesheet" href="/operator-experience.css" />
    <script type="module" src="/lead-flow.js"></script>
${structuredData.map((item) => `    <script type="application/ld+json">${safeJson(item)}</script>`).join('\n')}
  </head>`;
}

function articleCard(post) {
  const image = imageFor(post);
  return `<a class="seo-fallback__article-card" href="${escapeHtml(routeFor(post))}">
                <img class="seo-fallback__article-thumb" src="${escapeHtml(image)}" alt="${escapeHtml(post.imageAlt || post.title)}" loading="lazy" />
                <span class="seo-fallback__article-meta">${escapeHtml(post.category)}</span>
                <h3>${escapeHtml(post.title)}</h3>
                <p>${escapeHtml(post.description)}</p>
                <span class="seo-fallback__article-link">${escapeHtml(formatDate(post.publishAt))} · ${escapeHtml(post.readTime || 6)} min de leitura</span>
              </a>`;
}

function renderBlogIndex(posts) {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Blog da Consultoria VR by Hirayama',
      url: `${siteUrl}/conteudo`,
      description: 'Conteúdos consultivos sobre cartões, benefícios corporativos, PAT, RH e comparação de operadoras.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}${routeFor(post)}`,
        name: post.title
      }))
    }
  ];
  return `<!doctype html>
<html lang="pt-BR">
  ${head({
    title: 'Blog da Consultoria | Artigos sobre Benefícios Corporativos',
    description: 'Conteúdos sobre benefícios corporativos. Veja artigos sobre comparação de VR, Flash, Caju, iFood, ValeCard e Pluxee, além de gestão de RH, PAT e implantação.',
    keywords: ['consultoria em cartões', 'benefícios corporativos', 'vale refeição', 'vale alimentação', 'VR', 'Flash', 'Caju', 'iFood Benefícios', 'ValeCard', 'Pluxee', 'PAT'],
    canonical: `${siteUrl}/conteudo`,
    image: '/hero-reuniao-empresarial.jpg',
    structuredData
  })}

  <body>
${googleTagManagerBody()}
${editorialNav('content')}
    <div id="root">
      <main class="seo-fallback" aria-label="Conteúdo da Consultoria VR">
        <header class="seo-fallback__hero">
          <div class="seo-fallback__wrap">
            <div class="seo-fallback__brand"><span class="seo-fallback__brand-mark"></span>Ecossistema Hirayama</div>
            <p class="seo-fallback__eyebrow">Conteúdo sobre benefícios corporativos</p>
            <h1>Consultoria em <span>Cartões</span></h1>
            <p class="seo-fallback__lead">Artigos e materiais para empresas que querem comparar VR, Flash, Caju, iFood, ValeCard, Pluxee e outras soluções de benefícios corporativos com mais clareza.</p>
            <a class="seo-fallback__cta" href="/contato/">Falar com um consultor</a>
          </div>
        </header>

        <section class="seo-fallback__section" aria-labelledby="seo-conteudo-title">
          <div class="seo-fallback__wrap">
            <h2 id="seo-conteudo-title" class="seo-fallback__section-title">Artigos da biblioteca</h2>
            <p class="seo-fallback__section-copy">Conteúdos personalizados para RH, financeiro e liderança que precisam comparar cartões, organizar política de benefícios e reduzir ruído na implantação.</p>
            <div class="seo-fallback__grid">
              <article class="seo-fallback__item">
                <h3>Comparativo de cartões</h3>
                <p>Análises de VR, Flash, Caju, iFood, ValeCard, Pluxee e outras opções para empresas.</p>
              </article>
              <article class="seo-fallback__item">
                <h3>Gestão de benefícios</h3>
                <p>Boas práticas para pedidos, saldos, relatórios, implantação e rotina do RH.</p>
              </article>
              <article class="seo-fallback__item">
                <h3>Decisão consultiva</h3>
                <p>Critérios para escolher fornecedor com base em custo, rede, experiência e aderência ao perfil da empresa.</p>
              </article>
            </div>

            <div class="seo-fallback__article-list seo-fallback__article-list--library" aria-label="Artigos da biblioteca">
              ${posts.map(articleCard).join('\n              ')}
            </div>
          </div>
        </section>

        <section class="seo-fallback__section seo-fallback__section--dark" aria-labelledby="seo-ecosistema-title">
          <div class="seo-fallback__wrap">
            <h2 id="seo-ecosistema-title" class="seo-fallback__section-title">Conteúdo integrado ao ecossistema Hirayama</h2>
            <p class="seo-fallback__section-copy">A biblioteca reforça a identidade institucional da Hirayama com foco em decisão consultiva, clareza operacional e linguagem corporativa para RH, financeiro e liderança.</p>
          </div>
        </section>

        ${siteFooter}
      </main>
    </div>
  </body>
</html>
`;
}

function articleContentFor(post) {
  const fallback = basePostContent[post.slug] || {};
  return {
    intro: post.intro?.length ? post.intro : fallback.intro || [post.description],
    sections: [...(post.sections?.length ? post.sections : fallback.sections || []), ...articleDepthFor(post)],
    faq: post.faq?.length ? post.faq : fallback.faq || []
  };
}

function excerpt(value = '', limit = 150) {
  if (value.length <= limit) return value;
  const shortened = value.slice(0, limit);
  return `${shortened.slice(0, shortened.lastIndexOf(' '))}…`;
}

function renderLandingSignal(section, index) {
  const copy = section.paragraphs?.[0] || section.bullets?.[0] || '';
  return `<article class="article-landing__signal">
              <span>${String(index + 1).padStart(2, '0')}</span>
              <h3>${escapeHtml(section.heading)}</h3>
              <p>${escapeHtml(excerpt(copy, 132))}</p>
            </article>`;
}

function renderLandingChapter(section, index) {
  const number = String(index + 1).padStart(2, '0');
  const paragraphs = (section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n              ');
  if (section.bullets?.length) {
    return `<section class="article-landing__chapter article-landing__chapter--checklist" id="secao-${index + 1}">
          <div class="article-landing__chapter-inner">
            <div class="article-landing__chapter-heading">
              <span>${number}</span>
              <p>Para levar à reunião</p>
              <h2>${escapeHtml(section.heading)}</h2>
            </div>
            <ol>${section.bullets.map((bullet, bulletIndex) => `<li><span>${String(bulletIndex + 1).padStart(2, '0')}</span><strong>${escapeHtml(bullet)}</strong></li>`).join('')}</ol>
          </div>
        </section>`;
  }
  return `<section class="article-landing__chapter${index % 2 ? ' article-landing__chapter--tint' : ''}" id="secao-${index + 1}">
          <div class="article-landing__chapter-inner">
            <div class="article-landing__chapter-heading">
              <span>${number}</span>
              <p>Ponto de decisão</p>
              <h2>${escapeHtml(section.heading)}</h2>
            </div>
            <div class="article-landing__chapter-copy">${paragraphs}</div>
          </div>
        </section>`;
}

function renderArticle(post, posts) {
  const route = routeFor(post);
  const image = imageFor(post);
  const canonical = `${siteUrl}${route}`;
  const content = articleContentFor(post);
  const decisionTopics = content.sections.slice(0, 3).map((section) => section.heading.toLowerCase()).join(', ');
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      image: absoluteUrl(image),
      author: { '@type': 'Organization', name: 'Consultoria VR by Hirayama' },
      publisher: {
        '@type': 'Organization',
        name: 'Consultoria VR by Hirayama',
        logo: { '@type': 'ImageObject', url: `${siteUrl}/favicon.svg` }
      },
      datePublished: post.publishAt,
      dateModified: post.publishedAt || post.publishAt,
      mainEntityOfPage: canonical,
      keywords: post.keywords || [],
      articleSection: post.category
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Conteúdo', item: `${siteUrl}/conteudo` },
        { '@type': 'ListItem', position: 3, name: post.title, item: canonical }
      ]
    }
  ];
  if (content.faq.length) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer }
      }))
    });
  }
  return `<!doctype html>
<html lang="pt-BR">
  ${head({
    title: `${post.title} | Consultoria VR`,
    description: post.description,
    keywords: post.keywords || [],
    canonical,
    type: 'article',
    image,
    structuredData
  })}
  <body>
${googleTagManagerBody()}
${editorialNav('content')}
    <main class="seo-fallback article-landing" id="topo" aria-label="Conteúdo da Consultoria VR">
      <article>
        <header class="article-landing__hero">
          <img class="article-landing__hero-image" src="${escapeHtml(image)}" alt="${escapeHtml(post.imageAlt || post.title)}" />
          <div class="article-landing__hero-shade"></div>
          <div class="article-landing__hero-inner">
            <div class="article-landing__breadcrumb">
            <a href="/">Início</a>
            <span>→</span>
            <a href="/conteudo/">Conteúdo</a>
            <span>→</span>
            <span>${escapeHtml(post.shortTitle || post.title)}</span>
          </div>
          <p class="article-landing__eyebrow">${escapeHtml(post.category)}</p>
          <h1>${escapeHtml(post.title)}</h1>
          <p class="article-landing__lead">${escapeHtml(post.description)}</p>
          <div class="article-landing__meta">
            <span>${escapeHtml(formatDate(post.publishAt))}</span>
            <span>${escapeHtml(post.readTime || 6)} min de leitura</span>
            <span>Consultoria VR by Hirayama</span>
          </div>
          <div class="article-landing__hero-actions">
            <a href="#decisao">Explorar a análise</a>
            <a href="/contato/">Falar com um consultor</a>
          </div>
        </div>
        </header>

        <nav class="article-landing__index" aria-label="Índice do artigo">
          <strong>Nesta análise</strong>
          <ol>${content.sections.map((section, index) => `<li><a href="#secao-${index + 1}">${escapeHtml(section.heading)}</a></li>`).join('')}</ol>
          <a href="#aplicacao">Plano de ação</a>
          ${content.faq.length ? '<a href="#faq">Perguntas frequentes</a>' : ''}
        </nav>

        <section class="article-landing__signals" aria-label="Resumo executivo">
          <div class="article-landing__signals-inner">
            <p class="article-landing__section-label">Resumo executivo</p>
            <div>${content.sections.slice(0, 3).map(renderLandingSignal).join('\n            ')}</div>
          </div>
        </section>

        <section class="article-landing__opening" id="decisao">
          <div class="article-landing__opening-inner">
            <div>
              <p class="article-landing__section-label">O cenário antes da escolha</p>
              <h2>Decidir bem começa por enxergar o que acontece depois da contratação.</h2>
            </div>
            <div>${content.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n              ')}</div>
          </div>
        </section>

        ${content.sections.map(renderLandingChapter).join('\n        ')}

        <section class="article-landing__application" id="aplicacao">
          <div class="article-landing__application-intro">
            <p class="article-landing__section-label">Da análise para a rotina</p>
            <h2>Como transformar esta leitura em um plano de ação.</h2>
            <p>O tema “${escapeHtml(post.shortTitle || post.title)}” fica mais útil quando sai da discussão abstrata e passa a ter responsáveis, evidências e um momento claro de revisão.</p>
          </div>
          <div class="article-landing__application-steps">
            <article><span>01</span><div><h3>Fotografe o cenário atual</h3><p>Registre volumes, localidades, reclamações, tarefas manuais e regras internas. Sem essa linha de base, a empresa corre o risco de avaliar a mudança pela memória ou pela apresentação comercial.</p></div></article>
            <article><span>02</span><div><h3>Peça evidências comparáveis</h3><p>Leve os mesmos casos para cada alternativa e registre como cada uma responde aos pontos centrais desta análise: ${escapeHtml(decisionTopics)}. Uma matriz comum torna diferenças e pendências visíveis para todas as áreas.</p></div></article>
            <article><span>03</span><div><h3>Defina dono, prazo e revisão</h3><p>Cada decisão precisa indicar quem aprova, quem opera, o que será comunicado e quando os resultados serão revistos. Assim, o benefício deixa de ser uma compra pontual e passa a ser gerido.</p></div></article>
          </div>
        </section>

        <section class="article-landing__metrics">
          <div class="article-landing__metrics-heading">
            <p class="article-landing__section-label">Depois da decisão</p>
            <h2>Quatro sinais mostram se a escolha está funcionando.</h2>
            <p>Os indicadores devem ser comparados com a linha de base anterior e interpretados em conjunto. Um número isolado raramente explica a experiência completa.</p>
          </div>
          <div class="article-landing__metrics-grid">
            <article><strong>01</strong><h3>Chamados</h3><p>Volume, motivo e recorrência das dúvidas recebidas pelo RH e pelo suporte.</p></article>
            <article><strong>02</strong><h3>Tempo operacional</h3><p>Horas usadas em cadastro, ajustes, conciliação, correções e acompanhamento.</p></article>
            <article><strong>03</strong><h3>Aceitação e uso</h3><p>Sinais de dificuldade por unidade, cidade, turno ou perfil de colaborador.</p></article>
            <article><strong>04</strong><h3>Qualidade da resposta</h3><p>Prazo, clareza e resolução das ocorrências que realmente impactam a rotina.</p></article>
          </div>
        </section>

        <section class="article-landing__consulting">
          <div>
            <p class="article-landing__section-label">Leitura consultiva</p>
            <h2>Critérios claros transformam proposta comercial em decisão empresarial.</h2>
            <p>A Consultoria VR organiza rede, operação, governança, custo total e experiência dos colaboradores em uma análise que RH, financeiro e liderança conseguem usar juntos.</p>
          </div>
          <a href="/contato/">Quero analisar meu cenário <span>→</span></a>
        </section>

        ${content.faq.length ? `<section class="article-landing__faq" id="faq">
          <p class="article-landing__section-label">Perguntas frequentes</p>
          <h2>Respostas diretas antes do próximo passo.</h2>
          <div>${content.faq.map((item) => `<details><summary>${escapeHtml(item.question)}<span>+</span></summary><p>${escapeHtml(item.answer)}</p></details>`).join('\n            ')}</div>
        </section>` : ''}

        <section class="article-landing__related" aria-labelledby="related-title">
          <div class="article-landing__related-heading">
            <div><p class="article-landing__section-label">Próximas decisões</p><h2 id="related-title">Continue pelo assunto que mais pesa hoje.</h2></div>
            <a href="/conteudo/">Ver biblioteca completa <span>→</span></a>
          </div>
          <div class="article-landing__related-grid">
            ${related.map((item) => `<a href="${escapeHtml(routeFor(item))}"><img src="${escapeHtml(imageFor(item))}" alt="${escapeHtml(item.imageAlt || item.title)}" loading="lazy" /><span>${escapeHtml(item.category)}</span><h3>${escapeHtml(item.title)}</h3><strong>Ler análise →</strong></a>`).join('\n            ')}
          </div>
        </section>
      </article>

      ${siteFooter}
    </main>
  </body>
</html>
`;
}

function operatorText(text) {
  return escapeHtml(text).replace(/(rede credenciada|alimentação e refeição|RH e financeiro|condições comerciais|produto contratado|primeiro acesso|carga mensal|segunda via|permissões|elegibilidade|conciliação|política de benefícios|carteiras|prestação de contas|implantação|supermercados|Ticket Flex|Ticket Alimentação|Ticket Restaurante|SuperApp|Multibenefícios Elo)/giu, '<strong>$1</strong>');
}

function renderOperatorPage(operator, operators, guides) {
  const route = operatorRoute(operator);
  const canonical = `${siteUrl}${route}`;
  const guide = guides[operator.slug];
  if (!guide) throw new Error(`Missing reading guide: ${operator.slug}`);
  if (guide.checks?.length !== guide.products.length) throw new Error(`Missing solution checks: ${operator.slug}`);
  const photo = `/assets/operators/${guide.image}.webp`;
  const rolloutPhoto = guide.image === 'gestao-rh' ? 'uso-restaurante' : 'gestao-rh';
  const related = operators.filter((item) => item.slug !== operator.slug);
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: operator.title,
      description: operator.description,
      url: canonical,
      isPartOf: { '@type': 'WebSite', name: 'Consultoria VR', url: siteUrl },
      about: { '@type': 'Organization', name: operator.name }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Operadoras', item: `${siteUrl}/#operadoras` },
        { '@type': 'ListItem', position: 3, name: operator.name, item: canonical }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: operator.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer }
      }))
    }
  ];

  return `<!doctype html>
<html lang="pt-BR">
  ${head({
    title: `${operator.title} | Consultoria VR`,
    description: operator.description,
    keywords: operator.keywords,
    canonical,
    image: photo,
    structuredData
  })}
  <body>
${googleTagManagerBody()}
${editorialNav('operators')}
    <main class="seo-fallback operator-page" id="topo" aria-label="Análise da ${escapeHtml(operator.name)}">
      <header class="operator-page__hero operator-page__hero--${escapeHtml(operator.cardClass)}">
        <img class="operator-hero-photo" src="${photo}" alt="${escapeHtml(guide.imageAlt)}" width="1440" height="810" fetchpriority="high" />
        <div class="operator-page__hero-inner">
          <div class="operator-page__hero-copy" data-viewport-reveal>
            <div class="operator-page__breadcrumb"><a href="/">Início</a><span>→</span><a href="/#operadoras">Operadoras</a><span>→</span><strong>${escapeHtml(operator.name)}</strong></div>
            <p class="operator-page__eyebrow">${escapeHtml(operator.eyebrow)}</p>
            <h1>${escapeHtml(operator.name)}</h1>
            <p class="operator-hero-lead">${escapeHtml(guide.lead)}</p>
            <p>${escapeHtml(operator.description)}</p>
            <a class="operator-page__button" href="/contato/?operadora=${encodeURIComponent(operatorFormName(operator))}">Analisar para minha empresa</a>
            <a class="operator-hero-explore" href="#visao-geral">Conhecer os critérios <span aria-hidden="true">↓</span></a>
          </div>
          <div class="operator-card-float" data-motion-loop>
            <button class="operator-page__card" type="button" data-card-flip data-card-tilt disabled aria-pressed="false" aria-label="Ver foco da análise de ${escapeHtml(operator.name)}" title="Ver foco da análise">
              <span class="operator-card-sides">
                <span class="operator-card-front">
                  <span class="operator-page__chip" aria-hidden="true"></span>
                  <img src="${escapeHtml(operator.logo)}" alt="${escapeHtml(operator.logoAlt)}" />
                  <small>Benefícios corporativos · ilustração</small>
                </span>
                <span class="operator-card-back" aria-hidden="true"><span>Foco da análise</span><strong>${escapeHtml(guide.focus)}</strong><small>${escapeHtml(operator.name)}</small></span>
              </span>
              <span class="operator-card-turn" aria-hidden="true">↻</span>
            </button>
          </div>
        </div>
      </header>
      <nav class="operator-reading-nav" aria-label="Assuntos desta análise">
        <div><a href="#visao-geral">Visão geral</a><a href="#produtos">Soluções</a><a href="#na-pratica">Na prática</a><a href="#checklist">Checklist</a><a href="#custos">Custos</a><a href="#implantacao">Implantação</a><a href="#duvidas">Dúvidas</a><a href="#atendimento">Atendimento</a></div>
        <span class="operator-reading-progress" data-reading-progress aria-hidden="true"></span>
      </nav>
      <section class="operator-page__intro" id="visao-geral">
        <p class="operator-page__label">Visão consultiva</p>
        <h2 data-viewport-reveal>O cartão é o começo. A rotina é o teste.</h2>
        <div data-viewport-reveal><p>${operatorText(operator.summary)}</p><p class="operator-focus"><strong>Foco da análise</strong> ${escapeHtml(guide.focus)}</p></div>
      </section>

      <section class="operator-page__reading">
        <article data-viewport-reveal>
          <p class="operator-page__label">Entenda o cenário</p>
          <h2>Como olhar para a ${escapeHtml(operator.name)}</h2>
          ${operator.overview.map((paragraph) => `<p>${operatorText(paragraph)}</p>`).join('\n          ')}
        </article>
        <aside data-viewport-reveal>
          <h3>Pontos que podem entrar no comparativo</h3>
          <ul>${operator.strengths.map((item) => `<li>${operatorText(item)}</li>`).join('')}</ul>
          <p>Recursos, rede e condições comerciais podem mudar. Confirme sempre a documentação e a proposta oficiais vigentes.</p>
        </aside>
      </section>

      <section class="operator-products operator-section" id="produtos">
        <div class="operator-section-heading" data-viewport-reveal><p class="operator-page__label">Escolha pelo uso, não só pela marca</p><h2>O que entra na proposta da ${escapeHtml(operator.name)}</h2><p>Produtos diferentes pedem perguntas diferentes. Separe o que resolve sua necessidade do que apenas amplia o pacote.</p></div>
        <div class="operator-solution-controls" data-solution-controls hidden>
          <div class="operator-solution-tabs" role="tablist" aria-label="Soluções da ${escapeHtml(operator.name)}">${guide.products.map((product, index) => `<button type="button" role="tab" id="solucao-tab-${index}" aria-controls="solucao-${index}" aria-selected="${index === 0}" tabindex="${index === 0 ? '0' : '-1'}"><span aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${escapeHtml(product.title)}</button>`).join('')}</div>
          <button class="operator-compare-toggle" type="button" data-compare-solutions aria-pressed="false">Comparar lado a lado <span aria-hidden="true">↔</span></button>
        </div>
        <div class="operator-products-list">${guide.products.map((product, index) => `<article id="solucao-${index}" data-solution-panel aria-labelledby="solucao-titulo-${index}"><div class="operator-solution-copy"><span class="operator-step">${String(index + 1).padStart(2, '0')}</span><h3 id="solucao-titulo-${index}">${escapeHtml(product.title)}</h3><p>${operatorText(product.text)}</p></div><div class="operator-solution-proof"><p class="operator-page__label">Na demonstração</p><h4>${escapeHtml(guide.checks[index].question)}</h4><p>${operatorText(guide.checks[index].evidence)}</p></div></article>`).join('')}</div>
      </section>
      <section class="operator-scenario" id="na-pratica">
        <figure data-viewport-reveal><span class="operator-image-window"><img data-scroll-photo src="/assets/operators/${guide.image === 'uso-alimentacao' ? 'uso-restaurante' : 'uso-alimentacao'}.webp" alt="Cena ilustrativa gerada por IA de uso de benefício de alimentação e refeição" width="1440" height="810" loading="lazy"></span><figcaption>Cena ilustrativa criada por IA, sem produto de marca.</figcaption></figure>
        <div data-viewport-reveal><p class="operator-page__label">Um cenário para colocar à prova</p><h2>${escapeHtml(guide.scenarioTitle)}</h2><p>${operatorText(guide.scenario)}</p><p class="operator-takeaway"><strong>O que levar à comparação</strong>${operatorText(guide.action)}</p></div>
      </section>
      <section class="operator-page__checklist" id="checklist" data-comparison-checklist>
        <div data-viewport-reveal>
          <p class="operator-page__label">Checklist para RH e financeiro</p>
          <h2>O que validar antes de decidir</h2>
          <p>Uma proposta fica mais clara quando os critérios são registrados. Considere cada item no produto e no contrato que a sua empresa vai utilizar.</p>
          <p class="operator-checklist-status" data-checklist-status role="status" aria-live="polite">0 de ${operator.evaluate.length} critérios revisados</p>
          <progress class="operator-checklist-progress" data-checklist-progress value="0" max="${operator.evaluate.length}" aria-label="Critérios revisados"></progress>
          <a class="operator-checklist-next" data-checklist-next hidden href="/contato/?operadora=${encodeURIComponent(operatorFormName(operator))}">Conversar sobre esses critérios <span aria-hidden="true">→</span></a>
        </div>
        <ol>${operator.evaluate.map((item, index) => `<li data-viewport-reveal><label><input type="checkbox"><span class="operator-step" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><span>${operatorText(item)}</span></label></li>`).join('')}</ol>
      </section>
      <section class="operator-costs operator-section" id="custos">
        <div data-viewport-reveal><p class="operator-page__label">Além do preço anunciado</p><h2>O custo não termina na proposta.</h2><p>Ao comparar ${escapeHtml(operator.name)}, coloque na mesma conta <strong>condições comerciais, esforço de gestão e transição</strong>. Uma taxa isolada não descreve tudo o que a operação vai exigir.</p><p>Peça uma proposta com produto, categorias, serviços incluídos e validade. Diferencie preço recorrente de condição promocional e solicite os prazos de emissão, crédito e atendimento. O que não estiver claro precisa virar uma pergunta, não uma suposição.</p></div>
        <dl data-viewport-reveal><div><dt>Contrato</dt><dd>Taxas, serviços, vigência, obrigações e condições de saída documentados.</dd></div><div><dt>Rotina do RH</dt><dd>Pedidos, cadastros, exceções e relatórios demonstrados com exemplos da empresa.</dd></div><div><dt>Experiência do time</dt><dd>Rede útil, orientação de uso e caminho de atendimento quando algo não funciona.</dd></div></dl>
      </section>
      <section class="operator-rollout operator-section" id="implantacao">
        <div class="operator-section-heading" data-viewport-reveal><p class="operator-page__label">Do contrato ao primeiro crédito</p><h2>Uma boa escolha precisa chegar bem ao time.</h2><p>A implantação da ${escapeHtml(operator.name)} deve ter responsáveis, prazos e comunicação. Antes de trocar, confira o tratamento dos cartões e saldos atuais; não presuma transferência automática.</p></div>
        <div class="operator-rollout-grid"><figure data-viewport-reveal><span class="operator-image-window"><img data-scroll-photo src="/assets/operators/${rolloutPhoto}.webp" alt="${rolloutPhoto === 'gestao-rh' ? 'Cena ilustrativa gerada por IA de revisão de cadastros e implantação de benefícios' : 'Cena ilustrativa gerada por IA de uso do benefício após a implantação'}" width="1440" height="810" loading="lazy"></span><figcaption>Cena ilustrativa criada por IA.</figcaption></figure><ol>
          <li data-viewport-reveal><strong>01 · Organizar a base</strong><p>Revise unidades, públicos, valores e responsáveis. Trate os dados pessoais apenas nos canais autorizados.</p></li>
          <li data-viewport-reveal><strong>02 · Validar antes da virada</strong><p>Teste acesso, pedido, crédito e atendimento com o fornecedor. Documente as regras de transição do contrato anterior.</p></li>
          <li data-viewport-reveal><strong>03 · Comunicar e acompanhar</strong><p>Explique aplicativo, saldos e canais de ajuda. Acompanhe as primeiras ocorrências para ajustar o que não ficou claro.</p></li>
        </ol></div>
      </section>
      <section class="operator-page__fit">
        <p class="operator-page__label">Aderência ao perfil</p>
        <h2 data-viewport-reveal>Faz sentido para a sua empresa?</h2>
        <p data-viewport-reveal>${operatorText(operator.fit)}</p>
        <a href="/conteudo/como-escolher-cartao-beneficios-corporativos/">Veja como estruturar a comparação completa <span>→</span></a>
      </section>

      <section class="operator-page__faq" id="duvidas" aria-labelledby="operator-faq-title">
        <p class="operator-page__label">Perguntas frequentes</p>
        <h2 id="operator-faq-title">Dúvidas sobre ${escapeHtml(operator.name)}</h2>
        ${operator.faq.map((item) => `<details data-viewport-reveal><summary>${escapeHtml(item.question)}<span>+</span></summary><p>${operatorText(item.answer)}</p></details>`).join('\n        ')}
      </section>

      <section class="operator-resources" id="atendimento" aria-labelledby="resource-title">
        <p class="operator-page__label">Antes de contratar e durante o uso</p>
        <h2 id="resource-title">Cuidados e canais oficiais da ${escapeHtml(operator.name)}</h2>
        <div class="operator-resource-grid">
          <div data-viewport-reveal><h3>O que merece atenção</h3><ul>${operator.attention.map(item => `<li>${operatorText(item)}</li>`).join('')}</ul></div>
          <div data-viewport-reveal><h3>Já usa este cartão?</h3><p>Para perda ou roubo, procure o bloqueio no aplicativo oficial. Sem acesso ao app, use o canal de atendimento da operadora. <strong>A consultoria não bloqueia cartões nem consulta saldos.</strong></p><ul>${operator.resources.map(item => `<li><a href="${escapeHtml(item.url)}" rel="noopener">${escapeHtml(item.label)}</a></li>`).join('')}</ul></div>
        </div>
        <p class="operator-source-note">Fontes oficiais consultadas em ${escapeHtml(formatDate(operator.checkedAt + 'T12:00:00Z'))}. ${operator.sources.map(item => `<a href="${escapeHtml(item.url)}" rel="noopener">${escapeHtml(item.label)}</a>`).join(' · ')}. Recursos, prazos e condições devem ser reconfirmados na proposta vigente.</p>
      </section>
      <section class="operator-revision" data-viewport-reveal><h2>Já usa ${escapeHtml(operator.name)} na empresa?</h2><p>Revise rede, suporte, esforço do RH e contrato antes de renovar.</p><a href="/ja-tenho-cartao/?operadora=${encodeURIComponent(operatorFormName(operator))}">Avaliar meu contrato →</a></section>

      <section class="operator-page__others" aria-labelledby="other-operators-title">
        <p class="operator-page__label">Continue comparando</p>
        <h2 id="other-operators-title">Conheça as outras operadoras</h2>
        <div>${related.map((item) => `<a class="operator-choice operator-choice--${escapeHtml(item.cardClass)}" href="${escapeHtml(operatorRoute(item))}" data-viewport-reveal><span class="operator-choice__face" data-card-tilt><span class="operator-choice__chip" aria-hidden="true"></span><img src="${escapeHtml(item.logo)}" alt="${escapeHtml(item.logoAlt)}" loading="lazy" /></span><span class="operator-choice__name">${escapeHtml(item.name)}</span><span class="operator-choice__link">Ver análise <span aria-hidden="true">→</span></span></a>`).join('')}</div>
      </section>

      ${siteFooter}
    </main>
  </body>
</html>
`;
}

async function copyPublishedAssets(posts) {
  await fs.rm(publicScheduledAssetsDir, { recursive: true, force: true });
  const publishedScheduled = posts.filter((post) => post.source === 'scheduled' && post.image);
  if (!publishedScheduled.length) return;
  await fs.mkdir(publicScheduledAssetsDir, { recursive: true });
  for (const post of publishedScheduled) {
    const source = path.join(publishedAssetsDir, post.image);
    if (await exists(source)) {
      await fs.copyFile(source, path.join(publicScheduledAssetsDir, post.image));
    }
  }
}

async function writeRoute(route, html) {
  const targetDir = path.join(projectDir, route.replace(/^\/+|\/+$/g, ''));
  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(path.join(targetDir, 'index.html'), html, 'utf8');
}

async function removeFutureScheduledRoutes(now) {
  const scheduled = await readJson(scheduledPath, []);
  for (const post of scheduled.filter((item) => item.status !== 'published' || new Date(item.publishAt) > now)) {
    const routeDir = path.join(projectDir, 'conteudo', post.slug);
    await fs.rm(routeDir, { recursive: true, force: true });
  }
}

function renderSitemap(posts, operators) {
  const siteLastmod = process.env.BUILD_DATE || [baseSiteLastmod, ...posts.map((post) => post.publishedAt || post.publishAt || baseSiteLastmod)]
    .map((value) => String(value).slice(0, 10))
    .sort()
    .at(-1);
  const routes = [
    { loc: siteUrl, lastmod: siteLastmod, changefreq: 'weekly', priority: '1.0' },
    { loc: `${siteUrl}/conteudo`, lastmod: siteLastmod, changefreq: 'weekly', priority: '0.8' },
    ...['/contato/', '/ja-tenho-cartao/', '/quiz-rede-aberta-ou-fechada/', '/politica-de-privacidade/'].map(route => ({ loc: `${siteUrl}${route}`, lastmod: '2026-10-06', changefreq: 'monthly', priority: '0.7' })),
    ...operators.map((operator) => ({
      loc: `${siteUrl}${operatorRoute(operator)}`,
      lastmod: [operator.checkedAt, '2026-10-06'].sort().at(-1),
      changefreq: 'monthly',
      priority: '0.8'
    })),
    ...posts.map((post) => ({
      loc: `${siteUrl}${routeFor(post)}`,
      lastmod: (post.publishedAt || post.publishAt || siteLastmod).slice(0, 10),
      changefreq: 'monthly',
      priority: '0.75'
    }))
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((item) => `  <url>
    <loc>${escapeHtml(item.loc)}</loc>
    <lastmod>${escapeHtml(item.lastmod)}</lastmod>
    <changefreq>${escapeHtml(item.changefreq)}</changefreq>
    <priority>${escapeHtml(item.priority)}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

function normalizeScheduled(post) {
  return {
    ...post,
    source: 'scheduled',
    readTime: post.readTime || 6
  };
}

export async function buildSite() {
  const now = new Date(process.env.BUILD_NOW || Date.now());
  const publishedScheduled = (await readJson(publishedPath, []))
    .filter((post) => new Date(post.publishAt) <= now)
    .map(normalizeScheduled);
  const operators = await readJson(operatorsPath, []);
  const guides = await readJson(path.join(contentDir, 'operator-guides.json'), {});
  const posts = [...publishedScheduled, ...basePosts]
    .sort((a, b) => new Date(b.publishAt) - new Date(a.publishAt));

  await copyPublishedAssets(posts);
  await removeFutureScheduledRoutes(now);
  const homeTemplate = await fs.readFile(path.join(projectDir, 'tools', 'home.html'), 'utf8');
  await fs.writeFile(path.join(projectDir, 'index.html'), homeTemplate.replace('{{CONTACT_FORM}}', contactForm('diagnostic-form')).replace('{{ADVISOR_SECTION}}', advisorSection()).replace('{{SITE_FOOTER}}', siteFooter), 'utf8');
  const leadPages = renderLeadPages({ head, nav: editorialNav, bodyTag: googleTagManagerBody, siteUrl });
  for (const [route, html] of Object.entries(leadPages)) await writeRoute(route, html);
  await fs.writeFile(path.join(projectDir, 'conteudo', 'index.html'), renderBlogIndex(posts), 'utf8');
  for (const post of posts) {
    await writeRoute(routeFor(post), renderArticle(post, posts));
  }
  for (const operator of operators) {
    await writeRoute(operatorRoute(operator), renderOperatorPage(operator, operators, guides));
  }
  await fs.writeFile(path.join(projectDir, 'sitemap.xml'), renderSitemap(posts, operators), 'utf8');
  console.log(`Build completed with ${posts.length} visible posts (${publishedScheduled.length} scheduled published) and ${operators.length} operator pages.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await buildSite();
}
