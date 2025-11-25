import { useParams, useNavigate } from "react-router-dom";
import { useArticleBySlug } from "@/hooks/useArticles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ContentDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useArticleBySlug(slug);

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

          {/* Sidebar com vídeo do YouTube */}
          {article.youtube_iframe && (
            <div className="lg:col-span-1">
              <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-card sticky top-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Vídeo</h3>
                <div
                  className="w-full [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg [&_iframe]:border-0"
                  dangerouslySetInnerHTML={{ __html: article.youtube_iframe }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      </article>
      <Footer />
    </div>
  );
};

export default ContentDetail;

