# ✅ Credenciais Configuradas!

## 🎉 O que já foi feito:

✅ Arquivo `.env` criado com suas credenciais do Supabase
✅ Sistema configurado e pronto para usar

## 📋 PRÓXIMOS PASSOS (Siga na ordem):

### ✅ PASSO 1: Executar SQL no Supabase (OBRIGATÓRIO)

**Você JÁ executou o SQL no Supabase?**
- ✅ SIM → Pule para o PASSO 2
- ❌ NÃO → Faça agora:

1. Acesse: https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
2. Clique em **"SQL Editor"** (menu lateral)
3. Clique em **"New Query"**
4. Abra o arquivo: `supabase/migrations/001_create_articles_table.sql`
5. **COPIE TODO o conteúdo** do arquivo
6. **COLE no SQL Editor** do Supabase
7. Clique em **"Run"** (ou F5)
8. ✅ Deve aparecer: "Success. No rows returned"

**⚠️ IMPORTANTE:** Sem executar o SQL, o sistema não funcionará!

---

### ✅ PASSO 2: Reiniciar o Servidor

1. No terminal, pare o servidor (Ctrl + C)
2. Execute: `npm run dev`
3. Aguarde aparecer: "ready in X ms"

**⚠️ IMPORTANTE:** Reinicie o servidor para carregar as novas credenciais!

---

### ✅ PASSO 3: Testar o Sistema

1. Acesse: `http://localhost:8081/admin/login`
2. **Email**: Digite qualquer email (ex: `admin@hirayama.com`)
3. **Senha**: `admin123`
4. Clique em **"Entrar"**
5. ✅ Você deve ser redirecionado para `/admin`

---

### ✅ PASSO 4: Criar Primeiro Artigo

1. Clique em **"Novo Artigo"**
2. Preencha:
   - **Título**: `Meu Primeiro Artigo`
   - **Descrição**: `Descrição do artigo`
   - **Tipo**: `Artigo`
   - **Categoria**: `Educativo`
   - **Tempo de Leitura**: `5 min`
   - **Publicado**: ✅ **MARQUE ESTA OPÇÃO**
3. Clique em **"Criar Artigo"**
4. ✅ Artigo deve aparecer na lista!

---

### ✅ PASSO 5: Ver no Site Principal

1. Acesse: `http://localhost:8081/`
2. Role até a seção **"Conteúdo Educativo"**
3. ✅ Seu artigo deve aparecer lá!

---

## 🎯 RESUMO RÁPIDO

```
1. ✅ Credenciais configuradas (JÁ FEITO!)
2. ⏳ Executar SQL no Supabase (FAÇA AGORA)
3. ⏳ Reiniciar servidor
4. ⏳ Testar login
5. ⏳ Criar artigo
6. ⏳ Ver no site!
```

---

## 🆘 PROBLEMAS COMUNS

### ❌ Erro: "Failed to fetch" ou "relation 'articles' does not exist"
**Solução:**
- Você não executou o SQL ainda
- Execute o SQL no Supabase (PASSO 1)

### ❌ Erro: "Invalid API key"
**Solução:**
- Verifique se o `.env` está correto
- Reinicie o servidor após criar o `.env`

### ❌ Não consigo fazer login
**Solução:**
- Senha padrão: `admin123`
- Verifique se reiniciou o servidor
- Limpe o localStorage: `localStorage.clear()` no console

---

## ✅ CHECKLIST

- [ ] SQL executado no Supabase
- [ ] Servidor reiniciado
- [ ] Login funcionando
- [ ] Artigo criado
- [ ] Artigo aparecendo no site

---

**🚀 PRÓXIMO PASSO: Execute o SQL no Supabase e reinicie o servidor!**

