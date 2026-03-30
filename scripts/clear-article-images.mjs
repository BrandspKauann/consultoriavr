/**
 * Remove image_url e og_image_url de todos os artigos (site mais leve).
 * Uso: node scripts/clear-article-images.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  const path = join(root, ".env");
  if (!existsSync(path)) {
    console.error("Arquivo .env não encontrado.");
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
if (!url || !key) {
  console.error("Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env");
  process.exit(1);
}

const supabase = createClient(url, key);

const { data: rows, error: fetchErr } = await supabase.from("articles").select("id");

if (fetchErr) {
  console.error("Erro ao listar artigos:", fetchErr.message);
  process.exit(1);
}

if (!rows?.length) {
  console.log("Nenhum artigo encontrado.");
  process.exit(0);
}

const { error: updErr } = await supabase
  .from("articles")
  .update({ image_url: null, og_image_url: null })
  .not("id", "is", null);

if (updErr) {
  console.error("Erro ao atualizar:", updErr.message);
  process.exit(1);
}

console.log("OK: image_url e og_image_url limpos em", rows.length, "artigo(s).");
