/**
 * Gera supabase/seeds/011 e 013 a partir de scripts/data/beneficios-articles.mjs
 * Uso: node scripts/sync-articles-sql.mjs
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { beneficioArticles } from "./data/beneficios-articles.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const seeds = join(root, "supabase", "seeds");

function escSql(s) {
  return String(s).replace(/'/g, "''");
}

function dollarTag(slug) {
  const safe = slug.replace(/[^a-z0-9]/gi, "_");
  return `body_${safe}`.slice(0, 60);
}

const header011 = `-- 3 artigos — consultoria em benefícios corporativos
-- GERADO: npm run sync:articles-sql (fonte: scripts/data/beneficios-articles.mjs)
-- Instalação via SQL Editor após migrations. Ou: npm run seed:articles
-- Atualizar linhas existentes: npm run update:articles

INSERT INTO articles (
  site_id,
  title,
  description,
  content,
  slug,
  seo_title,
  seo_description,
  seo_keywords,
  og_image_url,
  type,
  category,
  read_time,
  image_url,
  tags,
  published,
  featured,
  order_index
) VALUES
`;

function rowSql(a, isLast) {
  const tag = dollarTag(a.slug);
  const tagsSql = `ARRAY[${a.tags.map((t) => `'${escSql(t)}'`).join(", ")}]`;
  return `(
  'default',
  '${escSql(a.title)}',
  '${escSql(a.description)}',
  $${tag}$${a.content}$${tag}$,
  '${escSql(a.slug)}',
  '${escSql(a.seo_title)}',
  '${escSql(a.seo_description)}',
  '${escSql(a.seo_keywords)}',
  NULL,
  '${escSql(a.type)}',
  '${escSql(a.category)}',
  '${escSql(a.read_time)}',
  NULL,
  ${tagsSql},
  true,
  true,
  ${a.order_index}
)${isLast ? ";" : ","}`;
}

const body011 =
  header011 +
  beneficioArticles.map((a, i) => rowSql(a, i === beneficioArticles.length - 1)).join("\n") +
  "\n";

const header013 = `-- Atualiza os 3 artigos de benefícios (mesmo conteúdo do seed JS)
-- GERADO: npm run sync:articles-sql
-- Rode no SQL Editor OU: npm run update:articles

`;

const body013 =
  header013 +
  beneficioArticles
    .map((a) => {
      const tag = dollarTag(a.slug);
      const tagsSql = `ARRAY[${a.tags.map((t) => `'${escSql(t)}'`).join(", ")}]`;
      return `UPDATE articles
SET
  title = '${escSql(a.title)}',
  description = '${escSql(a.description)}',
  read_time = '${escSql(a.read_time)}',
  seo_title = '${escSql(a.seo_title)}',
  seo_description = '${escSql(a.seo_description)}',
  seo_keywords = '${escSql(a.seo_keywords)}',
  category = '${escSql(a.category)}',
  tags = ${tagsSql},
  content = $${tag}$${a.content}$${tag}$
WHERE slug = '${escSql(a.slug)}';
`;
    })
    .join("\n");

writeFileSync(join(seeds, "011_seed_artigos_consultoria_beneficios.sql"), body011, "utf8");
writeFileSync(join(seeds, "013_update_artigos_markdown_editorial.sql"), body013, "utf8");

console.log("OK: supabase/seeds/011_seed_artigos_consultoria_beneficios.sql");
console.log("OK: supabase/seeds/013_update_artigos_markdown_editorial.sql");
