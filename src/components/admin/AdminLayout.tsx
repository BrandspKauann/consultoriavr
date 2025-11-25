import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Limpar sessão do localStorage
      localStorage.removeItem("admin_session_token");
      localStorage.removeItem("admin_email");
      localStorage.removeItem("admin_id");
      localStorage.removeItem("admin_role");
      
      navigate("/admin/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header Admin */}
      <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold text-primary block">
                  Admin - Hirayama Seguros
                </span>
                <span className="text-xs text-corporate-gray">
                  Gerenciamento de Conteúdo
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main>{children}</main>
    </div>
  );
};

