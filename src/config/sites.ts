const trim = (s: string | undefined) => (s ?? "").trim();

/**
 * Identificador do site neste deploy (blog público filtra por ele).
 * Ex.: vr-consultoria, site-b, coface-parceiro
 */
export const SITE_ID = trim(import.meta.env.VITE_SITE_ID) || "default";

const ADMIN_SITES_RAW = trim(import.meta.env.VITE_ADMIN_SITES);

export type AdminSiteOption = { id: string; label: string };

/**
 * Lista de sites no admin. Formato: id1:Nome 1,id2:Nome 2
 * Se vazio, usa só SITE_ID (um site).
 */
export function getAdminSiteOptions(): AdminSiteOption[] {
  if (!ADMIN_SITES_RAW) {
    return [{ id: SITE_ID, label: "Site atual" }];
  }
  return ADMIN_SITES_RAW.split(",").map((part) => {
    const [idPart, ...labelParts] = part.split(":");
    const id = trim(idPart) || "default";
    const label = trim(labelParts.join(":")) || id;
    return { id, label };
  });
}

export const ADMIN_SITE_STORAGE_KEY = "vr-blog-admin-site-id";

/**
 * Quando `false`, o blog não filtra por `site_id` (use se a migration 010 ainda não foi aplicada no Supabase).
 * Depois de criar a coluna `site_id`, remova do .env ou defina `true`.
 */
export const ARTICLES_FILTER_BY_SITE_ID =
  import.meta.env.VITE_ARTICLES_USE_SITE_ID !== "false";
