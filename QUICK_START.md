# ⚡ QUICK START - Configuração Rápida

## 🚀 Em 5 Minutos Você Está Pronto!

### 1️⃣ Supabase (2 min)
```
1. Acesse: https://supabase.com
2. Crie/Acesse projeto
3. SQL Editor → New Query
4. Cole o SQL de: supabase/migrations/001_create_articles_table.sql
5. Run (F5)
```

### 2️⃣ Credenciais (1 min)
```
1. Settings → API
2. Copie: Project URL
3. Copie: anon public key
```

### 3️⃣ .env (1 min)
```
Crie arquivo .env na raiz:
```
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua-chave-aqui
VITE_ADMIN_PASSWORD=admin123
```

### 4️⃣ Testar (1 min)
```
1. npm run dev
2. Acesse: http://localhost:3000/admin/login
3. Senha: admin123 (ou a que você colocou)
4. Criar artigo → Ver no site!
```

---

## ✅ PRONTO!

Agora você pode gerenciar artigos e eles aparecem automaticamente no site!

---

## 📞 Problema?

- Verifique se executou o SQL
- Verifique se o .env está correto
- Verifique se reiniciou o servidor
- Me envie a mensagem de erro!

