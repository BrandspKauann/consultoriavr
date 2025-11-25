// Testar hash no Node.js para comparar
const crypto = require('crypto');

const password = 'Balboal.10';

// Método 1: Direto (como estava fazendo antes)
const hash1 = crypto.createHash('sha256').update(password).digest('hex');
console.log('Hash Node.js (direto):', hash1);
console.log('Primeiros 20 chars:', hash1.substring(0, 20));

// Método 2: Com encoding explícito
const hash2 = crypto.createHash('sha256').update(password, 'utf8').digest('hex');
console.log('Hash Node.js (utf8):', hash2);
console.log('Primeiros 20 chars:', hash2.substring(0, 20));

// Método 3: Simular Web Crypto API (como no navegador)
// No navegador, TextEncoder.encode() retorna Uint8Array
const encoder = new TextEncoder();
const data = encoder.encode(password);
const hash3 = crypto.createHash('sha256').update(Buffer.from(data)).digest('hex');
console.log('Hash Node.js (Buffer.from):', hash3);
console.log('Primeiros 20 chars:', hash3.substring(0, 20));

