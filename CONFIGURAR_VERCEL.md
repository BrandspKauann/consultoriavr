# 🚀 Configurar Webhook no Vercel

Este guia explica como configurar o webhook do n8n para funcionar corretamente no Vercel.

## 📋 Problemas Resolvidos

Esta solução resolve os seguintes problemas:

1. **Mixed Content**: Site HTTPS (`vrconsultoria.com.br`) não pode fazer requisições HTTP diretas
2. **CORS**: Requisições cross-origin podem ser bloqueadas
3. **Variáveis de Ambiente**: Configuração adequada para desenvolvimento e produção
4. **Segurança**: URL do webhook não exposta no código frontend

## 🔧 Como Funciona

### Desenvolvimento (Local)

```
Frontend → http://localhost:5678/webhook/webhookn8n (direto)
```

- Usa variável `VITE_LEAD_WEBHOOK_URL` do arquivo `.env`
- Requisição direta do navegador para o n8n local

### Produção (Vercel)

```
Frontend → /api/webhook/lead (Vercel API) → http://77.37.43.210:5678/webhook/webhookn8n (n8n)
```

- Frontend chama API route do próprio domínio (sem CORS)
- API route do Vercel faz requisição server-side para o n8n
- Resolve problemas de mixed content e CORS

## ⚙️ Configuração no Vercel

### Passo 1: Acessar o Dashboard do Vercel

1. Acesse: https://vercel.com/dashboard
2. Faça login na sua conta
3. Selecione o projeto `vrconsultoria` (ou o nome do seu projeto)

### Passo 2: Configurar Variáveis de Ambiente

1. No menu do projeto, clique em **Settings**
2. No menu lateral, clique em **Environment Variables**
3. Adicione as seguintes variáveis:

#### Variável 1: LEAD_WEBHOOK_URL

- **Key**: `LEAD_WEBHOOK_URL`
- **Value**: `http://77.37.43.210:5678/webhook/webhookn8n`
- **Environment**: Selecione todas as opções:
  - ✅ Production
  - ✅ Preview
  - ✅ Development

**⚠️ IMPORTANTE**: 
- Use `LEAD_WEBHOOK_URL` (sem prefixo `VITE_`)
- Esta variável é server-side e não será exposta no frontend
- É usada pela API route `/api/webhook/lead`

#### Variáveis do Supabase (se ainda não configuradas)

Se você ainda não configurou as variáveis do Supabase no Vercel:

- **Key**: `VITE_SUPABASE_URL`
- **Value**: `https://seu-projeto.supabase.co`
- **Environment**: Todas

- **Key**: `VITE_SUPABASE_PUBLISHABLE_KEY`
- **Value**: `sua-chave-publica`
- **Environment**: Todas

- **Key**: `VITE_SUPABASE_STORAGE_BUCKET`
- **Value**: `article-media`
- **Environment**: Todas

### Passo 3: Salvar e Fazer Deploy

1. Clique em **Save** para salvar as variáveis
2. Vá para a aba **Deployments**
3. Clique nos três pontos (⋯) do último deployment
4. Selecione **Redeploy**
5. Ou faça um novo commit/push para GitHub para trigger automático

## 🧪 Testar a Configuração

### 1. Verificar Variáveis no Vercel

1. Vá em **Settings** → **Environment Variables**
2. Confirme que `LEAD_WEBHOOK_URL` está configurada
3. Verifique que está disponível para **Production**

### 2. Verificar API Route

1. Após o deploy, acesse: `https://vrconsultoria.com.br/api/webhook/lead`
2. Deve retornar erro 405 (Method Not Allowed) - isso é normal, significa que a rota existe
3. Se retornar 500, verifique se `LEAD_WEBHOOK_URL` está configurada

### 3. Testar Formulário

1. Acesse o site: `https://vrconsultoria.com.br`
2. Preencha o formulário de contato
3. Abra o Console do navegador (F12)
4. Procure por logs:
   - `🚀 [PRODUÇÃO] Chamando webhook n8n: /api/webhook/lead`
   - `✅ [PRODUÇÃO] Webhook n8n chamado com sucesso!`

### 4. Verificar Logs no Vercel

1. Vá em **Deployments**
2. Clique no deployment mais recente
3. Clique em **Functions**
4. Procure por `api/webhook/lead`
5. Clique para ver os logs
6. Deve aparecer:
   - `🚀 [Vercel API] Chamando webhook n8n: http://77.37.43.210:5678/webhook/webhookn8n`
   - `✅ [Vercel API] Webhook n8n chamado com sucesso!`

### 5. Verificar no n8n

1. Acesse o n8n: `http://77.37.43.210:5678`
2. Verifique se o workflow está **ATIVO**
3. Verifique se há execuções recentes do webhook
4. Os dados do formulário devem aparecer

## 🔍 Troubleshooting

### Erro: "LEAD_WEBHOOK_URL não configurada"

**Causa**: Variável de ambiente não configurada no Vercel

**Solução**:
1. Vá em **Settings** → **Environment Variables**
2. Adicione `LEAD_WEBHOOK_URL` com o valor correto
3. Faça um novo deploy

### Erro: "Webhook not found" ou "404"

**Causa**: Webhook não encontrado no n8n

**Solução**:
1. Verifique se o workflow está **ATIVO** no n8n
2. Verifique se o path do webhook é: `/webhook/webhookn8n`
3. Verifique se o método está configurado como **POST**
4. Verifique se a URL está correta: `http://77.37.43.210:5678/webhook/webhookn8n`

### Erro: "CORS" ou "Mixed Content"

**Causa**: Requisição bloqueada pelo navegador

**Solução**:
- Esta solução já resolve isso usando API route
- Se ainda ocorrer, verifique se está usando `/api/webhook/lead` (não a URL direta)

### Erro: "Network Error" ou "Failed to fetch"

**Causa**: Problema de conectividade ou n8n offline

**Solução**:
1. Verifique se o n8n está rodando: `http://77.37.43.210:5678`
2. Verifique se o servidor VPS está acessível
3. Verifique firewall/portas abertas

### Webhook funciona localmente mas não no Vercel

**Causa**: Variável de ambiente não configurada ou deploy antigo

**Solução**:
1. Verifique se `LEAD_WEBHOOK_URL` está configurada no Vercel
2. Faça um novo deploy após configurar a variável
3. Verifique os logs do Vercel Functions

## 📝 Checklist de Configuração

Antes de considerar a configuração completa, verifique:

- [ ] Variável `LEAD_WEBHOOK_URL` configurada no Vercel
- [ ] Variável disponível para ambiente **Production**
- [ ] Deploy realizado após configurar variáveis
- [ ] Workflow do n8n está **ATIVO**
- [ ] Path do webhook está correto: `/webhook/webhookn8n`
- [ ] Método do webhook está como **POST**
- [ ] n8n está acessível em `http://77.37.43.210:5678`
- [ ] CORS configurado no n8n (pode deixar `*` para teste)

## 🎯 Resumo Rápido

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. Adicionar: `LEAD_WEBHOOK_URL` = `http://77.37.43.210:5678/webhook/webhookn8n`
3. Selecionar ambiente: **Production** (e outros se necessário)
4. **Save** e fazer **Redeploy**
5. Testar formulário no site
6. Verificar logs no Vercel e n8n

## 📞 Precisa de Ajuda?

Se ainda tiver problemas:

1. Verifique os logs do Vercel Functions
2. Verifique o console do navegador (F12)
3. Verifique os logs do n8n
4. Confirme que todas as variáveis estão configuradas corretamente

---

**Configuração completa! O webhook deve funcionar tanto localmente quanto no Vercel.** 🚀
