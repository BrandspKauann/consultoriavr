# 🔍 Solucionar Erro: "Invalid login credentials"

## ⚠️ Possíveis Causas:

1. ❌ Usuário não foi criado no Supabase
2. ❌ Email ou senha incorretos
3. ❌ Usuário criado mas não confirmado
4. ❌ Configuração do Supabase Auth incorreta

## ✅ SOLUÇÃO PASSO A PASSO:

### PASSO 1: Verificar se o Usuário Existe

1. **Acesse o Supabase Dashboard:**
   - https://supabase.com/dashboard/project/cpejrontfflbzmssomnr

2. **Vá em Authentication → Users:**
   - Menu lateral → **"Authentication"**
   - Clique em **"Users"**

3. **Verifique se o usuário existe:**
   - Procure por: `marketingkauann@gmail.com`
   - Se NÃO existir → Vá para PASSO 2
   - Se EXISTIR → Vá para PASSO 3

---

### PASSO 2: Criar o Usuário (Se não existir)

1. **Clique em "Add User"** (canto superior direito)
2. **Selecione "Create new user"**
3. **Preencha:**
   - **Email**: `marketingkauann@gmail.com`
   - **Password**: `Balboal.10` (verifique se está correto!)
   - **Auto Confirm User**: ✅ **MARQUE ESTA OPÇÃO** (OBRIGATÓRIO!)
   - **Send invitation email**: ❌ Desmarque
4. **Clique em "Create User"**
5. ✅ Usuário criado!

---

### PASSO 3: Verificar Credenciais

**Credenciais corretas:**
- Email: `marketingkauann@gmail.com`
- Senha: `Balboal.10` (com "l" no final, não "a")

**Verifique:**
- ✅ Email está escrito corretamente?
- ✅ Senha está escrita corretamente?
- ✅ Não há espaços antes/depois?

---

### PASSO 4: Verificar se o Usuário Está Confirmado

1. **No Supabase, vá em Authentication → Users**
2. **Clique no usuário** `marketingkauann@gmail.com`
3. **Verifique:**
   - **Email Confirmed**: Deve estar ✅ **TRUE**
   - Se estiver ❌ FALSE → Clique em "Confirm email" manualmente

---

### PASSO 5: Testar Novamente

1. **Acesse:** `http://localhost:8081/admin/login`
2. **Digite:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
3. **Clique em "Entrar"**
4. ✅ Deve funcionar!

---

## 🆘 SE AINDA NÃO FUNCIONAR:

### Opção A: Resetar Senha do Usuário

1. **No Supabase, vá em Authentication → Users**
2. **Clique no usuário**
3. **Clique em "Reset Password"**
4. **Defina nova senha:** `Balboal.10`
5. **Teste novamente**

### Opção B: Deletar e Recriar Usuário

1. **No Supabase, vá em Authentication → Users**
2. **Clique no usuário**
3. **Clique em "Delete User"**
4. **Crie novamente** (PASSO 2)
5. **Teste novamente**

### Opção C: Verificar Console do Navegador

1. **Abra o console do navegador** (F12)
2. **Vá na aba "Console"**
3. **Tente fazer login**
4. **Veja se há algum erro adicional**
5. **Me envie a mensagem de erro**

---

## 📋 CHECKLIST:

- [ ] Usuário criado no Supabase
- [ ] Email: `marketingkauann@gmail.com`
- [ ] Senha: `Balboal.10`
- [ ] "Auto Confirm User" marcado ao criar
- [ ] Email Confirmed = TRUE
- [ ] Credenciais digitadas corretamente
- [ ] Servidor reiniciado

---

## 🔑 CREDENCIAIS CORRETAS:

- **Email**: `marketingkauann@gmail.com`
- **Senha**: `Balboal.10` (com "l" no final)

---

**Siga os passos acima e me diga o resultado!**

