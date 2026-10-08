import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const html = await fs.readFile('pagamento-de-folha/index.html', 'utf8');
const sitemap = await fs.readFile('sitemap.xml', 'utf8');
assert.doesNotMatch(html, /somapay|c[oó]digo 520|autorizada pelo banco central/i);
assert.match(html, /https:\/\/www.consultoriavr.com.br\/pagamento-de-folha\//);
assert.match(sitemap, /\/pagamento-de-folha\//);
assert.equal((html.match(/gtm\.js\?id=/g) || []).length, 1);
assert.match(html, /FAQPage/);
assert.match(html, /BreadcrumbList/);
assert.match(html, /formspree.io\/f\/mbdppnkr/);
assert.match(html, /Não há retorno garantido/);

const server = spawn(process.execPath, ['tools/test-leads-server.mjs'], { stdio: ['ignore', 'pipe', 'pipe'] });
let browser;
try {
  await new Promise((resolve, reject) => {
    server.stdout.once('data', resolve);
    server.once('error', reject);
    server.once('exit', code => reject(new Error(`Server exited: ${code}`)));
  });
  const output = '../.codex-tmp/consultoriavr-payroll';
  await fs.mkdir(output, { recursive: true });
  browser = await chromium.launch({ headless: true, executablePath: process.env.QA_BROWSER_PATH });
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  await context.addInitScript(() => {
    window.dataLayer = [];
    const push = window.dataLayer.push.bind(window.dataLayer);
    window.dataLayer.push = (...items) => {
      const events = JSON.parse(sessionStorage.getItem('qa:events') || '[]');
      sessionStorage.setItem('qa:events', JSON.stringify([...events, ...items]));
      return push(...items);
    };
  });
  const page = await context.newPage();
  await page.route('https://**/*', route => route.abort());
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://127.0.0.1:4175/pagamento-de-folha/?operadora=Ticket&utm_source=dux&utm_medium=email&utm_campaign=folha');
    await page.locator('.payroll-hero img').evaluate(img => img.decode());
    assert.equal(await page.locator('.payroll-features article').count(), 6);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: `${output}/hero-${width}.png` });
    await page.locator('.payroll-hero .button').click();
    assert.equal(new URL(page.url()).hash, '#analise-folha');
    assert.ok(await page.locator('#payroll-form').isVisible());
    await page.locator('#payroll-form').screenshot({ path: `${output}/form-${width}.png` });
    await page.locator('.payroll-faq details').first().locator('summary').click();
    assert.equal(await page.locator('.payroll-faq details').first().getAttribute('open'), '');
    console.log(`Payroll ${width}px: hero, image, layout, CTA, FAQ and form passed`);
  }
  await page.evaluate(() => {
    sessionStorage.setItem('vr:diagnostic', JSON.stringify({ result: { operator: 'Ticket', category: 'Antigo' }, labels: ['Antigo'], expires: Date.now() + 100000 }));
    sessionStorage.setItem('vr:quiz', JSON.stringify({ result: { category: 'Rede aberta' }, labels: ['Antigo'], expires: Date.now() + 100000 }));
    sessionStorage.setItem('vr:origin', JSON.stringify({ path: '/operadoras/flash-beneficios/', expires: Date.now() + 100000 }));
  });
  await page.reload();
  const form = page.locator('#payroll-form');
  assert.equal(await form.locator('[name=operator]').inputValue(), 'Não se aplica');
  await form.locator('[name=name]').fill('Teste local');
  await form.locator('[name=role]').selectOption({ index: 1 });
  await form.locator('[name=company]').fill('Empresa QA');
  await form.locator('[name=cnpj]').fill('18166550000141');
  await form.locator('[name=email]').fill('qa@empresa.example');
  await form.locator('[name=phone]').fill('11999991234');
  await form.locator('[name=employees]').selectOption({ index: 2 });
  await form.locator('[name=payroll_flow]').selectOption({ index: 1 });
  await form.locator('[name=priority]').selectOption({ index: 1 });
  await form.locator('[name=consent]').check();
  await form.locator('[type=submit]').click();
  assert.equal(await (await context.request.get('http://127.0.0.1:4175/__test__/last')).json(), null);
  await form.locator('[name=cnpj]').fill('18166550000140');
  await context.request.get('http://127.0.0.1:4175/__test__/fail-next');
  await form.locator('[type=submit]').click();
  await page.waitForFunction(() => document.querySelector('.form-note').textContent.includes('Não foi possível'));
  assert.equal(await form.locator('[name=email]').inputValue(), 'qa@empresa.example');
  assert.ok(!await page.evaluate(() => JSON.parse(sessionStorage.getItem('qa:events')).some(x => x.event === 'generate_lead')));
  await form.locator('[type=submit]').click();
  await page.waitForURL('**/obrigado/');
  const payload = await (await context.request.get('http://127.0.0.1:4175/__test__/last')).json();
  for (const value of ['Pagamento de folha', '/pagamento-de-folha/', 'dux', 'email', 'folha', 'Portal bancário e arquivo de remessa']) assert.ok(payload.body.includes(value));
  assert.ok(!payload.body.includes('Antigo'));
  const events = await page.evaluate(() => JSON.parse(sessionStorage.getItem('qa:events')));
  assert.equal(events.filter(x => x.event === 'generate_lead').length, 1);
  assert.equal(events.find(x => x.event === 'generate_lead').solution_kind, 'Pagamento de folha');
  assert.ok(!JSON.stringify(events).includes('qa@empresa.example'));
  assert.ok(!await page.evaluate(() => Object.keys(sessionStorage).filter(x => x.startsWith('vr:')).some(x => /qa@empresa.example|18166550000140|11999991234/.test(sessionStorage.getItem(x)))));
  assert.deepEqual(errors, []);
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  await staticPage.route('https://**/*', route => route.abort());
  await staticPage.goto('http://127.0.0.1:4175/pagamento-de-folha/');
  assert.equal(await staticPage.locator('.payroll-features article:visible').count(), 6);
  assert.equal(await staticPage.locator('#payroll-form').getAttribute('method'), 'POST');
  console.log('Payroll: invalid CNPJ, failed send, safe retry, campaign metadata, isolated context, conversion and no-JS passed. No real leads sent.');
} finally {
  await browser?.close();
  server.kill();
}
