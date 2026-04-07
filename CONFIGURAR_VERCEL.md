# Formulários de contato (Formspree + Supabase)

Os leads são enviados em paralelo para:

1. **Formspree** — `https://formspree.io/f/mbdppnkr` (notificação por e-mail / painel Formspree).
2. **Supabase** — tabela `leads` (quando configurado). Se falhar, há fallback em `localStorage` e nova tentativa de sync.

## Variáveis opcionais

| Variável | Uso |
|----------|-----|
| `VITE_FORMSPREE_FORM_ID` | Substitui o ID do formulário (padrão: `mbdppnkr`). |

Não é necessária rota `/api/webhook/lead` nem variáveis `LEAD_WEBHOOK_URL` / n8n.

## Vercel

- Configure as variáveis do **Supabase** (`VITE_SUPABASE_*`) como antes.
- O browser chama o Formspree diretamente (HTTPS); não há problema de CORS típico com o endpoint público do Formspree.

### Se o deploy não parece o mesmo código do GitHub

1. No painel Vercel: **Settings → Git** — o repositório deve ser **`BrandspKauann/consultoriavr`** e a branch de produção **`main`** (não `master` e não outro fork).
2. **Root Directory** vazio (raiz do repo), a menos que o projeto esteja em subpasta.
3. **Settings → Git → Ignored Build Step** — deve estar vazio ou nunca retornar “skip”, senão o push não gera deploy novo.
4. Depois de mudar variáveis ou duvidar do cache: **Deployments → três pontos no último deploy → Redeploy** (marque “Use existing Build Cache” **desmarcado** se quiser build limpo).
5. No site em produção: **Ver código-fonte da página** e procure `<meta name="x-vercel-deployment" content="…" />` — os 7 caracteres são o início do commit que a Vercel usou no build (deve bater com o commit no GitHub).

## Formspree

- Painel: [formspree.io](https://formspree.io) — formulário **mbdppnkr**.
- Campos enviados: `nome`, `email`, `telefone`, `empresa`, `cargo`, `mensagem`, `quantidadeCartoes`, `principalDor`, `origem`, `_subject`, `_replyto`, `timestamp`, `url`, `userAgent`, e `metadata_json` quando houver metadata extra.
