# 🔍 Diagnosticar Erro de Login - Passo a Passo

## ⚠️ Erro: "Invalid login credentials"

Este erro acontece quando:
1. ❌ Usuário não existe no Supabase
2. ❌ Senha está incorreta
3. ❌ Email está incorreto
4. ❌ Usuário não está confirmado

## 🔧 SOLUÇÃO COMPLETA:

### ✅ PASSO 1: Verificar se o Usuário Existe no Supabase

1. **Acesse:** https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
2. **Vá em:** Authentication → Users
3. **Procure por:** `marketingkauann@gmail.com`
4. **Se NÃO existir:** Vá para PASSO 2
5. **Se EXISTIR:** Vá para PASSO 3

---

### ✅ PASSO 2: Criar o Usuário (Se não existir)

1. **Clique em:** "Add User" (canto superior direito)
2. **Selecione:** "Create new user"
3. **Preencha EXATAMENTE:**
   - **Email**: `marketingkauann@gmail.com` (sem espaços!)
   - **Password**: `Balboal.10` (com "l" no final, não "a")
   - **Auto Confirm User**: ✅ **MARQUE ESTA OPÇÃO** (OBRIGATÓRIO!)
   - **Send invitation email**: ❌ Desmarque
4. **Clique em:** "Create User"
5. ✅ Aguarde a confirmação

---

### ✅ PASSO 3: Verificar Configurações do Usuário

Se o usuário JÁ existe, verifique:

1. **Clique no usuário:** `marketingkauann@gmail.com`
2. **Verifique:**
   - **Email**: Deve ser `marketingkauann@gmail.com` (exatamente assim)
   - **Email Confirmed**: Deve estar ✅ **TRUE**
   - **Created At**: Deve ter uma data recente

3. **Se "Email Confirmed" estiver FALSE:**
   - Clique em "Confirm email" manualmente
   - OU delete o usuário e crie novamente com "Auto Confirm User" marcado

---

### ✅ PASSO 4: Resetar Senha (Se necessário)

1. **No Supabase:** Authentication → Users
2. **Clique no usuário**
3. **Clique em:** "Reset Password"
4. **Defina nova senha:** `Balboal.10` (com "l" no final)
5. **Salve**

---

### ✅ PASSO 5: Verificar Credenciais no Login

**Credenciais EXATAS:**
- **Email**: `marketingkauann@gmail.com` (tudo minúsculo, sem espaços)
- **Senha**: `Balboal.10` (com "l" no final, não "a")

**⚠️ CUIDADO:**
- Não adicione espaços antes/depois
- Email deve ser tudo minúsculo
- Senha é case-sensitive (maiúsculas/minúsculas importam)

---

### ✅ PASSO 6: Testar no Console do Navegador

1. **Abra o console do navegador** (F12)
2. **Vá na aba "Console"**
3. **Tente fazer login**
4. **Veja os logs:**
   - Deve aparecer: "Tentando fazer login com: { email: '...', passwordLength: ... }"
   - Veja se o email está correto
   - Veja se a senha tem o tamanho correto (10 caracteres)

---

### ✅ PASSO 7: Verificar Configuração do Supabase

1. **No Supabase:** Settings → API
2. **Verifique:**
   - **Project URL**: Deve ser `https://cpejrontfflbzmssomnr.supabase.co`
   - **anon public key**: Deve estar no arquivo `.env`

3. **Verifique o arquivo `.env`:**
   ```env
   VITE_SUPABASE_URL=https://cpejrontfflbzmssomnr.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## 🆘 SOLUÇÃO ALTERNATIVA: Deletar e Recriar Usuário

Se nada funcionar, delete e recrie o usuário:

1. **No Supabase:** Authentication → Users
2. **Clique no usuário:** `marketingkauann@gmail.com`
3. **Clique em:** "Delete User"
4. **Confirme a exclusão**
5. **Crie novamente** (PASSO 2)
6. **Teste o login**

---

## 📋 CHECKLIST COMPLETO:

- [ ] Usuário existe no Supabase
- [ ] Email: `marketingkauann@gmail.com` (exatamente assim)
- [ ] Senha: `Balboal.10` (com "l" no final)
- [ ] "Auto Confirm User" marcado ao criar
- [ ] "Email Confirmed" = TRUE no Supabase
- [ ] Credenciais digitadas corretamente (sem espaços)
- [ ] Arquivo `.env` configurado corretamente
- [ ] Servidor reiniciado após mudanças
- [ ] Console do navegador verificado (F12)

---

## 🔑 CREDENCIAIS CORRETAS (Copie e Cole):

**Email:**
```
marketingkauann@gmail.com
```

**Senha:**
```
Balboal.10
```

---

## 🎯 PRÓXIMOS PASSOS:

1. ✅ Verifique se o usuário existe no Supabase
2. ✅ Se não existir, crie com "Auto Confirm User" marcado
3. ✅ Verifique se "Email Confirmed" = TRUE
4. ✅ Teste o login novamente
5. ✅ Veja os logs no console (F12) para mais detalhes

---

**Siga os passos acima e me diga o que encontrou!**

