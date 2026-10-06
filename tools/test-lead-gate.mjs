import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import { quizQuestions, diagnosticQuestions } from '../lead-core.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const server = spawn(process.execPath, ['tools/test-leads-server.mjs'], { stdio: ['ignore', 'pipe', 'pipe'] });
let browser;
const base = 'http://127.0.0.1:4175';
try {
  await new Promise((resolve, reject) => {
    server.stdout.once('data', resolve);
    server.once('error', reject);
    server.once('exit', code => reject(new Error(`QA server exited: ${code}`)));
  });
  browser = await chromium.launch({ headless: true, ...(process.env.QA_BROWSER_PATH ? { executablePath: process.env.QA_BROWSER_PATH } : {}) });
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  // All submissions go to the isolated server, never Formspree or Analytics.
  await page.route('https://**/*', route => route.abort());
  let submissions = 0;
  page.on('request', request => { if (request.method() === 'POST') submissions++; });
  const artifacts = '../.codex-tmp/consultoriavr-ticket-gate';
  await fs.mkdir(artifacts, { recursive: true });
  for (const [route, kind, questions] of [
    ['quiz-rede-aberta-ou-fechada', 'quiz', quizQuestions],
    ['ja-tenho-cartao', 'diagnostic', diagnosticQuestions]
  ]) {
    await page.goto(`${base}/${route}/?operadora=Ticket&utm_source=qa&utm_medium=test&utm_campaign=gate`);
    for (const question of questions) {
      const inputs = page.locator('.wizard-form input[name=answer]');
      assert.equal(await inputs.count(), question.options.length);
      if (!(await page.locator('.wizard-form input:checked').count())) await inputs.first().check();
      await page.locator('.wizard-form button[type=submit]').click();
    }
    const form = page.locator('[data-lead-form]');
    await form.waitFor({ state: 'visible' });
    assert.equal(await page.locator('.wizard-result').isVisible(), false);
    assert.equal(await page.locator('.wizard-result').textContent(), '');
    assert.equal(await form.locator('[name=operator]').inputValue(), 'Ticket');
    const expectedResult = await form.locator(`[name=${kind}_result]`).inputValue();
    assert.ok(expectedResult);
    await form.locator('[name=name]').fill('Teste local');
    await form.locator('[name=role]').selectOption({ index: 1 });
    await form.locator('[name=company]').fill('Empresa ficticia QA');
    await form.locator('[name=cnpj]').fill('18166550000141');
    await form.locator('[name=email]').fill('qa@empresa.example');
    await form.locator('[name=phone]').fill('11999991234');
    await form.locator('[name=employees]').selectOption({ index: 2 });
    await form.locator('[name=priority]').selectOption({ index: 1 });
    await form.locator('[name=interests]').first().check();
    await form.locator('[name=consent]').check();
    const previous = submissions;
    await form.locator('[type=submit]').click();
    assert.equal(submissions, previous, 'Invalid CNPJ must not send');
    await form.locator('[name=cnpj]').fill('18166550000140');
    if (kind === 'quiz') {
      await page.locator('.wizard-capture > .review-answers').click();
      assert.equal(await page.locator('.wizard-form').isVisible(), true);
      for (const question of questions) {
        assert.equal(await page.locator('.wizard-form input:checked').count(), 1);
        await page.locator('.wizard-form button[type=submit]').click();
      }
      assert.equal(await form.locator('[name=name]').inputValue(), 'Teste local');
    }
    await context.request.get(`${base}/__test__/fail-next`);
    await form.locator('[type=submit]').click();
    await page.waitForFunction(() => document.querySelector('.wizard-capture .form-note').textContent.includes('Não foi possível'));
    assert.equal(await page.locator('.wizard-result').isVisible(), false);
    assert.equal(await form.locator('[name=email]').inputValue(), 'qa@empresa.example');
    await page.setViewportSize({ width: 390, height: 844 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await form.screenshot({ path: `${artifacts}/${kind}-capture-mobile.png` });
    await form.locator('[type=submit]').click();
    await page.locator('.wizard-result').waitFor({ state: 'visible' });
    assert.equal(await page.locator('.wizard-result h2').textContent(), expectedResult);
    assert.equal(await form.isVisible(), false);
    assert.ok(page.url().includes(route), 'Result stays on the assessment page');
    assert.equal(await page.evaluate(() => window.dataLayer.filter(x => x.event === 'generate_lead').length), 1);
    const payload = await (await context.request.get(`${base}/__test__/last`)).json();
    assert.ok(payload.body.includes(`name="${kind}_answers"`));
    assert.ok(payload.body.includes(expectedResult));
    assert.ok(payload.body.includes(`/${route}/`));
    assert.ok(payload.body.includes('gate'));
    await page.screenshot({ path: `${artifacts}/${kind}-result-mobile.png`, fullPage: true });
    console.log(`${kind}: validation, review, failure, retry, gated result and analytics passed`);
  }
  await page.goto(`${base}/contato/`);
  const contact = page.locator('[data-lead-form]');
  await contact.locator('[name=name]').fill('Teste local');
  await contact.locator('[name=role]').selectOption({ index: 1 });
  await contact.locator('[name=company]').fill('Empresa ficticia QA');
  await contact.locator('[name=cnpj]').fill('18166550000140');
  await contact.locator('[name=email]').fill('qa@empresa.example');
  await contact.locator('[name=phone]').fill('11999991234');
  await contact.locator('[name=priority]').selectOption({ index: 1 });
  await contact.locator('[name=interests]').first().check();
  await contact.locator('[name=consent]').check();
  await contact.locator('[type=submit]').click();
  await page.waitForURL('**/obrigado/');
  assert.equal(await page.evaluate(() => window.dataLayer.filter(x => x.event === 'thank_you_view').length), 1);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/operadoras/ticket-beneficios/']) {
      await page.goto(base + route);
      await page.locator('img').first().waitFor();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      const logo = page.locator('img[src="/ticket-logo-official.svg"]').first();
      assert.ok(await logo.evaluate(img => img.complete && img.naturalWidth > 0));
      await (route === '/' ? page.locator('#operadoras') : page.locator('.operator-page__hero')).screenshot({ path: `${artifacts}/ticket-${width}-${route === '/' ? 'home' : 'page'}.png` });
    }
  }
  assert.deepEqual(errors, []);
  console.log('Contact redirect, Ticket images and desktop/mobile overflow passed. No real leads sent.');
} finally {
  await browser?.close();
  server.kill();
}
