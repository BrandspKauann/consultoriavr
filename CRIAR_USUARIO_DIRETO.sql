-- CRIAR USUÁRIO DIRETO NO BANCO
-- Execute este SQL APÓS executar o 006_FIX_LOGIN_TABLE.sql
-- Este SQL cria o usuário com a senha hashada corretamente

-- PRIMEIRO: Você precisa obter o hash da senha "Balboal.10"
-- Abra o console do navegador (F12) e execute:
/*
(async () => {
  const encoder = new TextEncoder();
  const data = encoder.encode('Balboal.10');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  console.log('HASH:', hashHex);
  return hashHex;
})();
*/

-- Depois, substitua HASH_AQUI pelo hash gerado e execute:
INSERT INTO login (email, password_hash, role, active) 
VALUES (
  'marketingkauann@gmail.com',
  'HASH_AQUI', -- Cole o hash gerado aqui
  'admin',
  true
) ON CONFLICT (email) DO UPDATE 
SET password_hash = EXCLUDED.password_hash,
    active = true,
    updated_at = NOW();

-- OU use este hash pré-calculado (senha: Balboal.10):
-- Hash SHA-256 de "Balboal.10": 
-- 8f8c8e8d9a9b9c9d9e9f0a0b0c0d0e0f1a1b1c1d1e1f2a2b2c2d2e2f3a3b3c3d3e3f4a
-- (Isso é apenas um exemplo - você precisa gerar o hash real)

