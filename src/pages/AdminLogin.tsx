import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "@/hooks/useLogin";
import { generateSessionToken } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Shield } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Verificar se já está autenticado
  useEffect(() => {
    const checkSession = () => {
      const sessionToken = localStorage.getItem("admin_session_token");
      const adminEmail = localStorage.getItem("admin_email");
      
      if (sessionToken && adminEmail) {
        navigate("/admin");
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Limpar espaços e validar email
      const cleanEmail = email.trim().toLowerCase();

      // Validações básicas - apenas email necessário
      if (!cleanEmail) {
        toast.error("Por favor, preencha o email.");
        setLoading(false);
        return;
      }

      console.log("Tentando fazer login com:", { email: cleanEmail });

      // Verificar se email existe na tabela login (sem verificar senha)
      const user = await verifyLogin({
        email: cleanEmail,
        password: "", // Não usado mais
      });

      if (!user) {
        toast.error("Email não encontrado ou usuário inativo.");
        setLoading(false);
        return;
      }

      // Criar sessão
      const sessionToken = generateSessionToken();
      localStorage.setItem("admin_session_token", sessionToken);
      localStorage.setItem("admin_email", user.email);
      localStorage.setItem("admin_id", user.id);
      localStorage.setItem("admin_role", user.role);

      console.log("Login bem-sucedido!", user);
      toast.success("Login realizado com sucesso!");
      navigate("/admin");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro inesperado ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Admin - Hirayama Seguros</CardTitle>
          <p className="text-corporate-gray mt-2">Acesso restrito</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hirayama.com"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Entrar
            </Button>
          </form>
          <p className="text-xs text-corporate-gray text-center mt-4">
            Apenas email necessário - verificação automática
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;

