# 🚀 Passo a Passo Completo - Sistema de Login Customizado

## ✅ O QUE VOCÊ JÁ FEZ

1. ✅ Criou a tabela `login` no Supabase
2. ✅ Forneceu as credenciais do Supabase

## 📋 PRÓXIMOS PASSOS

### ✅ PASSO 1: Configurar Variáveis de Ambiente

1. **Crie ou edite o arquivo `.env` na raiz do projeto**

2. **Adicione estas linhas (use `VITE_` e não `NEXT_PUBLIC_`):**

```env
VITE_SUPABASE_URL=https://cpejrontfflbzmssomnr.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_3DT42kOTvybQJlBfSA5-ww_OkzlEzil
VITE_SUPABASE_STORAGE_BUCKET=article-media
```

3. **Salve o arquivo**

4. **Crie um bucket no Supabase Storage chamado `article-media` e deixe-o público (ou com regras compatíveis com uploads via client).**

5. **Reinicie o servidor:**
   - Pare o servidor (Ctrl+C)
   - Execute: `npm run dev`

---

### ✅ PASSO 2: Verificar Estrutura da Tabela Login

1. **Acesse:** https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
2. **Vá em:** Table Editor
3. **Verifique se a tabela `login` existe com estas colunas:**
   - `id` (UUID)
   - `email` (TEXT)
   - `password_hash` (TEXT)
   - `role` (TEXT)
   - `active` (BOOLEAN)
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

4. **Se a tabela não existir ou estiver diferente, execute o SQL:**
   - Vá em: SQL Editor
   - Execute: `supabase/migrations/005_create_login_table.sql`

---

### ✅ PASSO 3: Criar Usuário Inicial

**OPÇÃO A: Página de Registro (RECOMENDADO - MAIS FÁCIL)**

1. **Acesse:** `http://localhost:8081/admin/signup`

2. **Preencha:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
   - Confirmar Senha: `Balboal.10`

3. **Clique em:** "Criar Conta"

4. ✅ **Pronto!** Usuário criado automaticamente!

---

**OPÇÃO B: Inserir Manualmente via SQL**

1. **Abra o arquivo:** `SCRIPT_CRIAR_USUARIO.html` no navegador

2. **Ou use o console do navegador (F12):**

```javascript
(async () => {
  const encoder = new TextEncoder();
  const data = encoder.encode('Balboal.10');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  console.log('Hash:', hashHex);
  
  // SQL para inserir
  const sql = `INSERT INTO login (email, password_hash, role, active) 
VALUES (
  'marketingkauann@gmail.com',
  '${hashHex}',
  'admin',
  true
) ON CONFLICT (email) DO NOTHING;`;
  
  console.log('SQL:', sql);
})();
```

3. **Copie o SQL gerado**

4. **Vá em SQL Editor no Supabase**

5. **Cole e execute o SQL**

6. ✅ **Pronto!** Usuário criado!

---

### ✅ PASSO 4: Testar Login

1. **Acesse:** `http://localhost:8081/admin/login`

2. **Digite:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`

3. **Clique em:** "Entrar"

4. ✅ **Deve funcionar e redirecionar para `/admin`**

---

### ✅ PASSO 5: Verificar no Supabase

1. **Acesse:** https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
2. **Vá em:** Table Editor
3. **Selecione a tabela:** `login`
4. **Verifique:** O usuário deve aparecer na lista

---

## 🎯 Checklist

- [ ] Arquivo `.env` configurado com `VITE_` (não `NEXT_PUBLIC_`)
- [ ] Servidor reiniciado
- [ ] Tabela `login` criada no Supabase
- [ ] Políticas RLS configuradas
- [ ] Usuário criado (via registro ou SQL)
- [ ] Login funcionando
- [ ] Admin funcionando

---

## 🆘 Problemas Comuns

### Erro: "Invalid login credentials"
- Verifique se o usuário foi criado na tabela `login`
- Verifique se a senha está correta
- Verifique o console do navegador para mais detalhes

### Erro: "new row violates row-level security policy"
- Execute o SQL da tabela: `supabase/migrations/005_create_login_table.sql`
- Verifique se as políticas RLS estão configuradas

### Variáveis de ambiente não funcionam
- Verifique se está usando `VITE_` (não `NEXT_PUBLIC_`)
- Reinicie o servidor após alterar o `.env`
- Verifique se o arquivo `.env` está na raiz do projeto

### Não consigo criar usuário
- Verifique se a tabela `login` existe
- Verifique se as políticas RLS permitem INSERT para `anon`
- Verifique o console do navegador para erros

---

## 📋 Resumo Rápido

1. **Configure `.env`** com `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`
2. **Reinicie o servidor**
3. **Crie o usuário** via `/admin/signup` ou SQL
4. **Teste o login** em `/admin/login`
5. ✅ **Pronto!**

---

**Siga os passos acima e tudo deve funcionar! 🚀**
