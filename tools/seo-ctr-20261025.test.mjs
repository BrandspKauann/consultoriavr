import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

test('commercial operator SEO is aligned and the Flash experiment is unchanged', async () => {
  for (const slug of ['vr-beneficios', 'caju-beneficios']) {
    const html = await fs.readFile(new URL(`../operadoras/${slug}/index.html`, import.meta.url), 'utf8');
    assert.equal((html.match(/<title>/g) || []).length, 1);
    assert.equal((html.match(/<h1>/g) || []).length, 1);
    assert.match(html, /compare antes de contratar|comparar na proposta/);
    assert.match(html, /rel="canonical"/);
    assert.doesNotMatch(html, /economia garantida/);
  }
  const flash = await fs.readFile(new URL('../operadoras/flash-beneficios/index.html', import.meta.url), 'utf8');
  assert.match(flash, /<title>Flash Benefícios para empresas: vale a pena para seu RH\?<\/title>/);
  assert.match(flash, /<h1>Flash Benefícios para empresas: vale a pena para seu RH\?<\/h1>/);
});
