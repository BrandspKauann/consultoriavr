# 🔐 Criar Usuário Admin no Supabase

## 📋 PASSO 1: Criar Usuário no Supabase Dashboard

### Opção A: Via Dashboard (Mais Fácil)

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
   - **Auto Confirm User**: ✅ **MARQUE ESTA OPÇÃO** (importante!)
   - **Send invitation email**: ❌ Desmarque (não precisa)

5. **Clique em "Create User"**
   - ✅ Usuário criado!

---

### Opção B: Via API (Alternativa)

Se preferir usar a API, você precisa da **Service Role Key**:

1. **Pegar Service Role Key:**
   - Settings → API
   - Copie a **"service_role" key** (NÃO a anon key!)

2. **Executar no Terminal:**
```bash
curl -X POST 'https://cpejrontfflbzmssomnr.supabase.co/auth/v1/admin/users' \
  -H "apikey: SUA_SERVICE_ROLE_KEY_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "marketingkauann@gmail.com",
    "password": "Balboal.10",
    "email_confirm": true
  }'
```

---

## 📋 PASSO 2: Atualizar Políticas RLS

Após criar o usuário, execute este SQL no Supabase:

1. **Vá em SQL Editor**
2. **Execute o arquivo:** `supabase/migrations/002_create_admin_user.sql`
   - Ou cole o conteúdo abaixo:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Permitir inserção de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir atualização de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir deleção de artigos" ON articles;

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

3. **Execute o SQL**
   - Clique em **"Run"** (F5)
   - ✅ Políticas atualizadas!

---

## ✅ PRONTO!

Agora o sistema está configurado para usar autenticação real!

**Credenciais:**
- Email: `marketingkauann@gmail.com`
- Senha: `Balboal.10`

---

## 🚀 PRÓXIMOS PASSOS

1. ✅ Usuário criado no Supabase
2. ✅ Políticas RLS atualizadas
3. ⏳ Testar login no sistema
4. ⏳ Verificar se funciona!

---

**⚠️ IMPORTANTE:**
- A Service Role Key é secreta! Nunca exponha ela no frontend!
- Use apenas a **anon key** no frontend
- A Service Role Key só deve ser usada no backend ou scripts

