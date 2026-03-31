import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SITE_ID, ARTICLES_FILTER_BY_SITE_ID } from "@/config/sites";
import type { Article } from "@/types/article";

// Buscar artigos destacados e publicados (para a home - máximo 6)
export const useArticles = () => {
  return useQuery({
    queryKey: ["articles", "published", "featured", SITE_ID],
    queryFn: async () => {
      let q = supabase.from("articles").select("*");
      if (ARTICLES_FILTER_BY_SITE_ID) {
        q = q.eq("site_id", SITE_ID);
      }
      const { data, error } = await q
        .eq("published", true)
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      return data as Article[];
    },
    staleTime: 5 * 60 * 1000, // Cache por 5 minutos
  });
};

export const useAllPublishedArticles = () => {
  return useQuery({
    queryKey: ["articles", "published", "all", SITE_ID],
    queryFn: async () => {
      let q = supabase.from("articles").select("*");
      if (ARTICLES_FILTER_BY_SITE_ID) {
        q = q.eq("site_id", SITE_ID);
      }
      const { data, error } = await q.eq("published", true).order("created_at", { ascending: false });

      if (error) throw error;
      return data as Article[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useArticleBySlug = (rawSlug?: string) => {
  const normalized = rawSlug?.trim();
  const looksLikeUuid = normalized ? /^[0-9a-fA-F-]{36}$/.test(normalized) : false;

  return useQuery({
    queryKey: ["articles", "detail", normalized, SITE_ID],
    enabled: Boolean(normalized),
    queryFn: async () => {
      if (!normalized) return null;

      let query = supabase.from("articles").select("*");
      if (ARTICLES_FILTER_BY_SITE_ID) {
        query = query.eq("site_id", SITE_ID);
      }
      query = query.eq("published", true).limit(1);

      query = looksLikeUuid ? query.eq("id", normalized) : query.eq("slug", normalized);

      const { data, error } = await query.maybeSingle();

      if (error) throw error;
      return (data as Article) ?? null;
    },
  });
};
