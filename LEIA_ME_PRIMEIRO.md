# 🚨 LEIA-ME PRIMEIRO - SOLUÇÃO DEFINITIVA

## ❌ PROBLEMA IDENTIFICADO

A tabela `login` foi criada **MANUALMENTE** com estrutura **ERRADA**:
- ❌ Coluna `senha` (deveria ser `password_hash`)
- ❌ Tipo `numeric` (deveria ser `TEXT`)
- ❌ Senha em texto plano (deveria ser hashada)

## ✅ SOLUÇÃO - 2 PASSOS SIMPLES

### ✅ PASSO 1: Corrigir a Tabela (OBRIGATÓRIO)

1. **Acesse:** https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
2. **Vá em:** SQL Editor
3. **Cole e execute este SQL:**

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
CREATE POLICY "Permitir leitura de login para verificação"
  ON login FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Permitir criação de usuários para registro"
  ON login FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Apenas autenticados podem atualizar login"
  ON login FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Apenas autenticados podem deletar login"
  ON login FOR DELETE TO authenticated USING (true);

-- Trigger
CREATE OR REPLACE FUNCTION update_login_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_login_updated_at ON login;
CREATE TRIGGER update_login_updated_at
  BEFORE UPDATE ON login FOR EACH ROW
  EXECUTE FUNCTION update_login_updated_at();
```

4. **Execute o SQL** (Run ou F5)
5. ✅ **Tabela corrigida!**

---

### ✅ PASSO 2: Criar Usuário (ESCOLHA UM)

#### **OPÇÃO A: Script HTML (MAIS FÁCIL)**

1. **Abra:** `TESTAR_CONEXAO.html` no navegador
2. **Clique em:** "1. Testar Conexão"
3. **Clique em:** "2. Gerar Hash"
4. **Clique em:** "3. Criar Usuário"
5. **Clique em:** "4. Testar Login"
6. ✅ **Pronto!**

#### **OPÇÃO B: Página de Registro**

1. **Acesse:** `http://localhost:8081/admin/signup`
2. **Preencha:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
   - Confirmar: `Balboal.10`
3. **Clique em:** "Criar Conta"
4. ✅ **Pronto!**

#### **OPÇÃO C: PowerShell Script**

1. **Execute no PowerShell:**
   ```powershell
   .\CRIAR_USUARIO_AGORA.ps1
   ```
2. ✅ **Pronto!**

---

## 🧪 TESTAR

1. **Acesse:** `http://localhost:8081/admin/login`
2. **Digite:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
3. **Clique em:** "Entrar"
4. ✅ **Deve funcionar!**

---

## 🔍 VERIFICAR NO SUPABASE

1. **Acesse:** Table Editor
2. **Selecione:** `login`
3. **Verifique:**
   - ✅ Coluna `password_hash` (TEXT) existe
   - ✅ Coluna `senha` (numeric) NÃO existe
   - ✅ Usuário aparece na lista
   - ✅ `password_hash` é uma string longa (hash)

---

## 🆘 AINDA NÃO FUNCIONA?

1. **Abra o console do navegador** (F12)
2. **Tente fazer login**
3. **Veja os logs** (vão mostrar exatamente o problema)
4. **Verifique:**
   - Se a tabela foi dropada e recriada
   - Se a coluna é `password_hash` (TEXT)
   - Se o usuário foi criado
   - Se o hash está correto

---

## 📋 CHECKLIST

- [ ] Tabela `login` foi dropada e recriada
- [ ] Coluna `password_hash` (TEXT) existe
- [ ] Coluna `senha` (numeric) NÃO existe
- [ ] Políticas RLS configuradas
- [ ] Usuário criado com hash correto
- [ ] Login funcionando
- [ ] Admin funcionando

---

**SIGA OS 2 PASSOS ACIMA E TESTE! 🚀**

