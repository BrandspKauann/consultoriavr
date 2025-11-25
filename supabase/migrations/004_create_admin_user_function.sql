-- FUNÇÃO PARA CRIAR USUÁRIO ADMIN VIA API
-- IMPORTANTE: Esta função NÃO pode ser executada diretamente no SQL Editor
-- Ela precisa ser chamada via API Admin do Supabase usando a service_role key

-- NOTA: Não é possível criar usuários diretamente na tabela auth.users via SQL
-- A tabela auth.users é protegida e gerenciada pelo Supabase Auth

-- SOLUÇÃO: Use uma das opções abaixo:

-- OPÇÃO 1: Criar usuário manualmente no Dashboard (RECOMENDADO)
-- 1. Vá em Authentication → Users
-- 2. Clique em "Add User" → "Create new user"
-- 3. Preencha:
--    - Email: marketingkauann@gmail.com
--    - Password: Balboal.10
--    - Auto Confirm User: ✅ SIM
-- 4. Clique em "Create User"

-- OPÇÃO 2: Usar a página de registro (JÁ IMPLEMENTADO)
-- 1. Acesse: http://localhost:8081/admin/signup
-- 2. Preencha o formulário
-- 3. Clique em "Criar Conta"
-- 4. Usuário será criado automaticamente

-- OPÇÃO 3: Usar API Admin via curl (requer service_role key)
-- Execute no terminal:
/*
curl -X POST 'https://cpejrontfflbzmssomnr.supabase.co/auth/v1/admin/users' \
  -H "apikey: SUA_SERVICE_ROLE_KEY_AQUI" \
  -H "Authorization: Bearer SUA_SERVICE_ROLE_KEY_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "marketingkauann@gmail.com",
    "password": "Balboal.10",
    "email_confirm": true,
    "user_metadata": {
      "role": "admin"
    }
  }'
*/

-- Esta função SQL não cria usuários, mas valida as políticas RLS
-- Execute este SQL para garantir que as políticas estão corretas:

-- Verificar se RLS está habilitado
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Garantir que as políticas estão corretas (execute 003_fix_rls_policies_complete.sql primeiro)

