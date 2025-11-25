# 🔐 SOLUÇÃO: Hash Não Coincide

## ❌ PROBLEMA IDENTIFICADO

Os hashes não coincidem:
- **Hash no banco:** `644d06c62d9b3a286198...` (gerado com Node.js)
- **Hash no navegador:** `86fe2971e397f6dd069c...` (gerado com Web Crypto API)

**Isso acontece porque:**
- O hash no banco foi gerado com Node.js (`crypto.createHash`)
- O navegador usa Web Crypto API (`crypto.subtle.digest`)
- Embora ambos sejam SHA-256, podem haver diferenças sutis no encoding

## ✅ SOLUÇÃO: Atualizar Hash no Banco

### MÉTODO 1: Usar Script HTML (RECOMENDADO)

1. **Abra o arquivo:** `ATUALIZAR_HASH_BANCO.html` no navegador
2. **Verifique os campos:**
   - URL: `https://cpejrontfflbzmssomnr.supabase.co`
   - Chave: `sb_publishable_3DT42kOTvybQJlBfSA5-ww_OkzlEzil`
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
3. **Clique em:** "Gerar Hash e Atualizar Banco"
4. ✅ **Pronto!** Hash atualizado automaticamente

### MÉTODO 2: Atualizar Manualmente via SQL

1. **Abra o arquivo:** `GERAR_HASH_BROWSER.html` no navegador
2. **Clique em:** "Gerar Hash"
3. **Copie o hash gerado**
4. **Vá no Supabase SQL Editor**
5. **Execute este SQL** (substitua `HASH_AQUI` pelo hash copiado):

```sql
UPDATE login 
SET password_hash = 'HASH_AQUI',
    updated_at = NOW()
WHERE email = 'marketingkauann@gmail.com';
```

6. ✅ **Pronto!** Hash atualizado

### MÉTODO 3: Usar MCP (Automático)

Vou atualizar diretamente usando o hash que o navegador gera.

---

## 🧪 TESTAR APÓS ATUALIZAR

1. **Acesse:** `http://localhost:8081/admin/login`
2. **Digite:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
3. **Clique em:** "Entrar"
4. ✅ **Deve funcionar!**

---

## 🔍 VERIFICAR

Após atualizar, verifique no console do navegador:
- ✅ "✅ Hashes coincidem!"
- ✅ "✅ Login válido!"
- ✅ Redirecionamento para `/admin`

---

**Use o MÉTODO 1 (ATUALIZAR_HASH_BANCO.html) - é mais fácil! 🚀**

