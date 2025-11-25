# 🎯 PASSO A PASSO COMPLETO - Configure Agora!

## 📍 Onde Você Está Agora

✅ Código implementado e pronto
✅ SQL migration criado
✅ Interface admin criada
⏳ Precisa configurar Supabase
⏳ Precisa configurar variáveis de ambiente

---

## 🚀 PASSO 1: Criar/Configurar Projeto no Supabase

### Opção A: Se você JÁ TEM conta no Supabase

1. Acesse: https://supabase.com/dashboard
2. Faça login
3. Se já tem um projeto:
   - Clique no projeto existente
   - Vá para o **PASSO 2**
4. Se NÃO tem projeto:
   - Clique em **"New Project"**
   - Preencha:
     - **Name**: `hirayama-seguros` (ou qualquer nome)
     - **Database Password**: Crie uma senha forte (GUARDE ESSA SENHA!)
     - **Region**: Escolha a região mais próxima (ex: South America)
   - Clique em **"Create new project"**
   - Aguarde 2-3 minutos (criação do projeto)

### Opção B: Se você NÃO TEM conta no Supabase

1. Acesse: https://supabase.com
2. Clique em **"Start your project"** ou **"Sign Up"**
3. Crie sua conta (pode usar GitHub, Google ou email)
4. Após criar conta, siga a **Opção A** acima

---

## 🔑 PASSO 2: Obter Credenciais do Supabase

1. No Supabase Dashboard, selecione seu projeto
2. Vá em **Settings** (⚙️) no menu lateral
3. Clique em **API**
4. Você verá:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** key (uma chave longa começando com `eyJ...`)

**COPIE ESSAS DUAS INFORMAÇÕES!** Você vai precisar agora.

---

## 📝 PASSO 3: Executar SQL no Supabase

1. No Supabase Dashboard, vá em **SQL Editor** (no menu lateral)
2. Clique em **"New Query"**
3. Abra o arquivo: `supabase/migrations/001_create_articles_table.sql`
4. **COPIE TODO O CONTEÚDO** do arquivo
5. Cole no editor SQL do Supabase
6. Clique em **"Run"** (ou pressione `Ctrl+Enter` / `Cmd+Enter`)
7. Você deve ver: ✅ **Success. No rows returned**

**✅ Tabela criada com sucesso!**

---

## ⚙️ PASSO 4: Configurar Variáveis de Ambiente

1. Na raiz do projeto, crie um arquivo chamado `.env`
2. Abra o arquivo `.env` no editor
3. Cole o seguinte conteúdo:

```env
VITE_SUPABASE_URL=COLE_AQUI_A_PROJECT_URL
VITE_SUPABASE_PUBLISHABLE_KEY=COLE_AQUI_A_ANON_PUBLIC_KEY
VITE_ADMIN_PASSWORD=admin123
```

4. **SUBSTITUA:**
   - `COLE_AQUI_A_PROJECT_URL` → A URL que você copiou no PASSO 2
   - `COLE_AQUI_A_ANON_PUBLIC_KEY` → A chave que você copiou no PASSO 2
   - `admin123` → Pode deixar assim ou mudar para uma senha mais segura

**Exemplo de como deve ficar:**

```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI5MCwiZXhwIjoxOTU0NTQzMjkwfQ.abcdefghijklmnopqrstuvwxyz1234567890
VITE_ADMIN_PASSWORD=minhasenhasupersecreta
```

5. **SALVE o arquivo `.env`**

---

## 🧪 PASSO 5: Testar o Sistema

1. **Reinicie o servidor** (se estiver rodando):
   - Pare o servidor (Ctrl+C)
   - Execute: `npm run dev`

2. **Acesse o admin:**
   - Abra: `http://localhost:8081/admin/login`
   - Digite qualquer email (ex: `admin@hirayama.com`)
   - Digite a senha que você configurou em `VITE_ADMIN_PASSWORD`
   - Clique em **"Entrar"**

3. **Crie seu primeiro artigo:**
   - Clique em **"Novo Artigo"**
   - Preencha os campos
   - Clique em **"Criar Artigo"**

4. **Veja no site principal:**
   - Acesse: `http://localhost:8081/`
   - Role até "Conteúdo Educativo"
   - ✅ Seu artigo deve aparecer!

---

## ✅ Checklist Final

- [ ] Conta no Supabase criada
- [ ] Projeto no Supabase criado
- [ ] Credenciais copiadas (URL e Key)
- [ ] SQL executado no Supabase
- [ ] Arquivo `.env` criado e configurado
- [ ] Servidor reiniciado
- [ ] Login no admin funcionando
- [ ] Artigo criado com sucesso
- [ ] Artigo aparece no site principal

---

## 🆘 Se Algo Der Errado

### Erro: "Failed to fetch" ou "Network error"

**Solução:**
- Verifique se as credenciais no `.env` estão corretas
- Verifique se não há espaços extras nas credenciais
- Reinicie o servidor após criar o `.env`

### Erro: "relation 'articles' does not exist"

**Solução:**
- O SQL não foi executado
- Volte ao PASSO 3 e execute o SQL novamente

### Erro: "new row violates row-level security policy"

**Solução:**
- As políticas RLS estão muito restritivas
- Execute o SQL novamente (ele cria as políticas corretas)

### Não consigo fazer login

**Solução:**
- Verifique se `VITE_ADMIN_PASSWORD` está correto no `.env`
- Limpe o localStorage: Abra o console (F12) e digite: `localStorage.clear()`
- Tente fazer login novamente

### Artigo não aparece no site

**Solução:**
- Verifique se marcou "Publicado" ao criar o artigo
- Verifique no Supabase se `published = true` na tabela
- Aguarde alguns segundos (cache de 5 minutos)
- Recarregue a página

---

## 📞 O Que Você Precisa Me Enviar?

**NADA!** Você não precisa me enviar nada do código. 

O que você precisa fazer:
1. ✅ Executar o SQL no Supabase (você mesmo faz)
2. ✅ Configurar o `.env` (você mesmo faz)
3. ✅ Testar o sistema

**Só me avise se:**
- Algo não funcionar
- Tiver algum erro
- Precisar de ajuda

---

## 🎉 Próximos Passos Após Configurar

1. **Criar seus artigos** no admin
2. **Personalizar** conforme necessário
3. **Adicionar mais funcionalidades** (se quiser)

---

## 📋 Resumo Rápido

```
1. Criar conta/projeto no Supabase
2. Copiar URL e Key do Supabase
3. Executar SQL no Supabase
4. Criar arquivo .env com as credenciais
5. Reiniciar servidor
6. Acessar /admin/login
7. Criar artigo
8. Ver no site principal
```

---

**Vamos começar! Siga os passos acima e me avise se tiver alguma dúvida! 🚀**

