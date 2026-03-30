import { useAllPublishedArticles } from "@/hooks/useArticles";
import AnimatedSection from "@/components/AnimatedSection";
import { BookOpen, Loader2 } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { useNavigate } from "react-router-dom";
import type { Article } from "@/types/article";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Content = () => {
  const { data: articles, isLoading, error } = useAllPublishedArticles();
  const navigate = useNavigate();

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
          <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
            <div className="mb-5 flex justify-center">
              <BookOpen
                className="h-11 w-11 text-primary sm:h-12 sm:w-12"
                strokeWidth={1.35}
                aria-hidden
              />
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Conteúdos sobre benefícios corporativos
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Veja todos os artigos da nossa biblioteca sobre vale-refeição, PAT, gestão de RH e
              estratégia de benefícios.
            </p>
          </div>
        </AnimatedSection>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {articles.map((article, index) => (
              <AnimatedSection key={article.id} animationType="fade" delay={index * 55}>
                <ArticleCard article={article} onOpen={() => openArticle(article)} />
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

