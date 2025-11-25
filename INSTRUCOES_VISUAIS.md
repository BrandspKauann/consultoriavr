# 🎯 INSTRUÇÕES VISUAIS - Criar Tabela Login

## ❓ ENTENDENDO A CONFUSÃO

Você está procurando um tipo de dados chamado `password_hash`, mas:
- ❌ **NÃO existe** um tipo de dados chamado `password_hash`
- ✅ `password_hash` é o **NOME da coluna** (você digita)
- ✅ O **TIPO** da coluna deve ser `text` (você seleciona da lista)

---

## 📝 EXEMPLO VISUAL

Quando você criar a coluna na interface do Supabase:

```
┌─────────────────────────────────────┐
│ Adicionar Coluna                    │
├─────────────────────────────────────┤
│ Nome da coluna:                     │
│ [password_hash          ]           │  ← VOCÊ DIGITA AQUI
│                                     │
│ Tipo de dados:                      │
│ [text ▼]                            │  ← VOCÊ SELECIONA "text" DA LISTA
│                                     │
│ [ ] Nullable (pode ser nulo)        │
│                                     │
│ [Salvar]  [Cancelar]                │
└─────────────────────────────────────┘
```

---

## ✅ PASSO A PASSO NA INTERFACE

### 1. Acessar Table Editor

1. Acesse: https://supabase.com/dashboard/project/cpejrontfflbzmssomnr
2. Clique em: **Table Editor** (menu lateral)
3. Se a tabela `login` existe, clique nos **3 pontos** → **Edit table**
4. Se não existe, clique em: **New table**

### 2. Adicionar Coluna `password_hash`

1. Clique em: **Add column** ou **+ Add column**
2. **Nome da coluna:** Digite `password_hash`
3. **Tipo de dados:** 
   - Clique no campo de tipo
   - Na lista, procure por `text` (tem ícone "T")
   - Selecione `text`
4. **Nullable:** Desmarque (não pode ser nulo)
5. Clique em: **Save**

### 3. Remover Coluna Errada (se existir)

Se você criou uma coluna `senha` com tipo `numeric`:
1. Clique nos **3 pontos** ao lado da coluna `senha`
2. Selecione: **Delete column**
3. Confirme a exclusão

---

## 🚀 MÉTODO MAIS FÁCIL: USAR SQL EDITOR

**Recomendo usar o SQL Editor** porque é mais rápido e cria tudo de uma vez:

1. **Acesse:** SQL Editor
2. **Cole o SQL:** Do arquivo `SQL_COMPLETO_COPIAR_COLAR.sql`
3. **Execute:** Clique em "Run" ou pressione F5
4. ✅ **Pronto!** Tabela criada com todas as colunas e configurações

---

## 📋 LISTA DE TIPOS DE DADOS

Quando você clicar no campo "Tipo de dados", verá esta lista:

- `text` ← **USE ESTE para `password_hash`**
- `varchar` ← Também funciona
- `uuid` ← Para `id`
- `bool` ← Para `active`
- `timestamptz` ← Para `created_at` e `updated_at`
- `int2`, `int4`, `int8` ← NÃO use para senhas
- `numeric` ← NÃO use para senhas

---

## ⚠️ ERROS COMUNS

### ❌ ERRO 1: Tipo errado
```
Coluna: password_hash
Tipo: numeric  ← ERRADO!
```
**Correto:**
```
Coluna: password_hash
Tipo: text  ← CORRETO!
```

### ❌ ERRO 2: Nome errado
```
Coluna: senha  ← ERRADO!
Tipo: text
```
**Correto:**
```
Coluna: password_hash  ← CORRETO!
Tipo: text
```

---

## ✅ CHECKLIST

Após criar a tabela, verifique:

- [ ] Tabela `login` existe
- [ ] Coluna `id` (tipo: uuid, primary key)
- [ ] Coluna `email` (tipo: text, unique, not null)
- [ ] Coluna `password_hash` (tipo: text, not null) ← **IMPORTANTE!**
- [ ] Coluna `role` (tipo: text, default: 'admin')
- [ ] Coluna `active` (tipo: bool, default: true)
- [ ] Coluna `created_at` (tipo: timestamptz)
- [ ] Coluna `updated_at` (tipo: timestamptz)
- [ ] RLS (Row Level Security) habilitado
- [ ] Políticas RLS configuradas

---

## 🎯 RESUMO

1. **Nome da coluna:** `password_hash` (você digita)
2. **Tipo de dados:** `text` (você seleciona da lista)
3. **Nullable:** Não (desmarque)
4. **Salvar:** Clique em "Save"

**OU use o SQL Editor com o SQL completo! 🚀**

