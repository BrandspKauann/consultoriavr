import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = 'https://www.consultoriavr.com.br';
const contentDir = path.join(projectDir, 'content');
const scheduledPath = path.join(contentDir, 'scheduled-posts.json');
const publishedPath = path.join(contentDir, 'published-scheduled-posts.json');
const publishedAssetsDir = path.join(contentDir, 'published-assets', 'blog');
const publicScheduledAssetsDir = path.join(projectDir, 'assets', 'blog', 'scheduled');
const baseSiteLastmod = '2026-08-13';

const basePosts = [
  {
    source: 'base',
    slug: 'como-escolher-cartao-beneficios-corporativos',
    title: 'Como escolher um cartão de benefícios corporativos sem gerar retrabalho no RH',
    shortTitle: 'Como escolher um cartão',
    category: 'Escolha de fornecedor',
    description: 'Um guia para comparar operadoras com base em implantação, rede, governança e aderência ao perfil da empresa.',
    image: '/hero-reuniao-empresarial.jpg',
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
    image: '/hero-reuniao-empresarial.jpg',
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
    image: '/hero-reuniao-empresarial.jpg',
    imageAlt: 'Comparativo entre cartões de benefícios corporativos',
    readTime: 7,
    publishAt: '2026-08-03T12:00:00.000Z',
    keywords: ['comparativo VR Flash Caju Pluxee', 'benefícios corporativos', 'cartão alimentação', 'cartão refeição', 'consultoria RH']
  }
];

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

function googleTag() {
  return `    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-FM1ZJGL2RN"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-FM1ZJGL2RN');
    </script>`;
}

function head({ title, description, keywords = [], canonical, type = 'website', image = '/hero-reuniao-empresarial.jpg', structuredData = [] }) {
  const imageUrl = absoluteUrl(image);
  return `<head>
${googleTag()}
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" type="image/svg+xml" href="/favicon.svg" />
    <title>${escapeHtml(title)}</title>
    <meta name="title" content="${escapeHtml(title)}" />
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
    <div id="root">
      <main class="seo-fallback" aria-label="Conteúdo da Consultoria VR">
        <header class="seo-fallback__hero">
          <div class="seo-fallback__wrap">
            <div class="seo-fallback__brand"><span class="seo-fallback__brand-mark"></span>Ecossistema Hirayama</div>
            <p class="seo-fallback__eyebrow">Conteúdo sobre benefícios corporativos</p>
            <h1>Consultoria em <span>Cartões</span></h1>
            <p class="seo-fallback__lead">Artigos e materiais para empresas que querem comparar VR, Flash, Caju, iFood, ValeCard, Pluxee e outras soluções de benefícios corporativos com mais clareza.</p>
            <a class="seo-fallback__cta" href="https://wa.link/3gwhbl" rel="noopener">Falar com um consultor</a>
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

        <footer class="seo-fallback__footer">
          <strong>Consultoria VR by Hirayama</strong>
          <span>Conteúdo institucional sobre cartões e benefícios corporativos.</span>
        </footer>
      </main>
    </div>
  </body>
</html>
`;
}

function renderSection(section) {
  const paragraphs = (section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n            ');
  const bullets = section.bullets?.length
    ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>`
    : '';
  return `<section class="seo-fallback__article-block">
            <h2>${escapeHtml(section.heading)}</h2>
            ${paragraphs}
            ${bullets}
          </section>`;
}

function renderArticle(post, posts) {
  const route = routeFor(post);
  const image = imageFor(post);
  const canonical = `${siteUrl}${route}`;
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
  if (post.faq?.length) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((item) => ({
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
    <main class="seo-fallback" id="topo" aria-label="Artigo da Consultoria VR">
      <section class="seo-fallback__hero seo-fallback__article">
        <div class="seo-fallback__article-shell">
          <div class="seo-fallback__brand"><span class="seo-fallback__brand-mark"></span>Ecossistema Hirayama</div>
          <div class="seo-fallback__breadcrumb">
            <a href="/">Início</a>
            <span>→</span>
            <a href="/conteudo/">Conteúdo</a>
            <span>→</span>
            <span>${escapeHtml(post.shortTitle || post.title)}</span>
          </div>
          <p class="seo-fallback__eyebrow">${escapeHtml(post.category)}</p>
          <h1>${escapeHtml(post.title)}</h1>
          <div class="seo-fallback__article-meta-row">
            <span class="seo-fallback__article-pill">Artigo</span>
            <span class="seo-fallback__article-pill">${escapeHtml(formatDate(post.publishAt))}</span>
            <span class="seo-fallback__article-pill">Leitura de ${escapeHtml(post.readTime || 6)} min</span>
          </div>
          <p class="seo-fallback__lead">${escapeHtml(post.description)}</p>
        </div>
      </section>

      <section class="seo-fallback__article-shell">
        <article class="seo-fallback__article-body">
          <img class="seo-fallback__article-cover" src="${escapeHtml(image)}" alt="${escapeHtml(post.imageAlt || post.title)}" />
          ${(post.intro || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n          ')}
          ${(post.sections || []).map(renderSection).join('\n          ')}
          ${post.faq?.length ? `<section class="seo-fallback__article-block" id="faq">
            <h2>Perguntas frequentes</h2>
            ${post.faq.map((item) => `<p><strong>${escapeHtml(item.question)}</strong><br>${escapeHtml(item.answer)}</p>`).join('\n            ')}
          </section>` : ''}
          <div class="seo-fallback__brand-panel">
            <h3>Como a Consultoria VR by Hirayama entra nessa decisão</h3>
            <p>O trabalho consultivo organiza critérios de rede, operação, governança, custo total e experiência dos colaboradores para que a empresa escolha benefícios com menos ruído comercial e mais aderência à rotina do RH.</p>
          </div>
          ${post.hashtags?.length ? `<section class="seo-fallback__article-tags" aria-label="Hashtags">${post.hashtags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</section>` : ''}
          <section class="seo-fallback__related" aria-label="Continue lendo">
            <h2>Continue entendendo</h2>
            <div class="seo-fallback__related-list">
              ${related.map((item, index) => `<a href="${escapeHtml(routeFor(item))}"><span class="seo-fallback__related-number">${String(index + 1).padStart(2, '0')}</span><span><em>${escapeHtml(item.category)}</em><strong>${escapeHtml(item.title)}</strong></span></a>`).join('\n              ')}
            </div>
          </section>
          <div class="seo-fallback__article-cta">
            <a class="seo-fallback__article-button" href="https://wa.link/3gwhbl" rel="noopener">Falar com um consultor</a>
            <a class="seo-fallback__article-button seo-fallback__article-button--ghost" href="/conteudo/">Voltar para a biblioteca</a>
          </div>
        </article>
      </section>

      <footer class="seo-fallback__footer">
        <strong>Consultoria VR by Hirayama</strong>
        <span>Conteúdo institucional sobre cartões e benefícios corporativos.</span>
      </footer>
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

async function removeFutureScheduledRoutes() {
  const scheduled = await readJson(scheduledPath, []);
  for (const post of scheduled.filter((item) => item.status !== 'published')) {
    const routeDir = path.join(projectDir, 'conteudo', post.slug);
    await fs.rm(routeDir, { recursive: true, force: true });
  }
}

function renderSitemap(posts) {
  const siteLastmod = process.env.BUILD_DATE || [baseSiteLastmod, ...posts.map((post) => post.publishedAt || post.publishAt || baseSiteLastmod)]
    .map((value) => String(value).slice(0, 10))
    .sort()
    .at(-1);
  const routes = [
    { loc: siteUrl, lastmod: siteLastmod, changefreq: 'weekly', priority: '1.0' },
    { loc: `${siteUrl}/conteudo`, lastmod: siteLastmod, changefreq: 'weekly', priority: '0.8' },
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
  const publishedScheduled = (await readJson(publishedPath, [])).map(normalizeScheduled);
  const posts = [...publishedScheduled, ...basePosts]
    .sort((a, b) => new Date(b.publishAt) - new Date(a.publishAt));

  await copyPublishedAssets(posts);
  await removeFutureScheduledRoutes();
  await fs.writeFile(path.join(projectDir, 'conteudo', 'index.html'), renderBlogIndex(posts), 'utf8');
  for (const post of publishedScheduled) {
    await writeRoute(routeFor(post), renderArticle(post, posts));
  }
  await fs.writeFile(path.join(projectDir, 'sitemap.xml'), renderSitemap(posts), 'utf8');
  console.log(`Build completed with ${posts.length} visible posts (${publishedScheduled.length} scheduled published).`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await buildSite();
}
