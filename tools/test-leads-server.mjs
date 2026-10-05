import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let lastSubmission = null;
let failNext = false;
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.xml': 'application/xml' };
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/__test__/last') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(lastSubmission));
    return;
  }
  if (url.pathname === '/__test__/fail-next') {
    failNext = true;
    res.end('Next submission will fail');
    return;
  }
  if (url.pathname === '/__test__/submit' && req.method === 'POST') {
    let body = '';
    for await (const chunk of req) body += chunk;
    lastSubmission = { contentType: req.headers['content-type'], body };
    res.writeHead(failNext ? 503 : 200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: !failNext }));
    failNext = false;
    return;
  }
  try {
    let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + path.sep)) throw new Error('Invalid path');
    if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    let content = await fs.readFile(file);
    if (file.endsWith('.html')) {
      // Test-only delivery captures submissions locally and removes external measurement.
      content = Buffer.from(content.toString().replaceAll('action="https://formspree.io/f/mbdppnkr"', 'action="/__test__/submit"').replace(/<script>\(function\(w,d,s,l,i\)[\s\S]*?<\/script>/g, '').replace(/<noscript><iframe[\s\S]*?<\/iframe><\/noscript>/g, ''));
    }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(4175, '127.0.0.1', () => console.log('Isolated lead QA: http://127.0.0.1:4175/ (no real submissions)'));
