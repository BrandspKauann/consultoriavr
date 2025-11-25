# 🔐 Instruções para Criar Usuário Admin

## ⚠️ IMPORTANTE: Não é possível criar usuários via SQL Editor

A tabela `auth.users` do Supabase é protegida e não pode ser modificada diretamente via SQL.

## ✅ SOLUÇÃO: Use o Script PowerShell

### Passo 1: Pegar Service Role Key

1. **Acesse:** https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
2. **Vá em:** Settings → API
3. **Copie a "service_role" key** (NÃO a anon key!)
   - É uma chave longa começando com `eyJ...`
   - ⚠️ **MANTENHA ESTA CHAVE SECRETA!**

### Passo 2: Executar o Script

1. **Abra o PowerShell** (ou Terminal)
2. **Navegue até a pasta do projeto:**
   ```powershell
   cd C:\Users\Administrador\Downloads\site_hirayama
   ```

3. **Execute o script:**
   ```powershell
   .\CRIAR_USUARIO_ADMIN.ps1
   ```

4. **Quando pedir, cole a SERVICE_ROLE_KEY**

5. **Aguarde a criação do usuário**

6. ✅ **Pronto!** Usuário criado!

### Passo 3: Testar Login

1. **Acesse:** `http://localhost:8081/admin/login`
2. **Digite:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
3. **Clique em:** "Entrar"
4. ✅ Deve funcionar!

---

## 🔄 ALTERNATIVA: Usar a Página de Registro

Se preferir, você pode usar a página de registro que já está implementada:

1. **Configure o Supabase Auth:**
   - Authentication → Providers → Email → Habilitar
   - Authentication → Settings → "Enable email confirmations" → Desabilitar

2. **Acesse:** `http://localhost:8081/admin/signup`

3. **Crie sua conta**

4. ✅ **Pronto!**

---

## 📋 Verificar se Funcionou

1. **No Supabase Dashboard:**
   - Authentication → Users
   - Verifique se o usuário `marketingkauann@gmail.com` aparece

2. **Testar Login:**
   - Acesse `/admin/login`
   - Faça login
   - Deve funcionar!

---

## 🆘 Problemas

### Erro: "Invalid API key"
- Verifique se copiou a SERVICE_ROLE_KEY correta
- Verifique se não copiou a anon key por engano

### Erro: "User already registered"
- O email já está cadastrado
- Use a página de login para fazer login
- OU delete o usuário no Supabase e crie novamente

### Script não executa
- Verifique se está no PowerShell (não CMD)
- Execute: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Tente novamente

---

**Execute o script e crie seu usuário! 🚀**

