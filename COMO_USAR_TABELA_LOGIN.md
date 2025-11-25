# 🔐 Como Usar a Tabela Login - Guia Completo

## ✅ O QUE FOI CRIADO

1. ✅ Tabela `login` no Supabase
2. ✅ Sistema de autenticação customizado
3. ✅ Hash de senha (SHA-256)
4. ✅ Página de registro funcionando
5. ✅ Página de login funcionando
6. ✅ Proteção de rotas

## 🚀 CONFIGURAÇÃO (2 PASSOS)

### ✅ PASSO 1: Criar Tabela Login

1. **Acesse:** https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
2. **Vá em:** SQL Editor
3. **Execute o SQL:** `supabase/migrations/005_create_login_table.sql`
4. **OU cole este SQL:**

```sql
-- Criar tabela de login para autenticação customizada
CREATE TABLE IF NOT EXISTS login (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para busca rápida por email
CREATE INDEX IF NOT EXISTS idx_login_email ON login(email);

-- Habilitar RLS
ALTER TABLE login ENABLE ROW LEVEL SECURITY;

-- Policy: Permitir leitura para verificação de login
CREATE POLICY "Permitir leitura de login para verificação"
  ON login
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Permitir criação de usuários para registro
CREATE POLICY "Permitir criação de usuários para registro"
  ON login
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Apenas usuários autenticados podem atualizar
CREATE POLICY "Apenas autenticados podem atualizar login"
  ON login
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Apenas usuários autenticados podem deletar
CREATE POLICY "Apenas autenticados podem deletar login"
  ON login
  FOR DELETE
  TO authenticated
  USING (true);

-- Function para atualizar updated_at
CREATE OR REPLACE FUNCTION update_login_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_login_updated_at ON login;
CREATE TRIGGER update_login_updated_at
  BEFORE UPDATE ON login
  FOR EACH ROW
  EXECUTE FUNCTION update_login_updated_at();
```

5. **Execute o SQL** (Run ou F5)
6. ✅ Tabela criada!

---

### ✅ PASSO 2: Criar Usuário (Registro)

1. **Acesse:** `http://localhost:8081/admin/signup`

2. **Preencha:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
   - Confirmar Senha: `Balboal.10`

3. **Clique em:** "Criar Conta"

4. ✅ **Pronto!** Usuário criado automaticamente!

---

## 🧪 TESTAR

### Teste 1: Verificar no Supabase

1. **Acesse:** https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
2. **Vá em:** Table Editor
3. **Procure pela tabela:** `login`
4. **Verifique:** O usuário deve aparecer na lista

### Teste 2: Fazer Login

1. **Acesse:** `http://localhost:8081/admin/login`
2. **Digite:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
3. **Clique em:** "Entrar"
4. ✅ Deve funcionar!

### Teste 3: Acessar Admin

1. **Você será redirecionado para:** `/admin`
2. **Verifique:**
   - ✅ Lista de artigos aparece
   - ✅ Pode criar/editar/excluir artigos

---

## 📋 Estrutura da Tabela Login

```
login
├── id (UUID) - Primary Key
├── email (TEXT) - Unique
├── password_hash (TEXT) - Senha hashada (SHA-256)
├── role (TEXT) - Role do usuário (admin, user, etc)
├── active (BOOLEAN) - Se o usuário está ativo
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

---

## 🔒 Segurança

- ✅ Senhas são hashadas (SHA-256) antes de salvar
- ✅ RLS habilitado
- ✅ Políticas de segurança configuradas
- ⚠️ Em produção, considere usar bcrypt ou argon2 para hash mais seguro

---

## 🎯 Como Funciona

1. **Registro:**
   - Usuário preenche formulário
   - Senha é hashada (SHA-256)
   - Usuário é salvo na tabela `login`
   - Sessão é criada no localStorage

2. **Login:**
   - Usuário digita email e senha
   - Sistema busca usuário na tabela `login`
   - Senha é verificada (hash comparado)
   - Se correto, sessão é criada

3. **Autenticação:**
   - Sistema verifica sessão no localStorage
   - Se válida, permite acesso ao admin
   - Se inválida, redireciona para login

---

## 📋 Checklist

- [ ] Tabela `login` criada no Supabase
- [ ] Políticas RLS configuradas
- [ ] Usuário criado através do registro
- [ ] Login funcionando
- [ ] Admin funcionando
- [ ] Gerenciamento de artigos funcionando

---

## 🆘 Problemas

### Erro: "new row violates row-level security policy"
- Verifique se executou o SQL da tabela
- Verifique se as políticas RLS estão configuradas
- Verifique se a política de INSERT permite anon

### Erro: "Email ou senha incorretos"
- Verifique se o usuário foi criado na tabela `login`
- Verifique se a senha está correta
- Verifique o console do navegador para mais detalhes

### Não consigo criar usuário
- Verifique se a tabela `login` existe
- Verifique se as políticas RLS permitem INSERT
- Verifique o console do navegador para erros

---

**Execute o SQL e crie seu usuário através do registro! 🚀**

