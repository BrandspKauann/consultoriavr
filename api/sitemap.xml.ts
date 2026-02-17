import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const baseUrl = "https://www.consultoriavr.com.br";
  const currentDate = new Date().toISOString().split("T")[0];

  // Páginas estáticas
  const staticPages = [
    { url: baseUrl, priority: "1.0", changefreq: "weekly" },
    { url: `${baseUrl}/conteudo`, priority: "0.8", changefreq: "weekly" },
    { url: `${baseUrl}/salaryfits`, priority: "0.7", changefreq: "monthly" },
  ];

  // Buscar artigos do Supabase
  let articles: any[] = [];
  let errorMessage = '';
  
  try {
    // Na Vercel, as variáveis de ambiente podem ter prefixo VITE_ ou não
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
    const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || '';
    
    console.log('Sitemap: Verificando variáveis de ambiente...');
    console.log('Sitemap: Supabase URL configurada:', !!supabaseUrl);
    console.log('Sitemap: Supabase Key configurada:', !!supabaseKey);
    
    if (!supabaseUrl || !supabaseKey) {
      errorMessage = 'Variáveis de ambiente não configuradas';
      console.error("Sitemap: Variáveis de ambiente do Supabase não configuradas");
      console.error("Sitemap: URL:", supabaseUrl ? 'OK' : 'FALTANDO');
      console.error("Sitemap: Key:", supabaseKey ? 'OK' : 'FALTANDO');
    } else {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      console.log('Sitemap: Buscando artigos publicados...');
      console.log('Sitemap: URL do Supabase:', supabaseUrl.substring(0, 30) + '...');
      
      // Tentar buscar sem filtro primeiro para ver se a conexão funciona
      const { data: allData, error: allError } = await supabase
        .from("articles")
        .select("id, slug, updated_at, published")
        .order("updated_at", { ascending: false })
        .limit(100);
      
      if (allError) {
        errorMessage = `Erro na query: ${allError.message}`;
        console.error("Sitemap: Erro ao buscar TODOS os artigos:", allError);
        console.error("Sitemap: Código do erro:", allError.code);
        console.error("Sitemap: Detalhes:", JSON.stringify(allError));
      } else {
        console.log(`Sitemap: Total de artigos no banco: ${allData?.length || 0}`);
        
        // Agora buscar apenas os publicados
        // Usar service_role key se disponível para bypass RLS, senão usar anon key
        const { data, error } = await supabase
          .from("articles")
          .select("id, slug, updated_at")
          .eq("published", true)
          .order("updated_at", { ascending: false })
          .limit(500); // Limite máximo de 500 artigos

        if (error) {
          errorMessage = `Erro ao buscar artigos publicados: ${error.message}`;
          console.error("Sitemap: Erro ao buscar artigos publicados:", error);
          console.error("Sitemap: Código do erro:", error.code);
          console.error("Sitemap: Detalhes:", JSON.stringify(error));
        } else if (data) {
          articles = Array.isArray(data) ? data : [];
          console.log(`Sitemap: ${articles.length} artigos publicados encontrados`);
          if (articles.length > 0) {
            console.log('Sitemap: Primeiro artigo:', JSON.stringify(articles[0]));
            console.log('Sitemap: Último artigo:', JSON.stringify(articles[articles.length - 1]));
          } else {
            console.warn('Sitemap: Nenhum artigo publicado encontrado no banco');
          }
        } else {
          console.warn('Sitemap: Query retornou null ou undefined');
        }
      }
    }
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error("Sitemap: Exceção ao buscar artigos:", error);
    if (error instanceof Error) {
      console.error("Sitemap: Mensagem de erro:", error.message);
      console.error("Sitemap: Stack:", error.stack);
    }
  }
  
  // Log final do status
  if (errorMessage) {
    console.error(`Sitemap: ERRO - ${errorMessage}`);
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
    const lastmod = article.updated_at
      ? new Date(article.updated_at).toISOString().split("T")[0]
      : currentDate;
    return {
      url: escapeXml(url),
      priority: "0.6",
      changefreq: "monthly",
      lastmod: lastmod,
    };
  });

  // Log final antes de gerar XML
  console.log(`Sitemap: Gerando XML com ${staticPages.length} páginas estáticas e ${articleUrls.length} artigos`);
  
  if (errorMessage) {
    console.error(`Sitemap: AVISO - ${errorMessage}`);
  }
  
  if (articleUrls.length === 0) {
    console.warn('Sitemap: ATENÇÃO - Nenhum artigo será incluído no sitemap!');
    console.warn('Sitemap: Verifique se há artigos publicados no banco de dados');
  }

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
  .join("\n")}${articleUrls.length > 0 ? "\n" + articleUrls
  .map(
    (article) => `  <url>
    <loc>${article.url}</loc>
    <lastmod>${article.lastmod}</lastmod>
    <changefreq>${article.changefreq}</changefreq>
    <priority>${article.priority}</priority>
  </url>`
  )
  .join("\n") : ''}
</urlset>`;

  console.log(`Sitemap: XML gerado com sucesso. Tamanho: ${sitemap.length} caracteres`);
  console.log(`Sitemap: Total de URLs no sitemap: ${staticPages.length + articleUrls.length}`);

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(sitemap);
}

