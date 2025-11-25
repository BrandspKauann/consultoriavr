-- CORRIGIR TABELA LOGIN - Execute este SQL no Supabase SQL Editor
-- Este SQL vai dropar a tabela antiga e criar a nova com a estrutura correta

-- 1. DROPAR a tabela antiga (se existir)
DROP TABLE IF EXISTS login CASCADE;

-- 2. Criar tabela de login CORRETA
CREATE TABLE login (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,  -- IMPORTANTE: TEXT, não numeric!
  role TEXT DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar índice para busca rápida por email
CREATE INDEX idx_login_email ON login(email);

-- 4. Habilitar RLS
ALTER TABLE login ENABLE ROW LEVEL SECURITY;

-- 5. DROPAR políticas antigas (se existirem)
DROP POLICY IF EXISTS "Permitir leitura de login para verificação" ON login;
DROP POLICY IF EXISTS "Permitir criação de usuários para registro" ON login;
DROP POLICY IF EXISTS "Apenas autenticados podem atualizar login" ON login;
DROP POLICY IF EXISTS "Apenas autenticados podem deletar login" ON login;
DROP POLICY IF EXISTS "Usuários autenticados podem ver seus próprios dados" ON login;
DROP POLICY IF EXISTS "Admin pode ver todos os logins" ON login;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar seus próprios dados" ON login;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar seus próprios dados" ON login;

-- 6. Policy: Permitir leitura para verificação de login (anon pode ler)
-- Isso é necessário para o sistema de login funcionar
CREATE POLICY "Permitir leitura de login para verificação"
  ON login
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 7. Policy: Permitir criação de usuários (anon pode criar - necessário para registro)
CREATE POLICY "Permitir criação de usuários para registro"
  ON login
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 8. Policy: Apenas autenticados podem atualizar
CREATE POLICY "Apenas autenticados podem atualizar login"
  ON login
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 9. Policy: Apenas autenticados podem deletar
CREATE POLICY "Apenas autenticados podem deletar login"
  ON login
  FOR DELETE
  TO authenticated
  USING (true);

-- 10. Function para atualizar updated_at
CREATE OR REPLACE FUNCTION update_login_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 11. Trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_login_updated_at ON login;
CREATE TRIGGER update_login_updated_at
  BEFORE UPDATE ON login
  FOR EACH ROW
  EXECUTE FUNCTION update_login_updated_at();

-- ✅ TABELA CRIADA COM SUCESSO!
-- Agora use a página de registro para criar o usuário:
-- http://localhost:8081/admin/signup

