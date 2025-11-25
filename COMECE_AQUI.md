# 🎯 COMECE AQUI - Guia Rápido

## 📋 O QUE VOCÊ PRECISA FAZER (3 PASSOS)

### ✅ PASSO 1: Supabase

1. **Acesse**: https://supabase.com
2. **Crie/Acesse** projeto
3. **SQL Editor** → Cole o SQL de `supabase/migrations/001_create_articles_table.sql`
4. **Run** (F5)

### ✅ PASSO 2: Configurar .env

1. **Crie arquivo** `.env` na raiz
2. **Cole** (substitua com suas credenciais):

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua-chave-publica
VITE_ADMIN_PASSWORD=admin123
```

**Onde pegar as credenciais:**
- Supabase Dashboard → Settings → API
- Copie "Project URL" e "anon public key"

### ✅ PASSO 3: Testar

1. **Reinicie servidor**: `npm run dev`
2. **Acesse**: http://localhost:8081/admin/login
3. **Senha**: `admin123` (ou a que você colocou)
4. **Crie artigo** → Veja aparecer no site!

---

## 🎉 PRONTO!

Agora você pode gerenciar artigos e eles aparecem automaticamente no site!

---

## 📞 PRECISA DE AJUDA?

Consulte:
- `PASSO_A_PASSO_COMPLETO.md` - Guia detalhado
- `CHECKLIST_SETUP.md` - Checklist passo a passo
- `QUICK_START.md` - Versão rápida

---

**Vamos começar! 🚀**

