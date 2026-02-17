import { useAllPublishedArticles } from "@/hooks/useArticles";
import AnimatedSection from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Loader2, Play, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Article } from "@/types/article";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Content = () => {
  const { data: articles, isLoading, error } = useAllPublishedArticles();
  const navigate = useNavigate();

  const getIcon = (type: Article["type"]) =>
    type === "video" ? <Play className="h-4 w-4" /> : <FileText className="h-4 w-4" />;

  const openArticle = (article: Article) => {
    const slugOrId = article.slug || article.id;
    navigate(`/conteudo/${slugOrId}`);
  };

  return (
    <>
      <SEO 
        title="Blog da Consultoria | Artigos sobre Benefícios Corporativos"
        description="Conteúdos práticos sobre benefícios corporativos, legislação, PAT, gestão de RH, vale-refeição e muito mais."
        keywords="blog consultoria vr, artigos benefícios corporativos, vale refeição, gestão de rh, pat"
        url="https://www.consultoriavr.com.br/conteudo"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <section className="min-h-screen bg-background pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <AnimatedSection animationType="slide-up">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <BookOpen className="h-12 w-12 text-secondary" />
            </div>
            <p className="text-sm uppercase tracking-[0.3em] text-secondary mb-4 font-semibold">
              Biblioteca Hirayama
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Conteúdo completo sobre Seguro de Crédito Empresarial
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Artigos, guias e vídeos para blindar o fluxo de caixa da sua empresa e dominar o
              seguro de crédito em todas as etapas da operação.
            </p>
          </div>
        </AnimatedSection>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-trust-blue" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 space-y-2">
            <p className="text-corporate-gray">Não foi possível carregar os conteúdos.</p>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : "Erro desconhecido"}
            </p>
          </div>
        )}

        {articles && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article, index) => (
              <AnimatedSection key={article.id} animationType="fade" delay={index * 50}>
                <Card className="border border-border/50 shadow-card bg-card transition-all duration-500 h-full flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-[0_25px_80px_-10px_hsl(280_45%_20%_/_0.6),_0_12px_32px_-6px_hsl(280_45%_20%_/_0.5),_0_4px_16px_-2px_hsl(280_45%_20%_/_0.4)] cursor-pointer group">
                  {article.image_url && (
                    <div className="w-full overflow-hidden bg-muted" style={{ aspectRatio: '8/3' }}>
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>
                  )}
                  <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                    <button
                      className="text-left"
                      onClick={() => openArticle(article)}
                      aria-label={`Abrir ${article.title}`}
                    >
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground hover:text-trust-blue transition-colors duration-300 mb-4">
                        {article.title}
                      </h2>
                    </button>

                    <p 
                      className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow [&_strong]:font-semibold [&_strong]:text-foreground [&_b]:font-semibold [&_b]:text-foreground"
                      dangerouslySetInnerHTML={{ __html: article.description }}
                    />

                    <Button
                      variant="ghost"
                      className="justify-start px-0 text-trust-blue hover:text-trust-blue-light mt-auto font-semibold"
                      onClick={() => openArticle(article)}
                    >
                      Ler mais
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        )}

        {articles && articles.length === 0 && !isLoading && (
          <div className="text-center py-20 text-corporate-gray">
            Ainda não temos conteúdos publicados. Volte em breve!
          </div>
        )}
        </div>
      </section>
      <Footer />
    </div>
    </>
  );
};

export default Content;

