import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const root = new URL('../', import.meta.url);
const posts = JSON.parse(await fs.readFile(new URL('content/editorial-posts.json', root), 'utf8'));
const slug = 'vale-alimentacao-recusado-credito-ou-voucher-guia-rh';

test('editorial article has complete, distinct content and verified primary sources', async () => {
  const scheduled = JSON.parse(await fs.readFile(new URL('content/scheduled-posts.json', root), 'utf8'));
  assert.equal(new Set([...posts, ...scheduled].map(post => post.slug)).size, posts.length + scheduled.length);
  for (const post of posts) {
    assert.match(post.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(post.title && post.category && post.openingTitle);
    assert.ok(post.description.length >= 80 && post.description.length <= 180);
    assert.ok(post.keywords.length >= 5 && post.hashtags.length >= 3);
    assert.ok(post.intro.length >= 2 && post.sections.length >= 6 && post.faq.length >= 4);
    const text = [...post.intro, ...post.sections.flatMap(section => [...section.paragraphs || [], ...section.bullets || []])].join(' ');
    assert.ok(text.split(/\s+/).length >= 1100, 'The article must contain substantial original guidance.');
    assert.ok(post.sources.every(source => new URL(source.url).protocol === 'https:'));
    assert.ok(post.sources.some(source => new URL(source.url).hostname === 'www.gov.br'));
    assert.ok(post.sources.some(source => new URL(source.url).hostname === 'www.pluxee.com.br'));
    const image = new URL(post.image.replace(/^\//, ''), root);
    assert.ok((await fs.stat(image)).size > 20000);
    for (const link of post.sections.flatMap(section => section.links || []).filter(link => link.url.startsWith('/'))) {
      await fs.access(new URL(`${link.url.replace(/^\//, '')}index.html`, root));
    }
  }
});

test('new article uses the existing landing layout, crawlable text, links and SEO', async () => {
  const post = posts.find(post => post.slug === slug);
  const html = await fs.readFile(new URL(`conteudo/${slug}/index.html`, root), 'utf8');
  const library = await fs.readFile(new URL('conteudo/index.html', root), 'utf8');
  const sitemap = await fs.readFile(new URL('sitemap.xml', root), 'utf8');
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.ok(html.includes(post.title));
  assert.match(html, /article-landing__hero|article-landing__chapter|article-landing__index/);
  assert.ok(html.includes(post.openingTitle));
  for (const section of post.sections) assert.ok(html.includes(section.heading));
  for (const source of post.sources) assert.ok(html.includes(`href="${source.url}"`));
  const schema = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  const article = schema.find(item => item['@type'] === 'BlogPosting');
  assert.equal(article.datePublished, post.publishAt);
  assert.deepEqual(article.citation, post.sources.map(source => source.url));
  assert.equal(schema.find(item => item['@type'] === 'FAQPage').mainEntity.length, post.faq.length);
  assert.ok(schema.some(item => item['@type'] === 'BreadcrumbList'));
  assert.ok(html.includes(`rel="canonical" href="https://www.consultoriavr.com.br/conteudo/${slug}/"`));
  assert.match(html, /property="og:type" content="article"/);
  assert.ok(library.includes(`/conteudo/${slug}/`) && sitemap.includes(`/conteudo/${slug}/`));
  assert.equal((html.match(/gtag\/js\?id=G-FM1ZJGL2RN/g) || []).length, 1);
});

test('isolated build keeps future editorial and scheduled posts out of routes and sitemap', async () => {
  const workspace = await fs.mkdtemp(path.join(os.tmpdir(), 'consultoriavr-editorial-'));
  try {
    await fs.mkdir(path.join(workspace, 'tools'));
    await fs.mkdir(path.join(workspace, 'content'));
    for (const file of ['build.mjs', 'article-depth.mjs', 'lead-pages.mjs', 'home.html']) {
      await fs.copyFile(new URL(`tools/${file}`, root), path.join(workspace, 'tools', file));
    }
    await fs.copyFile(new URL('lead-core.mjs', root), path.join(workspace, 'lead-core.mjs'));
    for (const file of ['scheduled-posts.json', 'published-scheduled-posts.json', 'operators.json', 'operator-support.json', 'operator-guides.json']) {
      await fs.copyFile(new URL(`content/${file}`, root), path.join(workspace, 'content', file));
    }
    const future = { ...posts[0], slug: 'editorial-futuro-teste', publishAt: '2030-01-01T15:00:00.000Z' };
    await fs.writeFile(path.join(workspace, 'content', 'editorial-posts.json'), JSON.stringify([...posts, future]));
    const staleRoute = path.join(workspace, 'conteudo', future.slug);
    await fs.mkdir(staleRoute, { recursive: true });
    await fs.writeFile(path.join(staleRoute, 'index.html'), 'This future route must be removed.');
    await promisify(execFile)(process.execPath, ['tools/build.mjs'], {
      cwd: workspace,
      env: { ...process.env, BUILD_NOW: '2026-10-15T14:00:00.000Z' }
    });
    const sitemap = await fs.readFile(path.join(workspace, 'sitemap.xml'), 'utf8');
    const library = await fs.readFile(path.join(workspace, 'conteudo', 'index.html'), 'utf8');
    for (const html of [sitemap, library]) {
      assert.ok(html.includes(`/conteudo/${slug}/`));
      assert.ok(!html.includes(future.slug));
      assert.ok(!html.includes('migracao-operadora-beneficios-como-comunicar-sem-ruido'));
    }
    await assert.rejects(fs.access(path.join(workspace, 'conteudo', future.slug)), { code: 'ENOENT' });
    await fs.access(path.join(workspace, 'conteudo', slug, 'index.html'));
  } finally {
    assert.equal(path.dirname(workspace), path.resolve(os.tmpdir()));
    assert.ok(path.basename(workspace).startsWith('consultoriavr-editorial-'));
    await fs.rm(workspace, { recursive: true, force: true });
  }
});
