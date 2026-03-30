import { useState, useCallback, useMemo, useEffect } from "react";
import { useAllArticles, useDeleteArticle } from "@/hooks/useArticles";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ArticleList } from "@/components/admin/ArticleList";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import type { Article } from "@/types/article";
import { toast } from "@/components/ui/sonner";
import {
  SITE_ID,
  getAdminSiteOptions,
  ADMIN_SITE_STORAGE_KEY,
} from "@/config/sites";

const Admin = () => {
  const adminSiteOptions = useMemo(() => getAdminSiteOptions(), []);

  const [adminSiteId, setAdminSiteId] = useState(() => {
    try {
      const stored = localStorage.getItem(ADMIN_SITE_STORAGE_KEY);
      if (stored && adminSiteOptions.some((o) => o.id === stored)) {
        return stored;
      }
    } catch {
      /* ignore */
    }
    return adminSiteOptions[0]?.id ?? SITE_ID;
  });

  useEffect(() => {
    if (!adminSiteOptions.some((o) => o.id === adminSiteId)) {
      setAdminSiteId(adminSiteOptions[0]?.id ?? SITE_ID);
    }
  }, [adminSiteOptions, adminSiteId]);

  const handleAdminSiteChange = useCallback((value: string) => {
    setAdminSiteId(value);
    try {
      localStorage.setItem(ADMIN_SITE_STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const { data: articles, isLoading, refetch } = useAllArticles(adminSiteId);
  const deleteArticle = useDeleteArticle();

  // Memoizar handlers para evitar recriação
  const handleEdit = useCallback((article: Article) => {
    setEditingArticle(article);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este artigo?")) {
      return;
    }

    try {
      await deleteArticle.mutateAsync({ id, siteId: adminSiteId });
      toast.success("Artigo excluído com sucesso!");
      refetch();
    } catch (error) {
      console.error("Erro ao excluir artigo:", error);
      toast.error("Erro ao excluir artigo. Tente novamente.");
    }
  }, [deleteArticle, refetch, adminSiteId]);

  const handleNewArticle = useCallback(() => {
    setEditingArticle(null);
    setShowForm(true);
  }, []);

  // Não chamar refetch automaticamente ao fechar - apenas quando necessário
  const handleFormClose = useCallback(() => {
    setShowForm(false);
    setEditingArticle(null);
    // Refetch apenas quando necessário (após salvar/deletar)
  }, []);

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Gerenciar Artigos
            </h1>
            <p className="text-corporate-gray mt-2">
              Crie e gerencie o blog; troque o site abaixo para o mesmo painel em
              vários domínios.
            </p>
            {adminSiteOptions.length > 0 && (
              <div className="mt-4 max-w-xs">
                <Label htmlFor="admin-site" className="text-sm font-medium">
                  Site (site_id)
                </Label>
                <Select
                  value={adminSiteId}
                  onValueChange={handleAdminSiteChange}
                >
                  <SelectTrigger id="admin-site" className="mt-1.5">
                    <SelectValue placeholder="Selecione o site" />
                  </SelectTrigger>
                  <SelectContent>
                    {adminSiteOptions.map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {`${opt.label} (${opt.id})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <Button
            onClick={handleNewArticle}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo Artigo
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-trust-blue" />
          </div>
        ) : (
          <ArticleList
            articles={articles || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <Dialog open={showForm} onOpenChange={handleFormClose}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingArticle ? "Editar Artigo" : "Novo Artigo"}
              </DialogTitle>
            </DialogHeader>
            <ArticleForm
              article={editingArticle || undefined}
              siteId={adminSiteId}
              onClose={handleFormClose}
            />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Admin;

