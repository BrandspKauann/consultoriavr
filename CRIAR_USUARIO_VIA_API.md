# 🔐 Criar Usuário Admin no Supabase - Métodos Disponíveis

## ⚠️ IMPORTANTE

**Não é possível criar usuários diretamente na tabela `auth.users` via SQL Editor.**

A tabela `auth.users` é protegida e gerenciada pelo Supabase Auth. Você precisa usar um dos métodos abaixo:

---

## ✅ MÉTODO 1: Criar Manualmente no Dashboard (MAIS FÁCIL)

### Passo a Passo:

1. **Acesse:** https://supabase.com/dashboard/project/cpejrontfflbzmssomnr

2. **Vá em Authentication → Users:**
   - Menu lateral → **"Authentication"**
   - Clique em **"Users"**

3. **Criar Novo Usuário:**
   - Clique em **"Add User"** (canto superior direito)
   - Selecione **"Create new user"**

4. **Preencha os Dados:**
   - **Email**: `marketingkauann@gmail.com`
   - **Password**: `Balboal.10`
   - **Auto Confirm User**: ✅ **MARQUE ESTA OPÇÃO** (OBRIGATÓRIO!)
   - **Send invitation email**: ❌ Desmarque

5. **Clique em "Create User"**
   - ✅ Usuário criado!

---

## ✅ MÉTODO 2: Usar a Página de Registro (RECOMENDADO)

### Passo a Passo:

1. **Acesse:** `http://localhost:8081/admin/signup`

2. **Preencha o Formulário:**
   - **Email**: `marketingkauann@gmail.com`
   - **Senha**: `Balboal.10`
   - **Confirmar Senha**: `Balboal.10`

3. **Clique em "Criar Conta"**
   - ✅ Usuário criado automaticamente!
   - ✅ Você será redirecionado para `/admin`

**⚠️ IMPORTANTE:** Para isso funcionar, você precisa:
- Email Provider habilitado no Supabase
- Email confirmations desabilitado (para desenvolvimento)

---

## ✅ MÉTODO 3: Usar API Admin via Terminal (AVANÇADO)

### Passo a Passo:

1. **Pegar Service Role Key:**
   - Acesse: https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
   - Vá em **Settings → API**
   - Copie a **"service_role" key** (NÃO a anon key!)
   - ⚠️ **NUNCA exponha esta chave no frontend!**

2. **Executar no Terminal (PowerShell ou CMD):**

```powershell
$serviceRoleKey = "SUA_SERVICE_ROLE_KEY_AQUI"
$url = "https://cpejrontfflbzmssomnr.supabase.co/auth/v1/admin/users"

$body = @{
    email = "marketingkauann@gmail.com"
    password = "Balboal.10"
    email_confirm = $true
    user_metadata = @{
        role = "admin"
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri $url -Method Post -Headers @{
    "apikey" = $serviceRoleKey
    "Authorization" = "Bearer $serviceRoleKey"
    "Content-Type" = "application/json"
} -Body $body
```

3. **OU usar curl (se tiver instalado):**

```bash
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
```

---

## 🎯 RECOMENDAÇÃO

**Use o MÉTODO 2 (Página de Registro)** - É o mais fácil e seguro:

1. Configure o Supabase Auth (Email Provider habilitado)
2. Acesse `/admin/signup`
3. Crie sua conta
4. Pronto!

---

## 🔧 Configurar Supabase Auth (OBRIGATÓRIO)

Para que o registro funcione, você precisa:

1. **Habilitar Email Provider:**
   - Authentication → Providers → Email → Habilitar

2. **Desabilitar Email Confirmations:**
   - Authentication → Settings → "Enable email confirmations" → Desabilitar

3. **Configurar URLs:**
   - Authentication → URL Configuration
   - Site URL: `http://localhost:8081`
   - Redirect URLs: `http://localhost:8081/**`

---

## 📋 Verificar se Funcionou

1. **No Supabase Dashboard:**
   - Authentication → Users
   - Verifique se o usuário aparece na lista
   - Verifique se "Email Confirmed" está TRUE

2. **Testar Login:**
   - Acesse `/admin/login`
   - Digite as credenciais
   - Deve funcionar!

---

## 🆘 Problemas

### Erro: "Email provider is not enabled"
- Vá em Authentication → Providers
- Habilite o provider "Email"

### Erro: "User already registered"
- O email já está cadastrado
- Use a página de login para fazer login
- OU use outro email

### Registro funciona mas não consigo fazer login
- Verifique se "Enable email confirmations" está desabilitado
- OU confirme o email manualmente no Supabase

---

**Escolha um dos métodos acima e crie seu usuário! 🚀**

