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

## Formspree

- Painel: [formspree.io](https://formspree.io) — formulário **mbdppnkr**.
- Campos enviados: `nome`, `email`, `telefone`, `empresa`, `cargo`, `mensagem`, `quantidadeCartoes`, `principalDor`, `origem`, `_subject`, `_replyto`, `timestamp`, `url`, `userAgent`, e `metadata_json` quando houver metadata extra.
