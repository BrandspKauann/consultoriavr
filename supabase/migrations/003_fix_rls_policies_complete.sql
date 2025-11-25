-- Políticas RLS completas para o sistema de artigos
-- Execute este SQL para garantir que tudo está configurado corretamente

-- Drop todas as políticas existentes para recriar
DROP POLICY IF EXISTS "Artigos públicos são visíveis para todos" ON articles;
DROP POLICY IF EXISTS "Permitir inserção de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir atualização de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir deleção de artigos" ON articles;
DROP POLICY IF EXISTS "Usuários autenticados podem criar artigos" ON articles;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar artigos" ON articles;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar artigos" ON articles;
DROP POLICY IF EXISTS "Usuários autenticados podem ver todos os artigos" ON articles;

-- Policy 1: Usuários não autenticados (anon) podem ver apenas artigos publicados (para o site público)
CREATE POLICY "Artigos públicos são visíveis para visitantes"
  ON articles
  FOR SELECT
  TO anon
  USING (published = true);

-- Policy 2: Usuários autenticados podem ver TODOS os artigos (publicados e não publicados) - para o admin
CREATE POLICY "Usuários autenticados podem ver todos os artigos"
  ON articles
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3: Usuários autenticados podem criar artigos
CREATE POLICY "Usuários autenticados podem criar artigos"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy 4: Usuários autenticados podem atualizar artigos
CREATE POLICY "Usuários autenticados podem atualizar artigos"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 5: Usuários autenticados podem deletar artigos
CREATE POLICY "Usuários autenticados podem deletar artigos"
  ON articles
  FOR DELETE
  TO authenticated
  USING (true);

