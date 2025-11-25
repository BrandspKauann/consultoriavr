# Configurar Supabase Auth para Registro Automático

## Objetivo

Configurar o Supabase Auth para permitir que usuários se registrem automaticamente através da interface, sem necessidade de criar manualmente no Dashboard.

## Passo a Passo

### 1. Habilitar Email Provider

1. **Acesse o Supabase Dashboard:**
   - https://supabase.com/dashboard/project/cpejrontfflbzmssomnr

2. **Vá em Authentication → Providers:**
   - Menu lateral → **"Authentication"**
   - Clique em **"Providers"**

3. **Habilitar Email:**
   - Procure por **"Email"** na lista de providers
   - Certifique-se de que está **habilitado** (toggle ON)
   - Se não estiver, clique para habilitar

---

### 2. Configurar Email Confirmation (Opcional)

**Opção A: Desabilitar Confirmação de Email (Recomendado para Desenvolvimento)**

1. **Vá em Authentication → Settings:**
   - Menu lateral → **"Authentication"** → **"Settings"**

2. **Configurar Email Confirmation:**
   - Procure por **"Enable email confirmations"**
   - **Desmarque** esta opção (OFF)
   - Isso permite que usuários sejam autenticados imediatamente após registro

**Opção B: Habilitar Confirmação de Email (Recomendado para Produção)**

1. **Vá em Authentication → Settings:**
   - Menu lateral → **"Authentication"** → **"Settings"**

2. **Configurar Email Confirmation:**
   - Procure por **"Enable email confirmations"**
   - **Marque** esta opção (ON)
   - Usuários receberão email de confirmação antes de poderem fazer login

---

### 3. Configurar Site URL e Redirect URLs

1. **Vá em Authentication → URL Configuration:**
   - Menu lateral → **"Authentication"** → **"URL Configuration"**

2. **Configurar Site URL:**
   - **Site URL**: `http://localhost:8081` (para desenvolvimento)
   - OU `https://seu-dominio.com` (para produção)

3. **Configurar Redirect URLs:**
   - Adicione as seguintes URLs:
     - `http://localhost:8081/admin/login`
     - `http://localhost:8081/admin/signup`
     - `http://localhost:8081/**` (wildcard para desenvolvimento)
   - Para produção, adicione:
     - `https://seu-dominio.com/admin/login`
     - `https://seu-dominio.com/admin/signup`

---

### 4. Verificar Configurações de Segurança

1. **Vá em Authentication → Settings:**
   - Menu lateral → **"Authentication"** → **"Settings"**

2. **Verificar:**
   - **Minimum password length**: 6 (padrão)
   - **Password requirements**: Pode deixar padrão
   - **Rate limiting**: Habilitado (proteção contra spam)

---

### 5. Testar o Registro

1. **Acesse:** `http://localhost:8081/admin/signup`
2. **Preencha:**
   - Email: `seu@email.com`
   - Senha: `suaSenha123`
   - Confirmar Senha: `suaSenha123`
3. **Clique em:** "Criar Conta"
4. **Resultado esperado:**
   - Se email confirmation estiver **desabilitado**: Você será redirecionado para `/admin` automaticamente
   - Se email confirmation estiver **habilitado**: Você verá mensagem para verificar email

---

## Configuração Recomendada para Desenvolvimento

Para facilitar o desenvolvimento, recomendo:

1. ✅ **Email Provider**: Habilitado
2. ❌ **Enable email confirmations**: Desabilitado
3. ✅ **Site URL**: `http://localhost:8081`
4. ✅ **Redirect URLs**: Incluir `http://localhost:8081/**`

Isso permite que usuários sejam autenticados imediatamente após registro, sem precisar confirmar email.

---

## Configuração para Produção

Para produção, recomendo:

1. ✅ **Email Provider**: Habilitado
2. ✅ **Enable email confirmations**: Habilitado
3. ✅ **Site URL**: `https://seu-dominio.com`
4. ✅ **Redirect URLs**: URLs específicas do seu domínio
5. ✅ **Rate limiting**: Habilitado
6. ✅ **Password requirements**: Configurar requisitos fortes

---

## Verificar se Está Funcionando

### Teste 1: Criar Novo Usuário

1. Acesse `/admin/signup`
2. Crie uma conta com email novo
3. Verifique se:
   - ✅ Conta é criada com sucesso
   - ✅ Você é redirecionado (para `/admin` ou `/admin/login` dependendo da configuração)
   - ✅ Você pode fazer login depois

### Teste 2: Verificar no Supabase

1. **Vá em Authentication → Users:**
   - Menu lateral → **"Authentication"** → **"Users"**
2. **Verifique:**
   - ✅ Novo usuário aparece na lista
   - ✅ Email está correto
   - ✅ "Email Confirmed" está TRUE (se confirmação estiver desabilitada)

### Teste 3: Fazer Login

1. Acesse `/admin/login`
2. Use as credenciais criadas
3. Verifique se:
   - ✅ Login funciona
   - ✅ Você é redirecionado para `/admin`
   - ✅ Pode acessar o painel

---

## Problemas Comuns

### ❌ Erro: "Email provider is not enabled"
**Solução:**
- Vá em Authentication → Providers
- Habilite o provider "Email"

### ❌ Erro: "Invalid redirect URL"
**Solução:**
- Vá em Authentication → URL Configuration
- Adicione a URL de redirect nas configurações

### ❌ Usuário criado mas não pode fazer login
**Solução:**
- Verifique se "Enable email confirmations" está desabilitado
- OU confirme o email manualmente no Supabase Dashboard

### ❌ Erro: "User already registered"
**Solução:**
- O email já está cadastrado
- Use outro email ou faça login com o email existente

---

## Checklist

- [ ] Email Provider habilitado
- [ ] Email confirmations configurado (desabilitado para dev)
- [ ] Site URL configurado
- [ ] Redirect URLs configuradas
- [ ] Teste de registro funcionando
- [ ] Teste de login funcionando
- [ ] Usuário aparece no Supabase Dashboard

---

**Após configurar, teste o registro e me avise se funcionou!**

