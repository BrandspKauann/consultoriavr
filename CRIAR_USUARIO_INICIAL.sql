-- Script para criar usuário inicial na tabela login
-- IMPORTANTE: A senha será hashada no código TypeScript
-- Este SQL cria a tabela, mas o usuário deve ser criado através da página de registro
-- OU você pode inserir manualmente usando o hash correto

-- Primeiro, execute o SQL: supabase/migrations/005_create_login_table.sql
-- Depois, use uma das opções abaixo:

-- OPÇÃO 1: Usar a página de registro (RECOMENDADO)
-- 1. Acesse: http://localhost:8081/admin/signup
-- 2. Preencha o formulário
-- 3. Clique em "Criar Conta"
-- 4. Usuário será criado automaticamente com senha hashada

-- OPÇÃO 2: Inserir manualmente (senha precisa ser hashada)
-- Para hashar a senha "Balboal.10", você precisa:
-- 1. Usar o código TypeScript que hashará a senha
-- 2. OU usar uma ferramenta online de hash SHA-256
-- 3. Inserir o hash no banco

-- Exemplo de como obter o hash da senha "Balboal.10":
-- Execute no console do navegador (após carregar o site):
/*
(async () => {
  const encoder = new TextEncoder();
  const data = encoder.encode('Balboal.10');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  console.log('Hash da senha Balboal.10:', hashHex);
})();
*/

-- Depois, insira no banco:
/*
INSERT INTO login (email, password_hash, role, active) 
VALUES (
  'marketingkauann@gmail.com',
  'HASH_AQUI', -- Cole o hash gerado acima
  'admin',
  true
) ON CONFLICT (email) DO NOTHING;
*/

-- NOTA: A maneira mais fácil é usar a página de registro!
-- Acesse: http://localhost:8081/admin/signup

