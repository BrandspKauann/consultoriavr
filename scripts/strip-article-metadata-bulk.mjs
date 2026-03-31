/**
 * Limpa o campo content: emojis + trechos finais (Conclusão, Categoria, Slug, Palavras-chave).
 * Alinhado a src/utils/stripArticleContentMetadata.ts (sanitizeArticleBody).
 *
 * Uso: node scripts/strip-article-metadata-bulk.mjs
 * npm run articles:strip-metadata
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

const TRAILING_META_LINE =
  /^(?:#{1,6}\s*)?(?:[*_]{1,2})?(Categoria|Slug|Palavras-chave|Palavras chave|Keywords?|Tags?|Meta\s*description)\s*:\s*.+$/i;

const BMP_EMOTICON_SUPPLEMENT =
  /[\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9-\u21AA\u231A-\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA-\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u26FF\u2700-\u27BF]/g;

const CONCLUSAO = "(?:Conclusão|Conclusao|CONCLUSÃO|CONCLUSAO)";

function stripEmojisFromArticleContent(content) {
  if (!content || typeof content !== "string") return content;
  try {
    return content
      .replace(/\p{Extended_Pictographic}/gu, "")
      .replace(/\uFE0F/g, "")
      .replace(/\u200D/g, "")
      .replace(BMP_EMOTICON_SUPPLEMENT, "");
  } catch {
    return content.replace(BMP_EMOTICON_SUPPLEMENT, "");
  }
}

function stripTrailingArticleMetadata(content) {
  if (!content || typeof content !== "string") return content;

  let s = content.replace(/\r\n/g, "\n");

  s = s.replace(
    new RegExp(`\\n(?:\\s*)?#{1,6}\\s+${CONCLUSAO}\\s*#?[\\s\\S]*$`, "i"),
    ""
  );
  s = s.replace(
    new RegExp(
      `\\n(?:\\s*)?(?:#{1,6}\\s+)?(?:[*_]{1,2}\\s*)?${CONCLUSAO}(?:\\s*[*_]{1,2})?\\s*:[\\s\\S]*$`,
      "i"
    ),
    ""
  );
  s = s.replace(
    new RegExp(
      `^(?:\\s*)?(?:#{1,6}\\s+)?(?:[*_]{1,2}\\s*)?${CONCLUSAO}(?:\\s*[*_]{1,2})?\\s*:[\\s\\S]*$`,
      "i"
    ),
    ""
  );

  const lines = s.split("\n");
  let end = lines.length;
  while (end > 0) {
    const line = lines[end - 1].trim();
    if (line === "") {
      end--;
      continue;
    }
    if (TRAILING_META_LINE.test(line)) {
      end--;
      continue;
    }
    break;
  }
  s = lines.slice(0, end).join("\n");

  return s.replace(/\n{3,}/g, "\n\n").trimEnd();
}

function sanitizeArticleBody(content) {
  return stripTrailingArticleMetadata(stripEmojisFromArticleContent(content));
}

const env = loadEnv();
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) {
  console.error("Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env");
  process.exit(1);
}

const supabase = createClient(url, key);

const { data: rows, error: fetchErr } = await supabase
  .from("articles")
  .select("id,slug,content")
  .not("content", "is", null);

if (fetchErr) {
  console.error("Erro ao listar artigos:", fetchErr.message);
  process.exit(1);
}

let updated = 0;
let skipped = 0;

for (const row of rows || []) {
  const next = sanitizeArticleBody(row.content);
  if (next === row.content) {
    skipped++;
    continue;
  }
  const { error } = await supabase.from("articles").update({ content: next }).eq("id", row.id);
  if (error) {
    console.error("Falha", row.slug || row.id, error.message);
    process.exit(1);
  }
  console.log("Limpo:", row.slug || row.id);
  updated++;
}

console.log("Concluído. Atualizados: %d, sem alteração: %d", updated, skipped);
