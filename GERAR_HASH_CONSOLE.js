// Cole este código no console do navegador (F12) na página de login

(async () => {
  const password = 'Balboal.10';
  const email = 'marketingkauann@gmail.com';
  
  // Gerar hash
  const encoder = new TextEncoder();
  const data = encoder.encode(password.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  // SQL para atualizar
  const sql = `UPDATE login 
SET password_hash = '${hashHex}', 
    updated_at = NOW() 
WHERE email = '${email}';`;
  
  console.log('=== HASH GERADO ===');
  console.log('Hash completo:', hashHex);
  console.log('Primeiros 20 chars:', hashHex.substring(0, 20));
  console.log('');
  console.log('=== SQL PARA EXECUTAR NO SUPABASE ===');
  console.log(sql);
  console.log('');
  console.log('=== INSTRUÇÕES ===');
  console.log('1. Copie o SQL acima');
  console.log('2. Vá no Supabase SQL Editor');
  console.log('3. Cole o SQL e execute (Run ou F5)');
  console.log('4. ✅ Hash atualizado!');
  
  return hashHex;
})();

