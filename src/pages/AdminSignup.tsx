import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createLoginUser } from "@/hooks/useLogin";
import { generateSessionToken } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Shield, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Limpar espaços e validar email
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password;
      const cleanConfirmPassword = confirmPassword;

      // Validações básicas
      if (!cleanEmail || !cleanPassword || !cleanConfirmPassword) {
        toast.error("Por favor, preencha todos os campos.");
        setLoading(false);
        return;
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        toast.error("Por favor, insira um email válido.");
        setLoading(false);
        return;
      }

      // Validar senha (mínimo 6 caracteres)
      if (cleanPassword.length < 6) {
        toast.error("A senha deve ter no mínimo 6 caracteres.");
        setLoading(false);
        return;
      }

      // Validar confirmação de senha
      if (cleanPassword !== cleanConfirmPassword) {
        toast.error("As senhas não coincidem.");
        setLoading(false);
        return;
      }

      console.log("Tentando criar usuário com:", { email: cleanEmail });

      // Criar usuário na tabela login
      const user = await createLoginUser({
        email: cleanEmail,
        password_hash: cleanPassword, // Será hashada no hook
        role: "admin",
        active: true,
      });

      if (user) {
        console.log("Usuário criado com sucesso!", user);
        
        // Criar sessão e fazer login automaticamente
        const sessionToken = generateSessionToken();
        localStorage.setItem("admin_session_token", sessionToken);
        localStorage.setItem("admin_email", user.email);
        localStorage.setItem("admin_id", user.id);
        localStorage.setItem("admin_role", user.role);

        toast.success("Conta criada com sucesso! Redirecionando...");
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      }
    } catch (error: any) {
      console.error("Erro ao criar conta:", error);
      
      if (error?.code === "23505" || error?.message?.includes("duplicate")) {
        toast.error("Este email já está cadastrado. Faça login ou use outro email.");
      } else {
        toast.error(`Erro ao criar conta: ${error?.message || "Tente novamente."}`);
      }
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
          <CardTitle className="text-2xl">Criar Conta Admin</CardTitle>
          <p className="text-corporate-gray mt-2">Registre-se para acessar o painel</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  className="pr-10"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-corporate-gray hover:text-primary transition-colors focus:outline-none"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Digite a senha novamente"
                  required
                  className="pr-10"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-corporate-gray hover:text-primary transition-colors focus:outline-none"
                  aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Criar Conta
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link
              to="/admin/login"
              className="inline-flex items-center text-sm text-corporate-gray hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Já tem uma conta? Faça login
            </Link>
          </div>
          <p className="text-xs text-corporate-gray text-center mt-4">
            Ao criar uma conta, você concorda com nossos termos de uso.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSignup;

