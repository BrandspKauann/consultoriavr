// Script para testar hash no navegador (copie e cole no console do navegador)
(async () => {
  const password = 'Balboal.10';
  
  // Gerar hash exatamente como no código
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  console.log('Hash gerado no navegador:', hashHex);
  console.log('Primeiros 20 chars:', hashHex.substring(0, 20));
  console.log('');
  console.log('SQL para atualizar:');
  console.log(`UPDATE login SET password_hash = '${hashHex}', updated_at = NOW() WHERE email = 'marketingkauann@gmail.com';`);
  
  return hashHex;
})();

