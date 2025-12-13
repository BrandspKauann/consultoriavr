# 🚀 Sistema de Gerenciamento de Artigos - Guia de Instalação

## 📋 Pré-requisitos

1. Conta no Supabase (gratuita): https://supabase.com
2. Projeto criado no Supabase

## 🔧 Passo a Passo

### 1. Criar Tabela no Supabase

1. Acesse o **Supabase Dashboard** do seu projeto
2. Vá em **SQL Editor**
3. Cole o conteúdo do arquivo `supabase/migrations/001_create_articles_table.sql`
4. Execute o SQL

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (se ainda não existir):

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua-chave-publica
VITE_ADMIN_PASSWORD=admin123
```

**Como encontrar as credenciais:**
- Acesse **Settings** → **API** no Supabase Dashboard
- Copie a **URL** e a **anon/public key**

### 3. Configurar RLS (Row Level Security)

O SQL já cria as políticas básicas. Se precisar ajustar:

1. Vá em **Authentication** → **Policies** no Supabase
2. Verifique se as políticas foram criadas para a tabela `articles`

### 4. Configurar Autenticação (Opcional - Para Produção)

**Opção A: Autenticação Simples (Atual)**
- Usa senha fixa via `VITE_ADMIN_PASSWORD`
- Funciona imediatamente

**Opção B: Supabase Auth (Recomendado para Produção)**
1. Vá em **Authentication** → **Users** no Supabase
2. Crie um usuário admin
3. Atualize `AdminLogin.tsx` para usar `supabase.auth.signInWithPassword()`

### 5. Testar o Sistema

1. Inicie o servidor: `npm run dev`
2. Acesse: `http://localhost:3000/admin/login`
3. Use a senha configurada em `VITE_ADMIN_PASSWORD`
4. Crie seu primeiro artigo!

## 📝 Como Usar

### Criar Artigo

1. Acesse `/admin`
2. Clique em **"Novo Artigo"**
3. Preencha os campos:
   - **Título**: Título do artigo
   - **Descrição**: Descrição que aparece no card
   - **Tipo**: Artigo ou Vídeo
   - **Categoria**: Ex: Introdução, Case Real, Educativo
   - **Tempo de Leitura**: Ex: "5 min"
   - **URL Externa**: Link para vídeo (YouTube) ou artigo externo
   - **Publicado**: Marque para aparecer no site
4. Clique em **"Criar Artigo"**

### Editar Artigo

1. Na lista de artigos, clique no ícone de **editar** (lápis)
2. Faça as alterações
3. Clique em **"Salvar Alterações"**

### Excluir Artigo

1. Na lista de artigos, clique no ícone de **excluir** (lixeira)
2. Confirme a exclusão

### Publicar/Despublicar

1. Edite o artigo
2. Marque/desmarque a opção **"Publicado"**
3. Salve

## 🎯 Funcionalidades

✅ Criar, editar e excluir artigos
✅ Publicar/despublicar artigos
✅ Marcar artigos como destaque
✅ Ordenar artigos (order_index)
✅ Categorias personalizadas
✅ Suporte a artigos e vídeos
✅ URL externa para links
✅ Conteúdo completo (Markdown/HTML)
✅ Aparece automaticamente no site principal

## 🔒 Segurança

- RLS (Row Level Security) ativado
- Apenas artigos publicados aparecem no site público
- Autenticação necessária para acessar o admin
- Políticas de segurança no Supabase

## 📊 Estrutura da Tabela

```sql
articles
├── id (UUID)
├── title (TEXT)
├── description (TEXT)
├── content (TEXT) - opcional
├── type (article | video)
├── category (TEXT)
├── read_time (TEXT)
├── external_url (TEXT) - opcional
├── image_url (TEXT) - opcional
├── published (BOOLEAN)
├── featured (BOOLEAN)
├── order_index (INTEGER)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## 🐛 Solução de Problemas

### Artigos não aparecem no site

1. Verifique se `published = true` no Supabase
2. Verifique as variáveis de ambiente
3. Verifique o console do navegador para erros

### Erro ao salvar artigo

1. Verifique se a tabela foi criada corretamente
2. Verifique as políticas RLS no Supabase
3. Verifique o console do navegador

### Não consigo acessar o admin

1. Verifique se `VITE_ADMIN_PASSWORD` está configurado
2. Limpe o localStorage: `localStorage.clear()`
3. Tente fazer login novamente

## 🚀 Próximos Passos

- [ ] Adicionar upload de imagens
- [ ] Adicionar editor de texto rico
- [ ] Adicionar preview do artigo
- [ ] Adicionar estatísticas (visualizações)
- [ ] Adicionar sistema de tags
- [ ] Melhorar autenticação com Supabase Auth

## 📞 Suporte

Se tiver dúvidas, consulte a documentação do Supabase:
https://supabase.com/docs

