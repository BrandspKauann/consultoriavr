import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const baseUrl = "https://www.segurosdecredito.com.br";
  const currentDate = new Date().toISOString().split("T")[0];

  // Páginas estáticas
  const staticPages = [
    { url: baseUrl, priority: "1.0", changefreq: "weekly" },
    { url: `${baseUrl}/conteudo`, priority: "0.8", changefreq: "weekly" },
  ];

  // Buscar artigos do Supabase
  let articles: any[] = [];
  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
    const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
    
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data, error } = await supabase
        .from("articles")
        .select("id, slug, updated_at")
        .eq("published", true)
        .order("updated_at", { ascending: false });

      if (!error && data) {
        articles = data;
      }
    }
  } catch (error) {
    console.error("Erro ao buscar artigos:", error);
  }

  // Função para escapar caracteres XML
  function escapeXml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  // URLs dos artigos
  const articleUrls = articles.map((article) => {
    const slug = article.slug || article.id;
    const url = `${baseUrl}/conteudo/${slug}`;
    return {
      url: escapeXml(url),
      priority: "0.7",
      changefreq: "monthly",
      lastmod: article.updated_at
        ? new Date(article.updated_at).toISOString().split("T")[0]
        : currentDate,
    };
  });

  // Gerar XML com encoding correto
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${escapeXml(page.url)}</loc>
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

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(sitemap);
}

