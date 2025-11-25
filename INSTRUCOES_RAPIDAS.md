# 🚀 INSTRUÇÕES RÁPIDAS - Corrigir Hash

## ❌ PROBLEMA

Hash no banco não corresponde ao hash gerado no navegador.

## ✅ SOLUÇÃO RÁPIDA

### OPÇÃO 1: Script HTML (MAIS FÁCIL)

1. **Abra no navegador:** `ATUALIZAR_HASH_BANCO.html`
2. **Clique em:** "Gerar Hash e Atualizar Banco"
3. ✅ **Pronto!** Hash atualizado automaticamente

### OPÇÃO 2: Console do Navegador

1. **Abra o console** (F12) na página de login
2. **Cole e execute:**

```javascript
(async () => {
  const password = 'Balboal.10';
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  console.log('Hash:', hashHex);
  console.log('SQL: UPDATE login SET password_hash = \'' + hashHex + '\', updated_at = NOW() WHERE email = \'marketingkauann@gmail.com\';');
  return hashHex;
})();
```

3. **Copie o SQL gerado**
4. **Execute no Supabase SQL Editor**
5. ✅ **Pronto!**

## 🧪 TESTAR

1. **Acesse:** `http://localhost:8081/admin/login`
2. **Digite:**
   - Email: `marketingkauann@gmail.com`
   - Senha: `Balboal.10`
3. ✅ **Deve funcionar!**

---

**Use a OPÇÃO 1 - é mais fácil! 🚀**

