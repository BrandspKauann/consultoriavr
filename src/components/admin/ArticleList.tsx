import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/types/article";

interface ArticleListProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
}

export const ArticleList = ({ articles, onEdit, onDelete }: ArticleListProps) => {
  if (articles.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-corporate-gray mb-2">
            Nenhum artigo encontrado.
          </p>
          <p className="text-sm text-corporate-gray-light">
            Clique em "Novo Artigo" para começar.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Card key={article.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-xl font-bold text-primary">
                    {article.title}
                  </h3>
                  {article.published ? (
                    <Badge variant="default" className="bg-green-500 text-white">
                      <Eye className="h-3 w-3 mr-1" />
                      Publicado
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <EyeOff className="h-3 w-3 mr-1" />
                      Rascunho
                    </Badge>
                  )}
                  {article.featured && (
                    <Badge variant="outline" className="border-secondary text-secondary">
                      Destaque
                    </Badge>
                  )}
                </div>
                
                <p className="text-corporate-gray mb-3">
                  {article.description.length > 120 
                    ? `${article.description.substring(0, 120)}...` 
                    : article.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-corporate-gray flex-wrap">
                  <Badge variant="outline">
                    {article.type === "video" ? "Vídeo" : "Artigo"}
                  </Badge>
                  <Badge variant="outline">{article.category}</Badge>
                  <span>{article.read_time}</span>
                  {article.order_index > 0 && (
                    <span className="text-xs">Ordem: {article.order_index}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(article)}
                  className="hover:bg-muted"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(article.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

