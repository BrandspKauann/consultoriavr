import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(projectDir, 'content');

async function readJson(name) {
  return JSON.parse(await fs.readFile(path.join(contentDir, name), 'utf8'));
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function text(post) {
  return JSON.stringify(post).toLowerCase();
}

const scheduled = await readJson('scheduled-posts.json');
const published = await readJson('published-scheduled-posts.json');
const operators = await readJson('operators.json');
const allSlugs = scheduled.map((post) => post.slug);

assert(new Set(allSlugs).size === allSlugs.length, 'Há slugs duplicados na fila editorial.');
assert(operators.length === 6, 'O catálogo deve conter as seis operadoras apresentadas na home.');
assert(new Set(operators.map((operator) => operator.slug)).size === operators.length, 'Há slugs duplicados nas operadoras.');

for (const post of scheduled) {
  assert(post.title && post.slug && post.category && post.description && post.publishAt, `Metadados obrigatórios ausentes em ${post.slug || 'post sem slug'}.`);
  assert(Array.isArray(post.keywords) && post.keywords.length >= 5, `Poucas palavras-chave em ${post.slug}.`);
  assert(Array.isArray(post.hashtags) && post.hashtags.length >= 3, `Poucas hashtags em ${post.slug}.`);
  assert(Array.isArray(post.intro) && post.intro.length >= 2, `Introdução incompleta em ${post.slug}.`);
  assert(Array.isArray(post.sections) && post.sections.length >= 4, `Artigo curto ou incompleto em ${post.slug}.`);
  assert(Array.isArray(post.faq) && post.faq.length >= 2, `FAQ incompleto em ${post.slug}.`);
  assert(post.description.length >= 80 && post.description.length <= 180, `Meta description fora do intervalo recomendado em ${post.slug}.`);
  assert(!/economia garantida|é comprovadamente a melhor operadora/.test(text(post)), `Promessa comercial indevida em ${post.slug}.`);
  assert(await exists(path.join(contentDir, 'scheduled-assets', 'blog', post.image)), `Imagem programada não encontrada: ${post.image}.`);
}

for (const operator of operators) {
  assert(operator.name && operator.title && operator.description && operator.logo, `Metadados incompletos em ${operator.slug}.`);
  assert(operator.description.length >= 80 && operator.description.length <= 180, `Meta description da operadora fora do intervalo em ${operator.slug}.`);
  assert(operator.keywords.length >= 5, `Poucas palavras-chave em ${operator.slug}.`);
  assert(operator.overview.length >= 2 && operator.evaluate.length >= 5 && operator.faq.length >= 2, `Conteúdo insuficiente em ${operator.slug}.`);
  assert(await exists(path.join(projectDir, operator.logo.replace(/^\//, ''))), `Logo não encontrado para ${operator.slug}.`);
}

const now = new Date(process.env.BUILD_NOW || Date.now());
const future = scheduled.filter((post) => new Date(post.publishAt) > now);
assert(future.length >= 20, 'A fila deve manter pelo menos 20 artigos futuros.');

const sitemap = await fs.readFile(path.join(projectDir, 'sitemap.xml'), 'utf8');
for (const post of future) {
  assert(!sitemap.includes(`/conteudo/${post.slug}/`), `Artigo futuro exposto no sitemap: ${post.slug}.`);
  assert(!(await exists(path.join(projectDir, 'conteudo', post.slug))), `Artigo futuro exposto como rota: ${post.slug}.`);
}

for (const operator of operators) {
  assert(sitemap.includes(`/operadoras/${operator.slug}/`), `Operadora ausente do sitemap: ${operator.slug}.`);
  assert(await exists(path.join(projectDir, 'operadoras', operator.slug, 'index.html')), `Rota da operadora ausente: ${operator.slug}.`);
}

console.log(`Conteúdo validado: ${published.length} artigos publicados, ${future.length} programados e ${operators.length} páginas de operadoras.`);
