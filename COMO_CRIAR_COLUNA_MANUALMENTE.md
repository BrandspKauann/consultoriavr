# 📋 Como Criar a Coluna `password_hash` Manualmente

## ⚠️ IMPORTANTE: `password_hash` é o NOME da coluna, não o tipo!

O tipo de dados deve ser **`text`** ou **`varchar`**.

---

## ✅ MÉTODO 1: Usar SQL Editor (RECOMENDADO - MAIS FÁCIL)

### Passo 1: Acessar SQL Editor

1. **Acesse:** https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
2. **Vá em:** SQL Editor (menu lateral)
3. **Clique em:** "New query"

### Passo 2: Executar o SQL

**Cole este SQL completo e execute:**

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

4. **Clique em:** "Run" ou pressione `F5`
5. ✅ **Tabela criada com sucesso!**

---

## ✅ MÉTODO 2: Criar Manualmente na Interface (ALTERNATIVA)

### Passo 1: Acessar Table Editor

1. **Acesse:** https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
2. **Vá em:** Table Editor (menu lateral)
3. **Clique em:** "New table" (ou edite a tabela `login` existente)

### Passo 2: Criar/Editar Tabela

**Se a tabela `login` já existe:**
1. **Clique nos 3 pontos** ao lado da tabela `login`
2. **Selecione:** "Edit table" ou "Add column"

**Se a tabela não existe:**
1. **Clique em:** "New table"
2. **Nome da tabela:** `login`

### Passo 3: Adicionar Colunas

**Adicione as seguintes colunas:**

1. **Coluna `id`:**
   - **Name:** `id`
   - **Type:** `uuid` (procure por "uuid" na lista)
   - **Default value:** `gen_random_uuid()`
   - **Primary key:** ✅ (marque como chave primária)

2. **Coluna `email`:**
   - **Name:** `email`
   - **Type:** `text` (procure por "text" na lista - é a opção com ícone "T")
   - **Nullable:** ❌ (desmarque - não pode ser nulo)
   - **Unique:** ✅ (marque como único)

3. **Coluna `password_hash`:**
   - **Name:** `password_hash` ← ESTE É O NOME DA COLUNA
   - **Type:** `text` ← ESTE É O TIPO (procure por "text" na lista)
   - **Nullable:** ❌ (desmarque - não pode ser nulo)

4. **Coluna `role`:**
   - **Name:** `role`
   - **Type:** `text`
   - **Default value:** `admin`
   - **Nullable:** ✅ (pode ser nulo)

5. **Coluna `active`:**
   - **Name:** `active`
   - **Type:** `bool` (procure por "bool" na lista)
   - **Default value:** `true`
   - **Nullable:** ✅ (pode ser nulo)

6. **Coluna `created_at`:**
   - **Name:** `created_at`
   - **Type:** `timestamptz` (procure por "timestamptz" na lista)
   - **Default value:** `now()`
   - **Nullable:** ✅ (pode ser nulo)

7. **Coluna `updated_at`:**
   - **Name:** `updated_at`
   - **Type:** `timestamptz`
   - **Nullable:** ✅ (pode ser nulo)

### Passo 4: Salvar

1. **Clique em:** "Save" ou "Create table"
2. ✅ **Tabela criada!**

### Passo 5: Configurar RLS (Row Level Security)

1. **Na tabela `login`, clique em:** "Add RLS policy"
2. **Ou vá em:** SQL Editor e execute as políticas RLS do SQL acima

---

## 📋 RESUMO VISUAL

```
Coluna: password_hash
  ↓
Nome: password_hash  ← Você digita isso
  ↓
Tipo: text          ← Você seleciona "text" da lista
  ↓
Nullable: Não       ← Você desmarca
```

---

## 🎯 TIPOS DE DADOS CORRETOS

| Coluna | Tipo | Onde encontrar |
|--------|------|----------------|
| `id` | `uuid` | Procure por "uuid" |
| `email` | `text` | Procure por "text" (ícone T) |
| `password_hash` | `text` | Procure por "text" (ícone T) |
| `role` | `text` | Procure por "text" (ícone T) |
| `active` | `bool` | Procure por "bool" |
| `created_at` | `timestamptz` | Procure por "timestamptz" |
| `updated_at` | `timestamptz` | Procure por "timestamptz" |

---

## ⚠️ IMPORTANTE

- ✅ `password_hash` é o **NOME** da coluna (você digita)
- ✅ `text` é o **TIPO** da coluna (você seleciona da lista)
- ❌ Não existe um tipo chamado "password_hash"
- ❌ Não use `numeric` ou `int` para senhas

---

## 🚀 DEPOIS DE CRIAR A TABELA

1. **Use o SQL Editor** para adicionar as políticas RLS (veja o SQL acima)
2. **Ou crie o usuário** usando a página de registro: `http://localhost:8081/admin/signup`
3. **Ou use o script:** `TESTAR_CONEXAO.html`

---

**Siga o MÉTODO 1 (SQL Editor) - é mais rápido e fácil! 🚀**

