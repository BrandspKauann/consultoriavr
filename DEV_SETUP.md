# Configuração de Desenvolvimento

## Problema de CSP (Content Security Policy)

O preview interno do Cursor pode bloquear `eval()` necessário para o Vite HMR funcionar.

## Soluções Implementadas

### ✅ Solução 1: Meta Tag CSP no HTML
O arquivo `index.html` já contém uma meta tag CSP permissiva para desenvolvimento.

### ✅ Solução 2: Plugin Vite
O `vite.config.ts` inclui um plugin que remove headers CSP restritivos em desenvolvimento.

### ✅ Solução 3: Headers do Servidor
O servidor Vite está configurado para enviar headers CSP permissivos apenas em modo desenvolvimento.

## Como Usar

### Opção A: Usar Preview Interno do Cursor
1. Execute `npm run dev`
2. O servidor iniciará em `http://localhost:3000`
3. O preview interno deve funcionar com as configurações de CSP

### Opção B: Usar Navegador Externo (Recomendado)
1. Execute `npm run dev`
2. Abra seu navegador (Chrome/Edge/Firefox)
3. Acesse `http://localhost:3000`
4. Isso evita completamente problemas de CSP do preview interno

### Opção C: Desabilitar CSP Completamente (Apenas Dev)
Se ainda houver problemas, você pode temporariamente remover a meta tag CSP do `index.html` durante o desenvolvimento.

**⚠️ IMPORTANTE:** Nunca faça deploy em produção com CSP permissiva. Remova ou restrinja a CSP antes de fazer build para produção.

## Verificação

Para verificar se a CSP está funcionando:
1. Abra o DevTools (F12)
2. Vá para a aba Console
3. Não deve haver erros relacionados a CSP
4. Os inputs devem permitir digitação fluida sem perder foco

## Troubleshooting

Se ainda houver problemas:
1. Limpe o cache do navegador
2. Reinicie o servidor Vite (`Ctrl+C` e `npm run dev` novamente)
3. Teste em janela anônima do navegador
4. Desabilite extensões do navegador que possam interferir (React DevTools, etc.)

