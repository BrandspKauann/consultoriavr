# 🔧 Configurar Variáveis de Ambiente

## ✅ ATENÇÃO: Este projeto usa Vite, não Next.js!

As variáveis de ambiente devem começar com `VITE_` (não `NEXT_PUBLIC_`).

## 📋 Configuração do .env

1. **Crie ou edite o arquivo `.env` na raiz do projeto**

2. **Adicione estas linhas:**

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://cpejrontfflbzmssomnr.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_3DT42kOTvybQJlBfSA5-ww_OkzlEzil
VITE_SUPABASE_STORAGE_BUCKET=article-media
```

3. **Salve o arquivo**

4. **No Supabase Storage, crie um bucket chamado `article-media` e deixe-o público (ou com regras que permitam upload pelo client).**

5. **Reinicie o servidor de desenvolvimento:**
   - Pare o servidor (Ctrl+C)
   - Execute: `npm run dev`

---

## ⚠️ IMPORTANTE

- ✅ Use `VITE_` como prefixo (não `NEXT_PUBLIC_`)
- ✅ Não use espaços antes ou depois do `=`
- ✅ Não adicione aspas nas variáveis (a menos que necessário)
- ✅ O arquivo `.env` já está no `.gitignore` (não será commitado)

---

## 🧪 Testar

1. **Verifique se as variáveis estão carregadas:**
   - Abra o console do navegador (F12)
   - Digite: `import.meta.env.VITE_SUPABASE_URL`
   - Deve mostrar: `https://cpejrontfflbzmssomnr.supabase.co`

2. **Teste a conexão e o upload:**
   - Acesse: `http://localhost:8081/admin/login`
   - No formulário de artigos, envie uma imagem pequena para validar o bucket

---

**Configure o .env e reinicie o servidor! 🚀**

