import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface AdminProtectedRouteProps {
  children: ReactNode;
}

export const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Verificar se há sessão ativa no localStorage
        const sessionToken = localStorage.getItem("admin_session_token");
        const adminEmail = localStorage.getItem("admin_email");
        const adminId = localStorage.getItem("admin_id");
        
        if (!sessionToken || !adminEmail || !adminId) {
          navigate("/admin/login");
          return;
        }

        // Sessão válida
        setAuthenticated(true);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-trust-blue" />
      </div>
    );
  }

  return authenticated ? <>{children}</> : null;
};

