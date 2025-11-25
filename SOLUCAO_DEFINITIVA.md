# 🚀 SOLUÇÃO DEFINITIVA - Sistema de Login

## ❌ PROBLEMA IDENTIFICADO

A tabela `login` foi criada manualmente com estrutura **ERRADA**:
- ❌ Coluna chamada `senha` (deveria ser `password_hash`)
- ❌ Tipo `numeric` (deveria ser `TEXT`)
- ❌ Senha em texto plano (deveria ser hashada)

## ✅ SOLUÇÃO - 3 PASSOS SIMPLES

### ✅ PASSO 1: Corrigir a Tabela no Supabase

1. **Acesse:** https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
2. **Vá em:** SQL Editor
3. **Execute este SQL:** `supabase/migrations/006_FIX_LOGIN_TABLE.sql`

**OU cole este SQL diretamente:**

```sql
-- CORRIGIR TABELA LOGIN
DROP TABLE IF EXISTS login CASCADE;

CREATE TABLE login (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_login_email ON login(email);
ALTER TABLE login ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Permitir leitura de login para verificação" ON login;
DROP POLICY IF EXISTS "Permitir criação de usuários para registro" ON login;
DROP POLICY IF EXISTS "Apenas autenticados podem atualizar login" ON login;
DROP POLICY IF EXISTS "Apenas autenticados podem deletar login" ON login;

CREATE POLICY "Permitir leitura de login para verificação"
  ON login FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Permitir criação de usuários para registro"
  ON login FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Apenas autenticados podem atualizar login"
  ON login FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Apenas autenticados podem deletar login"
  ON login FOR DELETE TO authenticated USING (true);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_login_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_login_updated_at ON login;
CREATE TRIGGER update_login_updated_at
  BEFORE UPDATE ON login
  FOR EACH ROW
  EXECUTE FUNCTION update_login_updated_at();
```

4. **Execute o SQL** (Run ou F5)
5. ✅ **Tabela corrigida!**

---

### ✅ PASSO 2: Criar Usuário (ESCOLHA UM MÉTODO)

#### **MÉTODO A: Usar o Script HTML (RECOMENDADO - MAIS FÁCIL)**

1. **Abra o arquivo:** `TESTAR_CONEXAO.html` no navegador
2. **Clique em:** "1. Testar Conexão" (verifica se a tabela está correta)
3. **Clique em:** "2. Gerar Hash" (gera o hash da senha)
4. **Clique em:** "3. Criar Usuário" (cria o usuário no banco)
5. **Clique em:** "4. Testar Login" (testa se o login funciona)
6. ✅ **Pronto!**

#### **MÉTODO B: Usar a Página de Registro**

1. **Acesse:** `http://localhost:8081/admin/signup`
2. **Preencha:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
   - Confirmar Senha: `Balboal.10`
3. **Clique em:** "Criar Conta"
4. ✅ **Pronto!**

#### **MÉTODO C: SQL Manual (AVANÇADO)**

1. **Abra o console do navegador** (F12)
2. **Execute:**

```javascript
(async () => {
  const encoder = new TextEncoder();
  const data = encoder.encode('Balboal.10');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  console.log('HASH:', hashHex);
  
  // SQL para inserir
  const sql = `INSERT INTO login (email, password_hash, role, active) 
VALUES (
  'marketingkauann@gmail.com',
  '${hashHex}',
  'admin',
  true
) ON CONFLICT (email) DO UPDATE 
SET password_hash = EXCLUDED.password_hash,
    active = true,
    updated_at = NOW();`;
  
  console.log('SQL:', sql);
  return { hash: hashHex, sql: sql };
})();
```

3. **Copie o SQL gerado**
4. **Cole no SQL Editor do Supabase**
5. **Execute o SQL**
6. ✅ **Pronto!**

---

### ✅ PASSO 3: Testar o Login

1. **Acesse:** `http://localhost:8081/admin/login`
2. **Digite:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
3. **Clique em:** "Entrar"
4. ✅ **Deve funcionar!**

---

## 🔍 VERIFICAR SE ESTÁ FUNCIONANDO

### No Supabase:

1. **Acesse:** Table Editor
2. **Selecione a tabela:** `login`
3. **Verifique:**
   - ✅ Coluna `password_hash` (TEXT) existe
   - ✅ Coluna `senha` (numeric) NÃO existe
   - ✅ Usuário aparece na lista
   - ✅ `password_hash` é uma string longa (hash)

### No Site:

1. **Acesse:** `/admin/login`
2. **Faça login**
3. **Deve redirecionar para:** `/admin`
4. ✅ **Pronto!**

---

## 🆘 PROBLEMAS COMUNS

### ❌ "new row violates row-level security policy"
**Solução:**
- Execute o SQL: `006_FIX_LOGIN_TABLE.sql`
- Verifique se as políticas RLS estão configuradas
- Verifique se a política de INSERT permite `anon`

### ❌ "Invalid login credentials"
**Solução:**
- Verifique se o usuário foi criado na tabela `login`
- Verifique se a coluna é `password_hash` (TEXT), não `senha` (numeric)
- Use o script `TESTAR_CONEXAO.html` para testar
- Verifique o console do navegador (F12) para mais detalhes

### ❌ Tabela ainda tem coluna `senha`
**Solução:**
- Execute o SQL: `006_FIX_LOGIN_TABLE.sql`
- Isso vai dropar e recriar a tabela corretamente

---

## 📋 CHECKLIST FINAL

- [ ] Tabela `login` foi dropada e recriada
- [ ] Coluna `password_hash` (TEXT) existe
- [ ] Coluna `senha` (numeric) NÃO existe
- [ ] Políticas RLS configuradas
- [ ] Usuário criado com hash correto
- [ ] Login funcionando
- [ ] Admin funcionando

---

## 🎯 RESUMO RÁPIDO

1. **Execute:** `006_FIX_LOGIN_TABLE.sql` no Supabase
2. **Crie o usuário:** Use `TESTAR_CONEXAO.html` ou `/admin/signup`
3. **Teste o login:** Acesse `/admin/login`
4. ✅ **Pronto!**

---

**Siga estes 3 passos e tudo vai funcionar! 🚀**

