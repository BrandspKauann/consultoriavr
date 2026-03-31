const trim = (s: string | undefined) => (s ?? "").trim();

/**
 * Identificador do site neste deploy (blog público filtra por ele).
 * Ex.: vr-consultoria, site-b, coface-parceiro
 */
export const SITE_ID = trim(import.meta.env.VITE_SITE_ID) || "default";

/**
 * Quando `false`, o blog não filtra por `site_id` (use se a migration 010 ainda não foi aplicada no Supabase).
 * Depois de criar a coluna `site_id`, remova do .env ou defina `true`.
 */
export const ARTICLES_FILTER_BY_SITE_ID =
  import.meta.env.VITE_ARTICLES_USE_SITE_ID !== "false";
