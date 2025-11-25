# 🔧 Solucionar: "Invalid login credentials"

## 🎯 SOLUÇÃO RÁPIDA:

### ✅ PASSO 1: Criar Usuário no Supabase

1. **Acesse:** https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
2. **Vá em:** Authentication → Users
3. **Clique em:** "Add User" → "Create new user"
4. **Preencha:**
   - **Email**: `marketingkauann@gmail.com`
   - **Password**: `Balboal.10` (com "l" no final)
   - **Auto Confirm User**: ✅ **MARQUE ESTA OPÇÃO** (OBRIGATÓRIO!)
   - **Send invitation email**: ❌ Desmarque
5. **Clique em:** "Create User"

---

### ✅ PASSO 2: Verificar Credenciais

**Credenciais corretas:**
- Email: `marketingkauann@gmail.com`
- Senha: `Balboal.10` (com "l", não "a")

**⚠️ ATENÇÃO:**
- Na imagem vi que você digitou: `Balboa.10`
- Mas a senha correta é: `Balboal.10` (com "l" no final)

---

### ✅ PASSO 3: Verificar se Usuário Está Confirmado

1. **No Supabase, vá em:** Authentication → Users
2. **Clique no usuário:** `marketingkauann@gmail.com`
3. **Verifique:**
   - **Email Confirmed**: Deve estar ✅ **TRUE**
   - Se estiver ❌ FALSE → Clique em "Confirm email"

---

### ✅ PASSO 4: Testar Novamente

1. **Acesse:** `http://localhost:8081/admin/login`
2. **Digite:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10` (verifique se está com "l" no final!)
3. **Clique em:** "Entrar"
4. ✅ Deve funcionar!

---

## 🆘 SE AINDA NÃO FUNCIONAR:

### Opção A: Deletar e Recriar Usuário

1. **No Supabase:** Authentication → Users
2. **Clique no usuário**
3. **Clique em:** "Delete User"
4. **Crie novamente** (PASSO 1)
5. **Teste novamente**

### Opção B: Resetar Senha

1. **No Supabase:** Authentication → Users
2. **Clique no usuário**
3. **Clique em:** "Reset Password"
4. **Defina nova senha:** `Balboal.10`
5. **Teste novamente**

---

## 📋 CHECKLIST:

- [ ] Usuário criado no Supabase
- [ ] Email: `marketingkauann@gmail.com`
- [ ] Senha: `Balboal.10` (com "l" no final)
- [ ] "Auto Confirm User" marcado
- [ ] Email Confirmed = TRUE
- [ ] Credenciais digitadas corretamente
- [ ] Sem espaços antes/depois do email/senha

---

## 🔑 CREDENCIAIS CORRETAS:

- **Email**: `marketingkauann@gmail.com`
- **Senha**: `Balboal.10` (com "l" no final, não "a")

---

**Siga os passos acima e me diga se funcionou!**

