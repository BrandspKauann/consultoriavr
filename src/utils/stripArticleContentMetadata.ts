/**
 * Sanitização do corpo dos artigos:
 * - Remove emojis / pictogramas Unicode comuns em textos colados de IA ou redes sociais.
 * - Remove trechos finais do tipo "Conclusão:", "## Conclusão", Categoria/Slug/Palavras-chave no markdown.
 * Categoria, slug e keywords devem ficar nos campos do banco / SEO, não no texto.
 */

/** BMP frequentemente usado como emoticon decorativo (carinhas, símbolos, relógios, etc.) */
const BMP_EMOTICON_SUPPLEMENT =
  /[\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9-\u21AA\u231A-\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA-\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u26FF\u2700-\u27BF]/g;

export function stripEmojisFromArticleContent(content: string): string {
  if (!content || typeof content !== "string") return content;
  try {
    return content
      .replace(/\p{Extended_Pictographic}/gu, "")
      .replace(/\uFE0F/g, "")
      .replace(/\u200D/g, "")
      .replace(BMP_EMOTICON_SUPPLEMENT, "");
  } catch {
    // Ambiente sem suporte a \\p{} (muito raro com alvo atual do Vite)
    return content.replace(BMP_EMOTICON_SUPPLEMENT, "");
  }
}

const TRAILING_META_LINE =
  /^(?:#{1,6}\s*)?(?:[*_]{1,2})?(Categoria|Slug|Palavras-chave|Palavras chave|Keywords?|Tags?|Meta\s*description)\s*:\s*.+$/i;

const CONCLUSAO = "(?:Conclusão|Conclusao|CONCLUSÃO|CONCLUSAO)";

/** Remove seção "## Conclusão" ou "### Conclusão" até o fim do texto */
function stripConclusaoHeadingBlock(s: string): string {
  return s.replace(
    new RegExp(`\\n(?:\\s*)?#{1,6}\\s+${CONCLUSAO}\\s*#?[\\s\\S]*$`, "i"),
    ""
  );
}

/** Remove parágrafo iniciando em "Conclusão:" (com ou sem markdown) até o fim */
function stripConclusaoLabeledBlock(s: string): string {
  const labeled = new RegExp(
    `\\n(?:\\s*)?(?:#{1,6}\\s+)?(?:[*_]{1,2}\\s*)?${CONCLUSAO}(?:\\s*[*_]{1,2})?\\s*:[\\s\\S]*$`,
    "i"
  );
  const labeledStart = new RegExp(
    `^(?:\\s*)?(?:#{1,6}\\s+)?(?:[*_]{1,2}\\s*)?${CONCLUSAO}(?:\\s*[*_]{1,2})?\\s*:[\\s\\S]*$`,
    "i"
  );
  let out = s.replace(labeled, "");
  out = out.replace(labeledStart, "");
  return out;
}

function stripTrailingLabeledLines(s: string): string {
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
  return lines.slice(0, end).join("\n");
}

export function stripTrailingArticleMetadata(content: string): string {
  if (!content || typeof content !== "string") return content;

  let s = content.replace(/\r\n/g, "\n");

  s = stripConclusaoHeadingBlock(s);
  s = stripConclusaoLabeledBlock(s);
  s = stripTrailingLabeledLines(s);

  return s.replace(/\n{3,}/g, "\n\n").trimEnd();
}

/** Exibição e gravação: sem emojis + sem metadados colados no final do markdown. */
export function sanitizeArticleBody(content: string): string {
  return stripTrailingArticleMetadata(stripEmojisFromArticleContent(content));
}
