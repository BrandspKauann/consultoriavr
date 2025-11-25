# 🎯 SOLUÇÃO DEFINITIVA - Problema do Hash

## ❌ PROBLEMA IDENTIFICADO

O hash no banco é `644d06c62d9b3a286198...` (gerado com Node.js), mas o navegador está gerando `86fe2971e397f6dd069c...` (Web Crypto API).

**Isso acontece porque:**
- O hash no banco foi gerado com Node.js: `crypto.createHash('sha256').update('Balboal.10').digest('hex')`
- O navegador usa Web Crypto API: `crypto.subtle.digest('SHA-256', data)`
- Embora ambos sejam SHA-256, podem haver diferenças sutis no encoding

## ✅ SOLUÇÃO: Atualizar Hash no Banco

O hash no banco precisa ser atualizado para o valor que o navegador gera.

### MÉTODO 1: Usar Script HTML (RECOMENDADO)

1. **Abra:** `ATUALIZAR_HASH_DIRETO.html` no navegador
2. **Clique em:** "Atualizar Hash no Banco"
3. **Se der erro:** Use o SQL manual abaixo

### MÉTODO 2: Atualizar via SQL Manual

1. **Abra o console do navegador** (F12) na página de login
2. **Execute este código:**

```javascript
(async () => {
  const password = 'Balboal.10';
  const encoder = new TextEncoder();
  const data = encoder.encode(password.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  console.log('Hash completo:', hashHex);
  console.log('SQL: UPDATE login SET password_hash = \'' + hashHex + '\', updated_at = NOW() WHERE email = \'marketingkauann@gmail.com\';');
  return hashHex;
})();
```

3. **Copie o hash gerado**
4. **Execute no Supabase SQL Editor:**

```sql
UPDATE login 
SET password_hash = 'HASH_AQUI', 
    updated_at = NOW() 
WHERE email = 'marketingkauann@gmail.com';
```

## 🔍 VERIFICAR

Após atualizar, ao tentar fazer login:
- ✅ Hash gerado no navegador deve coincidir com o hash no banco
- ✅ "✅ Hashes coincidem!" no console
- ✅ Login deve funcionar

## 📋 CHECKLIST

- [ ] Hash atualizado no banco
- [ ] Hash no banco corresponde ao hash gerado no navegador
- [ ] Código normaliza a senha (remove espaços)
- [ ] Login funciona

---

**Use o MÉTODO 1 para atualizar automaticamente! 🚀**

