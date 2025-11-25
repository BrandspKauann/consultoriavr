# 🔐 Configurar Autenticação Real - Passo a Passo

## ✅ O QUE JÁ FOI FEITO:

✅ Código atualizado para usar Supabase Auth real
✅ Sistema de login com validação de email/senha
✅ Proteção de rotas com autenticação real
✅ Logout funcional

## 📋 O QUE VOCÊ PRECISA FAZER AGORA:

### ✅ PASSO 1: Criar Usuário no Supabase (5 minutos)

1. **Acesse o Supabase Dashboard:**
   - https://supabase.com/dashboard/project/cpejrontfflbzmssomnr

2. **Vá em Authentication:**
   - Menu lateral → **"Authentication"**
   - Clique em **"Users"**

3. **Criar Novo Usuário:**
   - Clique em **"Add User"** (canto superior direito)
   - Selecione **"Create new user"**

4. **Preencha os Dados:**
   - **Email**: `marketingkauann@gmail.com`
   - **Password**: `Balboal.10`
   - **Auto Confirm User**: ✅ **MARQUE ESTA OPÇÃO** (OBRIGATÓRIO!)
   - **Send invitation email**: ❌ Desmarque (não precisa)

5. **Clique em "Create User"**
   - ✅ Usuário criado!

---

### ✅ PASSO 2: Atualizar Políticas RLS (2 minutos)

Após criar o usuário, atualize as políticas de segurança:

1. **Vá em SQL Editor** no Supabase
2. **Cole e execute este SQL:**

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Permitir inserção de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir atualização de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir deleção de artigos" ON articles;
DROP POLICY IF EXISTS "Usuários autenticados podem criar artigos" ON articles;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar artigos" ON articles;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar artigos" ON articles;

-- Policy: Only authenticated users can insert articles
CREATE POLICY "Usuários autenticados podem criar artigos"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can update articles
CREATE POLICY "Usuários autenticados podem atualizar artigos"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete articles
CREATE POLICY "Usuários autenticados podem deletar artigos"
  ON articles
  FOR DELETE
  TO authenticated
  USING (true);
```

3. **Execute o SQL** (Run ou F5)
4. ✅ Políticas atualizadas!

---

### ✅ PASSO 3: Testar o Login (1 minuto)

1. **Reinicie o servidor** (se ainda não reiniciou):
   ```bash
   npm run dev
   ```

2. **Acesse:** `http://localhost:8081/admin/login`

3. **Faça Login:**
   - **Email**: `marketingkauann@gmail.com`
   - **Senha**: `Balboal.10`

4. **Clique em "Entrar"**
   - ✅ Você deve ser redirecionado para `/admin`

---

### ✅ PASSO 4: Verificar se Funciona

1. **Você deve ver:**
   - Tela de admin com lista de artigos
   - Botão "Sair" funcionando
   - Possibilidade de criar/editar/excluir artigos

2. **Teste criar um artigo:**
   - Clique em "Novo Artigo"
   - Preencha os dados
   - Salve
   - ✅ Artigo deve aparecer na lista!

3. **Teste o logout:**
   - Clique em "Sair"
   - ✅ Deve voltar para a tela de login

---

## 🎉 PRONTO! SISTEMA FUNCIONANDO!

Agora você tem:
- ✅ Autenticação real com email/senha
- ✅ Validação de credenciais
- ✅ Proteção de rotas
- ✅ Logout funcional
- ✅ Sessão persistente

---

## 🆘 PROBLEMAS COMUNS

### ❌ Erro: "Invalid login credentials"
**Solução:**
- Verifique se criou o usuário no Supabase
- Verifique se marcou "Auto Confirm User"
- Verifique se o email e senha estão corretos

### ❌ Erro: "Email not confirmed"
**Solução:**
- Você precisa marcar "Auto Confirm User" ao criar o usuário
- OU confirme o email manualmente no Supabase

### ❌ Erro: "new row violates row-level security policy"
**Solução:**
- Execute o SQL do PASSO 2 para atualizar as políticas RLS
- Verifique se o usuário está autenticado

### ❌ Não consigo fazer login
**Solução:**
- Verifique se criou o usuário no Supabase
- Verifique se o email e senha estão corretos
- Verifique o console do navegador (F12) para erros

---

## 📋 CHECKLIST

- [ ] Usuário criado no Supabase (Authentication → Users)
- [ ] "Auto Confirm User" marcado ao criar usuário
- [ ] Políticas RLS atualizadas (SQL executado)
- [ ] Servidor reiniciado
- [ ] Login funcionando
- [ ] Criar artigo funcionando
- [ ] Logout funcionando

---

## 🎯 CREDENCIAIS

- **Email**: `marketingkauann@gmail.com`
- **Senha**: `Balboal.10`

---

**🚀 Siga os passos acima e teste o sistema!**

