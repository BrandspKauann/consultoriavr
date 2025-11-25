# 🎯 Como Usar o Sistema de Artigos

## 📋 Passo a Passo Rápido

### 1️⃣ Execute o SQL no Supabase

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor** (menu lateral)
4. Clique em **New Query**
5. Cole o conteúdo de `supabase/migrations/001_create_articles_table.sql`
6. Clique em **Run** (ou F5)
7. ✅ Tabela criada!

### 2️⃣ Configure as Variáveis

Crie arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_PASSWORD=admin123
```

**Onde encontrar:**
- Supabase Dashboard → **Settings** → **API**
- **Project URL** → `VITE_SUPABASE_URL`
- **anon public** key → `VITE_SUPABASE_PUBLISHABLE_KEY`

### 3️⃣ Teste o Sistema

```bash
npm run dev
```

1. Acesse: `http://localhost:8081/admin/login`
2. Digite qualquer email e a senha do `.env`
3. Clique em **Entrar**
4. ✅ Você está no admin!

### 4️⃣ Crie Seu Primeiro Artigo

1. Clique em **"Novo Artigo"**
2. Preencha:
   - Título: "Meu primeiro artigo"
   - Descrição: "Descrição do artigo"
   - Tipo: Artigo
   - Categoria: "Educativo"
   - Tempo de Leitura: "5 min"
   - Publicado: ✅ SIM
3. Clique em **"Criar Artigo"**
4. ✅ Artigo criado!

### 5️⃣ Veja no Site Principal

1. Acesse: `http://localhost:8081/`
2. Role até a seção **"Conteúdo Educativo"**
3. ✅ Seu artigo aparece automaticamente!

## 🎉 Pronto!

Agora você pode:
- ✅ Criar artigos pelo admin
- ✅ Editar artigos
- ✅ Excluir artigos
- ✅ Publicar/despublicar
- ✅ Ver aparecer automaticamente no site!

## 🔄 Fluxo Automático

```
Admin (/admin)
  ↓ Criar/Editar artigo
  ↓ Salva no Supabase
Site Principal (/)
  ↓ Busca automaticamente
  ↓ Artigo aparece! ✨
```

## 💡 Dicas

- **Publicado = true**: Artigo aparece no site
- **Publicado = false**: Artigo fica oculto (rascunho)
- **Ordem**: Use `order_index` para ordenar (menor = primeiro)
- **Destaque**: Marque para destacar artigo importante
- **URL Externa**: Use para links do YouTube ou artigos externos

## 🚨 Problemas?

**Artigo não aparece?**
- Verifique se `published = true`
- Verifique se salvou corretamente
- Limpe o cache do navegador

**Erro ao salvar?**
- Verifique se executou o SQL
- Verifique as variáveis de ambiente
- Veja o console do navegador (F12)

---

**Tudo funcionando? Comece a criar seus artigos! 🚀**

