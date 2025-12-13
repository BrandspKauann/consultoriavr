# ⚠️ IMPORTANTE: Onde Executar Cada Comando

## 🔴 NÃO execute no SQL Editor do Supabase!
O SQL Editor é **APENAS** para comandos SQL.

## ✅ Execute no TERMINAL do seu computador!

---

## 📋 COMO REINICIAR O SERVIDOR (Passo a Passo)

### 1️⃣ Abra o Terminal

**No Windows:**
- Pressione `Windows + R`
- Digite: `cmd` ou `powershell`
- Pressione Enter
- OU use o terminal integrado do VS Code/Cursor

**No VS Code/Cursor:**
- Pressione `Ctrl + ~` (til)
- OU vá em: Terminal → New Terminal

---

### 2️⃣ Navegue até a Pasta do Projeto

```bash
cd C:\Users\Administrador\Downloads\site_hirayama
```

**OU** se já estiver na pasta:
- Pule para o passo 3

---

### 3️⃣ Pare o Servidor (se estiver rodando)

- Pressione **Ctrl + C** no terminal
- Aguarde parar completamente

---

### 4️⃣ Reinicie o Servidor

```bash
npm run dev
```

---

### 5️⃣ Aguarde

Você deve ver algo como:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

---

## ✅ PRONTO!

Agora o servidor está rodando com as novas credenciais!

---

## 🎯 PRÓXIMOS PASSOS

1. ✅ Servidor reiniciado
2. ⏳ Acesse: `http://localhost:3000/admin/login`
3. ⏳ Login: `admin123`
4. ⏳ Crie um artigo
5. ⏳ Veja no site!

---

## 🆘 PROBLEMAS?

### ❌ Erro: "npm não é reconhecido"
**Solução:**
- Instale o Node.js: https://nodejs.org
- Reinicie o terminal

### ❌ Erro: "Cannot find module"
**Solução:**
- Execute: `npm install`
- Depois: `npm run dev`

### ❌ Porta já em uso
**Solução:**
- Feche outros servidores rodando
- Ou use outra porta: `npm run dev -- --port 8082`

---

**🚀 Agora execute `npm run dev` no TERMINAL, não no SQL Editor!**

