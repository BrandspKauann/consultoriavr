/**
 * Insere ou atualiza os 3 artigos de benefícios no Supabase.
 * Conteúdo canônico: scripts/data/beneficios-articles.mjs
 * SQL espelhado: npm run sync:articles-sql → supabase/seeds/011 e 013
 *
 *   npm run seed:articles    → INSERT só se slug não existir
 *   npm run update:articles  → UPDATE content + metadados nos 3 slugs
 *
 * Lê .env: VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY; opcional VITE_SITE_ID.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { beneficioArticles } from "./data/beneficios-articles.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  const path = join(root, ".env");
  if (!existsSync(path)) {
    console.error("Arquivo .env não encontrado na raiz do projeto.");
    process.exit(1);
  }
  const env = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    env[k] = v;
  }
  return env;
}

const env = loadEnv();
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
const siteId = (env.VITE_SITE_ID || "default").trim() || "default";

if (!url || !key) {
  console.error("Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env");
  process.exit(1);
}

const supabase = createClient(url, key);
const isUpdateMode = process.argv.includes("--update");

async function tableHasSiteId() {
  const { error } = await supabase.from("articles").select("site_id").limit(1);
  if (!error) return true;
  if (String(error.message || "").includes("site_id")) return false;
  console.error(error.message);
  process.exit(1);
}

const hasSiteId = await tableHasSiteId();
if (!hasSiteId) {
  console.warn(
    "Aviso: coluna site_id não existe. Inserindo/atualizando sem site_id. Rode a migration 010 no Supabase quando for usar multi-site."
  );
}

const articleRows = beneficioArticles.map((a) => ({
  ...(hasSiteId ? { site_id: siteId } : {}),
  title: a.title,
  description: a.description,
  content: a.content,
  slug: a.slug,
  seo_title: a.seo_title,
  seo_description: a.seo_description,
  seo_keywords: a.seo_keywords,
  type: a.type,
  category: a.category,
  read_time: a.read_time,
  tags: a.tags,
  published: true,
  featured: true,
  order_index: a.order_index,
}));

function rowToUpdatePayload(row) {
  const { slug: _s, site_id: _sid, ...rest } = row;
  return rest;
}

if (isUpdateMode) {
  let ok = 0;
  let fail = 0;
  for (const row of articleRows) {
    const payload = rowToUpdatePayload(row);
    let q = supabase.from("articles").update(payload).eq("slug", row.slug);
    if (hasSiteId) {
      q = q.eq("site_id", siteId);
    }
    const { data, error } = await q.select("id,slug");
    if (error) {
      console.error("Erro ao atualizar", row.slug, ":", error.message);
      fail++;
      continue;
    }
    const first = data?.[0];
    if (!first) {
      console.warn(
        "Nenhuma linha com slug=%s (site_id=%s). Insert primeiro: npm run seed:articles",
        row.slug,
        hasSiteId ? siteId : "(n/a)"
      );
      fail++;
      continue;
    }
    console.log("Atualizado:", row.slug, "→", first.id);
    ok++;
  }
  console.log("Concluído: %d ok, %d falha(s). Recarregue o artigo no site (Ctrl+F5).", ok, fail);
  process.exit(fail > 0 ? 1 : 0);
}

let existingQuery = supabase.from("articles").select("slug").in(
  "slug",
  articleRows.map((a) => a.slug)
);
if (hasSiteId) {
  existingQuery = existingQuery.eq("site_id", siteId);
}

const { data: existing, error: selErr } = await existingQuery;

if (selErr) {
  console.error("Erro ao verificar artigos existentes:", selErr.message);
  process.exit(1);
}

const existingSlugs = new Set((existing || []).map((r) => r.slug));
const toInsert = articleRows.filter((a) => !existingSlugs.has(a.slug));

if (toInsert.length === 0) {
  console.log(
    "Os 3 artigos já existem no Supabase (site_id=%s). Nada a inserir.\n" +
      "Para sobrescrever texto e metadados: npm run update:articles",
    siteId
  );
  process.exit(0);
}

const { data, error } = await supabase.from("articles").insert(toInsert).select("id,slug,title");

if (error) {
  console.error("Erro ao inserir:", error.message, error.details || "", error.hint || "");
  process.exit(1);
}

console.log("Inseridos com sucesso (%s), site_id=%s:", data.length, siteId);
for (const row of data) {
  console.log(" -", row.slug, "→", row.id);
}
