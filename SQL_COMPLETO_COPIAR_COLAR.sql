-- ========================================
-- SQL COMPLETO PARA CRIAR TABELA LOGIN
-- ========================================
-- COLE ESTE SQL NO SQL EDITOR DO SUPABASE
-- E EXECUTE (Run ou F5)
-- ========================================

-- 1. Dropar tabela antiga (se existir)
DROP TABLE IF EXISTS login CASCADE;

-- 2. Criar tabela login com estrutura correta
CREATE TABLE login (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,  -- ← NOME: password_hash | TIPO: TEXT
  role TEXT DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar índice para busca rápida
CREATE INDEX idx_login_email ON login(email);

-- 4. Habilitar RLS (Row Level Security)
ALTER TABLE login ENABLE ROW LEVEL SECURITY;

-- 5. Dropar políticas antigas (se existirem)
DROP POLICY IF EXISTS "Permitir leitura de login para verificação" ON login;
DROP POLICY IF EXISTS "Permitir criação de usuários para registro" ON login;
DROP POLICY IF EXISTS "Apenas autenticados podem atualizar login" ON login;
DROP POLICY IF EXISTS "Apenas autenticados podem deletar login" ON login;

-- 6. Política: Permitir leitura (necessário para login)
CREATE POLICY "Permitir leitura de login para verificação"
  ON login
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 7. Política: Permitir criação (necessário para registro)
CREATE POLICY "Permitir criação de usuários para registro"
  ON login
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 8. Política: Permitir atualização (apenas autenticados)
CREATE POLICY "Apenas autenticados podem atualizar login"
  ON login
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 9. Política: Permitir deleção (apenas autenticados)
CREATE POLICY "Apenas autenticados podem deletar login"
  ON login
  FOR DELETE
  TO authenticated
  USING (true);

-- 10. Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_login_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 11. Trigger para executar a função antes de atualizar
DROP TRIGGER IF EXISTS update_login_updated_at ON login;
CREATE TRIGGER update_login_updated_at
  BEFORE UPDATE ON login
  FOR EACH ROW
  EXECUTE FUNCTION update_login_updated_at();

-- ========================================
-- ✅ TABELA CRIADA COM SUCESSO!
-- ========================================
-- 
-- PRÓXIMOS PASSOS:
-- 1. Acesse: http://localhost:8081/admin/signup
-- 2. Crie o usuário com email e senha
-- 3. Ou use o script: TESTAR_CONEXAO.html
-- 
-- ========================================

