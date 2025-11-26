import { useParams, useNavigate } from "react-router-dom";
import { useArticleBySlug, useAllPublishedArticles } from "@/hooks/useArticles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Loader2, ArrowRight, BookOpen, Phone, Mail, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { findRelatedArticles } from "@/utils/articleRecommendation";

const ContentDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useArticleBySlug(slug);
  const { data: allArticles } = useAllPublishedArticles();

  // Buscar artigos relacionados usando sistema inteligente de recomendação
  const relatedArticles = findRelatedArticles(article, allArticles, 3);

  const renderContent = () => {
    if (!article?.content) {
      return (
        <p className="text-corporate-gray">
          Este artigo ainda não possui conteúdo completo cadastrado.
        </p>
      );
    }

    const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(article.content);

    // Se contém HTML, renderiza como HTML (para compatibilidade)
    if (looksLikeHtml && !article.content.includes("```") && !article.content.match(/^#{1,6}\s/)) {
      return (
        <div
          className="prose prose-invert max-w-none prose-headings:text-primary prose-p:text-corporate-gray prose-strong:text-primary prose-a:text-trust-blue prose-a:no-underline hover:prose-a:underline [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg [&_iframe]:my-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      );
    }

    // Renderiza como Markdown
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none 
        prose-headings:text-foreground prose-headings:font-bold 
        prose-h1:text-3xl prose-h1:font-bold prose-h1:mt-8 prose-h1:mb-4 prose-h1:text-foreground
        prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-foreground prose-h2:border-b prose-h2:border-border prose-h2:pb-2
        prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-foreground
        prose-p:text-muted-foreground prose-p:leading-relaxed 
        prose-strong:text-foreground prose-strong:font-semibold 
        prose-a:text-trust-blue prose-a:no-underline hover:prose-a:underline 
        prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground 
        prose-code:text-secondary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded 
        prose-pre:bg-muted prose-pre:border prose-pre:border-border 
        prose-blockquote:border-l-4 prose-blockquote:border-trust-blue prose-blockquote:pl-4 prose-blockquote:italic
        [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg [&_iframe]:my-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.content}
        </ReactMarkdown>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-trust-blue" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-bold text-primary mb-3">Conteúdo não encontrado</h1>
          <p className="text-corporate-gray mb-6">
            O material que você tentou acessar não está disponível ou foi movido.
          </p>
          <Button onClick={() => navigate("/conteudo")}>Voltar para conteúdos</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="bg-background min-h-screen">
      <div className="bg-gradient-hero py-20 sm:py-24 md:py-28 relative overflow-hidden">
        {/* Background image com opacidade */}
        {article.image_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
            style={{ backgroundImage: `url(${article.image_url})` }}
          />
        )}
        
        {/* Overlay escuro com degradê para melhorar legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-br from-trust-blue via-blue-900/90 to-trust-blue" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/50" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Button
            variant="ghost"
            className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-white/10 mb-8 flex items-center gap-2 transition-all duration-300 backdrop-blur-sm"
            onClick={() => navigate("/conteudo")}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-xs font-semibold bg-white/20 backdrop-blur-md text-primary-foreground px-4 py-2 rounded-full inline-flex items-center border border-white/30 shadow-lg">
                {article.category}
              </span>
              <div className="px-4 py-2 bg-white/15 backdrop-blur-md rounded-full font-semibold border border-white/20 shadow-lg">
                {article.type === "video" ? "Vídeo" : "Artigo"}
              </div>
              {article.read_time && (
                <div className="px-4 py-2 bg-white/15 backdrop-blur-md rounded-full font-semibold border border-white/20 shadow-lg">
                  {article.read_time}
                </div>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight tracking-tight mb-6">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2">
            {article.image_url && (
              <div className="mb-8 w-full overflow-hidden rounded-2xl bg-muted shadow-card" style={{ aspectRatio: '8/3' }}>
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="bg-card border border-border/50 rounded-2xl p-8 sm:p-12 shadow-card">
              {renderContent()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-6">
              {/* Vídeo do YouTube se existir */}
              {article.youtube_iframe && (
                <Card className="border border-border/50 shadow-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-trust-blue" />
                      Vídeo
                    </h3>
                    <div
                      className="w-full [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg [&_iframe]:border-0"
                      dangerouslySetInnerHTML={{ __html: article.youtube_iframe }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Artigos Relacionados */}
              {relatedArticles.length > 0 && (
                <Card className="border border-border/50 shadow-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-trust-blue" />
                      Artigos Relacionados
                    </h3>
                    <div className="space-y-4">
                      {relatedArticles.map((relatedArticle) => (
                        <button
                          key={relatedArticle.id}
                          onClick={() => navigate(`/conteudo/${relatedArticle.slug || relatedArticle.id}`)}
                          className="text-left w-full group hover:bg-muted/50 p-3 rounded-lg transition-colors"
                        >
                          <h4 className="font-semibold text-foreground group-hover:text-trust-blue transition-colors mb-2 line-clamp-2">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedArticle.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-trust-blue">
                            Ler mais
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* CTA de Contato */}
              <Card className="border border-border/50 shadow-card bg-gradient-to-br from-trust-blue/10 to-secondary/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Precisa de ajuda?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Fale com nossos especialistas em Seguro de Crédito e proteja o fluxo de caixa da sua empresa.
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={() => window.open("https://wa.link/d3f6ih", "_blank")}
                      className="w-full bg-trust-blue hover:bg-trust-blue-light text-white"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Falar com Especialista
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/conteudo")}
                      className="w-full"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Ver Mais Conteúdos
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Links Úteis */}
              <Card className="border border-border/50 shadow-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Links Úteis
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => navigate("/")}
                      className="w-full text-left text-sm text-muted-foreground hover:text-trust-blue transition-colors py-2 flex items-center justify-between group"
                    >
                      <span>Página Inicial</span>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                    <button
                      onClick={() => navigate("/conteudo")}
                      className="w-full text-left text-sm text-muted-foreground hover:text-trust-blue transition-colors py-2 flex items-center justify-between group"
                    >
                      <span>Biblioteca de Conteúdos</span>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                    {article.external_url && (
                      <a
                        href={article.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-left text-sm text-muted-foreground hover:text-trust-blue transition-colors py-2 flex items-center justify-between group"
                      >
                        <span>Link Externo</span>
                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      </article>
      <Footer />
    </div>
  );
};

export default ContentDetail;

