import { supabase } from "@/integrations/supabase/client";
import { hashPassword, verifyPassword } from "@/utils/auth";
import type { Login, LoginCredentials, LoginInsert } from "@/types/login";

/**
 * Verificar credenciais de login
 * SIMPLIFICADO: Apenas verifica se o email existe e está ativo
 * Não verifica senha - apenas email
 */
export const verifyLogin = async (credentials: LoginCredentials): Promise<Login | null> => {
  try {
    console.log("🔐 Verificando login para:", credentials.email);
    
    // Buscar usuário por email (apenas verificar se existe e está ativo)
    const { data, error } = await supabase
      .from("login")
      .select("*")
      .eq("email", credentials.email.toLowerCase().trim())
      .eq("active", true)
      .maybeSingle();

    if (error) {
      console.error("❌ Erro ao buscar usuário:", error);
      console.error("Código do erro:", error.code);
      console.error("Mensagem do erro:", error.message);
      console.error("Detalhes:", error.details);
      return null;
    }

    if (!data) {
      console.log("❌ Usuário não encontrado ou inativo");
      return null;
    }

    console.log("✅ Usuário encontrado e ativo:", data.email);
    console.log("✅ Login permitido (apenas verificação de email)");
    
    // Retornar usuário sem verificar senha
    return data as Login;
  } catch (error) {
    console.error("❌ Erro ao verificar login:", error);
    return null;
  }
};

/**
 * Criar novo usuário
 */
export const createLoginUser = async (userData: LoginInsert): Promise<Login> => {
  try {
    // Hash da senha antes de salvar
    const passwordHash = await hashPassword(userData.password_hash);
    
    const { data, error } = await supabase
      .from("login")
      .insert([{
        email: userData.email.toLowerCase().trim(),
        password_hash: passwordHash,
        role: userData.role || "admin",
        active: userData.active ?? true,
      }])
      .select()
      .single();

    if (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }

    return data as Login;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

