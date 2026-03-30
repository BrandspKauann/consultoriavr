import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SITE_ID, ARTICLES_FILTER_BY_SITE_ID } from "@/config/sites";
import type { Article, ArticleInsert, ArticleUpdate } from "@/types/article";

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

// Buscar todos os artigos do site selecionado (admin)
export const useAllArticles = (adminSiteId: string) => {
  return useQuery({
    queryKey: ["articles", "all", adminSiteId],
    queryFn: async () => {
      let q = supabase.from("articles").select("*");
      if (ARTICLES_FILTER_BY_SITE_ID) {
        q = q.eq("site_id", adminSiteId);
      }
      const { data, error } = await q.order("created_at", { ascending: false });

      if (error) throw error;
      return data as Article[];
    },
    enabled: Boolean(adminSiteId),
  });
};

// Criar novo artigo
export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (article: ArticleInsert) => {
      const payload: Record<string, unknown> = {
        ...article,
        read_time: article.read_time ?? "5 min",
        order_index: article.order_index ?? 0,
      };
      if (!ARTICLES_FILTER_BY_SITE_ID) {
        delete payload.site_id;
      }
      const { data, error } = await supabase
        .from("articles")
        .insert([payload as ArticleInsert])
        .select()
        .single();

      if (error) throw error;
      return data as Article;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["articles", "all"] });
      queryClient.invalidateQueries({ queryKey: ["articles", "published"] });
      if (variables.site_id) {
        queryClient.invalidateQueries({ queryKey: ["articles", "all", variables.site_id] });
      }
    },
  });
};

// Atualizar artigo
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
      siteId,
    }: {
      id: string;
      updates: ArticleUpdate;
      siteId?: string;
    }) => {
      const { data, error } = await supabase
        .from("articles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Article;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["articles", "all"] });
      queryClient.invalidateQueries({ queryKey: ["articles", "published"] });
      if (variables.siteId) {
        queryClient.invalidateQueries({ queryKey: ["articles", "all", variables.siteId] });
      }
    },
  });
};

// Deletar artigo
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, siteId }: { id: string; siteId: string }) => {
      const { error } = await supabase.from("articles").delete().eq("id", id);

      if (error) throw error;
      return siteId;
    },
    onSuccess: (siteId) => {
      queryClient.invalidateQueries({ queryKey: ["articles", "all"] });
      queryClient.invalidateQueries({ queryKey: ["articles", "published"] });
      queryClient.invalidateQueries({ queryKey: ["articles", "all", siteId] });
    },
  });
};

// Contar artigos destacados e publicados (excluindo um artigo específico se fornecido)
export const useFeaturedCount = (excludeArticleId?: string, siteId: string = SITE_ID) => {
  return useQuery({
    queryKey: ["articles", "featured", "count", excludeArticleId, siteId],
    queryFn: async () => {
      let query = supabase.from("articles").select("*", { count: "exact", head: true });
      if (ARTICLES_FILTER_BY_SITE_ID) {
        query = query.eq("site_id", siteId);
      }
      query = query.eq("featured", true).eq("published", true);

      if (excludeArticleId) {
        query = query.neq("id", excludeArticleId);
      }

      const { count, error } = await query;

      if (error) throw error;
      return count || 0;
    },
    staleTime: 1 * 60 * 1000, // Cache por 1 minuto
  });
};
