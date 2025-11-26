import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/types/article";

export const generateSitemap = async (): Promise<string> => {
  const baseUrl = "https://www.segurodecredito.com.br";
  const currentDate = new Date().toISOString().split("T")[0];

  // Páginas estáticas
  const staticPages = [
    { url: baseUrl, priority: "1.0", changefreq: "weekly" },
    { url: `${baseUrl}/conteudo`, priority: "0.8", changefreq: "weekly" },
  ];

  // Buscar todos os artigos publicados
  let articles: Article[] = [];
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("id, slug, updated_at")
      .eq("published", true)
      .order("updated_at", { ascending: false });

    if (!error && data) {
      articles = data as Article[];
    }
  } catch (error) {
    console.error("Erro ao buscar artigos para sitemap:", error);
  }

  // URLs dos artigos
  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/conteudo/${article.slug || article.id}`,
    priority: "0.7",
    changefreq: "monthly",
    lastmod: article.updated_at
      ? new Date(article.updated_at).toISOString().split("T")[0]
      : currentDate,
  }));

  // Gerar XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
${articleUrls
  .map(
    (article) => `  <url>
    <loc>${article.url}</loc>
    <lastmod>${article.lastmod}</lastmod>
    <changefreq>${article.changefreq}</changefreq>
    <priority>${article.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return sitemap;
};

