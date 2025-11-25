# 🔐 Como Criar Usuário Admin - Guia Rápido

## 🎯 3 FORMAS DE CRIAR USUÁRIO

### ✅ FORMA 1: Página de Registro (MAIS FÁCIL - RECOMENDADO)

1. **Configure o Supabase Auth primeiro:**
   - Authentication → Providers → Email → Habilitar
   - Authentication → Settings → "Enable email confirmations" → Desabilitar
   - Authentication → URL Configuration → Site URL: `http://localhost:8081`

2. **Acesse:** `http://localhost:8081/admin/signup`

3. **Preencha:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
   - Confirmar Senha: `Balboal.10`

4. **Clique em:** "Criar Conta"

5. ✅ **Pronto!** Usuário criado automaticamente!

---

### ✅ FORMA 2: Dashboard do Supabase (MANUAL)

1. **Acesse:** https://supabase.com/dashboard/project/cpejrontfflbzmssomnr

2. **Vá em:** Authentication → Users

3. **Clique em:** "Add User" → "Create new user"

4. **Preencha:**
   - Email: `marketingkauann@gmail.com`
   - Password: `Balboal.10`
   - **Auto Confirm User**: ✅ MARQUE ESTA OPÇÃO
   - Send invitation email: ❌ Desmarque

5. **Clique em:** "Create User"

6. ✅ **Pronto!** Usuário criado!

---

### ✅ FORMA 3: Script PowerShell (AUTOMÁTICO)

1. **Pegue sua Service Role Key:**
   - Supabase Dashboard → Settings → API
   - Copie a **"service_role" key**

2. **Abra o arquivo:** `SCRIPT_CRIAR_USUARIO.ps1`

3. **Substitua:** `COLE_SUA_SERVICE_ROLE_KEY_AQUI` pela sua chave

4. **Execute no PowerShell:**
   ```powershell
   .\SCRIPT_CRIAR_USUARIO.ps1
   ```

5. ✅ **Pronto!** Usuário criado!

---

## 🔧 IMPORTANTE: Configurar Supabase Auth

**Antes de usar a FORMA 1 (Registro), configure:**

1. **Email Provider:**
   - Authentication → Providers → Email → Habilitar

2. **Email Confirmations:**
   - Authentication → Settings → "Enable email confirmations" → Desabilitar

3. **URLs:**
   - Authentication → URL Configuration
   - Site URL: `http://localhost:8081`
   - Redirect URLs: `http://localhost:8081/**`

---

## 🎯 RECOMENDAÇÃO

**Use a FORMA 1 (Página de Registro)** - É a mais fácil e já está implementada!

1. Configure o Supabase Auth (passos acima)
2. Acesse `/admin/signup`
3. Crie sua conta
4. Pronto!

---

## 📋 Verificar se Funcionou

1. **No Supabase:**
   - Authentication → Users
   - Verifique se o usuário aparece

2. **Testar Login:**
   - Acesse `/admin/login`
   - Digite as credenciais
   - Deve funcionar!

---

**Escolha uma das formas acima e crie seu usuário! 🚀**

