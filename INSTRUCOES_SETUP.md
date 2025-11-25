# 📖 Instruções de Configuração - Sistema de Artigos

## 🚀 Configuração Rápida

### 1. Configurar Supabase

1. **Acesse o Supabase Dashboard**: https://supabase.com
2. **Crie um projeto** (se ainda não tiver)
3. **Vá em SQL Editor**
4. **Execute o SQL** do arquivo `supabase/migrations/001_create_articles_table.sql`

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua-chave-publica
VITE_ADMIN_PASSWORD=admin123
```

**Onde encontrar:**
- Supabase Dashboard → Settings → API
- Copie a **Project URL** e **anon public key**

### 3. Executar o Projeto

```bash
npm install
npm run dev
```

### 4. Acessar o Admin

1. Acesse: `http://localhost:8081/admin/login`
2. Use a senha configurada em `VITE_ADMIN_PASSWORD`
3. Comece a gerenciar seus artigos!

## 📝 Como Funciona

### No Admin (`/admin`)
- ✅ Criar novos artigos
- ✅ Editar artigos existentes
- ✅ Excluir artigos
- ✅ Publicar/despublicar
- ✅ Marcar como destaque
- ✅ Definir ordem de exibição

### No Site Principal (`/`)
- ✅ Artigos aparecem automaticamente
- ✅ Apenas artigos publicados são exibidos
- ✅ Ordenados por `order_index` e data
- ✅ Atualização automática (cache de 5 minutos)

## 🔒 Segurança

- Autenticação simples via senha (configure `VITE_ADMIN_PASSWORD`)
- RLS (Row Level Security) no Supabase
- Apenas artigos publicados aparecem no site público

## 🎯 Próximos Passos

1. Execute o SQL no Supabase
2. Configure as variáveis de ambiente
3. Acesse `/admin/login`
4. Crie seu primeiro artigo!
5. Veja aparecer automaticamente no site principal

## ⚠️ Importante

- Nunca commite o arquivo `.env` no git
- Use senhas fortes em produção
- Configure RLS adequadamente no Supabase
- Faça backup regular dos dados

