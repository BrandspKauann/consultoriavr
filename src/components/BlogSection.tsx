import { Button } from "./ui/button";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useArticles } from "@/hooks/useArticles";
import type { Article } from "@/types/article";
import { useNavigate } from "react-router-dom";
import { ArticleCard } from "./ArticleCard";

const BlogSection = () => {
  const { data: articles, isLoading, error } = useArticles();
  const navigate = useNavigate();

  const handleArticleClick = (article: Article) => {
    const slugOrId = article.slug || article.id;
    navigate(`/conteudo/${slugOrId}`);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection animationType="slide-up">
          <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16 md:mb-20">
            <div className="mb-5 flex justify-center">
              <BookOpen
                className="h-11 w-11 text-primary sm:h-12 sm:w-12"
                strokeWidth={1.35}
                aria-hidden
              />
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Conteúdos sobre benefícios corporativos
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Veja os últimos artigos da nossa biblioteca sobre vale-refeição, PAT, gestão de RH e
              estratégia de benefícios para sua empresa.
            </p>
          </div>
        </AnimatedSection>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-foreground/80 mb-4">
              Erro ao carregar artigos. Por favor, tente novamente.
            </p>
            <p className="text-sm text-foreground/70">
              {error instanceof Error ? error.message : "Erro desconhecido"}
            </p>
          </div>
        )}

        {articles && articles.length > 0 && (
          <>
            <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
              {articles.map((article, index) => (
                <AnimatedSection key={article.id} animationType="fade" delay={index * 50}>
                  <ArticleCard article={article} onOpen={() => handleArticleClick(article)} />
                </AnimatedSection>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/conteudo")}
                className="rounded-lg border-2 border-primary bg-background px-8 font-semibold text-primary shadow-none hover:bg-primary/5 hover:text-primary"
              >
                Ver todos os artigos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </>
        )}

        {articles && articles.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Nenhum artigo disponível no momento.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
