-- Atualizar políticas RLS para usar autenticação real do Supabase
-- Execute este SQL após criar o usuário admin no Supabase Dashboard

-- Drop existing policies
DROP POLICY IF EXISTS "Permitir inserção de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir atualização de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir deleção de artigos" ON articles;
DROP POLICY IF EXISTS "Usuários autenticados podem criar artigos" ON articles;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar artigos" ON articles;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar artigos" ON articles;

-- Policy: Only authenticated users can insert articles
CREATE POLICY "Usuários autenticados podem criar artigos"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can update articles
CREATE POLICY "Usuários autenticados podem atualizar artigos"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete articles
CREATE POLICY "Usuários autenticados podem deletar artigos"
  ON articles
  FOR DELETE
  TO authenticated
  USING (true);

