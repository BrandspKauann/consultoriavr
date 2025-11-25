-- Criar usuário admin no Supabase Auth
-- Este SQL cria o usuário diretamente na tabela auth.users
-- Execute este SQL APENAS UMA VEZ após criar o usuário manualmente no Supabase Dashboard

-- NOTA: Não é possível criar usuários via SQL diretamente na tabela auth.users
-- Você precisa criar o usuário manualmente no Supabase Dashboard ou via API
-- 
-- INSTRUÇÕES:
-- 1. Vá em Authentication → Users no Supabase Dashboard
-- 2. Clique em "Add User" → "Create new user"
-- 3. Preencha:
--    - Email: marketingkauann@gmail.com
--    - Password: Balboal.10
--    - Auto Confirm User: ✅ SIM
-- 4. Clique em "Create User"
--
-- OU use a API (execute no terminal):
-- curl -X POST 'https://cpejrontfflbzmssomnr.supabase.co/auth/v1/admin/users' \
--   -H "apikey: SUA_SERVICE_ROLE_KEY" \
--   -H "Content-Type: application/json" \
--   -d '{
--     "email": "marketingkauann@gmail.com",
--     "password": "Balboal.10",
--     "email_confirm": true
--   }'

-- Após criar o usuário, atualize as políticas RLS para usar autenticação real:

-- Drop existing policies
DROP POLICY IF EXISTS "Permitir inserção de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir atualização de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir deleção de artigos" ON articles;

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

