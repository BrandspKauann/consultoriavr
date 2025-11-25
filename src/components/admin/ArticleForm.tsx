import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCreateArticle, useUpdateArticle } from "@/hooks/useArticles";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Loader2, Upload } from "lucide-react";
import type { Article, ArticleInsert } from "@/types/article";
import { toast } from "@/components/ui/sonner";

interface ArticleFormProps {
  article?: Article;
  onClose: () => void;
}

export const ArticleForm = ({ article, onClose }: ArticleFormProps) => {
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const { uploadImage } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ogFileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);

  // Limites de caracteres baseados em boas práticas
  const CHAR_LIMITS = {
    title: 60, // Título ideal para SEO
    description: 160, // Meta description ideal
    slug: 60, // URL amigável
    seo_title: 60, // Título SEO ideal
    seo_description: 160, // Meta description ideal
    seo_keywords: 200, // Palavras-chave
  };

  // Inicializar formData com dados do artigo se estiver editando
  const [formData, setFormData] = useState<ArticleInsert>(() => {
    if (article) {
      return {
        title: article.title || "",
        description: article.description || "",
        content: article.content || "",
        slug: article.slug || "",
        seo_title: article.seo_title || "",
        seo_description: article.seo_description || "",
        seo_keywords: article.seo_keywords || "",
        og_image_url: article.og_image_url || "",
        type: article.type || "article",
        category: article.category || "",
        external_url: article.external_url || "",
        youtube_iframe: (article as any).youtube_iframe || "",
        image_url: article.image_url || "",
        published: article.published ?? true,
        featured: article.featured ?? false,
      };
    }
    return {
      title: "",
      description: "",
      content: "",
      slug: "",
      seo_title: "",
      seo_description: "",
      seo_keywords: "",
      og_image_url: "",
      type: "article",
      category: "",
      external_url: "",
      youtube_iframe: "",
      image_url: "",
      published: true,
      featured: false,
    };
  });

  // Atualizar formData quando article mudar (usando ID para evitar re-renders desnecessários)
  const articleIdRef = useRef<string | undefined>(article?.id);
  
  useEffect(() => {
    const currentArticleId = article?.id;
    
    // Só atualiza se o ID do artigo mudou
    if (articleIdRef.current !== currentArticleId) {
      articleIdRef.current = currentArticleId;
      
      if (article) {
        // Carregar dados do artigo para edição
        setFormData({
          title: article.title || "",
          description: article.description || "",
          content: article.content || "",
          slug: article.slug || "",
          seo_title: article.seo_title || "",
          seo_description: article.seo_description || "",
          seo_keywords: article.seo_keywords || "",
          og_image_url: article.og_image_url || "",
          type: article.type || "article",
          category: article.category || "",
          external_url: article.external_url || "",
          youtube_iframe: (article as any).youtube_iframe || "",
          image_url: article.image_url || "",
          published: article.published ?? true,
          featured: article.featured ?? false,
        });
      } else {
        // Resetar para novo artigo
        setFormData({
          title: "",
          description: "",
          content: "",
          slug: "",
          seo_title: "",
          seo_description: "",
          seo_keywords: "",
          og_image_url: "",
          type: "article",
          category: "",
          external_url: "",
          youtube_iframe: "",
          image_url: "",
          published: true,
          featured: false,
        });
      }
    }
  }, [article?.id, article]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Limpar campos vazios (converter strings vazias para null ou undefined)
      const cleanData: ArticleInsert = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        type: formData.type,
        category: formData.category.trim(),
        published: formData.published ?? true,
        featured: formData.featured ?? false,
        // Campos opcionais básicos - só incluir se tiver valor
        ...(formData.content?.trim() && { content: formData.content.trim() }),
        ...(formData.external_url?.trim() && { external_url: formData.external_url.trim() }),
        ...(formData.youtube_iframe?.trim() && { youtube_iframe: formData.youtube_iframe.trim() }),
        ...(formData.image_url?.trim() && { image_url: formData.image_url.trim() }),
        // Campos de SEO - só incluir se tiverem valor
        ...(formData.slug?.trim() && { slug: formData.slug.trim() }),
        ...(formData.seo_title?.trim() && { seo_title: formData.seo_title.trim() }),
        ...(formData.seo_description?.trim() && { seo_description: formData.seo_description.trim() }),
        ...(formData.seo_keywords?.trim() && { seo_keywords: formData.seo_keywords.trim() }),
        ...(formData.og_image_url?.trim() && { og_image_url: formData.og_image_url.trim() }),
      };

      if (article) {
        await updateArticle.mutateAsync({
          id: article.id,
          updates: cleanData,
        });
        toast.success("Artigo atualizado com sucesso!");
      } else {
        await createArticle.mutateAsync(cleanData);
        toast.success("Artigo criado com sucesso!");
      }

      onClose();
    } catch (error: any) {
      console.error("Erro ao salvar artigo:", error);
      const errorMessage = error?.message || "Erro ao salvar artigo. Tente novamente.";
      toast.error(errorMessage);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_SIZE) {
      toast.error("A imagem precisa ter no máximo 2MB.");
      event.target.value = "";
      return;
    }

    try {
      setUploading(true);
      const { publicUrl } = await uploadImage(file, "card-images");
      setFormData({ ...formData, image_url: publicUrl });
      toast.success("Imagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      toast.error("Não foi possível enviar a imagem. Tente novamente.");
    } finally {
      setUploading(false);
      if (event.target) {
        event.target.value = "";
      }
    }
  };

  const handleOgFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_SIZE) {
      toast.error("A imagem precisa ter no máximo 2MB.");
      event.target.value = "";
      return;
    }

    try {
      setUploadingOg(true);
      const { publicUrl } = await uploadImage(file, "og-images");
      setFormData({ ...formData, og_image_url: publicUrl });
      toast.success("Imagem Open Graph enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      toast.error("Não foi possível enviar a imagem. Tente novamente.");
    } finally {
      setUploadingOg(false);
      if (event.target) {
        event.target.value = "";
      }
    }
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, CHAR_LIMITS.slug);
  };

  const handleTitleChange = (value: string) => {
    // Gerar slug automaticamente se estiver vazio ou se for novo artigo
    if (!article && (!formData.slug || formData.slug === slugify(formData.title || ""))) {
      setFormData((prev) => ({ ...prev, title: value, slug: slugify(value) }));
    } else {
      setFormData({ ...formData, title: value });
    }
  };

  const isLoading = createArticle.isPending || updateArticle.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            maxLength={CHAR_LIMITS.title}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {formData.title.length}/{CHAR_LIMITS.title} caracteres (ideal para SEO)
          </p>
        </div>

        <div>
          <Label htmlFor="description">Descrição *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
            maxLength={CHAR_LIMITS.description}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {formData.description.length}/{CHAR_LIMITS.description} caracteres (ideal para meta description)
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            💡 Dica: Use <code className="bg-muted px-1 py-0.5 rounded">&lt;strong&gt;texto&lt;/strong&gt;</code> ou <code className="bg-muted px-1 py-0.5 rounded">&lt;b&gt;texto&lt;/b&gt;</code> para deixar palavras em negrito
          </p>
        </div>

        <div>
          <Label htmlFor="content">Conteúdo</Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content || ""}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={8}
            className="mt-2"
            placeholder="Digite o conteúdo em Markdown ou HTML. Para vídeos do YouTube, cole o código do iframe aqui."
          />
          <p className="text-xs text-muted-foreground mt-1">
            Você pode usar Markdown ou HTML. Para vídeos do YouTube, cole o código do iframe diretamente.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type">Tipo *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "article" | "video") =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger id="type" name="type" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="article">Artigo</SelectItem>
                <SelectItem value="video">Vídeo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Categoria *</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="mt-2"
            />
          </div>
        </div>


        <div>
          <Label htmlFor="youtube_iframe">Iframe do YouTube</Label>
          <Textarea
            id="youtube_iframe"
            name="youtube_iframe"
            value={formData.youtube_iframe || ""}
            onChange={(e) => setFormData({ ...formData, youtube_iframe: e.target.value })}
            placeholder="Cole aqui o código do iframe do YouTube (Shorts ou vídeos)"
            rows={4}
            className="mt-2 font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Cole o código completo do iframe. O vídeo aparecerá ao lado direito do artigo.
          </p>
        </div>

        <div>
          <Label htmlFor="image_url">URL da Imagem</Label>
          <div className="mt-2 space-y-2">
            <Input
              id="image_url"
              name="image_url"
              type="url"
              value={formData.image_url || ""}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://... ou envie uma imagem"
              className="w-full"
            />
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Enviar Imagem
                  </>
                )}
              </Button>
              {formData.image_url && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(formData.image_url, "_blank")}
                >
                  Ver Imagem
                </Button>
              )}
            </div>
            <input
              ref={fileInputRef}
              id="image_file"
              name="image_file"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-xs text-muted-foreground">
              Envie JPG, PNG, WebP ou SVG (máx. 2MB) ou cole um link público
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              📐 <strong>Recomendação:</strong> Use imagens retangulares (proporção 1200x450px ou 8:3) para melhor visualização nos cards e na página do artigo.
            </p>
          </div>
        </div>

        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">SEO</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="slug">Slug (URL amigável)</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug || ""}
                onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                placeholder="exemplo-de-url-amigavel"
                maxLength={CHAR_LIMITS.slug}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(formData.slug || "").length}/{CHAR_LIMITS.slug} caracteres. Use apenas letras, números e hífens.
              </p>
            </div>

            <div>
              <Label htmlFor="seo_title">Título SEO</Label>
              <Input
                id="seo_title"
                name="seo_title"
                value={formData.seo_title || ""}
                onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                placeholder="Título otimizado para busca (até 60 caracteres)"
                maxLength={60}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(formData.seo_title || "").length}/60 caracteres
              </p>
            </div>

            <div>
              <Label htmlFor="seo_description">Meta Description</Label>
              <Textarea
                id="seo_description"
                name="seo_description"
                value={formData.seo_description || ""}
                onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                placeholder="Descrição que aparece nos resultados de busca (até 160 caracteres)"
                maxLength={160}
                rows={3}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(formData.seo_description || "").length}/160 caracteres
              </p>
            </div>

            <div>
              <Label htmlFor="seo_keywords">Palavras-chave</Label>
              <Input
                id="seo_keywords"
                name="seo_keywords"
                value={formData.seo_keywords || ""}
                onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                placeholder="palavra-chave1, palavra-chave2, palavra-chave3"
                maxLength={CHAR_LIMITS.seo_keywords}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(formData.seo_keywords || "").length}/{CHAR_LIMITS.seo_keywords} caracteres. Separe por vírgulas.
              </p>
            </div>

            <div>
              <Label htmlFor="og_image_url">Imagem Open Graph</Label>
              <div className="mt-2 space-y-2">
                <Input
                  id="og_image_url"
                  name="og_image_url"
                  type="url"
                  value={formData.og_image_url || ""}
                  onChange={(e) => setFormData({ ...formData, og_image_url: e.target.value })}
                  placeholder="https://... ou envie uma imagem"
                  className="w-full"
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => ogFileInputRef.current?.click()}
                    disabled={uploadingOg}
                  >
                    {uploadingOg ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Enviar Imagem
                      </>
                    )}
                  </Button>
                  {formData.og_image_url && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(formData.og_image_url, "_blank")}
                    >
                      Ver Imagem
                    </Button>
                  )}
                </div>
                <input
                  ref={ogFileInputRef}
                  id="og_image_file"
                  name="og_image_file"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  className="hidden"
                  onChange={handleOgFileChange}
                />
                <p className="text-xs text-muted-foreground">
                  Imagem exibida ao compartilhar em redes sociais (máx. 2MB)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch
              id="published"
              name="published"
              checked={formData.published}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, published: checked })
              }
            />
            <Label htmlFor="published">Publicado</Label>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="featured"
              name="featured"
              checked={formData.featured}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, featured: checked })
              }
            />
            <Label htmlFor="featured">Destaque</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {article ? "Salvar Alterações" : "Criar Artigo"}
        </Button>
      </div>
    </form>
  );
};
