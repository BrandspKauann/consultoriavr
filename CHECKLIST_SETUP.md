# ✅ CHECKLIST - Configuração do Sistema de Artigos

## 🎯 O QUE FAZER AGORA (Siga na ordem!)

### 📌 PASSO 1: Supabase (5 minutos)

- [ ] **1.1** Acesse https://supabase.com
- [ ] **1.2** Faça login (ou crie conta gratuita)
- [ ] **1.3** Crie novo projeto OU acesse projeto existente
  - Nome: `hirayama-seguros`
  - Região: South America (São Paulo)
  - Senha do banco: (anote essa senha!)
- [ ] **1.4** Aguarde 2-3 minutos (projeto sendo criado)

**✅ Pronto quando:** Você estiver na dashboard do projeto

---

### 📌 PASSO 2: Executar SQL (2 minutos)

- [ ] **2.1** No menu lateral, clique em **"SQL Editor"**
- [ ] **2.2** Clique em **"New Query"** (ou botão +)
- [ ] **2.3** Abra o arquivo: `supabase/migrations/001_create_articles_table.sql`
- [ ] **2.4** **COPIE TODO o conteúdo** do arquivo SQL
- [ ] **2.5** **COLE no SQL Editor** do Supabase
- [ ] **2.6** Clique em **"Run"** (ou F5)
- [ ] **2.7** Verifique se aparece: **"Success. No rows returned"**

**✅ Pronto quando:** SQL executado com sucesso

---

### 📌 PASSO 3: Pegar Credenciais (1 minuto)

- [ ] **3.1** No menu lateral, clique em **"Settings"** (⚙️)
- [ ] **3.2** Clique em **"API"**
- [ ] **3.3** Copie a **"Project URL"**
  - Exemplo: `https://abcdefghijklmnop.supabase.co`
  - 📝 **ANOTE AQUI:** _______________________
- [ ] **3.4** Copie a **"anon public" key**
  - Uma chave longa: `eyJhbGc...`
  - 📝 **ANOTE AQUI:** _______________________

**✅ Pronto quando:** Você tiver as duas credenciais anotadas

---

### 📌 PASSO 4: Configurar .env (2 minutos)

- [ ] **4.1** Na raiz do projeto, crie arquivo `.env`
- [ ] **4.2** Cole este conteúdo:

```env
VITE_SUPABASE_URL=COLE_A_PROJECT_URL_AQUI
VITE_SUPABASE_PUBLISHABLE_KEY=COLE_A_ANON_KEY_AQUI
VITE_ADMIN_PASSWORD=admin123
```

- [ ] **4.3** Substitua `COLE_A_PROJECT_URL_AQUI` pela URL que você copiou
- [ ] **4.4** Substitua `COLE_A_ANON_KEY_AQUI` pela chave que você copiou
- [ ] **4.5** (Opcional) Altere `admin123` para uma senha mais segura
- [ ] **4.6** Salve o arquivo

**✅ Pronto quando:** Arquivo `.env` criado e salvo

**📋 Exemplo de como deve ficar:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.abcdefghijklmnopqrstuvwxyz
VITE_ADMIN_PASSWORD=admin123
```

---

### 📌 PASSO 5: Reiniciar Servidor (1 minuto)

- [ ] **5.1** No terminal, pare o servidor (Ctrl + C)
- [ ] **5.2** Execute: `npm run dev`
- [ ] **5.3** Aguarde aparecer: `ready in X ms`
- [ ] **5.4** Verifique a URL: `http://localhost:3000/`

**✅ Pronto quando:** Servidor rodando sem erros

---

### 📌 PASSO 6: Testar Login (1 minuto)

- [ ] **6.1** Acesse: `http://localhost:3000/admin/login`
- [ ] **6.2** Digite qualquer email (ex: `admin@hirayama.com`)
- [ ] **6.3** Digite a senha do `.env` (padrão: `admin123`)
- [ ] **6.4** Clique em **"Entrar"**
- [ ] **6.5** Você deve ser redirecionado para `/admin`

**✅ Pronto quando:** Você estiver logado no admin

---

### 📌 PASSO 7: Criar Primeiro Artigo (3 minutos)

- [ ] **7.1** Clique em **"Novo Artigo"**
- [ ] **7.2** Preencha:
  - Título: `Meu Primeiro Artigo`
  - Descrição: `Descrição do meu artigo`
  - Tipo: `Artigo`
  - Categoria: `Educativo`
  - Tempo de Leitura: `5 min`
  - Publicado: ✅ **MARQUE ESTA OPÇÃO**
- [ ] **7.3** Clique em **"Criar Artigo"**
- [ ] **7.4** Verifique se apareceu na lista

**✅ Pronto quando:** Artigo criado e aparecendo na lista

---

### 📌 PASSO 8: Ver no Site (1 minuto)

- [ ] **8.1** Acesse: `http://localhost:3000/`
- [ ] **8.2** Role até a seção **"Conteúdo Educativo"**
- [ ] **8.3** Verifique se seu artigo aparece lá

**✅ Pronto quando:** Artigo aparecendo no site principal!

---

## 🎉 PARABÉNS! SISTEMA FUNCIONANDO!

Agora você pode:
- ✅ Criar artigos pelo admin
- ✅ Editar artigos
- ✅ Excluir artigos
- ✅ Publicar/despublicar
- ✅ Ver aparecer automaticamente no site!

---

## 🆘 PRECISA DE AJUDA?

Se tiver problema em algum passo:

1. **Me diga em qual passo está travado**
2. **Me envie a mensagem de erro** (se houver)
3. **Me diga o que apareceu na tela**

Vou te ajudar a resolver! 🚀

---

## 📝 INFORMAÇÕES QUE VOCÊ PRECISA ME ENVIAR (SE TIVER PROBLEMA)

Se algo não funcionar, me envie:

1. **Qual passo você está?** (ex: "PASSO 2 - Executar SQL")
2. **O que apareceu?** (ex: "Erro ao executar SQL")
3. **Mensagem de erro completa** (copie e cole)
4. **Print da tela** (se possível)

---

## 🎯 RESUMO SUPER RÁPIDO

```
1. Supabase → Criar/Acessar projeto
2. SQL Editor → Executar SQL do arquivo
3. Settings → API → Copiar credenciais
4. Criar .env → Colar credenciais
5. Reiniciar servidor
6. Acessar /admin/login → Fazer login
7. Criar artigo → Testar
8. Ver no site principal → Funcionando! 🎉
```

---

**Vamos começar! Siga os passos acima e marque cada checkbox conforme for completando! ✅**

