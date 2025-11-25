# 🔐 Inserir Usuário Inicial na Tabela Login

## 🎯 Objetivo

Criar o usuário inicial na tabela `login` com email e senha hashada.

## ✅ MÉTODO 1: Usar a Página de Registro (MAIS FÁCIL)

1. **Execute o SQL da tabela:**
   - Vá em SQL Editor no Supabase
   - Execute: `supabase/migrations/005_create_login_table.sql`

2. **Acesse a página de registro:**
   - `http://localhost:8081/admin/signup`

3. **Preencha:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
   - Confirmar Senha: `Balboal.10`

4. **Clique em:** "Criar Conta"

5. ✅ **Pronto!** Usuário criado automaticamente!

---

## ✅ MÉTODO 2: Inserir Manualmente via SQL

### Passo 1: Obter o Hash da Senha

1. **Abra o console do navegador** (F12)
2. **Execute este código:**

```javascript
(async () => {
  const encoder = new TextEncoder();
  const data = encoder.encode('Balboal.10');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  console.log('Hash da senha:', hashHex);
  return hashHex;
})();
```

3. **Copie o hash** que aparece no console

### Passo 2: Inserir no Banco

1. **Vá em SQL Editor** no Supabase
2. **Execute este SQL** (substitua `HASH_AQUI` pelo hash copiado):

```sql
INSERT INTO login (email, password_hash, role, active) 
VALUES (
  'marketingkauann@gmail.com',
  'HASH_AQUI', -- Cole o hash aqui
  'admin',
  true
) ON CONFLICT (email) DO NOTHING;
```

3. **Execute o SQL** (Run ou F5)

4. ✅ **Pronto!** Usuário criado!

---

## 📋 Passo a Passo Completo

### 1. Criar Tabela Login

1. **Vá em SQL Editor** no Supabase
2. **Execute:** `supabase/migrations/005_create_login_table.sql`
3. ✅ Tabela criada!

### 2. Criar Usuário

**Opção A: Página de Registro (Recomendado)**
1. Acesse: `http://localhost:8081/admin/signup`
2. Crie a conta
3. ✅ Pronto!

**Opção B: SQL Manual**
1. Obtenha o hash da senha (console do navegador)
2. Execute o SQL de inserção
3. ✅ Pronto!

### 3. Testar Login

1. **Acesse:** `http://localhost:8081/admin/login`
2. **Digite:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
3. **Clique em:** "Entrar"
4. ✅ Deve funcionar!

---

## 🎯 Recomendação

**Use o MÉTODO 1 (Página de Registro)** - É mais fácil e seguro!

1. Execute o SQL da tabela
2. Acesse `/admin/signup`
3. Crie a conta
4. Pronto!

---

**Siga os passos acima e crie seu usuário! 🚀**

